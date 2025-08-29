import type { Descendant } from 'slate';
import type { PluginConfig } from 'platejs';

/**
 * ShareDB 重连配置
 */
export interface ShareDBReconnection {
  /** 是否启用重连 */
  enabled?: boolean;
  /** 重连间隔（毫秒） */
  interval?: number;
  /** 最大重连次数 */
  maxRetries?: number;
}

/**
 * ShareDB 配置
 */
export interface ShareDBConfig {
  /** WebSocket 服务器地址 */
  url: string;
  /** 文档集合名 */
  collection: string;
  /** 文档 ID */
  documentId: string;
  /** 重连配置 */
  reconnection?: ShareDBReconnection;
}

/**
 * OT 初始化选项
 */
export interface OtInitOptions {
  /** 文档 ID，如果未提供则使用 editor.id */
  id?: string;
  /** ShareDB 服务器 URL */
  url?: string;
  /** 文档集合名 */
  collection?: string;
  /** 初始文档值，仅当远程文档为空时应用 */
  value?: Descendant[] | string | ((editor: any) => Descendant[] | Promise<Descendant[]>);
  /** 是否自动连接 */
  autoConnect?: boolean;
  /** 重连配置 */
  reconnection?: ShareDBReconnection;
}

/**
 * OT 插件选项
 */
export interface OtOptions {
  /** ShareDB 配置（用于默认值，实际使用 init 方法传递） */
  sharedb?: ShareDBConfig;
  /** 是否启用在线状态 */
  enablePresence?: boolean;
  /** 调试模式 */
  debug?: boolean;
  /** 自定义事件回调 */
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: any) => void;
  onStatusChange?: (status: OtStatus) => void;
}

/**
 * OT 连接状态
 */
export type OtStatus = 'disconnected' | 'connecting' | 'connected' | 'ready' | 'error';

/**
 * OT 插件配置
 */
export type OtConfig = PluginConfig<
  'ot',
  OtOptions & {
    /** 当前连接状态 */
    _status: OtStatus;
    /** ShareDB 文档实例 */
    _doc: any;
    /** ShareDB 连接实例 */
    _connection: any;
    /** WebSocket 实例 */
    _socket: any;
    /** 操作队列 */
    _operationQueue: (() => Promise<void> | void)[];
    /** 是否正在处理操作队列 */
    _processingQueue: boolean;
  },
  {
    /** 初始化连接和文档 */
    init: (options?: OtInitOptions) => Promise<void>;
    /** 连接到 ShareDB */
    connect: () => Promise<void>;
    /** 断开连接 */
    disconnect: () => void;
    /** 获取当前状态 */
    getStatus: () => OtStatus;
    /** 提交操作到 ShareDB */
    submitOp: (operations: any[]) => Promise<void>;
    /** 应用远程操作 */
    applyRemoteOperation: (operations: any[]) => void;
  }
>; 