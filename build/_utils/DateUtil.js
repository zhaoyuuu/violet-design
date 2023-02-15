var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { IDatePicker } from './@types';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
/*常量 */
export var DatePickerDefaults = {
    monthFormat: 'YYYY-MM',
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm A',
    timeFormat: 'HH:mm A',
    locale: 'en',
};
/*StringUtil */
export var lpad = function (val, length, char) {
    return val.length < length ? char.repeat(length - val.length) + val : val;
};
/*ArrayUtil */
export var chunk = function (arr, n) {
    var result = [];
    var i = 0;
    while (i < arr.length / n) {
        result.push(arr.slice(i * n, i * n + n));
        i += 1;
    }
    return result;
};
/*FunctionUtil */
export var ifExistCall = function (func) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return func && func.apply(void 0, args);
};
/*LocaleUtil */
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(weekday);
export var getMonthShort = function (locale) {
    dayjs.locale(locale);
    return range(0, 12).map(function (v) {
        return dayjs().localeData().monthsShort(dayjs().month(v));
    });
};
export var getWeekDays = function (locale) {
    dayjs.locale(locale);
    return range(7).map(function (v) {
        return dayjs().localeData().weekdaysShort(dayjs().weekday(v));
    });
};
export var getToday = function (locale) {
    return dayjs().locale(locale).format('LL');
};
export var range = function (n1, n2) {
    var result = [];
    var first = !n2 ? 0 : n1;
    var last = n2;
    if (!last) {
        last = n1;
    }
    while (first < last) {
        result.push(first);
        first += 1;
    }
    return result;
};
export var repeat = function (el, n) {
    return range(n).map(function () { return el; });
};
/*DOMUtil */
var convertPx = function (value) { return "".concat(value, "px"); };
/**
 * Getting Div position as far as distance
 * @param node
 * @param direction
 * @param distance
 */
export var getDivPosition = function (node, direction, height, distance) {
    if (direction === void 0) { direction = IDatePicker.PickerDirection.BOTTOM; }
    if (!node)
        return { left: '', top: '', bottom: '' };
    var top = 0;
    var left = 0;
    switch (direction) {
        case IDatePicker.PickerDirection.BOTTOM:
            top = node.offsetTop + node.offsetHeight + distance;
            left = node.offsetLeft;
            break;
        case IDatePicker.PickerDirection.TOP:
            top = node.offsetTop - height - distance;
            left = node.offsetLeft;
            break;
    }
    return {
        top: convertPx(top),
        left: convertPx(left),
    };
};
export var getDomHeight = function (node) {
    return node ? node.clientHeight : 0;
};
/*DateUtil */
export var getDayMatrix = function (year, month) {
    var date = dayjs().year(year).month(month);
    var startOfMonth = date.startOf('month').date();
    var endOfMonth = date.endOf('month').date();
    var startDay = date.startOf('month').day();
    var remain = (startDay + endOfMonth) % 7;
    return chunk(__spreadArray(__spreadArray(__spreadArray([], repeat(' ', startDay), true), range(startOfMonth, endOfMonth + 1).map(function (v) { return "".concat(v); }), true), (7 - remain === 7 ? [] : repeat(' ', 7 - remain)), true), 7);
};
export var getMonthMatrix = function (locale) {
    return chunk(getMonthShort(locale), 3);
};
export var getYearMatrix = function (year) {
    return chunk(range(year - 4, year + 5).map(function (v) { return "".concat(v); }), 3);
};
export var isYearEqual = function (year1, year2) {
    if (!year1 || !year2)
        return false;
    return dayjs(year1).isSame(year2, 'year');
};
export var isDayEqual = function (day1, day2) {
    if (!day1 || !day2)
        return false;
    return dayjs(day1).isSame(day2, 'date');
};
export var isYearAfter = function (year1, year2) {
    return dayjs(year1).isAfter(year2, 'year');
};
export var isYearBefore = function (year1, year2) {
    return dayjs(year1).isBefore(year2, 'year');
};
export var isMonthAfter = function (month1, month2) {
    return dayjs(month1).isAfter(month2, 'month');
};
export var isMonthBefore = function (month1, month2) {
    return dayjs(month1).isBefore(month2, 'month');
};
export var isDayAfter = function (day1, day2) {
    return dayjs(day1).isAfter(day2, 'date');
};
export var isDayBefore = function (day1, day2) {
    return dayjs(day1).isBefore(day2, 'date');
};
export var isDayRange = function (date, start, end) {
    if (!start || !end)
        return false;
    return isDayAfter(date, start) && isDayBefore(date, end);
};
export var isYearRange = function (year, start, end) {
    if (!start || !end)
        return false;
    return isYearAfter(year, start) && isYearBefore(year, end);
};
export var formatDate = function (date, format) {
    if (date === undefined)
        return '';
    return dayjs(date).format(format);
};
