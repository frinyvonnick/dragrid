"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  transition: transform .1s\n  user-select: ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-wrap: wrap;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Wrapper = _styledComponents.default.div(_templateObject());

var DraggableElement = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.dragging ? 'none' : 'auto';
});

var Grid =
/*#__PURE__*/
function (_Component) {
  _inherits(Grid, _Component);

  function Grid() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Grid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Grid)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      dragging: false,
      draggedElement: undefined,
      position: {}
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e) {
      if (!_this.state.dragging) return;
      var position = {
        x: e.clientX,
        y: e.clientY
      };

      _this.setState(function (state) {
        return {
          position: position
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (index) {
      return function (e) {
        _this.setState({
          dragging: true,
          draggedElement: index
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (index) {
      return function (e) {
        _this.setState({
          dragging: false,
          draggedElement: index,
          position: {}
        });

        var targetIndex = _this.lastHoveredElementSide === 'left' ? _this.lastHoveredElement : _this.lastHoveredElement + 1;

        _this.props.onDrop(index, index < targetIndex ? targetIndex - 1 : targetIndex);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getChildStyle", function (index, rectangle) {
      _this.updateHoveredElement(index, rectangle);

      if (!_this.state.dragging || _this.state.draggedElement !== index) return {};
      var x = _this.state.position.x - rectangle.x - rectangle.width / 2;
      var y = _this.state.position.y - rectangle.y - rectangle.height / 2;
      return {
        transform: "translate(".concat(x, "px, ").concat(y, "px)")
      };
    });

    return _this;
  }

  _createClass(Grid, [{
    key: "updateHoveredElement",
    value: function updateHoveredElement(index, rectangle) {
      if (!isPointInRectangle(this.state.position, rectangle)) return;
      this.lastHoveredElement = index;
      var leftHalf = {
        x: rectangle.x,
        y: rectangle.y,
        width: rectangle.width / 2,
        height: rectangle.height
      };

      if (isPointInRectangle(this.state.position, leftHalf)) {
        this.lastHoveredElementSide = 'left';
        return;
      }

      this.lastHoveredElementSide = 'right';
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(Wrapper, {
        style: this.props.style,
        onMouseMove: this.onMouseMove
      }, this.props.elements.map(function (element, index) {
        return _react.default.createElement(SizedElement, {
          key: index
        }, function (rect) {
          return _react.default.createElement(DraggableElement, {
            dragging: _this2.state.dragging,
            onMouseDown: _this2.onMouseDown(index),
            onMouseUp: _this2.onMouseUp(index),
            style: _this2.getChildStyle(index, rect)
          }, _this2.props.renderElement(element, index));
        });
      }));
    }
  }]);

  return Grid;
}(_react.Component);

exports.Grid = Grid;

var SizedElement =
/*#__PURE__*/
function (_Component2) {
  _inherits(SizedElement, _Component2);

  function SizedElement(props) {
    var _this3;

    _classCallCheck(this, SizedElement);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(SizedElement).call(this, props));
    _this3.ref = (0, _react.createRef)();
    return _this3;
  }

  _createClass(SizedElement, [{
    key: "render",
    value: function render() {
      var rect = this.ref.current ? this.ref.current.getBoundingClientRect() : {};
      return _react.default.createElement("div", {
        ref: this.ref
      }, this.props.children(rect));
    }
  }]);

  return SizedElement;
}(_react.Component);

function isPointInRectangle(point, rectangle) {
  return rectangle.x <= point.x && point.x <= rectangle.x + rectangle.width && rectangle.y <= point.y && point.y <= rectangle.y + rectangle.height;
}