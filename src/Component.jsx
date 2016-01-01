import React from 'react';
const { PropTypes } = React;

export default class Component extends React.Component {
  static defaultProps = {
    draw     : function() {},
    realtime : false
  }

  static propTypes = {
    draw     : PropTypes.func,
    realtime : PropTypes.bool
  }

  static contextTypes = {
    ctx      : PropTypes.object,
    realtime : PropTypes.bool
  }

  static childContextTypes = {
    ctx      : PropTypes.object,
    realtime : PropTypes.bool
  }

  getChildContext() {
    const { context, refs, props } = this;
    const ctx = (context && context.ctx) || (refs && refs.canvas && refs.canvas.getContext('2d'));
    const realtime = (context && context.realtime) || props.realtime;
    return { ctx:ctx, realtime:realtime }
  }

  constructor(props) {
    super(props);
    this.requestAnimationFrameCallback = this.requestAnimationFrameCallback.bind(this);
  }

  componentDidMount() {
    requestAnimationFrame(this.requestAnimationFrameCallback);
  }

  render() {
    const { props, context } = this;
    requestAnimationFrame(this.requestAnimationFrameCallback);
    if(context.ctx) { return <div key='canvas' {...props}>{props.children}</div>; }
    return <canvas ref='canvas' key='canvas' {...props}>{props.children}</canvas>;
  }

  requestAnimationFrameCallback(time) {
    if(this.previousFrameTime !== time) {
      const { props, context, refs } = this;
      const { draw } = props;
      const ctx = (context && context.ctx) || (refs && refs.canvas && refs.canvas.getContext('2d'));
      const realtime = (context && context.realtime) || props.realtime;

      let delta = 0;
      if(draw && ctx) {
        if(realtime) {
          requestAnimationFrame(this.requestAnimationFrameCallback);
          if(!this.previousFrameTime) { this.previousFrameTime = time }
          else { delta = time - this.previousFrameTime }
          this.previousFrameTime = time;
        }
        draw({time: time, delta: delta, ctx: ctx});
      }
    }
  }
}
