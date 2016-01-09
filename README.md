# react-canvas-component [![Build Status][travis-image]][travis-url] [![NPM][npm-image]][npm-url]

## React Canvas Component

## Install
```
npm install --save react-canvas-component
```

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from 'react-canvas-component';

main();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.drawCanvas = this.drawCanvas.bind(this);
  }

  render() {
    return(
      <Canvas
        draw={this.drawCanvas}
        width={400}
        height={400}
        realtime={true}
      />
    );
  }

  drawCanvas({ctx, time, delta}) {
    const { width, height } = ctx.canvas;
    ctx.save()
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    ctx.translate(width/2, height/2);
    ctx.rotate(((time/10) % 360) * Math.PI/180);
    ctx.fillRect(-1*width/4, -1*height/4, width/2, height/2);
    ctx.restore();
  }
}

function main() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<App />, div);
}
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
npm dist
```

## LICENSE

### [MIT](LICENSE)

## VERSION
### 0.0.5

[travis-image]: https://travis-ci.org/nhz-io/react-canvas-component.svg
[travis-url]: https://travis-ci.org/nhz-io/react-canvas-component

[npm-image]: https://img.shields.io/npm/v/react-canvas-component.svg?style=flat
[npm-url]: https://www.npmjs.com/package/react-canvas-component
