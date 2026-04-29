# eruda-monitor

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![License][license-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/eruda-monitor.svg
[npm-url]: https://npmjs.org/package/eruda-monitor
[ci-image]: https://img.shields.io/github/actions/workflow/status/liriliri/eruda-monitor/main.yml?branch=master&style=flat-square
[ci-url]: https://github.com/liriliri/eruda-monitor/actions/workflows/main.yml 
[license-image]: https://img.shields.io/npm/l/eruda-monitor.svg

Single-file monitor widget for fps, memory and dom nodes.

## Demo

Browse it on your phone: 
[https://eruda.liriliri.io/?plugin=monitor](https://eruda.liriliri.io/?plugin=monitor)

## Install

```bash
npm install eruda-monitor --save-dev
```

```javascript
import createMonitor from '@tomiaa/monitor.js'

createMonitor({
  target: document.getElementById('monitor'),
})
```

Or load the built single file directly:

```html
<script src="./monitor.js"></script>
<script>
  erudaMonitor({
    target: document.getElementById('monitor'),
  })
</script>
```