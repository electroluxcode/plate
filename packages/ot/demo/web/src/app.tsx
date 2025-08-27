import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { createEditor, BaseEditor, Descendant, Editor, Operation, Element, Text } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';
import ReconnectingWebSocket from 'reconnecting-websocket';

// 统一使用require导入ShareDB和OT类型以避免类型问题
// @ts-ignore
import ShareDB from 'sharedb/lib/client';
// @ts-ignore
import ottype from 'ottype-slate-test';

// 简化的队列处理类
class SimpleQueue {
  private queue: Array<() => Promise<void> | void> = [];
  private processing = false;

  enqueue(task: () => Promise<void> | void) {
    this.queue.push(task);
    this.process();
  }

  private async process() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        try {
          await task();
        } catch (error) {
          console.error('队列任务执行失败:', error);
        }
      }
    }

    this.processing = false;
  }
}

// 定义自定义Element类型
type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};

type CustomText = {
  text: string;
};

// 扩展Editor类型
interface CustomEditor extends BaseEditor, ReactEditor, HistoryEditor {
  doc?: any;
  localPresence?: any;
}

// 注册OT类型 - 确保在组件外部注册，只执行一次
console.log('Registering OT type:', ottype.type);
ShareDB.types.register(ottype.type);

// 操作提交函数
async function submitOp(doc: any, operations: Operation[]) {
  // 直接检查doc的状态，不依赖外部的isConnected状态
  if (!doc || !doc.type) {
    console.warn('跳过操作提交 - 文档未准备好:', {
      hasDoc: !!doc,
      docType: doc?.type,
      docData: doc?.data ? 'exists' : 'missing'
    });
    return;
  }

  // 过滤掉selection操作，只同步内容操作
  const contentOps = operations.filter((op: Operation) => op.type !== 'set_selection');
  
  if (contentOps.length === 0) {
    console.log('跳过操作提交 - 无内容操作');
    return;
  }

  console.log('提交本地操作:', contentOps, '文档状态:', {
    type: doc.type,
    version: doc.version,
    hasData: !!doc.data
  });

  return new Promise<void>((resolve, reject) => {
    // 提交操作到ShareDB - 不传入source参数，让ShareDB自动处理
    doc.submitOp(contentOps, (error: any) => {
      if (error) {
        console.error('提交操作失败:', error, contentOps);
        reject(error);
      } else {
        console.log('操作提交成功:', contentOps);
        resolve();
      }
    });
  });
}

// 创建编辑器实例的工厂函数
function createCollaborativeEditor(doc: any) {
  const queue = new SimpleQueue();
  const editor = withReact(withHistory(createEditor() as CustomEditor));

  // 保存原始的apply方法到editor实例上
  const { apply: originalApply } = editor;
  (editor as any).originalApply = originalApply;
  
  // 重写apply方法来拦截所有操作
  editor.apply = (operation: Operation) => {
    const operations = Array.isArray(operation) ? operation : [operation];
    
    console.log('Editor.apply 调用:', operations);

    // // 异步处理操作提交，避免阻塞编辑器
    Promise.resolve().then(() => {
      queue.enqueue(() => submitOp(doc, operations));
    });

    // 立即应用操作到编辑器
    operations.forEach(op => originalApply(op));
  };

  // 存储文档引用
  editor.doc = doc;

  return editor;
}

