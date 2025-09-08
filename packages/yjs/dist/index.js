"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BaseYjsPlugin: () => BaseYjsPlugin,
  HocuspocusProviderWrapper: () => HocuspocusProviderWrapper,
  WebRTCProviderWrapper: () => WebRTCProviderWrapper,
  createProvider: () => createProvider,
  getProviderClass: () => getProviderClass,
  registerProviderType: () => registerProviderType,
  slateToDeterministicYjsState: () => slateToDeterministicYjsState,
  withPlateYjs: () => withPlateYjs,
  withTCursors: () => withTCursors,
  withTYHistory: () => withTYHistory,
  withTYjs: () => withTYjs
});
module.exports = __toCommonJS(index_exports);

// src/lib/BaseYjsPlugin.ts
var import_core5 = require("@slate-yjs/core");
var import_platejs = require("platejs");

// ../../node_modules/lib0/math.js
var floor = Math.floor;
var isNaN = Number.isNaN;

// ../../node_modules/lib0/set.js
var create = () => /* @__PURE__ */ new Set();

// ../../node_modules/lib0/array.js
var from = Array.from;
var isArray = Array.isArray;

// ../../node_modules/lib0/time.js
var getUnixTime = Date.now;

// ../../node_modules/lib0/map.js
var create2 = () => /* @__PURE__ */ new Map();
var setIfUndefined = (map, key, createT) => {
  let set = map.get(key);
  if (set === void 0) {
    map.set(key, set = createT());
  }
  return set;
};

