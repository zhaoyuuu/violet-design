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
import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import TableCell from './TableCell';
import TableMatrixView from './TableMatrixView';
import { getDayMatrix, isDayEqual, isDayRange, getWeekDays, ifExistCall, DatePickerDefaults, } from '../../_utils/DateUtil';
var DayView = /** @class */ (function (_super) {
    __extends(DayView, _super);
    function DayView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getDayClass = function (date) {
            var _a = _this.props, current = _a.current, customDayClass = _a.customDayClass, startDay = _a.startDay, endDay = _a.endDay, selected = _a.selected, disableDay = _a.disableDay;
            var currentDate = dayjs(current).date(parseInt(date, 10));
            var classArr = [];
            if (!date.trim()) {
                return '';
            }
            if (customDayClass !== undefined) {
                var customClass = customDayClass(currentDate);
                classArr = classArr.concat(typeof customClass === 'string' ? [customClass] : customClass);
            }
            var dayClass = classNames('calendar__day', "calendar__day--".concat(dayjs(currentDate).day()), classArr, {
                'calendar__day--end': isDayEqual(currentDate, endDay),
                'calendar__day--range': isDayRange(currentDate, startDay, endDay),
                'calendar__day--selected': _this.isIncludeDay(date, selected),
                'calendar__day--disabled': disableDay ? disableDay(currentDate) : false,
                'calendar__day--start': isDayEqual(currentDate, startDay),
                'calendar__day--today': isDayEqual(currentDate, dayjs()),
            });
            return dayClass;
        };
        _this.getCustomText = function (date) {
            var _a = _this.props, current = _a.current, customDayText = _a.customDayText;
            var currentDate = dayjs(current).date(parseInt(date, 10));
            if (!date.trim()) {
                return '';
            }
            if (!customDayText) {
                return '';
            }
            return customDayText(currentDate);
        };
        _this.isIncludeDay = function (date, dates) {
            var current = _this.props.current;
            if (dates === undefined) {
                return false;
            }
            return dates.some(function (v) {
                return isDayEqual(dayjs(current).date(parseInt(date, 10)), v);
            });
        };
        _this.handleClick = function (date) {
            var _a = _this.props, current = _a.current, disableDay = _a.disableDay;
            var currentDate = dayjs(current).date(parseInt(date, 10));
            if (!(disableDay && disableDay(currentDate))) {
                ifExistCall(_this.props.onClick, date);
            }
        };
        _this.handleMouseOver = function (date) {
            var _a = _this.props, onMouseOver = _a.onMouseOver, current = _a.current;
            ifExistCall(onMouseOver, dayjs(current).date(parseInt(date, 10)));
        };
        return _this;
    }
    DayView.prototype.render = function () {
        var _this = this;
        var _a = this.props, current = _a.current, locale = _a.locale;
        var dayMatrix = getDayMatrix(dayjs(current).year(), dayjs(current).month());
        var weekdays = getWeekDays(locale);
        return (React.createElement(TableMatrixView, { headers: weekdays, matrix: dayMatrix, cell: function (date, key) { return (React.createElement(TableCell, { className: _this.getDayClass(date), subText: _this.getCustomText(date), onClick: _this.handleClick, onMouseOver: _this.handleMouseOver, text: date, key: key })); } }));
    };
    DayView.defaultProps = {
        locale: DatePickerDefaults.locale,
    };
    return DayView;
}(React.Component));
export default DayView;
