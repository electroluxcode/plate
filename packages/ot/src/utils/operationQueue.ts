import type { Operation } from 'slate';

/**
 * 操作队列配置
 */
export interface OperationQueueOptions {
  /** 防抖延迟（毫秒） */
  debounceMs?: number;
  /** 最大批次大小 */
  maxBatchSize?: number;
}

/**
 * 操作队列类 - 用于批处理和防抖操作提交
 */
export class OperationQueue {
  private queue: Operation[] = [];
  private processing = false;
  private timeoutId: NodeJS.Timeout | null = null;
  private options: Required<OperationQueueOptions>;

  constructor(
    private submitFn: (operations: Operation[]) => Promise<void>,
    options: OperationQueueOptions = {}
  ) {
    this.options = {
      debounceMs: 100,
      maxBatchSize: 50,
      ...options,
    };
  }

  /**
   * 添加操作到队列
   */
  enqueue(operations: Operation | Operation[]) {
    const ops = Array.isArray(operations) ? operations : [operations];
    
    // 过滤掉选择操作
    const contentOps = ops.filter(op => op.type !== 'set_selection');
    if (contentOps.length === 0) {
      return;
    }

    this.queue.push(...contentOps);

    // 如果队列达到最大大小，立即处理
    if (this.queue.length >= this.options.maxBatchSize) {
      this.processImmediately();
    } else {
      this.scheduleProcess();
    }
  }

  /**
   * 立即处理队列
   */
  private processImmediately() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.process();
  }

  /**
   * 计划处理队列（防抖）
   */
  private scheduleProcess() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      this.process();
    }, this.options.debounceMs);
  }

  /**
   * 处理队列
   */
  private async process() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    try {
      const operations = this.queue.splice(0, this.options.maxBatchSize);
      await this.submitFn(operations);
    } catch (error) {
      console.error('Failed to process operation queue:', error);
    } finally {
      this.processing = false;

      // 如果还有操作在队列中，继续处理
      if (this.queue.length > 0) {
        this.scheduleProcess();
      }
    }
  }

  /**
   * 清空队列
   */
  clear() {
    this.queue = [];
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * 获取队列大小
   */
  get size() {
    return this.queue.length;
  }

  /**
   * 检查是否正在处理
   */
  get isProcessing() {
    return this.processing;
  }
} 