import {changeDpiBlob} from './node_modules/changedpi/src/index.js'

for (const tabContainer of document.querySelectorAll('tab-container.js-previewable-comment-form')) {
  const tabList = tabContainer.querySelector('[role=tablist]')
  const tabPanels = tabContainer.querySelectorAll('[role=tabpanel]')
  const newTab = tabContainer.querySelector('.js-preview-tab').cloneNode(true)
  const fileAttachment = tabContainer.querySelector('file-attachment')
  newTab.classList.remove('js-preview-tab')
  newTab.textContent = 'Draw'
  const newPanel = document.createElement('div')
  newPanel.setAttribute('role', 'tabpanel')
  const paintCanvas = generatePaintCanvas()
  newPanel.append(paintCanvas)
  newPanel.hidden = true
  tabPanels[tabPanels.length - 1].after(newPanel)
  tabList.append(newTab)

  const tools = document.createElement('div')
  tools.classList.add('paint-tools')

  const writeTab = tabContainer.querySelector('.js-write-tab')
  const uploadButton = document.createElement('button')
  uploadButton.classList.add('paint-button')
  uploadButton.textContent = 'Upload'
  uploadButton.type = 'button'

  uploadButton.addEventListener('click', () => {
    const attachment = tabContainer.querySelector('file-attachment')
    paintCanvas.canvas.toBlob(async function(blob) {
      const newBlob = await changeDpiBlob(blob, window.devicePixelRatio * 72)
      const file = new File([newBlob], 'paint.png', {type: 'image/png'})
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      writeTab.click()
      attachment.dispatchEvent(new DragEvent('drop', {
        dataTransfer
      }))
    })
  })

  const options = document.createElement('div')
  options.classList.add('paint-options')
  let defaultWidth = null
  const defaultHeight = 240
  const widthInputLabel = createInputLabel(paintCanvas, 'width', 'number', defaultWidth || 600)
  const heightInputLabel = createInputLabel(paintCanvas, 'height', 'number', defaultHeight)

  const imageLabel = document.createElement('label')
  imageLabel.classList.add('paint-button')
  const imageFile = document.createElement('input')
  imageLabel.textContent = 'Insert image'
  imageLabel.append(imageFile)
  imageFile.type = 'file'
  imageFile.hidden = true

  imageFile.addEventListener('change', event => {
    createImageBitmap(imageFile.files[0]).then(bitmap => {
      const context = paintCanvas.canvas.getContext('2d')
      const height = bitmap.height * (defaultWidth/bitmap.width)
      paintCanvas.width = defaultWidth
      paintCanvas.height = height
      widthInputLabel.querySelector('input').value = paintCanvas.width
      heightInputLabel.querySelector('input').value = paintCanvas.height
      context.drawImage(bitmap, 0, 0, paintCanvas.width, paintCanvas.height)
    })
  })

  options.append(createInputLabel(paintCanvas, 'color', 'color', '#666666'))
  options.append(createInputLabel(paintCanvas, 'bgcolor', 'color', '#f0f0f0'))
  options.append(createInputLabel(paintCanvas, 'size', 'number', 3))
  options.append(widthInputLabel)
  options.append(heightInputLabel)
  tools.append(uploadButton)
  tools.append(imageLabel)
  tools.append(options)
  newPanel.prepend(tools)

  tabContainer.addEventListener('tab-container-changed', event => {
    if (!paintCanvas.getAttribute('width')) {
      if (!defaultWidth) defaultWidth = paintCanvas.parentElement.clientWidth - 24
      paintCanvas.setAttribute('width', defaultWidth)
      widthInputLabel.querySelector('input').defaultValue = paintCanvas.width
    }
    if (!paintCanvas.getAttribute('height')) paintCanvas.setAttribute('height', defaultHeight)
  })
}

function createInputLabel(paintCanvas, name, type, value) {
  const label = document.createElement('label')
  label.textContent = name
  const input = document.createElement('input')
  label.append(input)
  input.type = type
  input.classList.add('paint-input')
  input.addEventListener('change', () => paintCanvas[name] = input.value)
  input.value = input.defaultValue = value
  return label
}

function generatePaintCanvas() {
  const paintCanvas = document.createElement('paint-canvas')
  paintCanvas.setAttribute('size', 3)
  paintCanvas.setAttribute('color', '#666666')
  paintCanvas.setAttribute('bgcolor', '#f0f0f0')
  return paintCanvas
}
