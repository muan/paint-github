for (const file of ['paint-canvas-element.js', 'index.js']) {
  const script = document.createElement('script')
  script.setAttribute('type', 'module')
  script.setAttribute('src', chrome.extension.getURL(file))
  document.body.append(script)
}
