import type { Operation, Descendant, Element } from 'slate';
import type { OtStatus } from '../lib/types';

/**
 * 检查操作是否为内容操作（非选择操作）
 */
export function isContentOperation(operation: Operation): boolean {
  return operation.type !== 'set_selection';
}

/**
 * 过滤出内容操作
 */
export function filterContentOperations(operations: Operation[]): Operation[] {
  return operations.filter(isContentOperation);
}

/**
 * 检查文档是否已准备好进行操作
 */
export function isDocumentReady(doc: any, status: OtStatus): boolean {
  return !!(doc?.type && status === 'ready');
}

/**
 * 创建默认的文档内容
 */
export function createDefaultDocument(): Descendant[] {
  return [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    } as Element,
  ];
}

/**
 * 安全地执行异步操作，带有错误处理
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  onError?: (error: any) => void
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    if (onError) {
      onError(error);
    } else {
      console.error('异步操作失败:', error);
    }
    return null;
  }
}

/**
 * 延迟执行函数
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 记录操作的详细信息（用于调试）
 */
export function logOperation(operation: Operation, prefix = '操作'): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${prefix}:`, {
      type: operation.type,
      path: 'path' in operation ? operation.path : undefined,
      properties: 'properties' in operation ? operation.properties : undefined,
      newProperties: 'newProperties' in operation ? operation.newProperties : undefined,
      text: 'text' in operation ? operation.text : undefined,
      offset: 'offset' in operation ? operation.offset : undefined,
    });
  }
}

/**
 * 记录文档状态信息（用于调试）
 */
export function logDocumentState(doc: any, prefix = '文档状态'): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${prefix}:`, {
      type: doc?.type,
      version: doc?.version,
      hasData: !!doc?.data,
      dataLength: doc?.data ? JSON.stringify(doc.data).length : 0,
    });
  }
} 