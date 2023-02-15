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
import React from 'react';
import dayjs from 'dayjs';
import { IDatePicker } from '../../../_utils/@types';
import { DatePickerDefaults, getMonthMatrix, getYearMatrix, } from '../../../_utils/DateUtil';
import DayView from '../DayView';
import TableCell from '../TableCell';
import TableMatrixView from '../TableMatrixView';
var YEAR_VIEW_CLASS = 'calendar__year';
var MONTH_VIEW_CLASS = 'calendar__month';
var buildMatrixView = function (matrix, className, onClick) {
    return (React.createElement(TableMatrixView, { matrix: matrix, cell: function (value, key) { return (React.createElement(TableCell, { key: key, className: className, text: value, onClick: onClick(key, value) })); } }));
};
var CalendarBody = /** @class */ (function (_super) {
    __extends(CalendarBody, _super);
    function CalendarBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarBody.prototype.render = function () {
        var _a;
        var _b = this.props, current = _b.current, onClick = _b.onClick, locale = _b.locale;
        var viewMap = (_a = {},
            _a[IDatePicker.ViewMode.YEAR] = buildMatrixView(getYearMatrix(dayjs(current).year()), YEAR_VIEW_CLASS, function (_, v) { return function () { return onClick(v); }; }),
            _a[IDatePicker.ViewMode.MONTH] = buildMatrixView(getMonthMatrix(locale), MONTH_VIEW_CLASS, function (k, _) { return function () { return onClick(String(k)); }; }),
            _a[IDatePicker.ViewMode.DAY] = React.createElement(DayView, __assign({}, this.props)),
            _a);
        return React.createElement("div", { className: "calendar__body" }, viewMap[this.props.viewMode]);
    };
    CalendarBody.defaultProps = {
        viewMode: IDatePicker.ViewMode.DAY,
        locale: DatePickerDefaults.locale,
    };
    return CalendarBody;
}(React.Component));
export { CalendarBody };
export default CalendarBody;
