import type { Operation } from 'slate';

import {
  type Value,
  createTSlatePlugin,
} from 'platejs';

import type { OtConfig, OtInitOptions, OtOptions, OtStatus } from './types';

import { withPlateOt } from './withPlateOt';

export const BaseOtPlugin = createTSlatePlugin<OtConfig>({
  key: 'ot',
  extendEditor: withPlateOt,
  options: {
    _connection: null,
    _doc: null,
    _operationQueue: [],
    _processingQueue: false,
    _socket: null,
    _status: 'disconnected' as OtStatus,
    debug: false,
    enablePresence: false,
  } as OtOptions & {
    _connection: any;
    _doc: any;
    _operationQueue: (() => Promise<void> | void)[];
    _processingQueue: boolean;
    _socket: any;
    _status: OtStatus;
  },
}).extendApi((ctx) => ({
  /**
   * 应用远程操作
   */
  applyRemoteOperation: (operations: Operation[]) => {
    const { editor, getOptions } = ctx;
    const options = getOptions();

    try {
      // 使用原始 apply 方法避免循环
      const originalApply = (editor as any).originalApply || editor.apply;

      operations.forEach(op => {
        if (options.debug) {
          console.log('� OT: Applying remote operation:', op);
        }
        originalApply(op);
      });
    } catch (error) {
      if (options.debug) {
        console.error('💥 OT: Failed to apply remote operation:', error);
      }
      options.onError?.(error);
    }
  },

  /**
   * 连接到 ShareDB 服务器
   */
  connect: async () => {
    const { editor, getOptions, setOption } = ctx;
    const options = getOptions();

    if (options._status === 'connected' || options._status === 'connecting') {
      console.warn('Already connected or connecting');
      return;
    }

    if (!options.sharedb) {
      throw new Error('ShareDB configuration not found. Please call init() first.');
    }

    try {
      setOption('_status', 'connecting');
      options.onStatusChange?.('connecting');

      if (options.debug) {
        console.log('📡 OT: Connecting to ShareDB server...');
      }

      // 动态导入 ShareDB 相关模块
      const [{ default: ShareDB }, { default: ReconnectingWebSocket }] = await Promise.all([
        import('sharedb/lib/client'),
        import('reconnecting-websocket'),
      ]);

      // 注册 OT 类型
      if (!ShareDB.types.map.slate) {
        const { default: ottype } = await import('ottype-slate-test');
        ShareDB.types.register(ottype.type);
        
        if (options.debug) {
          console.log('📋 OT: Registered slate OT type');
        }
      }

      // 创建 WebSocket 连接
      const socket = new ReconnectingWebSocket(options.sharedb.url, [], {
        connectionTimeout: 5000,
        debug: options.debug,
        maxRetries: options.sharedb.reconnection?.maxRetries || 5,
      });

      // 创建 ShareDB 连接
      const connection = new ShareDB.Connection(socket as any);
      const doc = connection.get(options.sharedb.collection || 'documents', options.sharedb.documentId);

      // 设置连接引用
      setOption('_socket', socket);
      setOption('_connection', connection);
      setOption('_doc', doc);

      // 订阅文档
      await new Promise<void>((resolve, reject) => {
        doc.subscribe((error: any) => {
          if (error) {
            console.error('ShareDB subscription error:', error);
            setOption('_status', 'error');
            options.onError?.(error);
            reject(error as Error);
            return;
          }

          setOption('_status', 'connected');
          options.onStatusChange?.('connected');

          if (options.debug) {
            console.log('✅ OT: Connected to ShareDB server');
            console.log('📄 OT: Document data:', doc.data);
          }

          // 设置初始值
          const initialValue = doc.data?.children || [];
          options.onConnect?.({
            initialValue: initialValue
          });

          resolve();
        });
      });

      // 监听远程操作
      doc.on('op', (ops: any[], source: any) => {
        if (source === false) return; // 忽略本地操作

        if (options.debug) {
          console.log('📨 OT: Received remote operations:', ops);
        }

        // 应用远程操作
        (ctx.api as any).ot.applyRemoteOperation(ops);
      });

      // 监听连接状态
      socket.addEventListener('open', () => {
        if (options.debug) {
          console.log('🌐 OT: WebSocket connected');
        }
      });

      socket.addEventListener('close', () => {
        setOption('_status', 'disconnected');
        options.onStatusChange?.('disconnected');
        options.onDisconnect?.();
        
        if (options.debug) {
          console.log('❌ OT: WebSocket disconnected');
        }
      });

      socket.addEventListener('error', (event) => {
        setOption('_status', 'error');
        options.onStatusChange?.('error');
        options.onError?.(event);
        
        if (options.debug) {
          console.error('🚨 OT: WebSocket error:', event);
        }
      });

    } catch (error) {
      setOption('_status', 'error');
      options.onStatusChange?.('error');
      options.onError?.(error);
      
      if (options.debug) {
        console.error('💥 OT: Connection failed:', error);
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
      setOption('_socket', null);
    }

    if (options._connection) {
      options._connection.close();
      setOption('_connection', null);
    }

    setOption('_doc', null);
    setOption('_status', 'disconnected');
    options.onStatusChange?.('disconnected');
    options.onDisconnect?.();

    if (options.debug) {
      console.log('🔌 OT: Disconnected from ShareDB');
    }
  },

  /**
   * 获取当前连接状态
   */
  getStatus: (): OtStatus => {
    const { getOptions } = ctx;
    return getOptions()._status;
  },

  /**
   * 初始化 OT 连接和文档状态
   */
  init: async ({
    id,
    autoConnect = true,
    collection = 'documents',
    reconnection,
    url = 'ws://localhost:8111',
    value,
  }: OtInitOptions = {}) => {
    const { editor, getOptions, setOption } = ctx;
    const options = getOptions();

    // 使用 editor.id 作为默认文档 ID
    const documentId = id ?? editor.id;

    // 设置 ShareDB 配置
    const sharedbConfig = {
      collection,
      documentId,
      reconnection: {
        enabled: true,
        interval: 3000,
        maxRetries: 5,
        ...reconnection,
      },
      url,
    };

    // 更新插件配置
    setOption('sharedb', sharedbConfig);

    if (options.debug) {
      console.log('🔧 OT: Initializing with config:', sharedbConfig);
    }

    // 如果提供了初始值，先设置到编辑器
    if (value !== null && value !== undefined) {
      let initialNodes = value as any;
      
      if (typeof value === 'string') {
        initialNodes = editor.api.html.deserialize({
          element: value,
        }) as Value;
      } else if (typeof value === 'function') {
        initialNodes = await value(editor);
      } else if (value) {
        initialNodes = value;
      }
      
      if (!initialNodes || initialNodes?.length === 0) {
        initialNodes = editor.api.create.value();
      }

      // 初始化编辑器内容
      editor.tf.init({
        shouldNormalizeEditor: true,
        value: initialNodes,
      });
    }

    // 自动连接
    if (autoConnect) {
      await (ctx.api as any).ot.connect();
    }
  },

  /**
   * 提交操作到 ShareDB
   */
  submitOperation: async (operations: Operation[]): Promise<void> => {
    const { getOptions } = ctx;
    const options = getOptions();

    if (options._status !== 'connected' || !options._doc) {
      if (options.debug) {
        console.warn('⚠️ OT: Cannot submit operation - not connected');
      }
      return;
    }

    try {
      // 转换 Slate 操作为 ShareDB 操作
      const sharedbOps = operations.map(op => ({
        op: op,
        type: 'slate',
      }));

      await new Promise<void>((resolve, reject) => {
        options._doc.submitOp(sharedbOps, { source: false }, (error: any) => {
          if (error) {
            if (options.debug) {
              console.error('❌ OT: Failed to submit operation:', error);
            }
            reject(error as Error);
          } else {
            if (options.debug) {
              console.log('📤 OT: Operation submitted successfully');
            }
            resolve();
          }
        });
      });
    } catch (error) {
      if (options.debug) {
        console.error('💥 OT: Submit operation error:', error);
      }
      throw error;
    }
  },
})); 