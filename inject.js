for (const file of ['paint-canvas-element.js', 'index.js']) {
  const script = document.createElement('script')
  script.setAttribute('type', 'module')
  script.setAttribute('src', (chrome || browser).runtime.getURL(file))
  document.body.append(script)
}
