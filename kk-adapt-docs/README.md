## 1.云文档重构说明

> 为什么要重构？
旧文档适配于 slate 0.80 版本(3年前), 为了适配

### 1.1 仓库说明

- kk-adapt-app: 适配层 应用
- kk-adapt-plugin-kit 适配层 插件
- kk-adapt-export 定义需要 导出的组件和hook

### 1.2 core 说明


### 1.3 插件说明

见 
- sharedb
- 

## 2. 怎么启动

rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
rm yarn.lock

- 根路径 改成 `"dev": "turbo --filter=kk-adapt-app dev"`


## 3. 怎么扩展

