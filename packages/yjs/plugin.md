### 插件的 .extend 写插件的初始化逻辑, 

传参可以直接拿到 `getOptions`, 类似于 class 的 `contructor`
这部分校验 ws 是否 存在，做一些数据校验 和 兜底


### .extendApi

可以 简单 划分生命周期为 
connect -> init ->  destroy/disconnect


特别需要注意的是 `init` 的这个生命周期
init 中 我们将 数据获取
然后在 YjsEditor.connect(editor as any); 中 将 editor.children 直接赋值 （麻了）


### 鼠标定位 

options 中传递
cursors: {
    data: {
        name: '张三',
        color: '#ff6b6b',
    },
}

然后在 render: {
    afterEditable: RemoteCursorOverlay,
},中渲染 。这里我们可以考虑在 直接用原生的方式传递鼠标事件就好了