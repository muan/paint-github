# changeDPI

changeDPI provides 2 utility functions that can change the dpi of canvas-generated image, of either dataUrl or Blob formats. The functions work on separating the header from the image data, converting and manipulating just the header, then sticking the header back on the file. In this way, very large images can be converted fast without having to convert the entire contents of an image file. This process is non-destructive&mdash;image data does not get modified in the process.

## Install

This project depends on [node](https://nodejs.org) and [npm](https://npmjs.com).

```js
npm install --save changedpi
```

## Usage

From a canvas element dataUrl:
```js
// create the dataUrl at standard 72dpi
var dataUrl = canvas.toDataURL('image/jpeg', 0.92);
var daurl150dpi = changeDpiDataUrl(dataUrl, 150);
```

From a canvas element blob:
```js
// create the blob at standard 72dpi
canvas.toBlob(function(blob) {
  changeDpiBlob(blob, 300).then(function(blob){
    // use your changed blob
  })
},'image/jpeg', 0.92);
```

```js
  TODO add example with file reader.
```

### ES6

This module uses ES6. To see a compiled ES5 version, run `npm run build` and look in `dist/`.

## Testing

```js
npm install .
npm run test
```

## Contribute

Please do contribute! Open an issue or submit a pull request.

The project falls under [@Shutterstock](https://github.com/shutterstock/welcome)'s [Code of Conduct](https://github.com/shutterstock/welcome/blob/master/CODE_OF_CONDUCT.md).

## License

MIT.
