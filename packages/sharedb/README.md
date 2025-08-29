# @platejs/sharedb

基于 ShareDB 的 Plate 实时协作编辑插件。

## 特性

- **实时协作**：基于 [ShareDB](https://github.com/share/sharedb) 的 sharedb（Operational Transformation）实时协作
- **自动重连**：内置断线重连机制
- **类型安全**：完整的 TypeScript 支持
- **简单集成**：参考 YJS 插件设计，提供简洁的 API

## 安装

```bash
npm install @platejs/sharedb
```

## 快速开始

### 1. 添加插件

```tsx
import { ShareDBPlugin } from '@platejs/sharedb/react';
import { createPlateEditor } from 'platejs/react';

const editor = createPlateEditor({
  plugins: [
    // ...其他插件
    ShareDBPlugin.configure({
      enabled: true,
      options: {
        debug: true, // 开启调试日志
        onConnect: ({ initialValue }) => {
          console.log('连接成功', initialValue);
        },
        onDisconnect: () => {
          console.log('连接断开');
        },
        onError: (error) => {
          console.error('连接错误', error);
        },
        onStatusChange: (status) => {
          console.log('状态变化', status);
        },
      },
    }),
  ],
  // 重要：使用 sharedb 时需跳过默认初始化
  skipInitialization: true,
});
```

### 2. 初始化连接

```tsx
import React, { useEffect } from 'react';

function MyEditor() {
  const editor = usePlateEditor(/* ... */);

  useEffect(() => {
    const initOt = async () => {
      try {
        await editor.api.sharedb.init({
          id: 'my-document-id',           // 文档唯一标识
          url: 'ws://localhost:8111',     // ShareDB 服务器地址
          collection: 'documents',        // 文档集合名
          value: [                        // 初始内容（仅在文档为空时使用）
            {
              type: 'p',
              children: [{ text: 'Hello World!' }]
            }
          ],
          autoConnect: true,              // 自动连接
          reconnection: {                 // 重连配置
            enabled: true,
            interval: 3000,
            maxRetries: 5,
          },
        });
      } catch (error) {
        console.error('sharedb 初始化失败:', error);
      }
    };

    initOt();

    // 清理：组件卸载时断开连接
    return () => {
      editor.api.sharedb.disconnect();
    };
  }, [editor]);

  return (
    <Plate editor={editor}>
      <Editor />
    </Plate>
  );
}
```

### 3. 启动 ShareDB 服务器

创建一个简单的 ShareDB 服务器：

```javascript
// server.js
const http = require('node:http');
const WebSocketServer = require('ws').Server;
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const ottype = require('ottype-slate-test');

// 注册 Slate sharedb 类型
ShareDB.types.register(ottype.type);

const backend = new ShareDB();
const server = http.createServer();
const wss = new WebSocketServer({ server: server, port: 8111 });

wss.on('connection', function(ws) {
  const stream = new WebSocketJSONStream(ws);
  backend.listen(stream);
});

server.listen(8111, () => {
  console.log('ShareDB server running on ws://localhost:8111');
});
```

运行服务器：

```bash
node server.js
```

## API 参考

### `editor.api.sharedb.init(options)`

初始化 sharedb 连接和文档状态。

**参数：**

- `id?: string` - 文档唯一标识，默认使用 `editor.id`
- `url?: string` - ShareDB 服务器地址，默认 `'ws://localhost:8111'`
- `collection?: string` - 文档集合名，默认 `'documents'`
- `value?: Value | string | ((editor) => Value)` - 初始文档内容，仅在远程文档为空时应用
- `autoConnect?: boolean` - 是否自动连接，默认 `true`
- `reconnection?: object` - 重连配置

### `editor.api.sharedb.connect()`

手动连接到 ShareDB 服务器。

### `editor.api.sharedb.disconnect()`

断开与 ShareDB 服务器的连接。

### `editor.api.sharedb.getStatus()`

获取当前连接状态。

返回值：`'disconnected' | 'connecting' | 'connected' | 'ready' | 'error'`

## 配置选项

### ShareDBPlugin 选项

```tsx
ShareDBPlugin.configure({
  options: {
    debug?: boolean;              // 调试模式
    enablePresence?: boolean;     // 启用在线状态（暂未实现）
    onConnect?: (data: {          // 连接成功回调
      initialValue: Descendant[]
    }) => void;
    onDisconnect?: () => void;    // 断开连接回调
    onError?: (error: any) => void; // 错误回调
    onStatusChange?: (status: OtStatus) => void; // 状态变化回调
  },
});
```

## 最佳实践

### 1. 错误处理

```tsx
useEffect(() => {
  const initOt = async () => {
    try {
      await editor.api.sharedb.init({
        id: documentId,
        url: sharedbUrl,
        // ...其他配置
      });
    } catch (error) {
      // 处理初始化错误
      setError(error.message);
      // 可以尝试重新连接或显示错误信息给用户
    }
  };

  initOt();
}, []);
```

### 2. 连接状态管理

```tsx
const [connectionStatus, setConnectionStatus] = useState('disconnected');

const editor = usePlateEditor({
  plugins: [
    ShareDBPlugin.configure({
      options: {
        onStatusChange: (status) => {
          setConnectionStatus(status);
        },
      },
    }),
  ],
});

// 根据状态显示 UI
if (connectionStatus === 'connecting') {
  return <div>正在连接...</div>;
}
```

### 3. 多文档管理

```tsx
// 为不同文档创建不同的编辑器实例
const editor1 = usePlateEditor({
  id: 'editor-1', // 重要：每个编辑器要有唯一 ID
  // ...
});

const editor2 = usePlateEditor({
  id: 'editor-2',
  // ...
});

// 分别初始化不同的文档
useEffect(() => {
  editor1.api.sharedb.init({ id: 'doc-1' });
  editor2.api.sharedb.init({ id: 'doc-2' });
}, []);
```

## 故障排除

### 连接问题

1. **确保 ShareDB 服务器正在运行**
   ```bash
   node server.js
   # 应该显示: ShareDB server running on ws://localhost:8111
   ```

2. **检查 URL 配置**
   ```tsx
   // 确保 URL 正确
   await editor.api.sharedb.init({
     url: 'ws://localhost:8111', // 检查端口号
   });
   ```

3. **查看控制台日志**
   ```tsx
   ShareDBPlugin.configure({
     options: {
       debug: true, // 开启调试日志
     },
   });
   ```

### 类型错误

如果遇到 TypeScript 类型错误，可以临时使用类型断言：

```tsx
await (editor.api.sharedb as any).init({
  // ...配置
});
```

## 相关资源

- [ShareDB](https://github.com/share/sharedb) - 后端协作框架
- [ottype-slate-test](https://www.npmjs.com/package/ottype-slate-test) - Slate sharedb 类型定义
- [Plate Documentation](https://plate-rich-text.vercel.app/) - Plate 编辑器文档 