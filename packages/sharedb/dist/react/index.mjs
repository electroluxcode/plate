// src/react/ShareDBPlugin.ts
import { toPlatePlugin } from "platejs/react";

// src/lib/BaseOtPlugin.ts
import {
  createTSlatePlugin
} from "platejs";
import { Transforms } from "slate";

// src/lib/util.ts
var castArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
};

// src/lib/withPlateOt.ts
var withPlateOt = ({ editor, getOptions }) => {
  const originalApply = editor.apply;
  editor.originalApply = originalApply;
  editor.apply = async (operation) => {
    const options = getOptions();
    originalApply(operation);
    if (options.debug) {
      console.log("\u{1F504} sharedb: Applying remote operation:", operation);
    }
    if (options._status === "connected" && options._doc) {
      if (operation.type === "set_selection") {
        return;
      }
      const opFormat = castArray(operation);
      if (options.debug) {
        console.log("\u{1F4DD} sharedb: Submitting local operation:", opFormat);
      }
      submitOpToShareDB(options._doc, opFormat, options.debug).catch((error) => {
        if (options.debug) {
          console.error("\u274C sharedb: Failed to submit operation:", error);
        }
        options.onError?.(error);
      });
    }
  };
  editor.applyRemoteOperations = (operations) => {
    const options = getOptions();
    if (options.debug) {
      console.log("\u{1F4E8} sharedb: Applying remote operations:", operations);
    }
    try {
      operations.forEach((op) => {
        originalApply(op);
      });
    } catch (error) {
      if (options.debug) {
        console.error("\u{1F4A5} sharedb: Failed to apply remote operation:", error);
      }
      throw error;
    }
  };
  return editor;
};
async function submitOpToShareDB(doc, operations, debug) {
  if (!doc) return;
  try {
    await new Promise((resolve, reject) => {
      const filteredOps = operations.filter((op) => op && op.type !== "set_selection");
      if (filteredOps.length === 0) {
        resolve();
        return;
      }
      if (debug) {
        console.log("\u{1F4E4} sharedb: Submitting operations to ShareDB:", filteredOps);
      }
      doc.submitOp(filteredOps, { source: false }, (error) => {
        if (error) {
          if (debug) {
            console.error("\u274C sharedb: ShareDB operation submit failed:", error);
          }
          reject(error);
        } else {
          if (debug) {
            console.log("\u2705 sharedb: Operation submitted to ShareDB successfully");
          }
          resolve();
        }
      });
    });
  } catch (error) {
    if (debug) {
      console.error("\u{1F4A5} sharedb: Submit operation error:", error);
    }
    throw error;
  }
}

