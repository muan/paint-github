const states = new WeakMap()
const histories = new WeakMap()

class PaintCanvasElement extends HTMLElement {
  constructor() {
    super()

    const shadowRoot = this.attachShadow({mode: 'open'})
    shadowRoot.innerHTML = `<canvas></canvas>`
    const canvas = shadowRoot.querySelector('canvas')

    states.set(this, {
      drawing: false,
      color: "#000000",
      bgcolor: "#ffffff",
      size: 10,
      canvas,
      context: canvas.getContext('2d')
    })

    histories.set(this, {
      log: [],
      currentEntry: [],
      currentStep: 0
    })
  }

  static get observedAttributes() {
    return ['height', 'width', 'color', 'size', 'bgcolor']
  }

  get canvas() {
    return states.get(this).canvas
  }

  get height() {
    return Number(this.getAttribute('height'))
  }

  set height(value) {
    this.setAttribute('height', value)
  }

  get width() {
    return Number(this.getAttribute('width'))
  }

  set width(value) {
    this.setAttribute('width', value)
  }

  get color() {
    return this.getAttribute('color')
  }

  set color(value) {
    this.setAttribute('color', value)
  }

  get size() {
    return Number(this.getAttribute('size'))
  }

  set size(value) {
    this.setAttribute('size', value)
  }

  get bgcolor() {
    return this.getAttribute('bgcolor')
  }

  set bgcolor(value) {
    this.setAttribute('bgcolor', value)
  }

  get isDrawing() {
    return this.hasAttribute('drawing')
  }

  set isDrawing(value) {
    value ? this.setAttribute('drawing', '') : this.removeAttribute('drawing')
  }

  undo() {
    const history = histories.get(this)
    const {currentStep} = history
    redraw(this, currentStep - 1)
  }

  redo() {
    const history = histories.get(this)
    const {currentStep} = history
    redraw(this, currentStep + 1)
  }

  clear() {
    const {canvas, context, bgcolor, width, height} = states.get(this)
    canvas.style.width = `${width}px`
    canvas.width = Number(width) * window.devicePixelRatio
    canvas.style.height = `${height}px`
    canvas.height = Number(height) * window.devicePixelRatio

    context.scale(window.devicePixelRatio, window.devicePixelRatio)
    context.beginPath()
    context.fillStyle = bgcolor
    context.fillRect(0, 0, width, height)
    context.closePath()
  }

  reset() {
    this.clear()
    const history = histories.get(this)
    history.log = []
    history.currentStep = 0
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    const state = states.get(this)
    if (attr === 'height') {
      state.height = newValue
      redraw(this)
    }
    if (attr === 'width') {
      state.width = newValue
      redraw(this)
    }
    if (attr === 'color') state.color = newValue
    if (attr === 'size') state.size = newValue
    if (attr === 'bgcolor') {
      state.bgcolor = newValue
      redraw(this)
    }
  }

  connectedCallback() {
    this.addEventListener('mousedown', startDrawing)
    this.addEventListener('touchstart', startDrawing)
    this.addEventListener('mouseup', stopDrawing)
    this.addEventListener('touchcancel', stopDrawing)
    this.addEventListener('mouseleave', stopDrawing)
    this.addEventListener('touchend', stopDrawing)
    this.addEventListener('touchmove', draw)
    this.addEventListener('mousemove', draw)
    this.addEventListener('keydown', historyControl)
    this.setAttribute('tabindex', '0')
  }
}

function historyControl(event) {
  if (event.key.toLowerCase() !== 'z' || (!event.metaKey && !event.ctrlKey)) return
  event.shiftKey ? event.currentTarget.redo() : event.currentTarget.undo()
}

function redraw(element, toStep) {
  const {context} = states.get(element)
  const history = histories.get(element)
  const {log} = history
  const destination = toStep === undefined ? history.currentStep : Math.max(Math.min(toStep, log.length), 0)
  let start
  if (toStep && history.currentStep <= destination) {
    start = history.currentStep
  } else {
    element.clear()
    start = 0
  }
  for (const entry of log.slice(start, destination)) {
    for (const [from, to, color, size] of entry) {
      context.lineJoin = 'round'
      context.lineCap = 'round'
      context.lineWidth = size
      context.strokeStyle = color
      context.beginPath()
      context.moveTo(...from)
      context.lineTo(...to)
      context.stroke()
      context.closePath()
    }
  }
  if (history.currentStep !== destination) {
    history.currentStep = destination
    element.dispatchEvent(new CustomEvent('paint-canvas:history-step', {
      bubbles: true,
      detail: history
    }))
  }
}

function startDrawing(event) {
  if (event.touches && event.touches.length > 1) return
  if (event.touches) event.preventDefault()
  state = states.get(event.currentTarget)
  state.drawing = true
  event.currentTarget.isDrawing = true
}

function stopDrawing(event) {
  if (event.touches && event.touches.length > 1) return
  if (event.touches) event.preventDefault()
  const state = states.get(event.currentTarget)
  const history = histories.get(event.currentTarget)
  draw(event)

  if (history.currentEntry.length > 0) {
    // Rewrite history if we are not at the latest step
    if (history.currentStep !== history.log.length) {
      history.log = history.log.slice(0, history.currentStep)
    }
    history.log.push(history.currentEntry)
    history.currentStep = history.log.length
    event.currentTarget.dispatchEvent(new CustomEvent('paint-canvas:history-change', {
      bubbles: true,
      detail: history
    }))
  }
  history.currentEntry = []

  state.drawing = false
  event.currentTarget.isDrawing = false
  state.lastX = null
  state.lastY = null
}

function draw(event) {
  if (event.touches && event.touches.length > 1) return
  if (event.touches) event.preventDefault()
  const state = states.get(event.currentTarget)
  const history = histories.get(event.currentTarget)
  const {drawing, canvas, context, color, size, lastX, lastY} = state
  if (!drawing) return

  const {offsetX, offsetY} = event
  const from = [lastX || offsetX, lastY || offsetY]
  const to = [offsetX, offsetY]
  history.currentEntry.push([from, to, color, size])
  context.lineJoin = 'round'
  context.lineCap = 'round'
  context.lineWidth = size
  context.strokeStyle = color
  context.beginPath()
  context.moveTo(...from)
  context.lineTo(...to)
  context.stroke()
  context.closePath()

  state.lastX = offsetX
  state.lastY = offsetY
}


window.customElements.define('paint-canvas', PaintCanvasElement)
window.PaintCanvasElement = PaintCanvasElement
