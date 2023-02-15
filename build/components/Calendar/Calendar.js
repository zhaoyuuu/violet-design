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
import { range } from '../../_utils/DateUtil';
import dayjs from 'dayjs';
import React from 'react';
import CalendarContainer from './CalenderComponents/CalendarContainer';
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props) {
        var _this = _super.call(this, props) || this;
        _this.setBase = function (base) {
            _this.setState({ base: base });
        };
        _this.state = {
            base: props.base,
        };
        return _this;
    }
    Calendar.prototype.render = function () {
        var _this = this;
        var showMonthCnt = this.props.showMonthCnt;
        var base = this.state.base;
        return (React.createElement("div", { className: "calendar" },
            React.createElement("div", { className: "calendar__list" }, range(showMonthCnt).map(function (idx) { return (React.createElement("div", { className: "calendar__item", key: idx },
                React.createElement(CalendarContainer, __assign({}, _this.props, { base: _this.state.base, current: dayjs(base).add(idx, 'month'), prevIcon: idx === 0, nextIcon: idx === showMonthCnt - 1, setBase: _this.setBase, view: _this.props.view })))); }))));
    };
    Calendar.defaultProps = {
        base: dayjs(),
        showMonthCnt: 1,
        view: 'day',
    };
    return Calendar;
}(React.Component));
export default Calendar;
