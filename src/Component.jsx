import React from 'react';
const { PropTypes } = React;

export default class Component extends React.Component {
  static defaultProps = {
    draw     : function() {},
    realtime : false
  }

  static propTypes = {
    draw: PropTypes.func,
    realtime: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.requestAnimationFrameCallback = this.requestAnimationFrameCallback.bind(this);
  }

  componentDidMount() {
    this.context2d = this.refs.canvas.getContext('2d');
    requestAnimationFrame(this.requestAnimationFrameCallback);
  }

  render() {
    const { props } = this;    
    requestAnimationFrame(this.requestAnimationFrameCallback);
    return <canvas ref='canvas' key='canvas' {...props} />;
  }

  requestAnimationFrameCallback(time) {
    if(this.previousFrameTime !== time) {
      const { props, context2d } = this;
      const { realtime, draw } = props;
      let delta = 0;
      if(draw && context2d) {
        if(realtime) {
          requestAnimationFrame(this.requestAnimationFrameCallback);
          if(!this.previousFrameTime) { this.previousFrameTime = time }
          else { delta = time - this.previousFrameTime }
          this.previousFrameTime = time;
        }
        draw({time: time, delta: delta, ctx: context2d});
      }
    }
  }
}
