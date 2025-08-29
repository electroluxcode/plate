import type { ShareDBConfig } from '../lib/types';

/**
 * 创建 ShareDB 客户端连接
 */
export async function createShareDBClient(config: ShareDBConfig) {
  const [{ default: ShareDB }, { default: ReconnectingWebSocket }] = await Promise.all([
    import('sharedb/lib/client'),
    import('reconnecting-websocket'),
  ]);

  // 创建 WebSocket 连接
  const socket = new ReconnectingWebSocket(config.url, [], {
    maxRetries: config.reconnection?.maxRetries || 5,
    connectionTimeout: 5000,
    reconnectionDelayGrowFactor: 1.3,
    maxReconnectionDelay: 10_000,
    minReconnectionDelay: config.reconnection?.interval || 3000,
  });

  // 创建 ShareDB 连接
  const connection = new ShareDB.Connection(socket as any);
  
  // 获取文档
  const doc = connection.get(config.collection || 'documents', config.documentId);

  return {
    socket,
    connection,
    doc,
  };
}

