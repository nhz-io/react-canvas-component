import React from 'react';
import Component from 'src/Component.jsx';

function drawBackground({ctx, delta, time}) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = 'gray';
  ctx.fillRect(0,0,width,height);
}

function drawLeft({ctx, delta, time}) {
  const { width, height } = ctx.canvas;
  ctx.save();
  ctx.translate(width/3, height/3);
  ctx.rotate((Math.PI/180)*((time/10)%360));
  ctx.fillStyle = 'black';
  ctx.fillRect(-1 * (width/6), -1 * (height/6), width/3, height/3);
  ctx.restore();
}

function drawRight({ctx, delta, time}) {
  const { width, height } = ctx.canvas;
  ctx.save();
  ctx.translate(width - width/5, height - height/5);
  ctx.rotate(-1*(Math.PI/180)*((time/5)%360));
  ctx.fillStyle = 'red';
  ctx.fillRect(-1 * (width/10), -1 * (height/10), width/5, height/5);
  ctx.restore()
}

export default class TestWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.state = { width:window.innerWidth, height:window.innerHeight};
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({width:window.innerWidth, height:window.innerHeight});
  }

  render() {
    const { width, height } = this.state;
    return(
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <Component draw={drawBackground} top={100} left={200} width={width} height={height} realtime={true}>
          <Component draw={drawLeft} top={250} left={100}/>
          <Component draw={drawRight} top={-100} left={-100}/>
        </Component>
      </div>
    );
  }
}
