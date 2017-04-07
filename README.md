# react-canvas-component

[![Build Status][travis-image]][travis-url]
[![NPM][npm-image]][npm-url]
[![bitHound Code][bithound-image]][bithound-url]

## Install
```
npm install --save react-canvas-component
```

## Usage

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Canvas from 'react-canvas-component'

function drawCanvas({ctx, time}) {
    const {width, height} = ctx.canvas
    ctx.save()
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = 'black'
    ctx.translate(width / 2, height / 2)
    ctx.rotate(((time / 10) % 360) * Math.PI / 180)
    ctx.fillRect(-1 * width / 4, -1 * height / 4, width / 2, height / 2)
    ctx.restore()
}

class App extends React.Component {
    render() {
        return <Canvas draw={drawCanvas} width={400} height={400} realtime/>
    }
}

ReactDOM.render(<App/>, document.body)
```

## Build
```
git clone https://github.com/nhz-io/react-canvas-component.git
cd react-canvas-component
npm install
npm start
...
check http://localhost:9000
...
npm run dist
```

## LICENSE

### [MIT](LICENSE)

## [VERSION](HISTORY.md)

### 0.1.5

[travis-image]: https://travis-ci.org/nhz-io/react-canvas-component.svg
[travis-url]: https://travis-ci.org/nhz-io/react-canvas-component

[npm-image]: https://img.shields.io/npm/v/react-canvas-component.svg?style=flat
[npm-url]: https://www.npmjs.com/package/react-canvas-component

[bithound-image]: https://www.bithound.io/github/nhz-io/react-canvas-component/badges/code.svg
[bithound-url]: https://www.bithound.io/github/nhz-io/react-canvas-component
