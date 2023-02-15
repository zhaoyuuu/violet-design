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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useRef, useEffect, useState, } from 'react';
import cn from 'classnames';
import Input from '../Input/input';
import Transition from '../Transition/transition';
import Icon from '../Icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
/**
 * > 输入框自动完成功能。
 *
 * ### 何时使用
 * - 需要一个输入框而不是选择器。
 * - 需要输入建议/辅助提示。
 *
 * 和 `Select` 的区别是：
 *
 * - `AutoComplete` 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助输入。
 * - `Select` 是在限定的可选项中进行选择，关键词是选择。
 */
export var AutoComplete = function (_a) {
    var fetchSuggestions = _a.fetchSuggestions, onChange = _a.onChange, onSelect = _a.onSelect, value = _a.value, renderOption = _a.renderOption, className = _a.className, restProps = __rest(_a, ["fetchSuggestions", "onChange", "onSelect", "value", "renderOption", "className"]);
    var _b = useState(value), inputValue = _b[0], setInputValue = _b[1];
    var _c = useState([]), suggestions = _c[0], setSuggestions = _c[1];
    var _d = useState(false), isLoading = _d[0], setLoading = _d[1];
    var debouncedValue = useDebounce(inputValue, 500);
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var triggerSearch = useRef(false);
    var autoComplete = useRef(null);
    // click outside
    useClickOutside(autoComplete, function () { return setSuggestions([]); });
    // 生成suggestion（防抖）
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var res = fetchSuggestions(debouncedValue);
            if (res instanceof Promise) {
                setLoading(true);
                res.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setSuggestions(res);
            }
        }
        else {
            setSuggestions([]);
        }
        // 键盘事件初始化
        setHighlightIndex(-1);
    }, [debouncedValue]);
    // 键盘事件
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length)
            index = suggestions.length - 1;
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    // onChange
    function handleChange(e) {
        var value = e.target.value.trim();
        console.log(value);
        setInputValue(value);
        if (onChange) {
            onChange(value);
        }
        setSuggestions([]);
        triggerSearch.current = true;
    }
    // onSelect
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect)
            onSelect(item);
        triggerSearch.current = false;
    };
    // 自定义生成选项
    var renderItem = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", { className: "violetAutoComplete__dropdown" }, suggestions.map(function (item, index) { return (React.createElement("li", { key: index, onClick: function () { return handleSelect(item); }, className: cn('violetAutoComplete__dropdown__item', {
                'violetAutoComplete__dropdown__item--highlight': index === highlightIndex,
            }) }, renderItem(item))); })));
    };
    return (React.createElement("div", { className: cn('violetAutoComplete', className), ref: autoComplete },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange }, restProps, { onKeyDown: handleKeyDown })),
        isLoading && (React.createElement("div", { className: "violetAutoComplete__loading" },
            React.createElement(Icon, { icon: "spinner", spin: true }))),
        React.createElement(Transition, { in: suggestions.length > 0, animation: "zoom-in-top", timeout: 300 }, generateDropdown())));
};
export default AutoComplete;
