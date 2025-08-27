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
      // 异步提交操作，不阻塞编辑器
      setTimeout(() => {
        // 直接调用 submitOperation，避免循环引用
        submitOperationToShareDB(options._doc, [operation], options.debug).catch((error: any) => {
          if (options.debug) {
            console.error('Failed to submit operation:', error);
          }
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
  if (!doc) {
    if (debug) {
      console.warn('Cannot submit operation - no document');
    }
    return;
  }

  // 过滤掉选择操作
  const contentOps = operations.filter(op => op.type !== 'set_selection');
  if (contentOps.length === 0) {
    return;
  }

  return new Promise<void>((resolve, reject) => {
    doc.submitOp(contentOps, (error: any) => {
      if (error) {
        console.error('Failed to submit operation:', error);
        // reject(error);
      } else {
        if (debug) {
          console.log('Operation submitted successfully:', contentOps);
        }
        resolve();
      }
    });
  });
} 