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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
import Calendar from './Calendar';
var CalendarSelectedController = /** @class */ (function (_super) {
    __extends(CalendarSelectedController, _super);
    function CalendarSelectedController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selected: [],
        };
        _this.handleChange = function (year, month, date) {
            var multiple = _this.props.multiple;
            if (date) {
                _this.setState({
                    selected: multiple ? __spreadArray(__spreadArray([], _this.state.selected, true), [date], false) : [date],
                });
            }
            else if (year) {
                _this.setState({
                    selected: multiple ? __spreadArray(__spreadArray([], _this.state.selected, true), [year], false) : [year],
                });
            }
            else if (month) {
                _this.setState({
                    selected: multiple ? __spreadArray(__spreadArray([], _this.state.selected, true), [month], false) : [month],
                });
            }
        };
        _this.handleClear = function () {
            _this.setState({
                selected: [],
            });
        };
        return _this;
    }
    CalendarSelectedController.prototype.render = function () {
        var selected = this.state.selected;
        return (React.createElement("div", null,
            React.createElement(Calendar, __assign({}, this.props, { selected: selected, onChange: this.handleChange })),
            this.props.multiple && (React.createElement("button", { onClick: this.handleClear }, "Clear"))));
    };
    CalendarSelectedController.defaultProps = {
        /** 默认不多选 */
        multiple: false,
        /** 默认为日视图 */
        view: 'day',
    };
    return CalendarSelectedController;
}(React.Component));
export { CalendarSelectedController };
export default CalendarSelectedController;
