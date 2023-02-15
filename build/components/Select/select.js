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
import classNames from 'classnames';
import React, { createContext, useState, useRef, useEffect, } from 'react';
import Transition from '../Transition/transition';
import Input from '../Input/input';
import Option from './option';
import Icon from '../Icon';
import useClickOutside from '../../hooks/useClickOutside';
import useDebounce from '../../hooks/useDebounce';
/** 定义全局的量 */
/** 当没有provide，则用括号里的默认值 */
export var SelectContext = createContext({
    selectedValues: [],
});
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 */
export var Select = function (props) {
    // 取出props
    var defaultValue = props.defaultValue, placeholder = props.placeholder, disabled = props.disabled, name = props.name, onChange = props.onChange, onVisibleChange = props.onVisibleChange, options = props.options, size = props.size, showSearch = props.showSearch, filterOption = props.filterOption, onSearch = props.onSearch;
    var multiple = props.multiple;
    // 通过useRef定义个input变量，在input 元素上定义ref={input},这样通过input.current就可以获取到input Dom 元素
    var input = useRef(null);
    var containerRef = useRef(null);
    var containerWidth = useRef(0);
    // 控制 下拉框显示与否
    var _a = useState(false), menuOpen = _a[0], setOpen = _a[1];
    // 控制 input框的value
    var _b = useState(typeof defaultValue === 'string' ? defaultValue : ''), value = _b[0], setValue = _b[1];
    // 防抖
    var debouncedValue = useDebounce(value, 500);
    // 存储多选的已选值
    var _c = useState(Array.isArray(defaultValue) ? defaultValue : []), selectedValues = _c[0], setSelectedValues = _c[1];
    // 搜索功能下，再次点击input
    var _d = useState(false), reClick = _d[0], setReClick = _d[1];
    var selectOptions;
    // 处理option的点击事件
    var handleOptionClick = function (value, isSelected) {
        // 非多选模式
        if (!multiple) {
            // 点击option后，下拉框隐藏
            setOpen(false);
            setValue(value);
            onVisibleChange && onVisibleChange(false);
        }
        else {
            setValue('');
        }
        // 多选模式
        var updatedValues = [value];
        if (multiple) {
            // 若当前option已选中，则从selecedValues中去掉该option；否则，将该value添加到selectedValues中
            updatedValues = isSelected
                ? selectedValues.filter(function (item) { return item !== value; })
                : __spreadArray(__spreadArray([], selectedValues, true), [value], false);
            setSelectedValues(updatedValues);
        }
        onChange && onChange(value, updatedValues);
    };
    // 多选模式下，placeholder会一直显示，故做处理
    useEffect(function () {
        if (input.current) {
            // input.current.focus()
            if (multiple && selectedValues.length > 0) {
                input.current.placeholder = '';
            }
            else if (placeholder) {
                input.current.placeholder = placeholder;
            }
        }
    }, [selectedValues, multiple, placeholder]);
    // 将当前input框的宽保存在containerWidth
    useEffect(function () {
        if (containerRef.current) {
            containerWidth.current =
                containerRef.current.getBoundingClientRect().width;
        }
        // 接下来设置tag的line-height，使得其文字垂直居中
        var tag = document.querySelector('.violetSelected__tags__tag');
        var h = (tag === null || tag === void 0 ? void 0 : tag.clientHeight) - 4;
        h && (tag.style.lineHeight = h + 'px');
        // 搜索功能仅对单选框开放
        showSearch && (multiple = false);
    });
    // 鼠标点击select框外面时，关闭下拉框
    // useClickOutside里，使用的是原生的 doucment.addEventListener 的方法添加，那么它是一个原生的 DOM事件，它的事件对象是原生的事件对象(比如这里的 MouseEvent)
    // 而React.MouseEvent （各种 react event 事件对象），都是 React 的事件，它并不是 DOM 原生的对象，和普通的 DOM 事件是不一样的
    useClickOutside(containerRef, function () {
        var _a, _b;
        // 鼠标点击select框外面的处理函数
        setOpen(false);
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false);
        }
        if (showSearch && value !== defaultValue) {
            setValue((_b = (_a = selectOptions[0]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : defaultValue);
        }
    });
    // 不带搜索框时，点击input框的处理函数
    var handleClick = function (e) {
        e.preventDefault();
        // 当input框可用（!disabled），menuOpen变量取反
        if (!disabled) {
            setOpen(!menuOpen);
            // 当存在onVisibleChange，则执行(参数为当前menuOpen状态，由于useState缘故，此时menuOpen仍然为 没有执行setOpen(!menuOpen)的状态，故这里要取反)
            onVisibleChange && onVisibleChange(!menuOpen);
        }
    };
    // 带搜索框时，点击input框的处理函数
    var handleSearchClick = function (e) {
        e.preventDefault();
        // 当input框可用（!disabled）且menuOpen为关闭，让menuOpen打开
        if (!disabled && !menuOpen) {
            setOpen(true);
            // 当存在onVisibleChange，则执行(参数为当前menuOpen状态，由于useState缘故，此时menuOpen仍然为 没有执行setOpen(!menuOpen)的状态，故这里要取反)
            onVisibleChange && onVisibleChange(true);
        }
        if (value !== defaultValue) {
            setReClick(true);
        }
    };
    // input框change的处理函数
    var handleInputChange = function (e) {
        var inputValue = e.target.value.trim();
        setValue(inputValue);
        onSearch && onSearch(inputValue);
        setReClick(false);
    };
    // 生成下拉框各选项
    var generateOptions = function () {
        // 根据是否带搜索功能，得到不同的options
        var reg = new RegExp('^' + debouncedValue);
        selectOptions =
            showSearch && filterOption && !reClick
                ? options.filter(function (item) { var _a; return reg.test((_a = item === null || item === void 0 ? void 0 : item.label) !== null && _a !== void 0 ? _a : item.value); })
                : options;
        // 在Select组件中对options进行遍历，并执行函数
        // 在这里，即对select 中的每一个option进行处理，生成li元素
        if (selectOptions.length) {
            return selectOptions.map(function (item, index) {
                return (React.createElement(Option, __assign({ index: "select-".concat(index), key: index }, item, { onSelect: handleOptionClick, selectedValues: selectedValues, multiple: multiple })));
            });
        }
        else {
            return React.createElement(Option, { disabled: true, value: '暂无数据' });
        }
    };
    // 类名拼接
    var className = classNames('violetSelect', {
        'violetSelect--menuOpen': menuOpen,
        'violetSelect--disabled': disabled,
        'violetSelect--multiple': multiple,
    });
    return (
    // input上的图标的动画是css写的
    React.createElement("div", { className: className, ref: containerRef },
        React.createElement("div", { className: "violetSelect__input" },
            !showSearch && (React.createElement(Input, { ref: input, placeholder: placeholder, value: value, disabled: disabled, name: name, readOnly: true, icon: "angle-down", size: size, onClick: handleClick })),
            showSearch && (React.createElement(Input, { ref: input, disabled: disabled, name: name, icon: "angle-down", size: size, value: value, onChange: handleInputChange, onClick: handleSearchClick, autoComplete: "off" }))),
        React.createElement(Transition, { in: menuOpen, animation: "zoom-in-top", timeout: 300 },
            React.createElement("ul", { className: "violetSelect__dropdown" }, generateOptions())),
        multiple && (React.createElement("div", { className: "violetSelected__tags", style: { maxWidth: containerWidth.current - 32 } }, selectedValues.map(function (item, index) {
            return (React.createElement("span", { className: "violetSelected__tags__tag", key: "tag-".concat(index) },
                item,
                React.createElement(Icon, { icon: "times", onClick: function () {
                        handleOptionClick(item, true);
                    } })));
        })))));
};
Select.defaultProps = {
    name: 'violetSelect',
    placeholder: '请选择',
    filterOption: true,
    defaultValue: '',
};
export default Select;