const CollaborativeEditor: React.FC = () => {
  const initialValue: Descendant[] = useMemo(() => [
    {
      type: 'paragraph',
      children: [{ text: '正在连接服务器...' }]
    } as ParagraphElement
  ], []);

  const [initialValueState, setInitialValueState] = useState<Descendant[]>(initialValue);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [editor, setEditor] = useState<CustomEditor | null>(null);
  const [doc, setDoc] = useState<any>(null);

  const renderElement = useCallback((props: any) => {
    const { attributes, children, element } = props;
    
    switch (element.type) {
      case 'paragraph':
        return <p {...attributes}>{children}</p>;
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <span {...props.attributes}>{props.children}</span>;
  }, []);

  // 连接ShareDB
  useEffect(() => {
    const connectToShareDB = async () => {
      try {
        console.log('开始连接ShareDB服务器...');
        const socket = new ReconnectingWebSocket('ws://localhost:8111');
        const connection = new ShareDB.Connection(socket as any);
        
        // 添加连接事件监听
        socket.addEventListener('open', () => {
          console.log('WebSocket连接已建立');
        });
        
        socket.addEventListener('error', (error) => {
          console.error('WebSocket连接错误:', error);
        });
        
        const shareDoc = connection.get('documents', 'slate-demo');
        console.log('获取文档实例:', shareDoc);

        // 订阅文档
        shareDoc.subscribe((error: any) => {
          if (error) {
            console.error('ShareDB subscription error:', error);
            setLoading(false);
            return;
          }

          console.log('成功订阅文档');
          console.log('文档:', shareDoc);
          
          // 确保文档已经完全准备好
          if (!shareDoc.type || shareDoc.version === undefined) {
            console.warn('文档还未完全准备好，等待...');
            return;
          }

          console.log('文档准备就绪，开始初始化编辑器');
          setIsConnected(true);
          setLoading(false);
          setDoc(shareDoc);

          // 检查文档数据结构 - 提取children数组
          let documentContent = null;
          if (shareDoc.data && shareDoc.data.children && Array.isArray(shareDoc.data.children) && shareDoc.data.children.length > 0) {
            documentContent = shareDoc.data.children;
            console.log('提取到的文档内容:', documentContent);
          } else {
            console.warn('文档children数据为空或无效:', shareDoc.data);
          }

          if (documentContent) {
            console.log('设置初始文档数据:', documentContent);
            setInitialValueState(documentContent);
          } else {
            console.log('使用默认初始值');
          }

          // 创建协作编辑器实例 - 确保在文档准备好后创建
          console.log('创建协作编辑器实例...');
          const collaborativeEditor = createCollaborativeEditor(shareDoc);
          setEditor(collaborativeEditor);
          console.log('编辑器创建完成');
          
          // 操作队列和防抖处理，优化性能
          let opsQueue: Operation[] = [];
          const updateOps = () => {
            if (opsQueue.length === 0) return;
            
            console.log('批量处理远程操作:', opsQueue);
            Editor.withoutNormalizing(collaborativeEditor, () => {
              opsQueue.forEach((operation: Operation) => {
                try {
                  (collaborativeEditor as any).originalApply(operation);
                } catch (error) {
                  console.error('应用远程操作时出错:', error, operation);
                }
              });
            });
            opsQueue = [];
          };
          
          // 使用防抖处理，避免频繁更新
          let debouncedTimeoutId: NodeJS.Timeout | null = null;
          const debouncedUpdateOps = () => {
            if (debouncedTimeoutId) clearTimeout(debouncedTimeoutId);
            debouncedTimeoutId = setTimeout(() => {
              updateOps();
              debouncedTimeoutId = null;
            }, 100); // 100ms防抖延迟
          };

          // 清理函数
          const cleanup = () => {
            if (debouncedTimeoutId) {
              clearTimeout(debouncedTimeoutId);
              debouncedTimeoutId = null;
            }
          };
          
          // 监听远程操作 - 重要：正确处理source参数
          shareDoc.on('op', (operations: Operation[], source: any) => {
            // 关键：本地操作source为truthy，远程操作source为falsy
            // 跳过本地操作，只处理远程操作
            if (source) {
              console.log('忽略本地操作，source:', source);
              return;
            }

            console.log('接收到远程操作:', operations, 'source:', source);
            
            // 将远程操作加入队列，使用防抖处理
            const ops = Array.isArray(operations) ? operations : [operations];
            opsQueue.push(...ops);
            debouncedUpdateOps();
          });

          // 返回清理函数供useEffect使用
          return cleanup;
        });

      } catch (error) {
        console.error('连接ShareDB失败:', error);
        setLoading(false);
        return () => {}; // 返回空清理函数
      }
    };

    let documentCleanup: (() => void) | null = null;
    connectToShareDB().then(cleanup => {
      documentCleanup = cleanup || (() => {});
    });

    return () => {
      if (doc && doc.connection) {
        console.log('关闭ShareDB连接');
        doc.connection.close();
      }
      if (documentCleanup) {
        documentCleanup();
      }
    };
  }, []);

  // 暴露编辑器到全局，便于调试
  (window as any).editor = editor;
  (window as any).doc = doc;

  if (loading || !editor) {
    return (
      <div >
        loading
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        marginBottom: '20px', 
        padding: '12px', 
        background: isConnected ? '#d4edda' : '#f8d7da',
        border: `1px solid ${isConnected ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '6px',
        color: isConnected ? '#155724' : '#721c24'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
          连接状态: {isConnected ? '✅ 已连接到协作服务器' : '❌ 连接失败'}
        </div>
        {isConnected && (
          <div style={{ fontSize: '13px', opacity: 0.8 }}>
            🔄 实时同步已启用 • 多人协作功能正常
          </div>
        )}
      </div>

      <div style={{ 
        border: '2px solid #e9ecef', 
        borderRadius: '8px', 
        padding: '16px', 
        minHeight: '320px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Slate 
          editor={editor} 
          initialValue={initialValueState || initialValue}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="开始输入内容，体验多人实时协作编辑功能..."
            style={{
              outline: 'none',
              minHeight: '280px',
              fontSize: '16px',
              lineHeight: '1.6'
            }}
          />
        </Slate>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
        <p>📝 这是一个Slate协作编辑器MVP演示</p>
        <p>🚀 打开多个浏览器窗口测试实时协作功能</p>
        <p>🔧 基于ShareDB + OT实现的实时同步</p>
        {!isConnected && (
          <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
            ⚠️ 请确保服务器正在运行 (npm run server)
          </p>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', padding: '20px 0', margin: 0, color: '#333' }}>
        Slate 协作编辑器 MVP
      </h1>
      <CollaborativeEditor />
    </div>
  );
};

export default App;