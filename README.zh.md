# @tomiaa/monitor.js

[English README](./README.md)

`@tomiaa/monitor.js` 是一个浏览器端监控面板组件，用来展示 `FPS`、`JS Heap Memory` 和 `DOM Nodes`。

这个项目最初来源于 `eruda-monitor`。原始版本是依赖 `eruda` 运行的调试面板插件，只能作为 `eruda` 的一个工具页使用。现在已经改造成一个独立的单文件包，不再依赖 `eruda`，而是可以直接挂载到任意 DOM 节点下使用。

## 现在的包是什么

当前包名是 `@tomiaa/monitor.js`。

当前产物是单文件 `monitor.js`，适合两种场景：

- 通过 npm 安装，在项目中作为浏览器端监控组件使用
- 通过 CDN 或直接引入构建产物，在页面中直接挂载使用

## 和原始 eruda 插件的区别

- 原始包是 `eruda` 插件，需要先加载 `eruda`
- 现在的包是独立监控面板，不需要 `eruda`
- 原始包挂在 `eruda` 工具栏内部
- 现在的包通过传入 `target` 直接挂载到指定 DOM 元素
- 原始包偏向移动端调试工具扩展
- 现在的包更适合作为页面内嵌的性能监控小组件

## 使用方式

### npm 使用

安装包：`npm install @tomiaa/monitor.js`

```js
import createMonitor from '@tomiaa/monitor.js'

createMonitor({
  target: document.getElementById('monitor'),
})
```

### CDN 使用

```html
<div id="monitor"></div>
<script src="https://unpkg.com/@tomiaa/monitor.js@latest/monitor.js"></script>
<script>
  erudaMonitor({
    target: document.getElementById('monitor'),
  })
</script>
```
