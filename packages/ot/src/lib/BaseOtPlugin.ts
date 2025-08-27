import {
  createTSlatePlugin,
  type ExtendEditor,
} from 'platejs';
import type { Operation } from 'slate';
import { Editor } from 'slate';

import { type OtConfig, type OtOptions, type OtStatus } from './types';
import { withPlateOt } from './withPlateOt';

export const BaseOtPlugin = createTSlatePlugin<OtConfig>({
  key: 'ot',
  extendEditor: withPlateOt,
  options: {
    sharedb: {
      url: 'ws://localhost:8111',
      collection: 'documents',
      documentId: 'slate-demo',
      reconnection: {
        enabled: true,
        interval: 3000,
        maxRetries: 5,
      },
    },
    debug: false,
    enablePresence: false,
    _status: 'disconnected' as OtStatus,
    _doc: null,
    _connection: null,
    _socket: null,
    _operationQueue: [],
    _processingQueue: false,
  } as OtOptions & {
    _status: OtStatus;
    _doc: any;
    _connection: any;
    _socket: any;
    _operationQueue: (() => Promise<void> | void)[];
    _processingQueue: boolean;
  },
}).extendApi((ctx) => ({
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

    try {
      setOption('_status', 'connecting');
      options.onStatusChange?.('connecting');

      // 动态导入 ShareDB 相关模块
      const [{ default: ShareDB }, { default: ReconnectingWebSocket }] = await Promise.all([
        import('sharedb/lib/client'),
        import('reconnecting-websocket'),
      ]);

      // 创建 WebSocket 连接
      const socket = new ReconnectingWebSocket(options.sharedb.url, [], {
        maxRetries: options.sharedb.reconnection?.maxRetries || 5,
        connectionTimeout: 5000,
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
            reject(error);
            return;
          }

          setOption('_status', 'connected');
          
          options.onStatusChange?.('connected');

          // 设置初始值
          if (doc.data?.children && Array.isArray(doc.data.children)) {
            options.onConnect?.({
              initialValue: doc.data?.children || []
            });
          }else{
            options.onConnect?.({
              initialValue: []
            });
          }

          resolve();
        });
      });

      // 监听远程操作
      doc.on('op', (operations: Operation[], source: any) => {
        if (source) {
          // 忽略本地操作
          return;
        }

        if (options.debug) {
          console.log('Receiving remote operations:', operations);
        }

        // 应用远程操作 - 直接调用本地函数而不是 API
        applyRemoteOperations(editor, operations);
      });

      // 监听连接状态
      socket.addEventListener('open', () => {
        if (options.debug) {
          console.log('WebSocket connected');
        }
      });

      socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
        setOption('_status', 'error');
        options.onError?.(error);
        options.onStatusChange?.('error');
      });

      socket.addEventListener('close', () => {
        if (options.debug) {
          console.log('WebSocket disconnected');
        }
        setOption('_status', 'disconnected');
        options.onDisconnect?.();
        options.onStatusChange?.('disconnected');
      });

    } catch (error) {
      console.error('Failed to connect to ShareDB:', error);
      setOption('_status', 'error');
      options.onError?.(error);
      options.onStatusChange?.('error');
      throw error;
    }
  },

  /**
   * 断开连接
   */
  disconnect: () => {
    const { getOptions, setOption } = ctx;
    const options = getOptions();

    if (options._connection) {
      options._connection.close();
      setOption('_connection', null);
    }

    if (options._socket) {
      options._socket.close();
      setOption('_socket', null);
    }

    setOption('_doc', null);
    setOption('_status', 'disconnected');
    options.onDisconnect?.();
    options.onStatusChange?.('disconnected');
  },

  /**
   * 获取连接状态
   */
  getStatus: (): OtStatus => {
    const options = ctx.getOptions();
    return options._status;
  },

  /**
   * 提交操作到 ShareDB
   */
  submitOperation: async (operations: Operation[]): Promise<void> => {
    const { getOptions } = ctx;
    const options = getOptions();

    if (!options._doc || options._status !== 'connected') {
      if (options.debug) {
        console.warn('Cannot submit operation - not connected');
      }
      return;
    }

    // 过滤掉选择操作
    const contentOps = operations.filter(op => op.type !== 'set_selection');
    if (contentOps.length === 0) {
      return;
    }

    return new Promise<void>((resolve, reject) => {
      options._doc.submitOp(contentOps, (error: any) => {
        if (error) {
          console.error('Failed to submit operation:', error);
          reject(error);
        } else {
          if (options.debug) {
            console.log('Operation submitted successfully:', contentOps);
          }
          resolve();
        }
      });
    });
  },

  /**
   * 应用远程操作
   */
  applyRemoteOperation: (operations: Operation[]) => {
    const { editor } = ctx;
    applyRemoteOperations(editor, operations);
  },
}));

/**
 * 应用远程操作的辅助函数
 */
function applyRemoteOperations(editor: any, operations: Operation[]) {
  // 使用 Editor.withoutNormalizing 确保操作批量处理
  Editor.withoutNormalizing(editor, () => {
    operations.forEach((operation) => {
      try {
        // 应用操作但不触发本地变更事件
        const originalApply = (editor as any).originalApply;
        if (originalApply) {
          originalApply(operation);
        } else {
          editor.apply(operation);
        }
      } catch (error) {
        console.error('Failed to apply remote operation:', error, operation);
      }
    });
  });
} 