import type { ExtendEditor } from 'platejs';
import type { Operation } from 'slate';

import type { OtConfig } from './types';

/**
 * 扩展编辑器以支持 OT 功能
 */
export const withPlateOt: ExtendEditor<OtConfig> = ({ editor, getOptions }) => {
  const originalApply = editor.apply as (operation: Operation) => void;

  // 保存原始 apply 方法供远程操作使用
  (editor as any).originalApply = originalApply;

  // 重写 apply 方法来拦截本地操作
  editor.apply = (operation: Operation) => {
    const options = getOptions();
    
    // 先应用操作到编辑器
    originalApply(operation);

    // 如果连接已建立，提交操作到 ShareDB
    if (options._status === 'connected' && options._doc) {
      // 过滤选择操作（ShareDB 不需要处理选择变化）
      if (operation.type === 'set_selection') {
        return;
      }

      // 异步提交操作，不阻塞编辑器
      setTimeout(() => {
        submitOperationToShareDB(options._doc, [operation], options.debug).catch((error: any) => {
          if (options.debug) {
            console.error('❌ OT: Failed to submit operation:', error);
          }
          options.onError?.(error);
        });
      }, 0);
    }
  };

  return editor;
};

/**
 * 提交操作到 ShareDB 的辅助函数
 */
async function submitOperationToShareDB(doc: any, operations: Operation[], debug?: boolean): Promise<void> {
  if (!doc) return;

  try {
    // 转换 Slate 操作为 ShareDB 格式
    const sharedbOps = operations.map(op => ({
      type: 'slate',
      op: op,
    }));

    await new Promise<void>((resolve, reject) => {
      // 使用 source: false 标识这是本地操作
      doc.submitOp(sharedbOps, { source: false }, (error: any) => {
        if (error) {
          if (debug) {
            console.error('❌ OT: ShareDB operation submit failed:', error);
          }
          reject(error);
        } else {
          if (debug) {
            console.log('📤 OT: Operation submitted to ShareDB:', sharedbOps);
          }
          resolve();
        }
      });
    });
  } catch (error) {
    if (debug) {
      console.error('💥 OT: Submit operation error:', error);
    }
    throw error;
  }
} 