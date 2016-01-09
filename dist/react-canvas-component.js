module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Canvas = undefined;

	var _Component = __webpack_require__(1);

	var _Component2 = _interopRequireDefault(_Component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Canvas = _Component2.default;
	exports.default = _Component2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = _react2.default.PropTypes;

	var Component = (function (_React$Component) {
	  _inherits(Component, _React$Component);

	  _createClass(Component, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      var context = this.context;
	      var refs = this.refs;
	      var props = this.props;

	      var ctx = context && context.ctx || refs && refs.canvas && refs.canvas.getContext('2d');
	      var realtime = context && context.realtime || props.realtime;
	      return { ctx: ctx, realtime: realtime };
	    }
	  }]);

	  function Component(props) {
	    _classCallCheck(this, Component);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this, props));

	    _this.requestAnimationFrameCallback = _this.requestAnimationFrameCallback.bind(_this);
	    return _this;
	  }

	  _createClass(Component, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.forceUpdate();
	      requestAnimationFrame(this.requestAnimationFrameCallback);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var context = this.context;

	      requestAnimationFrame(this.requestAnimationFrameCallback);
	      if (context.ctx) {
	        return _react2.default.createElement(
	          'div',
	          _extends({ key: 'canvas' }, props),
	          props.children
	        );
	      }
	      return _react2.default.createElement(
	        'canvas',
	        _extends({ ref: 'canvas', key: 'canvas' }, props),
	        props.children
	      );
	    }
	  }, {
	    key: 'requestAnimationFrameCallback',
	    value: function requestAnimationFrameCallback(time) {
	      if (this.previousFrameTime !== time) {
	        var props = this.props;
	        var context = this.context;
	        var refs = this.refs;
	        var draw = props.draw;
	        var top = props.top;
	        var left = props.left;

	        var ctx = context && context.ctx || refs && refs.canvas && refs.canvas.getContext('2d');
	        var realtime = context && context.realtime || props.realtime;

	        var delta = 0;
	        if (draw && ctx) {
	          if (realtime) {
	            requestAnimationFrame(this.requestAnimationFrameCallback);
	            if (!this.previousFrameTime) {
	              this.previousFrameTime = time;
	            } else {
	              delta = time - this.previousFrameTime;
	            }
	            this.previousFrameTime = time;
	          }
	          if (top || left) {
	            ctx.translate(left, top);
	          }
	          draw({ time: time, delta: delta, ctx: ctx });
	          if (top || left) {
	            ctx.translate(-1 * left, -1 * top);
	          }
	        }
	      }
	    }
	  }]);

	  return Component;
	})(_react2.default.Component);

	Component.defaultProps = {
	  draw: function draw() {},
	  realtime: false,
	  top: 0,
	  left: 0
	};
	Component.propTypes = {
	  draw: PropTypes.func,
	  realtime: PropTypes.bool,
	  top: PropTypes.number,
	  left: PropTypes.number
	};
	Component.contextTypes = {
	  ctx: PropTypes.object,
	  realtime: PropTypes.bool
	};
	Component.childContextTypes = {
	  ctx: PropTypes.object,
	  realtime: PropTypes.bool
	};
	exports.default = Component;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ }
/******/ ]);