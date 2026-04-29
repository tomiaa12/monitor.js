const raf = require('licia/raf')
const now = require('licia/now')
const LunaPerformanceMonitor = require('luna-performance-monitor').default

const STYLE_ID = 'eruda-monitor-style'
const ROOT_CLASS = 'eruda-monitor'
const DEFAULT_OPTIONS = {
  color: '#007bff',
  theme: 'light',
}

function injectStyle() {
  if (document.getElementById(STYLE_ID)) {
    return
  }

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent =
    require('./style.scss') +
    require('luna-performance-monitor/luna-performance-monitor.css')
  document.head.appendChild(style)
}

function createSection(className) {
  const el = document.createElement('div')
  el.className = className

  return el
}

function hasMemoryApi() {
  return (
    typeof performance !== 'undefined' &&
    performance.memory &&
    typeof performance.memory.usedJSHeapSize === 'number'
  )
}

class Monitor {
  constructor(options) {
    const mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options)

    if (!mergedOptions.target || mergedOptions.target.nodeType !== 1) {
      throw new Error('Monitor target must be a DOM element.')
    }

    this.options = mergedOptions
    this.target = mergedOptions.target
    this._fps = 0
    this._frames = 0
    this._fpsLoopId = null
    this._prevTime = 0
    this._isVisible = false

    injectStyle()
    this._mount()
    this.show()
  }
  show() {
    if (this._isVisible) {
      return this
    }

    this._isVisible = true
    this._startFpsLoop()
    this._fpsMonitor.start()
    this._domNodesMonitor.start()
    if (this._memoryMonitor) {
      this._memoryMonitor.start()
    }

    return this
  }
  hide() {
    if (!this._isVisible) {
      return this
    }

    this._isVisible = false
    this._stopFpsLoop()
    this._fpsMonitor.stop()
    this._domNodesMonitor.stop()
    if (this._memoryMonitor) {
      this._memoryMonitor.stop()
    }

    return this
  }
  destroy() {
    this.hide()
    this._fpsMonitor.destroy()
    this._domNodesMonitor.destroy()
    if (this._memoryMonitor) {
      this._memoryMonitor.destroy()
    }
    if (this._root.parentNode) {
      this._root.parentNode.removeChild(this._root)
    }
  }
  _mount() {
    const root = document.createElement('div')
    root.className = ROOT_CLASS + ' ' + ROOT_CLASS + '--' + this._getTheme()

    const fpsEl = createSection('eruda-monitor-fps')
    const memoryEl = createSection('eruda-monitor-memory')
    const domNodesEl = createSection('eruda-monitor-dom-nodes')

    root.appendChild(fpsEl)
    if (hasMemoryApi()) {
      root.appendChild(memoryEl)
    }
    root.appendChild(domNodesEl)

    this.target.appendChild(root)

    this._root = root
    this._initFps(fpsEl)
    if (hasMemoryApi()) {
      this._initMemory(memoryEl)
    }
    this._initDomNodes(domNodesEl)
  }
  _getColor() {
    return this.options.color
  }
  _getTheme() {
    return this.options.theme === 'dark' ? 'dark' : 'light'
  }
  _startFpsLoop() {
    if (this._fpsLoopId) {
      return
    }

    this._frames = 0
    this._fps = 0
    this._prevTime = now()

    const updateFPS = () => {
      this._frames++
      const time = now()

      if (time > this._prevTime + 1000) {
        this._fps = Math.round(
          (this._frames * 1000) / (time - this._prevTime)
        )
        this._prevTime = time
        this._frames = 0
      }

      this._fpsLoopId = raf(updateFPS)
    }

    this._fpsLoopId = raf(updateFPS)
  }
  _stopFpsLoop() {
    if (!this._fpsLoopId) {
      return
    }

    raf.cancel.call(window, this._fpsLoopId)
    this._fpsLoopId = null
  }
  _initFps(el) {
    this._fpsMonitor = new LunaPerformanceMonitor(el, {
      title: 'FPS',
      color: this._getColor(),
      smooth: false,
      theme: this._getTheme(),
      data: () => this._fps,
    })
  }
  _initMemory(el) {
    this._memoryMonitor = new LunaPerformanceMonitor(el, {
      title: 'Used JS heap size',
      unit: 'MB',
      color: this._getColor(),
      smooth: false,
      theme: this._getTheme(),
      data() {
        return (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)
      },
    })
  }
  _initDomNodes(el) {
    this._domNodesMonitor = new LunaPerformanceMonitor(el, {
      title: 'DOM Nodes',
      color: this._getColor(),
      smooth: false,
      theme: this._getTheme(),
      data() {
        if (!document.body) {
          return 0
        }

        return document.body.getElementsByTagName('*').length
      },
    })
  }
}

function createMonitor(options) {
  return new Monitor(options)
}

module.exports = createMonitor
module.exports.Monitor = Monitor
module.exports.default = createMonitor