// ../../node_modules/lib0/observable.js
var Observable = class {
  constructor() {
    this._observers = create2();
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  on(name, f) {
    setIfUndefined(this._observers, name, create).add(f);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  once(name, f) {
    const _f = (...args) => {
      this.off(name, _f);
      f(...args);
    };
    this.on(name, _f);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  off(name, f) {
    const observers = this._observers.get(name);
    if (observers !== void 0) {
      observers.delete(f);
      if (observers.size === 0) {
        this._observers.delete(name);
      }
    }
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */
  emit(name, args) {
    return from((this._observers.get(name) || create2()).values()).forEach((f) => f(...args));
  }
  destroy() {
    this._observers = create2();
  }
};

// ../../node_modules/lib0/object.js
var keys = Object.keys;
var length = (obj) => keys(obj).length;
var hasProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

// ../../node_modules/lib0/traits.js
var EqualityTraitSymbol = Symbol("Equality");

// ../../node_modules/lib0/function.js
var equalityDeep = (a, b) => {
  if (a === b) {
    return true;
  }
  if (a == null || b == null || a.constructor !== b.constructor) {
    return false;
  }
  if (a[EqualityTraitSymbol] != null) {
    return a[EqualityTraitSymbol](b);
  }
  switch (a.constructor) {
    case ArrayBuffer:
      a = new Uint8Array(a);
      b = new Uint8Array(b);
    // eslint-disable-next-line no-fallthrough
    case Uint8Array: {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      break;
    }
    case Set: {
      if (a.size !== b.size) {
        return false;
      }
      for (const value of a) {
        if (!b.has(value)) {
          return false;
        }
      }
      break;
    }
    case Map: {
      if (a.size !== b.size) {
        return false;
      }
      for (const key of a.keys()) {
        if (!b.has(key) || !equalityDeep(a.get(key), b.get(key))) {
          return false;
        }
      }
      break;
    }
    case Object:
      if (length(a) !== length(b)) {
        return false;
      }
      for (const key in a) {
        if (!hasProperty(a, key) || !equalityDeep(a[key], b[key])) {
          return false;
        }
      }
      break;
    case Array:
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (!equalityDeep(a[i], b[i])) {
          return false;
        }
      }
      break;
    default:
      return false;
  }
  return true;
};

// ../../node_modules/y-protocols/awareness.js
var Y = __toESM(require("yjs"), 1);
var outdatedTimeout = 3e4;
var Awareness = class extends Observable {
  /**
   * @param {Y.Doc} doc
   */
  constructor(doc) {
    super();
    this.doc = doc;
    this.clientID = doc.clientID;
    this.states = /* @__PURE__ */ new Map();
    this.meta = /* @__PURE__ */ new Map();
    this._checkInterval = /** @type {any} */
    setInterval(() => {
      const now = getUnixTime();
      if (this.getLocalState() !== null && outdatedTimeout / 2 <= now - /** @type {{lastUpdated:number}} */
      this.meta.get(this.clientID).lastUpdated) {
        this.setLocalState(this.getLocalState());
      }
      const remove = [];
      this.meta.forEach((meta, clientid) => {
        if (clientid !== this.clientID && outdatedTimeout <= now - meta.lastUpdated && this.states.has(clientid)) {
          remove.push(clientid);
        }
      });
      if (remove.length > 0) {
        removeAwarenessStates(this, remove, "timeout");
      }
    }, floor(outdatedTimeout / 10));
    doc.on("destroy", () => {
      this.destroy();
    });
    this.setLocalState({});
  }
  destroy() {
    this.emit("destroy", [this]);
    this.setLocalState(null);
    super.destroy();
    clearInterval(this._checkInterval);
  }
  /**
   * @return {Object<string,any>|null}
   */
  getLocalState() {
    return this.states.get(this.clientID) || null;
  }
  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState(state) {
    const clientID = this.clientID;
    const currLocalMeta = this.meta.get(clientID);
    const clock = currLocalMeta === void 0 ? 0 : currLocalMeta.clock + 1;
    const prevState = this.states.get(clientID);
    if (state === null) {
      this.states.delete(clientID);
    } else {
      this.states.set(clientID, state);
    }
    this.meta.set(clientID, {
      clock,
      lastUpdated: getUnixTime()
    });
    const added = [];
    const updated = [];
    const filteredUpdated = [];
    const removed = [];
    if (state === null) {
      removed.push(clientID);
    } else if (prevState == null) {
      if (state != null) {
        added.push(clientID);
      }
    } else {
      updated.push(clientID);
      if (!equalityDeep(prevState, state)) {
        filteredUpdated.push(clientID);
      }
    }
    if (added.length > 0 || filteredUpdated.length > 0 || removed.length > 0) {
      this.emit("change", [{ added, updated: filteredUpdated, removed }, "local"]);
    }
    this.emit("update", [{ added, updated, removed }, "local"]);
  }
  /**
   * @param {string} field
   * @param {any} value
   */
  setLocalStateField(field, value) {
    const state = this.getLocalState();
    if (state !== null) {
      this.setLocalState({
        ...state,
        [field]: value
      });
    }
  }
  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates() {
    return this.states;
  }
};
var removeAwarenessStates = (awareness, clients, origin) => {
  const removed = [];
  for (let i = 0; i < clients.length; i++) {
    const clientID = clients[i];
    if (awareness.states.has(clientID)) {
      awareness.states.delete(clientID);
      if (clientID === awareness.clientID) {
        const curMeta = (
          /** @type {MetaClientState} */
          awareness.meta.get(clientID)
        );
        awareness.meta.set(clientID, {
          clock: curMeta.clock + 1,
          lastUpdated: getUnixTime()
        });
      }
      removed.push(clientID);
    }
  }
  if (removed.length > 0) {
    awareness.emit("change", [{ added: [], updated: [], removed }, origin]);
    awareness.emit("update", [{ added: [], updated: [], removed }, origin]);
  }
};

// src/lib/BaseYjsPlugin.ts
var Y5 = __toESM(require("yjs"));

// src/utils/slateToDeterministicYjsState.ts
var import_core = require("@slate-yjs/core");
var Y2 = __toESM(require("yjs"));
async function slateToDeterministicYjsState(guid, initialNodes) {
  const deterministicClientId = await generateDeterministicClientId(
    guid,
    initialNodes
  );
  const tmp = new Y2.Doc({ guid });
  tmp.clientID = deterministicClientId;
  const delta = (0, import_core.slateNodesToInsertDelta)(initialNodes);
  const content = tmp.get("content", Y2.XmlText);
  content.applyDelta(delta);
  const initialUpdate = Y2.encodeStateAsUpdate(tmp);
  tmp.destroy();
  return initialUpdate;
}
function arrayBufferToClientId(buffer) {
  const dataView = new DataView(buffer);
  const int32 = dataView.getInt32(0, false);
  return Math.abs(int32) % 2147483647 + 1;
}
async function generateDeterministicClientId(guid, initialNodes) {
  const nodesString = JSON.stringify(initialNodes);
  const combinedString = `${guid}-${nodesString}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(combinedString);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  return arrayBufferToClientId(hashBuffer);
}

// src/lib/providers/hocuspocus-provider.ts
var import_provider = require("@hocuspocus/provider");
var HocuspocusProviderWrapper = class {
  _isConnected = false;
  _isSynced = false;
  onConnect;
  onDisconnect;
  onError;
  onSyncChange;
  provider;
  destroy = () => {
    if (this._isConnected) {
      this.provider.disconnect();
    }
  };
  disconnect = () => {
    if (this._isConnected) {
      this.provider.disconnect();
      this._isConnected = false;
      if (this._isSynced) {
        this._isSynced = false;
        this?.onSyncChange?.(false);
      }
    }
  };
  type = "hocuspocus";
  constructor({
    awareness,
    doc,
    options,
    onConnect,
    onDisconnect,
    onError,
    onSyncChange
  }) {
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;
    this.onSyncChange = onSyncChange;
    this.onError = onError;
    const providerOptions = {
      ...options,
      ...doc && { document: doc },
      ...awareness && { awareness },
      // Disable broadcast channel here - we'll manually handle connections
      broadcast: options.broadcast || false,
      onAwarenessChange: options.onAwarenessChange || (() => {
      }),
      onConnect: () => {
        this._isConnected = true;
        this.onConnect?.();
        options.onConnect?.();
      },
      onDisconnect: (data) => {
        this._isConnected = false;
        if (this._isSynced) {
          this._isSynced = false;
          this.onSyncChange?.(false);
        }
        this.onDisconnect?.();
        options.onDisconnect?.(data);
      },
      onSynced: (data) => {
        const wasSynced = this._isSynced;
        this._isSynced = true;
        if (!wasSynced) {
          this.onSyncChange?.(true);
        }
        options.onSynced?.(data);
      }
    };
    try {
      this.provider = new import_provider.HocuspocusProvider(providerOptions);
    } catch (error) {
      this.provider = new import_provider.HocuspocusProvider({
        ...providerOptions,
        connect: false
      });
      this.onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }
  connect() {
    try {
      void this.provider.connect();
    } catch (error) {
      this._isConnected = false;
    }
  }
  get awareness() {
    return this.provider.awareness;
  }
  get document() {
    return this.provider.document;
  }
  get isConnected() {
    return this._isConnected;
  }
  get isSynced() {
    return this._isSynced;
  }
};

// src/lib/providers/webrtc-provider.ts
var import_y_webrtc = require("y-webrtc");
var Y3 = __toESM(require("yjs"));
var WebRTCProviderWrapper = class {
  // Track connection and sync state
  _isConnected = false;
  _isSynced = false;
  doc;
  onConnect;
  onDisconnect;
  onError;
  onSyncChange;
  // Create a fallback awareness instance for when provider is null
  provider = null;
  connect = () => {
    if (this.provider) {
      try {
        this.provider.connect();
      } catch (error) {
        console.warn("[yjs] Error connecting WebRTC provider:", error);
      }
    }
  };
  destroy = () => {
    if (this.provider) {
      try {
        this.provider.destroy();
      } catch (error) {
        console.warn("[yjs] Error destroying WebRTC provider:", error);
      }
    }
  };
  disconnect = () => {
    if (this.provider) {
      try {
        this.provider.disconnect();
        const wasSynced = this._isSynced;
        this._isConnected = false;
        this._isSynced = false;
        if (wasSynced) {
          this.onSyncChange?.(false);
        }
      } catch (error) {
        console.warn("[yjs] Error disconnecting WebRTC provider:", error);
      }
    }
  };
  type = "webrtc";
  // Autoconnects when created
  constructor({
    awareness,
    doc,
    options,
    onConnect,
    onDisconnect,
    onError,
    onSyncChange
  }) {
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;
    this.onError = onError;
    this.onSyncChange = onSyncChange;
    this.doc = doc || new Y3.Doc();
    try {
      this.provider = new import_y_webrtc.WebrtcProvider(options.roomName, this.doc, {
        awareness,
        filterBcConns: options.filterBcConns,
        maxConns: options.maxConns,
        password: options.password,
        peerOpts: options.peerOpts,
        signaling: options.signaling
      });
      this.provider.on("status", (status) => {
        const wasConnected = this._isConnected;
        this._isConnected = status.connected;
        if (status.connected) {
          if (!wasConnected) {
            onConnect?.();
          }
          if (!this._isSynced) {
            this._isSynced = true;
            onSyncChange?.(true);
          }
        } else {
          if (wasConnected) {
            onDisconnect?.();
            if (this._isSynced) {
              this._isSynced = false;
              onSyncChange?.(false);
            }
          }
        }
      });
    } catch (error) {
      console.warn("[yjs] Error creating WebRTC provider:", error);
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }
  get awareness() {
    return this.provider.awareness;
  }
  get document() {
    return this.doc;
  }
  get isConnected() {
    return this._isConnected;
  }
  get isSynced() {
    return this._isSynced;
  }
};

// src/lib/providers/registry.ts
var providerRegistry = {
  hocuspocus: HocuspocusProviderWrapper,
  webrtc: WebRTCProviderWrapper
};
var registerProviderType = (type, providerClass) => {
  providerRegistry[type] = providerClass;
};
var getProviderClass = (type) => {
  return providerRegistry[type];
};
var createProvider = ({
  type,
  ...props
}) => {
  const ProviderClass = getProviderClass(type);
  if (!ProviderClass) {
    throw new Error(`Provider type "${type}" not found in registry`);
  }
  return new ProviderClass(props);
};

// src/lib/withPlateYjs.ts
var Y4 = __toESM(require("yjs"));

// src/lib/withTCursors.ts
var import_core2 = require("@slate-yjs/core");
var withTCursors = (editor, awareness, options) => (0, import_core2.withCursors)(editor, awareness, options);

// src/lib/withTYHistory.ts
var import_core3 = require("@slate-yjs/core");
var withTYHistory = (editor, options) => (0, import_core3.withYHistory)(editor, options);

// src/lib/withTYjs.ts
var import_core4 = require("@slate-yjs/core");
var withTYjs = (editor, sharedRoot, options) => (0, import_core4.withYjs)(editor, sharedRoot, options);

// src/lib/withPlateYjs.ts
var withPlateYjs = ({
  editor: e,
  getOptions
}) => {
  let editor = e;
  const { awareness, cursors, localOrigin, positionStorageOrigin, ydoc } = getOptions();
  const sharedType = ydoc.get("content", Y4.XmlText);
  editor = withTYjs(editor, sharedType, {
    autoConnect: false,
    localOrigin,
    positionStorageOrigin
  });
  if (cursors) {
    if (awareness) {
      let autoSend = true;
      if (cursors.autoSend === false) {
        autoSend = false;
      }
      editor = withTCursors(editor, awareness, {
        ...cursors,
        autoSend
      });
    } else {
      editor.api.debug.error(
        "Yjs plugin: Internal shared awareness (awareness) is missing but cursors are enabled."
      );
    }
  }
  return withTYHistory(editor);
};

// src/lib/BaseYjsPlugin.ts
var isProviderConfig = (item) => {
  return typeof item === "object" && item !== null && "type" in item && "options" in item;
};
var BaseYjsPlugin = (0, import_platejs.createTSlatePlugin)({
  key: import_platejs.KEYS.yjs,
  extendEditor: withPlateYjs,
  options: {
    _isConnected: false,
    _isSynced: false,
    _providers: [],
    awareness: null,
    cursors: {},
    localOrigin: null,
    positionStorageOrigin: null,
    providers: [],
    ydoc: null,
    onConnect: () => {
    },
    onDisconnect: () => {
    },
    onError: () => {
    },
    onSyncChange: () => {
    }
  }
}).extend(({ getOptions }) => {
  const { localOrigin, positionStorageOrigin, ...options } = getOptions();
  let { awareness, ydoc } = options;
  if (!ydoc) {
    ydoc = new Y5.Doc();
  }
  if (!awareness) {
    awareness = new Awareness(ydoc);
  }
  return {
    options: {
      awareness,
      localOrigin: localOrigin ?? void 0,
      positionStorageOrigin: positionStorageOrigin ?? void 0,
      ydoc
    }
  };
}).extendApi((ctx) => ({
  /**
   * Connect to all providers or specific provider types.
   *
   * @param type Optional provider type(s) to connect to. If not specified,
   *   connects to all providers.
   */
  connect: (type) => {
    const { getOptions } = ctx;
    const { _providers } = getOptions();
    const typesToConnect = type ? Array.isArray(type) ? type : [type] : null;
    _providers.forEach((provider) => {
      if (!typesToConnect || typesToConnect.includes(provider.type)) {
        try {
          provider.connect();
        } catch (error) {
          getOptions().onError?.({
            error: error instanceof Error ? error : new Error(String(error)),
            type: provider.type
          });
        }
      }
    });
  },
  /**
   * Disconnect from all providers or specific provider types. For WebRTC
   * providers, we should NOT disconnect on cleanup as it will clear the
   * awareness state. Instead, we'll let the providers handle their own
   * cleanup via their internal mechanisms.
   *
   * @param providerType Optional provider type(s) to disconnect from. If not
   *   specified, disconnects from all providers.
   */
  destroy: () => {
    const { editor, getOptions } = ctx;
    const { _providers } = getOptions();
    for (const provider of [..._providers].reverse()) {
      try {
        if (provider.isConnected) {
          provider.destroy();
        }
      } catch (error) {
        console.warn(
          `[yjs] Error disconnecting provider (${provider.type}):`,
          error
        );
      }
    }
    try {
      import_core5.YjsEditor.disconnect(editor);
    } catch (error) {
    }
  },
  /**
   * Disconnect from all providers or specific provider types. For WebRTC
   * providers, we should NOT disconnect on cleanup as it will clear the
   * awareness state. Instead, we'll let the providers handle their own
   * cleanup via their internal mechanisms.
   *
   * @param providerType Optional provider type(s) to disconnect from. If not
   *   specified, disconnects from all providers.
   */
  disconnect: (type) => {
    const { editor, getOptions } = ctx;
    const { _providers } = getOptions();
    const typesToDisconnect = type ? Array.isArray(type) ? type : [type] : null;
    for (const provider of [..._providers].reverse()) {
      try {
        if (provider.isConnected && (typesToDisconnect === null || typesToDisconnect.includes(provider.type))) {
          provider.disconnect();
        }
      } catch (error) {
        console.warn(
          `[yjs] Error disconnecting provider (${provider.type}):`,
          error
        );
      }
    }
  },
  /** Initialize yjs, providers connection and editor state. */
  init: async ({
    id,
    autoConnect = true,
    autoSelect,
    selection,
    value
  } = {}) => {
    const { editor, getOptions, setOption } = ctx;
    const options = getOptions();
    const {
      _providers,
      awareness,
      providers: providerConfigsOrInstances = [],
      ydoc
    } = options;
    if (providerConfigsOrInstances.length === 0) {
      throw new Error(
        "No providers specified. Please provide provider configurations or instances in the `providers` array."
      );
    }
    if (value !== null) {
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
      const initialDelta = await slateToDeterministicYjsState(
        id ?? editor.id,
        initialNodes
      );
      ydoc.transact(() => {
        Y5.applyUpdate(ydoc, initialDelta);
      });
    }
    const finalProviders = [];
    import_core5.YjsEditor.connect(editor);
    editor.tf.init({
      autoSelect,
      selection,
      // Skipped since YjsEditor.connect already normalizes the editor
      shouldNormalizeEditor: false,
      value: null
    });
    for (const item of providerConfigsOrInstances) {
      if (isProviderConfig(item)) {
        const { options: options2, type } = item;
        if (!options2) {
          console.warn(
            `[yjs] No options provided for provider type: ${type}`
          );
          continue;
        }
        try {
          const provider = createProvider({
            awareness,
            doc: ydoc,
            options: options2,
            type,
            onConnect: () => {
              getOptions().onConnect?.({ type });
              setOption("_isConnected", true);
            },
            onDisconnect: () => {
              getOptions().onDisconnect?.({ type });
              const { _providers: _providers2 } = getOptions();
              const hasConnectedProvider = _providers2.some(
                (provider2) => provider2.isConnected
              );
              if (!hasConnectedProvider) {
                setOption("_isConnected", false);
              }
            },
            onError: (error) => {
              getOptions().onError?.({ error, type });
            },
            onSyncChange: (isSynced) => {
              getOptions().onSyncChange?.({ isSynced, type });
              setOption("_isSynced", isSynced);
            }
          });
          finalProviders.push(provider);
        } catch (error) {
          console.warn(
            `[yjs] Error creating provider of type ${type}:`,
            error
          );
        }
      } else {
        const customProvider = item;
        if (customProvider.document !== ydoc) {
          console.warn(
            `[yjs] Custom provider instance (${customProvider.type}) has a different Y.Doc. This may cause synchronization issues. Ensure custom providers use the shared Y.Doc.`
          );
        }
        if (customProvider.awareness !== awareness) {
          console.warn(
            `[yjs] Custom provider instance (${customProvider.type}) has a different Awareness instance. Ensure custom providers use the shared Awareness instance for cursor consistency.`
          );
        }
        finalProviders.push(customProvider);
      }
    }
    if (finalProviders.length === 0) {
      console.warn(
        "[yjs] No providers were successfully created or provided."
      );
    }
    setOption("_providers", finalProviders);
    if (autoConnect) {
      _providers.forEach((provider) => {
        try {
          provider.connect();
        } catch (error) {
          getOptions().onError?.({
            error: error instanceof Error ? error : new Error(String(error)),
            type: provider.type
          });
        }
      });
    }
  }
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseYjsPlugin,
  HocuspocusProviderWrapper,
  WebRTCProviderWrapper,
  createProvider,
  getProviderClass,
  registerProviderType,
  slateToDeterministicYjsState,
  withPlateYjs,
  withTCursors,
  withTYHistory,
  withTYjs
});
//# sourceMappingURL=index.js.map