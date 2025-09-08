

# 1. 适配文件分层清单

## 1.1 业务层 demo

`apps/plate-editor/src/registry/examples/playground-demo.tsx`

`apps/plate-editor/src/registry/components/editor/plugins/sharedb-kit.tsx`

## 1.2 业务层 基础包

`apps/plate-editor/package.json`

```
"vite": "^5.2.0",
"vite-plugin-dts": "^3.9.0",
"vite-plugin-imp": "^2.4.0",
"@rollup/plugin-commonjs": "^25.0.7",
"@rollup/plugin-node-resolve": "^15.2.3",
"@vitejs/plugin-react": "^4.2.1"
```

`apps/plate-editor/vite.config.ts`

`apps/plate-editor/main.ts`

`apps/plate-editor/app.ts`

`apps/plate-editor/src/registry/ui/block-draggable.tsx`


## 1.3 业务层 路由/套件

`apps/plate-editor/src/kk-adapt-plugin-kit.tsx`

`apps/plate-editor/index.html`


## 1.4 导出层级

`apps/plate-editor/src/kk-adapt-export.ts`


# 2. 适配功能清单



1. '@platejs/utils-custom'
    1. ->TrailingBlockPlugin 添加 match 功能
2.  sharedb ot 逻辑 
3. draggle 添加 "+" 添加元素 设计

# 3. 开发者须知

## 3.1 仓库

建议各个开发者开发时候拥有如下仓库

- 后端(见`packages/sharedb/demo/server`): 用来模拟后端
- plate：修复基础功能和做适配层。
- teamshare 最小demo: 因为teamshare版本太老了，很容易出问题。因此最好自己抽离一个小版本验证



# 5. 项目时间线

## 5.1 mvp版本

这一部分的目的在于用plate重构前端云文档插件协同逻辑和核心hooks
构建 mvp 版本

1. 编写sharedb插件(原来的plate并没有sharedb相关的逻辑) ✅
2. 编写后端最小mvp用于测试 ✅
3. 初步接入协同系统
    1. ot 逻辑注册进 sharedb ✅
    2. 房间成员管理 
    3. 鼠标协作逻辑.
    4. 引入心跳 ✅
4. 编写上游协同逻辑(为了能够跟踪上游plate的更新)。构建打包策略
5. 天书测试环境构建新路由，引入mvp版本

## 5.2 新文档组件功能增强

这一部份的目的在于对于我们原来功能 云文档有的功能 而 plate 的插件做扩展。
其中包含两个方面。适配和增强。

适配的含义是: 后续新增的数据都会用plate的组件，但是之前的组件数据结构 也会得到保持并且渲染
适配的组件包括：
1. 资源文件： 图片/视频/音频/文件。这部分其实plate插件有，但是需要针对我们的场景做适配
2. 列表
    2.1 有序
    2.2 无序
    2.3 待办
3. 超链接
4. mention： @组件
5. 引用
6. 代码块
7. 分栏
8. ai组件
9. 表格

增强的含义是: 针对于旧云文档有，但是platejs本身不支持的组件做插件引入
增强的组件包括
1. 流程图
2. uml 图
3. 文本绘图
4. 公式

## 5.3 新文档业务逻辑适配

1. 评论
2. 页宽
3. 历史记录
4. 只读模式: 用于知识库预览等场景
5. 语音速记
6. 国际化
7. 离线模式

