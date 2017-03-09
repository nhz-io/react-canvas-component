/* global requestAnimationFrame */

// eslint-disable-next-line no-unused-vars
import {Component, PropTypes, default as React} from 'react'

export default class ReactCanvasComponent extends Component {
    static defaultProps = {
        draw() {}, // eslint-disable-line no-empty-function
        realtime: false,
        top: 0,
        left: 0,
    }

    static propTypes = {
        draw: PropTypes.func,
        realtime: PropTypes.bool,
        top: PropTypes.number,
        left: PropTypes.number,
    }

    static contextTypes = {
        ctx: PropTypes.object,
        realtime: PropTypes.bool,
    }

    static childContextTypes = {
        ctx: PropTypes.object,
        realtime: PropTypes.bool,
    }

    getChildContext() {
        const {context, props, canvasElement} = this
        const ctx = (context && context.ctx) || (canvasElement && canvasElement.getContext('2d'))
        const realtime = (context && context.realtime) || props.realtime

        return {ctx, realtime}
    }

    constructor(props) {
        super(props)
        this.refDOM = this.refDOM.bind(this)
        this.requestAnimationFrameCallback = this.requestAnimationFrameCallback.bind(this)
    }

    componentDidMount() {
        this.forceUpdate()
        requestAnimationFrame(this.requestAnimationFrameCallback)
    }

    refDOM(element) {
        this.canvasElement = element
    }

    render() {
        const {props, context} = this
        const {draw, realtime, top, left, ...other} = props  // eslint-disable-line no-unused-vars
        requestAnimationFrame(this.requestAnimationFrameCallback)

        if (context.ctx) {
            return <div key="canvas" {...other}>{props.children}</div>
        }

        return <canvas ref={this.refDOM} key="canvas" {...other}>{props.children}</canvas>
    }

    requestAnimationFrameCallback(time) {
        if (this.previousFrameTime !== time) {
            const {props, context, canvasElement} = this
            const {draw, top, left} = props
            const ctx = (context && context.ctx) || (canvasElement && canvasElement.getContext('2d'))
            const realtime = (context && context.realtime) || props.realtime

            let delta = 0

            if (!draw || !ctx) {
                return
            }

            if (realtime) {
                requestAnimationFrame(this.requestAnimationFrameCallback)

                if (this.previousFrameTime) {
                    delta = time - this.previousFrameTime
                } 
                else {
                    this.previousFrameTime = time
                }

                this.previousFrameTime = time
            }

            if (top || left) {
                ctx.translate(left, top)
            } // eslint-disable-line no-unused-vars

            draw({time, delta, ctx})

            if (top || left) {
                ctx.translate(-1 * left, -1 * top) // eslint-disable-line no-magic-numbers
            }
        }
    }
}
