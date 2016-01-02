import React from 'react';
const { PropTypes } = React;

export default class Component extends React.Component {
  static defaultProps = {
    draw     : function() {},
    realtime : false,
    top      : 0,
    left     : 0
  }

  static propTypes = {
    draw     : PropTypes.func,
    realtime : PropTypes.bool,
    top      : PropTypes.number,
    left     : PropTypes.number
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
    this.forceUpdate();
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
      const { draw, top, left } = props;
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
        if(top || left) {
          ctx.translate(left, top);
        }
        draw({time: time, delta: delta, ctx: ctx});
        if(top || left) {
          ctx.translate(-1*left, -1*top);
        }
      }
    }
  }
}