// src/lib/BaseOtPlugin.ts
var BaseOtPlugin = createTSlatePlugin({
  key: "sharedb",
  priority: 1e3,
  // 设置较低优先级，确保在 NodeId 插件之后加载
  extendEditor: withPlateOt,
  options: {
    _connection: null,
    _doc: null,
    _operationQueue: [],
    _presence: null,
    _processingQueue: false,
    _socket: null,
    _status: "disconnected",
    debug: false,
    enablePresence: false
  }
}).extendApi((ctx) => ({
  /**
   * 应用远程操作
   */
  applyRemoteOperation: (operations) => {
    const { editor, getOptions } = ctx;
    const options = getOptions();
    try {
      if (editor.applyRemoteOperations) {
        editor.applyRemoteOperations(operations);
      }
    } catch (error) {
      if (options.debug) {
        console.error("\u{1F4A5} sharedb: Failed to apply remote operation:", error);
      }
      options.onError?.(error);
    }
  },
  /**
   * @description 应用远程操作-不经过editor.apply
   * @param operations 
   */
  applyRemoteOperationWithoutEditor: (operations) => {
    const { editor } = ctx;
    const updateOp = () => {
      const opsQueue = castArray(operations);
      opsQueue.forEach((op) => {
        Transforms.transform(editor, op);
      });
      editor.onChange();
    };
    updateOp();
  },
  /**
   * 连接到 ShareDB 服务器
   */
  connect: async () => {
    const { editor, getOptions, setOption } = ctx;
    const options = getOptions();
    if (options._status === "connected" || options._status === "connecting") {
      console.warn("Already connected or connecting");
      return;
    }
    if (!options.sharedb) {
      throw new Error("ShareDB configuration not found. Please call init() first.");
    }
    try {
      setOption("_status", "connecting");
      options.onStatusChange?.("connecting");
      if (options.debug) {
        console.log("\u{1F4E1} sharedb: Connecting to ShareDB server...");
      }
      const [{ default: ShareDB }, { default: ReconnectingWebSocket }] = await Promise.all([
        import("sharedb-client-browser/dist/sharedb-client-umd.cjs"),
        import("reconnecting-websocket")
      ]);
      if (!ShareDB.types.map.slate) {
        const { default: ottype } = await import("ottype-slate-test");
        ShareDB.types.register(ottype.type);
        if (options.debug) {
          console.log("\u{1F4CB} sharedb: Registered slate sharedb type");
        }
      }
      const socket = new ReconnectingWebSocket(options.sharedb.url, [], {
        connectionTimeout: 5e3,
        debug: options.debug,
        maxRetries: options.sharedb.reconnection?.maxRetries || 5
      });
      const connection = new ShareDB.Connection(socket);
      const doc = connection.get(options.sharedb.collection || "documents", options.sharedb.documentId);
      const presence = connection.getDocPresence(options.sharedb.collection || "documents", options.sharedb.documentId);
      setOption("_presence", presence);
      setOption("_socket", socket);
      setOption("_connection", connection);
      setOption("_doc", doc);
      await new Promise((resolve, reject) => {
        doc.subscribe((error) => {
          if (error) {
            console.error("ShareDB subscription error:", error);
            setOption("_status", "error");
            options.onError?.(error);
            reject(error);
            return;
          }
          setOption("_status", "connected");
          options.onStatusChange?.("connected");
          if (options.debug) {
            console.log("\u2705 sharedb: Connected to ShareDB server");
            console.log("\u{1F4C4} sharedb: Document data:", doc.data);
          }
          const initialValue = doc.data?.children || [{
            children: [{
              text: "hello world"
            }],
            type: "paragraph"
          }];
          editor.children = initialValue;
          options.onConnect?.();
          resolve();
        });
      });
      doc.on("op", (ops, source) => {
        if (source) {
          if (options.debug) {
            console.log("\u{1F504} sharedb: Ignoring local operation echo");
          }
          return;
        }
        if (options.debug) {
          console.log("\u{1F4E8} sharedb: Received remote operations:", ops, "from source:", source);
        }
        ctx.api.sharedb.applyRemoteOperationWithoutEditor(ops);
      });
      socket.addEventListener("open", () => {
        if (options.debug) {
          console.log("\u{1F310} sharedb: WebSocket connected");
        }
      });
      socket.addEventListener("close", () => {
        setOption("_status", "disconnected");
        options.onStatusChange?.("disconnected");
        options.onDisconnect?.();
        if (options.debug) {
          console.log("\u274C sharedb: WebSocket disconnected");
        }
      });
      socket.addEventListener("error", (event) => {
        setOption("_status", "error");
        options.onStatusChange?.("error");
        options.onError?.(event);
        if (options.debug) {
          console.error("\u{1F6A8} sharedb: WebSocket error:", event);
        }
      });
    } catch (error) {
      setOption("_status", "error");
      options.onStatusChange?.("error");
      options.onError?.(error);
      if (options.debug) {
        console.error("\u{1F4A5} sharedb: Connection failed:", error);
      }
      throw error;
    }
  },
  /**
   * 断开连接
   */
  disconnect: () => {
    const { getOptions, setOption } = ctx;
    const options = getOptions();
    if (options._socket) {
      options._socket.close();
      setOption("_socket", null);
    }
    if (options._connection) {
      options._connection.close();
      setOption("_connection", null);
    }
    setOption("_doc", null);
    setOption("_status", "disconnected");
    options.onStatusChange?.("disconnected");
    options.onDisconnect?.();
    if (options.debug) {
      console.log("\u{1F50C} sharedb: Disconnected from ShareDB");
    }
  },
  getCtx: () => ctx,
  /**
   * 获取当前连接状态
   */
  getStatus: () => {
    const { getOptions } = ctx;
    return getOptions()._status;
  },
  /**
   * 初始化 sharedb 连接和文档状态
   */
  init: async ({
    id,
    autoConnect = true,
    collection = "documents",
    reconnection,
    url = "ws://localhost:8111",
    value
  } = {}) => {
    const { editor, getOptions, setOption } = ctx;
    const options = getOptions();
    const documentId = id ?? editor.id;
    const sharedbConfig = {
      collection,
      documentId,
      reconnection: {
        enabled: true,
        interval: 3e3,
        maxRetries: 5,
        ...reconnection
      },
      url
    };
    setOption("sharedb", sharedbConfig);
    if (options.debug) {
      console.log("\u{1F527} sharedb: Initializing with config:", sharedbConfig);
    }
    if (value !== null && value !== void 0) {
      let initialNodes = value;
      if (typeof value === "string") {
        initialNodes = editor.api.html.deserialize({
          element: value
        });
      } else if (typeof value === "function") {
        initialNodes = await value(editor);
      } else if (value) {
        initialNodes = value;
      }
      if (!initialNodes || initialNodes?.length === 0) {
        initialNodes = editor.api.create.value();
      }
    }
    if (autoConnect) {
      await ctx.api.sharedb.connect();
    }
  }
}));

// src/react/ShareDBPlugin.ts
var ShareDBPlugin = toPlatePlugin(BaseOtPlugin);
export {
  ShareDBPlugin
};
//# sourceMappingURL=index.mjs.map