# @tomiaa/monitor.js

[中文说明](./README.zh.md)

`@tomiaa/monitor.js` is a browser-side monitor panel component that displays `FPS`, `JS Heap Memory`, and `DOM Nodes`.

This project started from `eruda-monitor`. The original package was an `eruda` plugin that only worked inside the `eruda` tool panel. It has now been converted into an independent single-file package that no longer depends on `eruda` and can be mounted directly into any DOM element.

## What This Package Is

The current package name is `@tomiaa/monitor.js`.

The current build output is a single file named `monitor.js`, which is suitable for two common scenarios:

- Install from npm and use it as a browser-side monitor widget in your project
- Load the built file from a CDN or static assets and mount it directly in a page

## Differences From The Original eruda Plugin

- The original package was an `eruda` plugin and required `eruda` to be loaded first
- The current package is a standalone monitor panel and does not require `eruda`
- The original package was rendered inside the `eruda` tools UI
- The current package mounts directly into a target DOM element via `target`
- The original package was mainly designed as a mobile debugging extension
- The current package is better suited as an embeddable in-page performance widget

## Usage

### npm

Install the package: `npm install @tomiaa/monitor.js`

```js
import createMonitor from '@tomiaa/monitor.js'

createMonitor({
  target: document.getElementById('monitor'),
})
```

### CDN

```html
<div id="monitor"></div>
<script src="https://unpkg.com/@tomiaa/monitor.js@latest/monitor.js"></script>
<script>
  erudaMonitor({
    target: document.getElementById('monitor'),
  })
</script>
```
