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
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CX from 'classnames';
import Calendar from '../Calendar/Calendar';
import TimeContainer from './TimeComponents/TimeContainer';
import Picker from './Picker';
import { formatDate, ifExistCall, DatePickerDefaults, } from '../../_utils/DateUtil';
import PickerInput from './PickerInput';
import Icon from '../Icon';
export var TabValue;
(function (TabValue) {
    TabValue[TabValue["DATE"] = 0] = "DATE";
    TabValue[TabValue["TIME"] = 1] = "TIME";
})(TabValue || (TabValue = {}));
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDateChange = function (year, month, date) {
            var onChange = _this.props.onChange;
            // const view = this.props.view
            var format;
            var value;
            switch (true) {
                case year !== undefined:
                    format = 'YYYY';
                    value = dayjs(year).format(format);
                    ifExistCall(onChange, year, value);
                    _this.setState(__assign(__assign({}, _this.state), { year: year, inputValue: value, selected: year ? [year] : [] }));
                    break;
                case month !== undefined:
                    format = _this.getMonthFormat();
                    value = dayjs(month).format(format);
                    ifExistCall(onChange, month, value);
                    _this.setState(__assign(__assign({}, _this.state), { month: month, inputValue: value, selected: month ? [month] : [] }));
                    break;
                case date !== undefined:
                default:
                    format = _this.getDateFormat();
                    value = dayjs(date).format(format);
                    ifExistCall(onChange, date, value);
                    _this.setState(__assign(__assign({}, _this.state), { date: date, inputValue: value, selected: date ? [date] : [] }));
                    break;
            }
        };
        _this.handleTimeChange = function (hour, minute) {
            var onChange = _this.props.onChange;
            var date = _this.state.date;
            var selected = _this.state.selected;
            if (!date) {
                date = dayjs();
                selected = [date];
            }
            date = date.hour(hour).minute(minute);
            var inputValue = date.format(_this.getDateFormat());
            ifExistCall(onChange, date, inputValue);
            _this.setState(__assign(__assign({}, _this.state), { date: date, selected: selected, inputValue: inputValue }));
        };
        _this.handleInputChange = function (e) {
            var onChange = _this.props.onChange;
            var value = e.currentTarget.value;
            ifExistCall(onChange, value, undefined);
            _this.setState(__assign(__assign({}, _this.state), { inputValue: e.currentTarget.value }));
        };
        _this.handleInputClear = function () {
            var onChange = _this.props.onChange;
            ifExistCall(onChange, '', undefined);
            _this.setState(__assign(__assign({}, _this.state), { inputValue: '' }));
        };
        _this.handleInputBlur = function (e) {
            var view = _this.props.view;
            var _a = _this.state, year = _a.year, month = _a.month, date = _a.date;
            var value = e.currentTarget.value;
            if (value) {
                if (view === 'year') {
                    var value_1 = e.currentTarget.value;
                    var parseYear = dayjs(value_1, 'YYYY');
                    var updateYear = void 0;
                    updateYear = year;
                    if (dayjs(parseYear).isValid()) {
                        updateYear = parseYear;
                    }
                    var selected = [];
                    selected.push(updateYear);
                    _this.setState(__assign(__assign({}, _this.state), { year: updateYear, inputValue: dayjs(updateYear).format('YYYY'), selected: selected }));
                }
                else if (view === 'month') {
                    var value_2 = e.currentTarget.value;
                    var parsedMonth = dayjs(value_2, _this.getMonthFormat());
                    var updateMonth = void 0;
                    updateMonth = month;
                    if (dayjs(parsedMonth).isValid()) {
                        updateMonth = parsedMonth;
                    }
                    var selected = [];
                    selected.push(updateMonth);
                    _this.setState(__assign(__assign({}, _this.state), { month: updateMonth, inputValue: dayjs(updateMonth).format(_this.getMonthFormat()), selected: selected }));
                }
                else if (view === 'day') {
                    var value_3 = e.currentTarget.value;
                    var parsedDate = dayjs(value_3, _this.getDateFormat());
                    var updateDate = void 0;
                    updateDate = date;
                    if (dayjs(parsedDate).isValid()) {
                        updateDate = parsedDate;
                    }
                    var selected = [];
                    selected.push(updateDate);
                    _this.setState(__assign(__assign({}, _this.state), { date: updateDate, inputValue: dayjs(updateDate).format(_this.getDateFormat()), selected: selected }));
                }
            }
        };
        _this.renderInputComponent = function () {
            var _a = _this.props, inputComponent = _a.inputComponent, readOnly = _a.readOnly, disabled = _a.disabled, clear = _a.clear, autoFocus = _a.autoFocus, showDefaultIcon = _a.showDefaultIcon, placeholder = _a.placeholder;
            var inputValue = _this.state.inputValue;
            var inputProps = {
                readOnly: readOnly,
                autoFocus: autoFocus,
                disabled: disabled,
                clear: clear,
                placeholder: placeholder,
                onChange: _this.handleInputChange,
                onClear: _this.handleInputClear,
                onBlur: _this.handleInputBlur,
                value: inputValue,
                icon: showDefaultIcon ? React.createElement(Icon, { icon: "calendar" }) : undefined,
            };
            return inputComponent ? (inputComponent(__assign({}, inputProps))) : (React.createElement(PickerInput, __assign({}, inputProps)));
        };
        _this.handleTab = function (val) { return function () {
            _this.setState(__assign(__assign({}, _this.state), { tabValue: val }));
        }; };
        _this.renderTabMenu = function () {
            var tabValue = _this.state.tabValue;
            var renderButton = function (type, label, icon) { return (React.createElement("button", { className: CX({
                    active: tabValue === type,
                }), onClick: _this.handleTab(type), type: "button" },
                React.createElement(Icon, { icon: icon }),
                label)); };
            return (React.createElement("div", { className: "picker__container__tab" },
                renderButton(TabValue.DATE, 'DATE', 'calendar'),
                renderButton(TabValue.TIME, 'TIME', 'calendar-times')));
        };
        //渲染日期
        _this.renderCalendar = function (actions) {
            var _a = _this.state, selected = _a.selected, date = _a.date;
            return (React.createElement(Calendar, __assign({}, _this.props, { base: date, onChange: function (year, month, date) {
                    _this.handleDateChange(year, month, date);
                    actions.hide();
                }, selected: selected })));
        };
        //渲染时间的
        _this.renderTime = function () {
            var date = _this.state.date || dayjs();
            return (React.createElement(TimeContainer, { hour: date.hour(), minute: date.minute(), onChange: _this.handleTimeChange }));
        };
        _this.renderContents = function (actions) {
            var _a = _this.props, includeTime = _a.includeTime, showTimeOnly = _a.showTimeOnly;
            var tabValue = _this.state.tabValue;
            var component;
            component = (React.createElement("div", { className: "picker__container__calonly" }, _this.renderCalendar(actions)));
            if (showTimeOnly) {
                component = (React.createElement("div", { className: "picker__container__timeonly" }, _this.renderTime()));
            }
            if (includeTime) {
                component = (React.createElement("div", { className: "picker__container__include-time" },
                    _this.renderTabMenu(),
                    tabValue === TabValue.DATE
                        ? _this.renderCalendar(actions)
                        : _this.renderTime()));
            }
            return component;
        };
        dayjs.extend(customParseFormat);
        var _a = _this.props, initialDate = _a.initialDate, includeTime = _a.includeTime, showTimeOnly = _a.showTimeOnly;
        var selected = [];
        var date;
        var year;
        var month;
        if (initialDate) {
            date = initialDate;
            selected.push(date);
        }
        if (includeTime && showTimeOnly) {
            throw new Error('incldueTime & showTimeOnly cannot be used together');
        }
        //设置得初始值
        _this.state = {
            year: year,
            month: month,
            date: date,
            selected: selected,
            tabValue: TabValue.DATE,
            inputValue: formatDate(date, _this.getDateFormat()),
        };
        return _this;
    }
    DatePicker.prototype.getDateFormat = function () {
        var _a = this.props, dateFormat = _a.dateFormat, includeTime = _a.includeTime, showTimeOnly = _a.showTimeOnly;
        if (!dateFormat) {
            if (includeTime) {
                return DatePickerDefaults.dateTimeFormat;
            }
            if (showTimeOnly) {
                return DatePickerDefaults.timeFormat;
            }
            return DatePickerDefaults.dateFormat;
        }
        return dateFormat;
    };
    DatePicker.prototype.getMonthFormat = function () {
        var monthFormat = this.props.monthFormat;
        if (!monthFormat) {
            return DatePickerDefaults.monthFormat;
        }
        return monthFormat;
    };
    DatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, includeTime = _a.includeTime, portal = _a.portal, direction = _a.direction, disabled = _a.disabled, readOnly = _a.readOnly;
        return (React.createElement(Picker, { portal: portal, direction: direction, readOnly: readOnly, disabled: disabled, className: CX({ include__time: includeTime }), renderTrigger: function () { return _this.renderInputComponent(); }, renderContents: function (_a) {
                var actions = _a.actions;
                return _this.renderContents(actions);
            } }));
    };
    DatePicker.defaultProps = {
        includeTime: false,
        showMonthCnt: 1,
        locale: DatePickerDefaults.locale,
        portal: false,
        showDefaultIcon: false,
        view: 'day',
    };
    return DatePicker;
}(React.Component));
export { DatePicker };
export default DatePicker;
