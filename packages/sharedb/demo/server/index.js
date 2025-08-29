const http = require('http');
const express = require('express');
const ShareDB = require('sharedb');
const WS = require('ws');
const ottype = require('ottype-slate-test');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

// 简化的OT类型定义 (生产环境应该使用完整的ottype-slate)
// const slateType = {
//   name: 'slate',
//   create: function(data) {
//     return data ? data : [{ type: 'paragraph', children: [{ text: '' }] }];
//   },
//   apply: function(data, op) {
//     // 简化的apply逻辑 - 生产环境需要完整的Slate操作处理
//     console.log('Applying operation:', op);
//     return data; // 临时返回原数据
//   },
//   transform: function(op1, op2, side) {
//     // 简化的transform逻辑 - 生产环境需要完整的操作转换
//     console.log('Transforming operations:', op1, op2, side);
//     return op1; // 临时返回op1
//   }
// };
// 注册OT类型
ShareDB.types.register(ottype.type);

// 创建ShareDB后端
const backend = new ShareDB({ presence: true });

// 创建初始文档
function createDoc(callback) {
  console.log('开始创建/检查文档...');
  const connection = backend.connect();
  const doc = connection.get('documents', 'slate-demo');
  
  doc.fetch(function(err) {
    if (err) {
      console.error('获取文档失败:', err);
      throw err;
    }
    
    console.log('文档获取成功，当前状态:', {
      type: doc.type,
      version: doc.version,
      dataExists: !!doc.data,
      hasChildren: !!(doc.data && doc.data.children),
      childrenLength: (doc.data && doc.data.children) ? doc.data.children.length : 0,
      data: doc.data
    });
    
    // 检查文档是否需要初始化 - 检查children数组是否为空
    const needsInit = doc.type === null || 
                     !doc.data || 
                     !doc.data.children || 
                     (Array.isArray(doc.data.children) && doc.data.children.length === 0);
    
    if (needsInit) {
      // 创建标准的Slate文档结构 - 只传递children内容
      const initialChildren = [
        {
          type: 'paragraph',
          children: [{ text: '欢迎使用Slate协作编辑器!' }]
        },
        {
          type: 'paragraph', 
          children: [{ text: '开始输入内容，体验实时协作功能...' }]
        }
      ];
      
      console.log('创建文档，初始children:', JSON.stringify(initialChildren, null, 2));
      
      if (doc.type === null) {
        // 文档不存在，创建新文档 - 使用children格式
        doc.create({ children: initialChildren }, 'slate', function(err) {
          if (err) {
            console.error('创建文档失败:', err);
            throw err;
          }
          console.log('文档创建成功，版本:', doc.version);
          console.log('文档数据:', JSON.stringify(doc.data, null, 2));
          callback();
        });
      } else {
        // 文档存在但children为空，删除并重新创建
        console.log('文档存在但children为空，重新创建...');
        doc.del(function(delErr) {
          if (delErr) {
            console.error('删除文档失败:', delErr);
            throw delErr;
          }
          doc.create({ children: initialChildren }, 'slate', function(createErr) {
            if (createErr) {
              console.error('重新创建文档失败:', createErr);
              throw createErr;
            }
            console.log('文档重新创建成功，版本:', doc.version);
            console.log('文档数据:', JSON.stringify(doc.data, null, 2));
            callback();
          });
        });
      }
      return;
    }
    
    console.log('文档已存在且有内容，跳过初始化');
    callback();
  });
}

// 启动服务器
function startServer() {
  console.log('开始启动服务器...');
  const app = express();
  const server = http.createServer(app);
  
  // 允许跨域
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
  // 基本路由
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Slate sharedb Server is running!',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });
  
  // WebSocket连接处理
  const wss = new WS.Server({ server });
  console.log('WebSocket服务器已创建');
  
  wss.on('connection', function(ws) {
    console.log('新的WebSocket连接已建立，总连接数:', wss.clients.size);
    
    ws.on('close', function() {
      console.log('WebSocket连接已关闭，剩余连接数:', wss.clients.size - 1);
    });
    
    ws.on('error', function(error) {
      console.error('WebSocket连接错误:', error);
    });
    
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });
  
  const PORT = process.env.PORT || 8111;
  server.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
    console.log(`📡 WebSocket服务运行在 ws://localhost:${PORT}`);
    console.log('📝 ShareDB后端已就绪');
    console.log(`🎯 OT类型: ${ottype.type.name || 'slate'}`);
  });
}

// 初始化并启动
createDoc(startServer);
