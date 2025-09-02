import type { Operation } from 'slate';

import {
  createTSlatePlugin,
} from 'platejs';
import { Transforms } from "slate"

import type { OtConfig, OtInitOptions, OtOptions, OtStatus } from './types';

import { castArray } from './util';
import { withPlateOt } from './withPlateOt';

export const BaseOtPlugin = createTSlatePlugin<OtConfig>({
  key: 'sharedb',
  priority: 1000, // 设置较低优先级，确保在 NodeId 插件之后加载
  extendEditor: withPlateOt,
  options: {
    _connection: null,
    _doc: null,
    _operationQueue: [],
    _presence: null,
    _processingQueue: false,
    _socket: null,
    _status: 'disconnected' as OtStatus,
    debug: false,
    enablePresence: false,
  } as unknown as OtOptions & {
    _connection: any;
    _doc: any;
    _operationQueue: (() => Promise<void> | void)[];
    _presence: any;
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
      // 使用专用的远程操作应用方法，避免循环
      if ((editor as any).applyRemoteOperations) {
        (editor as any).applyRemoteOperations(operations);
      }
    } catch (error) {
      if (options.debug) {
        console.error('💥 sharedb: Failed to apply remote operation:', error);
      }
      options.onError?.(error);
    }
  },
  /**
   * @description 应用远程操作-不经过editor.apply
   * @param operations 
   */
  applyRemoteOperationWithoutEditor: (operations: Operation[]) => {
    const { editor } = ctx as any;
    const updateOp = () => {
      const opsQueue = castArray(operations)
      opsQueue.forEach(op => {
        Transforms.transform(editor as any, op)
      })
      editor.onChange()  
    }
    updateOp()
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
        console.log('📡 sharedb: Connecting to ShareDB server...');
      }

      // 动态导入 ShareDB 相关模块
      const [{ default: ShareDB }, { default: ReconnectingWebSocket }] = await Promise.all([
        import('sharedb-client-browser/dist/sharedb-client-umd.cjs'),
        import('reconnecting-websocket'),
      ]);

      // 注册 sharedb 类型
      if (!ShareDB.types.map.slate) {
        const { default: ottype } = await import('ottype-slate-test');
        ShareDB.types.register(ottype.type);
        
        if (options.debug) {
          console.log('📋 sharedb: Registered slate sharedb type');
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
  const presence = connection.getDocPresence(options.sharedb.collection || 'documents', options.sharedb.documentId)
      // 设置连接引用
      setOption('_presence', presence);
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
            console.log('✅ sharedb: Connected to ShareDB server');
            console.log('📄 sharedb: Document data:', doc.data);
          }

          // 设置初始值
          const initialValue = doc.data?.children || [{
            children: [{
              text: 'hello world',
            }],
            type: 'paragraph',
          }];
          editor.children = initialValue;
          options.onConnect?.();

          resolve();
        });
      });

      // 监听远程操作
      doc.on('op', (ops: any[], source: any) => {
        // 忽略本地操作的回显（source 为 false 表示是本地操作）
        if (source) {
          if (options.debug) {
            console.log('🔄 sharedb: Ignoring local operation echo');
          }
          return;
        }

        if (options.debug) {
          console.log('📨 sharedb: Received remote operations:', ops, 'from source:', source);
        }

        (ctx.api as any).sharedb.applyRemoteOperationWithoutEditor(ops);
      });

      // 监听连接状态
      socket.addEventListener('open', () => {
        if (options.debug) {
          console.log('🌐 sharedb: WebSocket connected');
        }
      });

      socket.addEventListener('close', () => {
        setOption('_status', 'disconnected');
        options.onStatusChange?.('disconnected');
        options.onDisconnect?.();
        
        if (options.debug) {
          console.log('❌ sharedb: WebSocket disconnected');
        }
      });

      socket.addEventListener('error', (event) => {
        setOption('_status', 'error');
        options.onStatusChange?.('error');
        options.onError?.(event);
        
        if (options.debug) {
          console.error('🚨 sharedb: WebSocket error:', event);
        }
      });

    } catch (error) {
      setOption('_status', 'error');
      options.onStatusChange?.('error');
      options.onError?.(error);
      
      if (options.debug) {
        console.error('💥 sharedb: Connection failed:', error);
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
      console.log('🔌 sharedb: Disconnected from ShareDB');
    }
  },

  getCtx: () => ctx,

  /**
   * 获取当前连接状态
   */
  getStatus: (): OtStatus => {
    const { getOptions } = ctx;
    return getOptions()._status;
  },

  /**
   * 初始化 sharedb 连接和文档状态
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
      console.log('🔧 sharedb: Initializing with config:', sharedbConfig);
    }

    // 如果提供了初始值，先设置到编辑器
    if (value !== null && value !== undefined) {
      let initialNodes = value as any;
      
      if (typeof value === 'string') {
        initialNodes = editor.api.html.deserialize({
          element: value,
        }) as any;
      } else if (typeof value === 'function') {
        initialNodes = await value(editor);
      } else if (value) {
        initialNodes = value;
      }
      
      if (!initialNodes || initialNodes?.length === 0) {
        initialNodes = editor.api.create.value();
      }

    }

    // 自动连接
    if (autoConnect) {
      await (ctx.api as any).sharedb.connect();
    }
  },

})); 