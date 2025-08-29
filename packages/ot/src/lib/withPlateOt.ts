import type { ExtendEditor } from 'platejs';
import type { Operation } from 'slate';

import type { OtConfig } from './types';
import { castArray } from './util';

/**
 * 扩展编辑器以支持 OT 功能
 */
export const withPlateOt: ExtendEditor<OtConfig> = ({ editor, getOptions }) => {
  const originalApply = editor.apply as (operation: Operation) => void;

  // 保存真正的原始 apply 方法供远程操作使用
  (editor as any).originalApply = originalApply;
  
  // 用于标记是否正在应用远程操作
  // 重写 apply 方法来拦截本地操作
  editor.apply = async(operation: Operation, ) => {
    const options = getOptions();
    
    // 先应用操作到编辑器
    originalApply(operation);

    if (options.debug) {
      console.log('🔄 OT: Applying remote operation:', operation);
    }
    
    // 如果连接已建立，提交操作到 ShareDB
    if (options._status === 'connected' && options._doc) {
      // 过滤选择操作（ShareDB 不需要处理选择变化）
      if (operation.type === 'set_selection') {
        return;
      }

      const opFormat = castArray(operation);
      
      if (options.debug) {
        console.log('📝 OT: Submitting local operation:', opFormat);
      }
      
      // 异步提交操作，不阻塞编辑器
      submitOpToShareDB(options._doc, opFormat, options.debug).catch((error: any) => {
        if (options.debug) {
          console.error('❌ OT: Failed to submit operation:', error);
        }
        options.onError?.(error);
      });
    }
  };

  // 为远程操作提供专用的应用方法
  (editor as any).applyRemoteOperations = (operations: Operation[]) => {
    const options = getOptions();
    
    if (options.debug) {
      console.log('📨 OT: Applying remote operations:', operations);
    }
    
    try {
      operations.forEach(op => {
        originalApply(op);
      });
    } catch (error) {
      if (options.debug) {
        console.error('💥 OT: Failed to apply remote operation:', error);
      }
      throw error;
    } 
  };

  return editor;
};

/**
 * 提交操作到 ShareDB 的辅助函数
 */
async function submitOpToShareDB(doc: any, operations: Operation[], debug?: boolean): Promise<void> {
  if (!doc) return;

  try {
    await new Promise<void>((resolve, reject) => {
      const filteredOps = operations.filter(op => op && op.type !== 'set_selection');
      
      if (filteredOps.length === 0) {
        resolve();
        return;
      }

      if (debug) {
        console.log('📤 OT: Submitting operations to ShareDB:', filteredOps);
      }

      // 使用 source: false 标识这是本地操作
      doc.submitOp(filteredOps, { source: false }, (error: any) => {
        if (error) {
          if (debug) {
            console.error('❌ OT: ShareDB operation submit failed:', error);
          }
          reject(error);
        } else {
          if (debug) {
            console.log('✅ OT: Operation submitted to ShareDB successfully');
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