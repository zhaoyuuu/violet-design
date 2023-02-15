var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import CX from 'classnames';
import { getDivPosition, getDomHeight } from '../../_utils/DateUtil';
import Backdrop from './Backdrop';
var Picker = /** @class */ (function (_super) {
    __extends(Picker, _super);
    function Picker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            show: false,
            position: {
                left: '',
                top: '',
            },
        };
        _this.showContents = function () {
            var _a = _this.props, portal = _a.portal, disabled = _a.disabled, readOnly = _a.readOnly;
            if (disabled || readOnly)
                return;
            _this.setState({
                show: true,
            }, function () {
                if (!portal) {
                    _this.setPosition();
                }
            });
        };
        _this.hideContents = function () {
            _this.setState({
                show: false,
            });
        };
        _this.setPosition = function () {
            var direction = _this.props.direction;
            _this.setState({
                position: getDivPosition(_this.triggerRef.current, direction, getDomHeight(_this.contentsRef.current), 5),
            });
        };
        _this.triggerRef = React.createRef();
        _this.contentsRef = React.createRef();
        return _this;
    }
    Picker.prototype.render = function () {
        var _a = this.props, portal = _a.portal, className = _a.className, renderTrigger = _a.renderTrigger, renderContents = _a.renderContents;
        var _b = this.state, show = _b.show, position = _b.position;
        var actions = {
            show: this.showContents,
            hide: this.hideContents,
        };
        return (React.createElement("div", { className: "picker" },
            React.createElement("div", { className: "picker__trigger", onClick: this.showContents, ref: this.triggerRef }, renderTrigger({ actions: actions })),
            show && (React.createElement("div", { className: CX('picker__container', { portal: portal, className: className }), role: "dialog", "aria-modal": "true", style: position, ref: this.contentsRef }, renderContents({ actions: actions }))),
            React.createElement(Backdrop, { show: show, invert: portal, onClick: this.hideContents })));
    };
    return Picker;
}(React.Component));
export default Picker;
