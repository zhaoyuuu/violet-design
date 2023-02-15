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
import CalendarBody from './CalendarBody';
import CalendarHead from './CalendarHead';
import { IDatePicker } from '../../../_utils/@types';
import { DatePickerDefaults, ifExistCall } from '../../../_utils/DateUtil';
var CalendarContainer = /** @class */ (function (_super) {
    __extends(CalendarContainer, _super);
    function CalendarContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.getHeaderTitle = function () {
            var _a;
            var current = _this.props.current;
            var year = dayjs(current).year();
            return (_a = {},
                _a[IDatePicker.ViewMode.YEAR] = "".concat(year - 4, " - ").concat(year + 4),
                _a[IDatePicker.ViewMode.MONTH] = "".concat(year),
                _a[IDatePicker.ViewMode.DAY] = dayjs(current).format('YYYY.MM'),
                _a)[_this.state.viewMode];
        };
        _this.handleTitleClick = function () {
            var viewMode = _this.state.viewMode;
            var showMonthCnt = _this.props.showMonthCnt;
            var changedMode = viewMode;
            if (viewMode === IDatePicker.ViewMode.MONTH) {
                changedMode = IDatePicker.ViewMode.YEAR;
            }
            else if (viewMode === IDatePicker.ViewMode.DAY) {
                changedMode = IDatePicker.ViewMode.MONTH;
            }
            _this.setState({
                viewMode: showMonthCnt > 1 ? IDatePicker.ViewMode.DAY : changedMode,
            });
        };
        _this.handleChange = function (value) {
            var viewMode = _this.state.viewMode;
            var _a = _this.props, current = _a.current, onChange = _a.onChange, setBase = _a.setBase, showMonthCnt = _a.showMonthCnt, base = _a.base;
            if (!value.trim())
                return;
            //表示许哟啊显示多个月份视图
            if (showMonthCnt > 1) {
                var date = dayjs(current).date(parseInt(value, 10)).toDate();
                //判断一个函数是否存在并执行该函数
                ifExistCall(onChange, undefined, undefined, date);
                return;
            }
            if (_this.props.view === 'year') {
                var year = dayjs(base).year(parseInt(value, 10));
                ifExistCall(onChange, year, undefined, undefined);
            }
            else if (_this.props.view === 'month') {
                var month = dayjs(base).month(parseInt(value, 12));
                ifExistCall(onChange, undefined, month, undefined);
            }
            else {
                if (viewMode === IDatePicker.ViewMode.YEAR) {
                    //用于修改组件的基准日期
                    //将字符串 value 解析为整数
                    setBase(dayjs(base).year(parseInt(value, 10)));
                    _this.setState({
                        viewMode: IDatePicker.ViewMode.MONTH,
                    });
                }
                else if (viewMode === IDatePicker.ViewMode.MONTH) {
                    setBase(dayjs(base).month(parseInt(value, 10)));
                    _this.setState({
                        viewMode: IDatePicker.ViewMode.DAY,
                    });
                }
                else {
                    var date = dayjs(current).date(parseInt(value, 10));
                    ifExistCall(onChange, undefined, undefined, date);
                }
            }
        };
        _this.handleBase = function (method) { return function () {
            var _a = _this.props, base = _a.base, setBase = _a.setBase;
            var viewMode = _this.state.viewMode;
            var date = dayjs(base);
            if (viewMode === IDatePicker.ViewMode.YEAR) {
                //基准日期修改为过去或未来 10 年
                setBase(date[method](9, 'year'));
            }
            else if (viewMode === IDatePicker.ViewMode.MONTH) {
                //将基准日期修改为过去或未来 1 年
                setBase(date[method](1, 'year'));
            }
            else {
                //将基准日期修改为过去或未来 1 个月
                setBase(date[method](1, 'month'));
            }
        }; };
        _this.handleToday = function () {
            var setBase = _this.props.setBase;
            setBase(dayjs());
        };
        _this.renderCalendarHead = function () {
            var _a = _this.props, prevIcon = _a.prevIcon, nextIcon = _a.nextIcon;
            return (React.createElement(CalendarHead, { onPrev: _this.handleBase('subtract'), onNext: _this.handleBase('add'), prevIcon: prevIcon, nextIcon: nextIcon, onTitleClick: _this.handleTitleClick, title: _this.getHeaderTitle() }));
        };
        _this.renderCalendarBody = function () {
            var _a = _this.props, customDayClass = _a.customDayClass, customDayText = _a.customDayText, disableDay = _a.disableDay, selected = _a.selected, startDay = _a.startDay, endDay = _a.endDay, onMouseOver = _a.onMouseOver, current = _a.current, _b = _a.locale, locale = _b === void 0 ? DatePickerDefaults.locale : _b;
            return (React.createElement(CalendarBody, { viewMode: _this.state.viewMode, current: current, selected: selected, startDay: startDay, endDay: endDay, disableDay: disableDay, onClick: _this.handleChange, onMouseOver: onMouseOver, customDayClass: customDayClass, customDayText: customDayText, locale: locale }));
        };
        _this.state = {
            viewMode: _this.getViewMode(props.view),
        };
        return _this;
    }
    //获取view
    CalendarContainer.prototype.getViewMode = function (view) {
        switch (view) {
            case 'year':
                return IDatePicker.ViewMode.YEAR;
            case 'month':
                return IDatePicker.ViewMode.MONTH;
            case 'day':
                return IDatePicker.ViewMode.DAY;
            default:
                return IDatePicker.ViewMode.DAY;
        }
    };
    CalendarContainer.prototype.render = function () {
        var show = this.props.show;
        var calendarClass = classNames('calendar__container', {
            'calendar--show': show,
        });
        return (React.createElement("div", { className: calendarClass },
            this.renderCalendarHead(),
            this.renderCalendarBody()));
    };
    CalendarContainer.defaultProps = {
        current: dayjs(),
        show: true,
        showMonthCnt: 1,
        showToday: false,
        locale: DatePickerDefaults.locale,
    };
    return CalendarContainer;
}(React.Component));
export { CalendarContainer };
export default CalendarContainer;
