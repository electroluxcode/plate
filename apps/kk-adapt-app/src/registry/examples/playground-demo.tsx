'use client';

import * as React from 'react';

import { ShareDBPlugin } from '@platejs/sharedb/react';
import {TrailingBlockPlugin} from '@platejs/utils'
import { KEYS, NormalizeTypesPlugin } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';

import { useLocale } from '@/hooks/useLocale';
import { getI18nValues } from '@/i18n/getI18nValues';
import { EditorKit } from '@/registry/components/editor/editor-kit';
import { CopilotKit } from '@/registry/components/editor/plugins/copilot-kit';
import { Editor, EditorContainer } from '@/registry/ui/editor';

import { joinRoom } from './kk-adapt-hooks/roomManage';

const CONFIG = {
  authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ==.eyJpc3MiOjY2MTk5MjczNzcyMzMyMjM2OSwiZXhwIjoxNzU4ODU2MDM3LCJzdWIiOiJKc29uIFdlYiBUb2tlbiIsImF1ZCI6bnVsbCwibmJmIjpudWxsLCJpYXQiOjE3NTYyNjQwMzcsImp0aSI6ODE5MTY0NTAzODE5NTc1Mjk4LCJjdXMiOnsiZGV2aWNlX2lkIjoiMTI3YzkxOGZhNDZjNjQ3OGFjY2M3MTRiZjFjZDRmZjQ0YWYxMTc0OGE1MmZiNDU0YmMzNmQ2YzU0YzNmN2NjMiIsInRlbmFudF9pZCI6MTgwNzA3MDAwNzUwNzd9fQ==.e7e3be516f5e272ccfbe0261a38ab97267e08140af81dd67a527423292acde37",
  fileId :"814862095570853888"
}

export default function PlaygroundDemo({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const locale = useLocale();
  console.log("log-test:", locale)
  const [isOtReady, setIsOtReady] = React.useState(false);
  const [socket, setSocket] = React.useState<any>(null);  

  const editor = usePlateEditor(
    {
      override: {
        enabled: {
          [KEYS.copilot]: id === 'copilot',
          // [KEYS.indent]: id !== 'listClassic',
          // [KEYS.list]: id !== 'listClassic',
          [KEYS.listClassic]: true,
          sharedb: true, // 启用 sharedb 插件
        },
      },
      plugins: [
        ...CopilotKit,
        ...EditorKit,
        TrailingBlockPlugin.configure({
          options: {
            type: 'p', // 段落块
            filter: (node: any) => {
              // 当 listStyleType 是 "disc" 时触发
              const shouldTrigger = node?.[0]?.listStyleType === 'disc' || node?.[0]?.listStyleType === 'decimal';
              return shouldTrigger;
            }
          },
        }),

        // sharedb 协作编辑插件 - 简化配置
        ShareDBPlugin.configure({
          enabled: true,
          options: {
            debug: true,
            enablePresence: false,
            onConnect: () => {
              console.log('✅ sharedb: Connected to ShareDB server');
              console.log('🎉 sharedb: Ready for collaborative editing!');
              setIsOtReady(true);
            },
            onDisconnect: () => {
              console.log('❌ sharedb: Disconnected from ShareDB server');
              console.log('💡 sharedb: Make sure ShareDB server is running on ws://localhost:8111');
              setIsOtReady(false);
            },
            onError: (error: any) => {
              console.error('🚨 sharedb Error:', error);
              console.error('🔍 sharedb Error details:', {
                code: error?.code,
                message: error?.message,
                stack: error?.stack,
                type: error?.type
              });
              setIsOtReady(false);
            },
            onStatusChange: (status: any) => {
              console.log('🔄 sharedb Status changed:', status);
              
              // 添加状态特定的提示
              switch(status) {
                case 'connected': {
                  console.log('🌟 sharedb: Successfully connected to ShareDB!');
                  break;
                }
                case 'connecting': {
                  console.log('📡 sharedb: Attempting to connect to ws://localhost:8111...');
                  break;
                }
                case 'disconnected': {
                  console.log('⚠️ sharedb: Connection lost. Check if ShareDB server is running.');
                  break;
                }
                case 'error': {
                  console.log('💥 sharedb: Connection error occurred.');
                  break;
                }
              }
            },
          },
        }),

        NormalizeTypesPlugin.configure({
          enabled: id === 'forced-layout',
          options: {
            rules: [{ path: [0], strictType: 'h1' }],
          },
        }),

      ],
      // 重要：使用 sharedb 时需跳过默认初始化
      
      skipInitialization: true,
    },
    []
  );



  // 初始化 sharedb 连接
  React.useEffect(() => {
    const initOtConnection = async () => {
      try {
        if (!editor?.api?.sharedb) {
          console.error("❌ PlaygroundDemo: Editor sharedb API not available");
          return;
        }
        
        // 使用新的 init 方法初始化 sharedb 插件
        await (editor.api.sharedb as any).init({
          id: '814862095570853888', // 文档 ID
          autoConnect: true, // 自动连接
          collection: 'documents', // 文档集合
          reconnection: {
            enabled: true,
            interval: 3000,
            maxRetries: 5,
          },
          url: 'wss://teamshare-document-service.t.cn-shenzhen.aliyun.kkgroup.work/ws?authorization=eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ==.eyJpc3MiOjY2MTk5MjczNzcyMzMyMjM2OSwiZXhwIjoxNzU3NTk5NzEyLCJzdWIiOiJKc29uIFdlYiBUb2tlbiIsImF1ZCI6bnVsbCwibmJmIjpudWxsLCJpYXQiOjE3NTUwMDc3MTIsImp0aSI6ODEzODk1MDk2NjQyOTI4NjQyLCJjdXMiOnsiZGV2aWNlX2lkIjoiZTAzZDhlM2IyMDE4NWJjOGU0Y2U2ZjdhYzY3NGRkOGM5ZmE0MmU1ZjEwMTFiNDJhZjVhMWVkMjhmOTM0MzU2OSIsInRlbmFudF9pZCI6MTgwNzA3MDAwNzUwNzd9fQ==.4b718417bfab65fba157f2f8f2e6d5e84f3ae5d8a23bf4a84f8f4240823eb7e5&organization_code=DT001', // ShareDB 服务器地址
          value: getI18nValues(locale).playground, // 初始值（仅在文档为空时使用）
        });

        const options = editor.api.sharedb.getCtx().getOptions()
        console.log("initOtConnection-test-zptest111", options)
        setSocket(options._socket)
        joinRoom(options._socket, { authorization: CONFIG.authorization, fileId: CONFIG.fileId })
        console.log('✅ PlaygroundDemo: sharedb plugin initialized successfully');
      } catch (error) {
        console.error('❌ PlaygroundDemo: Failed to initialize sharedb plugin:', error);
      }
    };

    initOtConnection();

    // 清理：组件卸载时断开连接
    return () => {
      if (editor?.api?.sharedb) {
        editor.api.sharedb.disconnect();
      }
    };
  }, [editor, locale]);

  // 添加全局编辑器引用（用于调试）
  React.useEffect(() => {
    (window as any).editor = editor;
  }, [editor]);

  // 显示加载状态
  if (!isOtReady) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <div>正在连接协作服务器...</div>
        </div>
      </div>
    );
  }
  
  // hack: 第1个入口(禁止删除)
  return (
    <Plate editor={editor}>
      <EditorContainer className={className}>
        <Editor
          variant="demo"
          className="pb-[20vh]"
          placeholder="Type something..."
          spellCheck={false}
        />
      </EditorContainer>
    </Plate>
  );
}
