import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { useState, useCallback, forwardRef, useEffect, useRef, useReducer, createContext, useImperativeHandle, useContext } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import produce from 'immer';
import Schema from 'async-validator';
import mapValues from 'lodash-es/mapValues';
import each from 'lodash-es/each';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * > 将页面元素钉在可视范围。
 *
 * ### 何时使用
 * 当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。
 *
 * 页面可视范围过小时，慎用此功能以免遮挡页面内容。
 */
var Affix = function (_a) {
    var className = _a.className, _b = _a.offsetTop, offsetTop = _b === void 0 ? 0 : _b, children = _a.children;
    // 是否affix
    var _c = useState(false), isAffixed = _c[0], setAffixed = _c[1];
    // 占原位的 div 样式
    var _d = useState(null), substituteStyle = _d[0], setSubstituteStyle = _d[1];
    var wrapperRefCB = useCallback(function (node) {
        if (node === null)
            return;
        function updatePosition() {
            var _a = node.getBoundingClientRect(), width = _a.width, height = _a.height, top = _a.top;
            if (top < offsetTop && !isAffixed) {
                // affix
                setSubstituteStyle({
                    width: width,
                    height: height,
                });
                setAffixed(true);
            }
            else {
                // 取消affix
                setAffixed(false);
            }
        }
        window.addEventListener('scroll', updatePosition, false);
        // 监听元素是否发生尺寸变化
        var ob = new ResizeObserver(updatePosition);
        ob.observe(node);
    }, []);
    return (jsxs("div", __assign({ className: 'violetAffix', ref: wrapperRefCB }, { children: [isAffixed && jsx("div", { style: substituteStyle }), jsx("div", __assign({ className: cn(className, 'violetAffix__content'), style: isAffixed
                    ? {
                        position: 'fixed',
                        top: offsetTop,
                    }
                    : undefined }, { children: children }))] })));
};

/**
 * 提供了一套常用的图标集合 基于 react-fontawesome。
 *
 * 支持 react-fontawesome的所有属性 可以在这里查询 https://github.com/FortAwesome/react-fontawesome#basic
 *
 * 支持 fontawesome 所有 free-solid-icons，可以在这里查看所有图标 https://fontawesome.com/icons?d=gallery&s=solid&m=free
 */
var Icon = function (props) {
    var _a;
    // icon-primary
    var className = props.className, theme = props.theme, restProps = __rest(props, ["className", "theme"]);
    var classes = cn('violetIcon', className, (_a = {},
        _a["icon--".concat(theme)] = theme,
        _a));
    return jsx(FontAwesomeIcon, __assign({ className: classes }, restProps));
};

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 *
 * 支持 HTMLInput 的所有基本属性
 */
var Input = forwardRef(function (props, ref) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
    var cnames = cn('input-wrapper', (_a = {},
        _a["input-size-".concat(size)] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (jsxs("div", __assign({ className: cnames, style: style }, { children: [prepend && jsx("div", __assign({ className: "input-group-prepend" }, { children: prepend })), icon && (jsx("div", __assign({ className: "icon-wrapper" }, { children: jsx(Icon, { icon: icon, title: "title-".concat(icon) }) }))), jsx("input", __assign({ ref: ref, className: "input-inner", disabled: disabled }, restProps)), append && jsx("div", __assign({ className: "input-group-append" }, { children: append }))] })));
});
Input.displayName = 'input';

var Transition = function (props) {
    var children = props.children, classNames = props.classNames, animation = props.animation, wrapper = props.wrapper, restProps = __rest(props, ["children", "classNames", "animation", "wrapper"]);
    return (jsx(CSSTransition, __assign({ classNames: classNames ? classNames : animation }, restProps, { children: wrapper ? jsx("div", { children: children }) : children })));
};
Transition.defaultProps = {
    // 设置当组件处于 exited 状态时卸载组件
    unmountOnExit: true,
    // 设置初始进入时拥有过渡效果
    appear: true,
};

function useDebounce(value, wait) {
    if (wait === void 0) { wait = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = setTimeout(function () {
            setDebouncedValue(value);
        }, wait);
        return function () {
            clearTimeout(handler);
        };
    }, [value, wait]);
    return debouncedValue;
}

function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}

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
var AutoComplete = function (_a) {
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
        return (jsx("ul", __assign({ className: "violetAutoComplete__dropdown" }, { children: suggestions.map(function (item, index) { return (jsx("li", __assign({ onClick: function () { return handleSelect(item); }, className: cn('violetAutoComplete__dropdown__item', {
                    'violetAutoComplete__dropdown__item--highlight': index === highlightIndex,
                }) }, { children: renderItem(item) }), index)); }) })));
    };
    return (jsxs("div", __assign({ className: cn('violetAutoComplete', className), ref: autoComplete }, { children: [jsx(Input, __assign({ value: inputValue, onChange: handleChange }, restProps, { onKeyDown: handleKeyDown })), isLoading && (jsx("div", __assign({ className: "violetAutoComplete__loading" }, { children: jsx(Icon, { icon: "spinner", spin: true }) }))), jsx(Transition, __assign({ in: suggestions.length > 0, animation: "zoom-in-top", timeout: 300 }, { children: generateDropdown() }))] })));
};

/**
 * >按钮用于开始一个即时操作。
 *
 * ### 何时使用
 * 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
 * 在violetUI我们提供了7种按钮
 *
 * - 默认按钮：用于没有主次之分的一组行动点。
 * - 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
 * - 危险按钮：删除/移动/修改权限等危险操作，一般需要二次确认。
 * - 链接按钮：一般用于链接，即导航至某位置。
 * - 文本按钮：用于最次级的行动点。
 * - 图标按钮：可以通过Icon组件，为按钮提供各式各样的图标选择。
 * - 虚线按钮：常用于添加操作。
 * - 禁用按钮：行动点不可用的时候，一般需要文案解释。
 *
 *
 * 除了默认按钮尺寸，还提供了两种尺寸配合使用
 * - Large Button
 * - Samll Button
 */
var Button = function (props) {
    var _a;
    var btnType = props.btnType, className = props.className, disabled = props.disabled, size = props.size, children = props.children, href = props.href, restProps = __rest(props
    // const debounceClick = () => {
    //   console.log('enter handler')
    //   console.log([props.onClick], '--onclick')
    //   if (!props.onClick) return
    //   return _.throttle(props.onClick, 2000)
    // }
    // const debouncedClick = debounceClick()
    //violetButton,violetButton-lg,violetButton-primary,
    , ["btnType", "className", "disabled", "size", "children", "href"]);
    // const debounceClick = () => {
    //   console.log('enter handler')
    //   console.log([props.onClick], '--onclick')
    //   if (!props.onClick) return
    //   return _.throttle(props.onClick, 2000)
    // }
    // const debouncedClick = debounceClick()
    //violetButton,violetButton-lg,violetButton-primary,
    var cls = cn('violetButton', className, (_a = {},
        _a["violetButton--".concat(btnType)] = btnType,
        _a["violetButton--".concat(size)] = size,
        _a['violetButton--disabled'] = btnType === 'link' && disabled,
        _a));
    if (btnType === 'link' && href) {
        return (jsx("a", __assign({ className: cls, href: href }, restProps, { children: children })));
    }
    else {
        return (jsx("button", __assign({ className: cls, disabled: disabled }, restProps, { children: children })));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: 'default',
};

/**
 * > 级联选择框。
 *
 * ### 何时使用
 * - 需要从一组**相关联**的数据集合进行选择，例如省市区，公司层级，事物分类等。
 * - 从一个**较大的数据集合**中进行选择时，用多级分类进行分隔，方便选择。
 * - 比起 `Select` 组件，可以在同一个浮层中完成选择，有较好的体验。
 */
var Cascader = function (_a) {
    var _b;
    var _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.changeOnSelect, changeOnSelect = _d === void 0 ? false : _d, inputClassName = _a.inputClassName, popupClassName = _a.popupClassName, _e = _a.notFoundContent, notFoundContent = _e === void 0 ? 'nothing here...' : _e, placeholder = _a.placeholder, options = _a.options, _f = _a.placement, placement = _f === void 0 ? 'bottomLeft' : _f, _g = _a.status, status = _g === void 0 ? 'default' : _g, value = _a.value, onChange = _a.onChange;
    // 控制浮层的出现
    var _h = useState(false), isPopupShow = _h[0], setPopupShow = _h[1];
    var inputClasses = cn('violetCascaderWrap__input', inputClassName, (_b = {
            'violetCascaderWrap__input--focus': isPopupShow,
            'violetCascaderWrap__input--disabled': disabled
        },
        _b["violetCascaderWrap__input--".concat(status)] = status !== 'default',
        _b));
    var popupClasses = cn('violetCascaderWrap__optionsWrap', "violetCascaderWrap__optionsWrap--".concat(placement), popupClassName);
    // 输入框显示的值
    var displayValue = value.join(' / ');
    var handleInputMouseDown = function () {
        if (!disabled && !isPopupShow) {
            setPopupShow(true);
        }
    };
    var cascaderInput = useRef(null);
    var popup = useRef(null);
    useClickOutside(popup, function (e) {
        var _a;
        if (!(e.target === cascaderInput.current ||
            ((_a = document
                .querySelector('.violetCascaderWrap__downIcon')) === null || _a === void 0 ? void 0 : _a.contains(e.target))) &&
            isPopupShow) {
            setPopupShow(false);
        }
    });
    // 浮层的列表内容  content结构:[[option, option, ..], [..], [..], ..]
    var _j = useState([]), content = _j[0], setContent = _j[1];
    useEffect(function () {
        var queue = [];
        if (options === null || options === void 0 ? void 0 : options.length) {
            // 把第一级推入队列
            for (var i = 0; i < options.length; i++) {
                var processedOption = __assign(__assign({}, options[i]), { isSelected: false, isFatherSelected: true, index: i.toString(), isLeaf: options[i].children ? false : true });
                queue.push(processedOption);
            }
        }
        var _loop_1 = function () {
            var queueSize = queue.length;
            var curLevel = [];
            for (var i = 0; i < queueSize; i++) {
                var headItem = queue.shift();
                var item = {
                    value: headItem.value,
                    disabled: headItem.disabled,
                    index: headItem.index,
                    isSelected: false,
                    isFatherSelected: headItem.isFatherSelected,
                    isLeaf: headItem.children ? false : true,
                };
                curLevel.push(item);
                // 如果不是disabled，把children推入队尾
                if (!headItem.disabled && headItem.children) {
                    for (var i_1 = 0; i_1 < headItem.children.length; i_1++) {
                        var item_1 = {
                            value: headItem.children[i_1].value,
                            disabled: headItem.children[i_1].disabled,
                            children: headItem.children[i_1].children,
                            index: "".concat(headItem.index, "-").concat(i_1),
                            isSelected: false,
                        };
                        queue.push(item_1);
                    }
                }
            }
            if (curLevel.length) {
                setContent(produce(function (draft) {
                    draft.push(curLevel);
                }));
            }
        };
        // 把children推入队列
        while (queue.length) {
            _loop_1();
        }
    }, []);
    // 触发 onChange
    useEffect(function () {
        var selectedValue = [];
        content.forEach(function (options) {
            options.forEach(function (option) {
                if (option.isSelected) {
                    selectedValue.push(option.value);
                    if (changeOnSelect) {
                        onChange(selectedValue);
                    }
                    else if (option.isLeaf) {
                        onChange(selectedValue);
                    }
                }
            });
        });
    }, [content]);
    // select option
    var handleSelectOption = function (option) {
        // 不是叶子节点时
        if (!option.isLeaf) {
            setContent(produce(function (draft) {
                var _loop_2 = function (i) {
                    var _loop_3 = function (j) {
                        if (content[i][j].index === option.index) {
                            // 同级所有isSelect先变为false
                            for (var x = 0; x < content[i].length; x++) {
                                draft[i][x].isSelected = false;
                            }
                            // 当前item的isSelect变成true
                            draft[i][j].isSelected = true;
                            // 之后所有层级的 isFatherSelect isSelect变为false
                            var lv = i + 1;
                            for (lv; lv < content.length; lv++) {
                                for (var k = 0; k < content[lv].length; k++) {
                                    draft[lv][k].isFatherSelected = false;
                                    draft[lv][k].isSelected = false;
                                }
                            }
                            // children的isFatherSelected变为true
                            draft[i + 1].forEach(function (option) {
                                var _a;
                                if (((_a = option.index) === null || _a === void 0 ? void 0 : _a.substring(0, option.index.length - 2)) ===
                                    draft[i][j].index) {
                                    option.isFatherSelected = true;
                                }
                            });
                        }
                    };
                    for (var j = 0; j < content[i].length; j++) {
                        _loop_3(j);
                    }
                };
                // 找到option，并修改它的isSelect
                for (var i = 0; i < content.length; i++) {
                    _loop_2(i);
                }
            }));
        }
        else {
            // 是叶子节点时
            setContent(produce(function (draft) {
                // 找到option，修改isSelect
                for (var i = 0; i < content.length; i++) {
                    for (var j = 0; j < content[i].length; j++) {
                        if (content[i][j].index === option.index) {
                            // 同级所有isSelect先变为false
                            for (var x = 0; x < content[i].length; x++) {
                                draft[i][x].isSelected = false;
                            }
                            // 当前item的isSelect变成true
                            draft[i][j].isSelected = true;
                        }
                    }
                }
            }));
            //改变value，关闭popup
            setPopupShow(false);
        }
    };
    return (jsxs("div", __assign({ className: "violetCascaderWrap" }, { children: [jsx("input", { ref: cascaderInput, type: "text", className: inputClasses, placeholder: placeholder, value: displayValue, onChange: function () {
                    return;
                }, onMouseDown: handleInputMouseDown, disabled: disabled }), jsx("div", __assign({ className: cn('violetCascaderWrap__downIcon', disabled && 'violetCascaderWrap__downIcon__icon--disabled'), onMouseDown: handleInputMouseDown }, { children: jsx(Icon, { icon: "angle-down", className: cn('violetCascaderWrap__downIcon__icon', isPopupShow && 'violetCascaderWrap__downIcon__icon--arrowUp') }) })), jsx(Transition, __assign({ in: isPopupShow, animation: "zoom-in-top", timeout: 300 }, { children: jsx("div", __assign({ className: popupClasses, ref: popup }, { children: content.length ? (content.map(function (options, index) { return (
                    // 每个列表
                    jsx("ul", __assign({ className: "violetCascaderWrap__optionsWrap__list" }, { children: options.map(function (option, index) {
                            // 每一项
                            return option.isFatherSelected && (jsxs("li", __assign({ className: cn('violetCascaderWrap__optionsWrap__list__item', {
                                    'violetCascaderWrap__optionsWrap__list__item--selected': option.isSelected,
                                }), onClick: function () { return handleSelectOption(option); } }, { children: [option.value, !option.isLeaf && (jsx("div", __assign({ className: "violetCascaderWrap__optionsWrap__list__item__iconBox" }, { children: jsx(Icon, { icon: "angle-right", className: "violetCascaderWrap__optionsWrap__list__item__iconBox__icon" }) })))] }), index));
                        }) }), index)); })) : (jsx("span", __assign({ className: "violetCascaderWrap__optionsWrap__notFound" }, { children: notFoundContent }))) })) }))] })));
};

function fieldsReducer(state, action) {
    var _a, _b, _c;
    switch (action.type) {
        case 'addField': {
            return __assign(__assign({}, state), (_a = {}, _a[action.name] = __assign({}, action.value), _a));
        }
        case 'updateValue': {
            return __assign(__assign({}, state), (_b = {}, _b[action.name] = __assign(__assign({}, state[action.name]), { value: action.value }), _b));
        }
        case 'updateValidateResult': {
            var _d = action.value, isValid = _d.isValid, errors = _d.errors;
            return __assign(__assign({}, state), (_c = {}, _c[action.name] = __assign(__assign({}, state[action.name]), { isValid: isValid, errors: errors }), _c));
        }
        default: {
            return state;
        }
    }
}
// * react hooks
// * class - ant design
function useStore(initialValues) {
    var _this = this;
    // form state
    var _a = useState({ isValid: true, isSubmitting: false, errors: {} }), form = _a[0], setForm = _a[1];
    var _b = useReducer(fieldsReducer, {}), fields = _b[0], dispatch = _b[1];
    var getFieldValue = function (key) {
        return fields[key] && fields[key].value;
    };
    var getFieldsValue = function () {
        return mapValues(fields, function (item) { return item.value; });
    };
    var setFieldValue = function (name, value) {
        if (fields[name]) {
            dispatch({ type: 'updateValue', name: name, value: value });
        }
    };
    var resetFields = function () {
        if (initialValues) {
            each(initialValues, function (value, name) {
                if (fields[name]) {
                    dispatch({ type: 'updateValue', name: name, value: value });
                }
            });
        }
    };
    var transfromRules = function (rules) {
        return rules.map(function (rule) {
            if (typeof rule === 'function') {
                var calledRule = rule({ getFieldValue: getFieldValue });
                return calledRule;
            }
            else {
                return rule;
            }
        });
    };
    var validateField = function (name) { return __awaiter(_this, void 0, void 0, function () {
        var _a, value, rules, afterRules, descriptor, valueMap, validator, isValid, errors, e_1, err;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = fields[name], value = _a.value, rules = _a.rules;
                    afterRules = transfromRules(rules);
                    descriptor = (_b = {},
                        _b[name] = afterRules,
                        _b);
                    valueMap = (_c = {},
                        _c[name] = value,
                        _c);
                    validator = new Schema(descriptor);
                    isValid = true;
                    errors = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _d.sent();
                    isValid = false;
                    err = e_1;
                    console.log('e', err.errors);
                    console.log('fields', err.fields);
                    errors = err.errors;
                    return [3 /*break*/, 5];
                case 4:
                    console.log('errors', isValid);
                    dispatch({ type: 'updateValidateResult', name: name, value: { isValid: isValid, errors: errors } });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var validateAllFields = function () { return __awaiter(_this, void 0, void 0, function () {
        var isValid, errors, valueMap, descriptor, validator, e_2, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isValid = true;
                    errors = {};
                    valueMap = mapValues(fields, function (item) { return item.value; });
                    descriptor = mapValues(fields, function (item) { return transfromRules(item.rules); });
                    validator = new Schema(descriptor);
                    setForm(__assign(__assign({}, form), { isSubmitting: true }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    isValid = false;
                    err = e_2;
                    errors = err.fields;
                    each(fields, function (value, name) {
                        // errors 中有对应的 key
                        if (errors[name]) {
                            var itemErrors = errors[name];
                            dispatch({ type: 'updateValidateResult', name: name, value: { isValid: false, errors: itemErrors } });
                        }
                        else if (value.rules.length > 0 && !errors[name]) {
                            dispatch({ type: 'updateValidateResult', name: name, value: { isValid: true, errors: [] } });
                        }
                        //  有对应的 rules，并且没有 errors
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setForm(__assign(__assign({}, form), { isSubmitting: false, isValid: isValid, errors: errors }));
                    return [2 /*return*/, {
                            isValid: isValid,
                            errors: errors,
                            values: valueMap
                        }];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        fields: fields,
        dispatch: dispatch,
        form: form,
        validateField: validateField,
        getFieldValue: getFieldValue,
        validateAllFields: validateAllFields,
        getFieldsValue: getFieldsValue,
        setFieldValue: setFieldValue,
        resetFields: resetFields,
    };
}

var FormContext = createContext({});
/**
 * >高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。
// /* eslint-disable react/display-name */
/**
 * > 表单控件, 带数据与管理功能, 包含数据录入、校验等
 *
 * ### 何时使用
 * - 用于创建一个实体或收集信息。
 * - 需要对输入的数据类型进行校验时。
 */
var Form = forwardRef(function (props, ref) {
    var name = props.name, children = props.children, initialValues = props.initialValues, onFinish = props.onFinish, onFinishFailed = props.onFinishFailed;
    var _a = useStore(initialValues), form = _a.form, fields = _a.fields, dispatch = _a.dispatch, restProps = __rest(_a, ["form", "fields", "dispatch"]);
    var validateField = restProps.validateField, validateAllFields = restProps.validateAllFields;
    useImperativeHandle(ref, function () {
        return __assign({}, restProps);
    });
    var passedContext = {
        dispatch: dispatch,
        fields: fields,
        initialValues: initialValues,
        validateField: validateField,
    };
    var submitForm = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, isValid, errors, values;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    e.stopPropagation();
                    return [4 /*yield*/, validateAllFields()];
                case 1:
                    _a = _b.sent(), isValid = _a.isValid, errors = _a.errors, values = _a.values;
                    if (isValid && onFinish) {
                        onFinish(values);
                    }
                    else if (!isValid && onFinishFailed) {
                        onFinishFailed(values, errors);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var childrenNode;
    if (typeof children === 'function') {
        childrenNode = children(form);
    }
    else {
        childrenNode = children;
    }
    return (jsx(Fragment, { children: jsx("form", __assign({ name: name, className: "violetForm", onSubmit: submitForm }, { children: jsx(FormContext.Provider, __assign({ value: passedContext }, { children: childrenNode })) })) }));
});
Form.defaultProps = {
    name: 'violet_form',
};
Form.displayName = 'Form';

/**
 * > 通过鼠标或键盘，输入范围内的数值。
 *
 * ### 何时使用
 * 当需要获取标准数值时。
 */
var InputNumber = function (_a) {
    var placeholder = _a.placeholder, _b = _a.autoFocus, autoFocus = _b === void 0 ? false : _b, _c = _a.controls, controls = _c === void 0 ? true : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.keyboard, keyboard = _e === void 0 ? true : _e, _f = _a.max, max = _f === void 0 ? Infinity : _f, _g = _a.min, min = _g === void 0 ? -Infinity : _g, _h = _a.status, status = _h === void 0 ? 'default' : _h, _j = _a.size, size = _j === void 0 ? 'default' : _j, _k = _a.step, step = _k === void 0 ? 1 : _k, value = _a.value, onChange = _a.onChange, onPressEnter = _a.onPressEnter;
    var classes = cn('voiletInputNumberWrap__inputNumber', {
        'voiletInputNumberWrap__inputNumber--disabled': disabled,
        'voiletInputNumberWrap__inputNumber--success': status === 'success',
        'voiletInputNumberWrap__inputNumber--error': status === 'error',
        'voiletInputNumberWrap__inputNumber--warning': status === 'warning',
        'voiletInputNumberWrap__inputNumber--small': size === 'small',
        'voiletInputNumberWrap__inputNumber--large': size === 'large',
    });
    var handleChange = function () {
        var value = inputEl === null || inputEl === void 0 ? void 0 : inputEl.value;
        if (Number(value) > max || Number(value) < min)
            return;
        onChange(value);
    };
    // 键盘事件
    var handleKeyDown = function (e) {
        switch (e.key) {
            case 'ArrowDown':
                if (!keyboard) {
                    e.preventDefault();
                }
                else {
                    handleChange();
                }
                break;
            case 'ArrowUp':
                if (!keyboard) {
                    e.preventDefault();
                }
                else {
                    handleChange();
                }
                break;
            case 'Enter':
                onPressEnter && onPressEnter();
                break;
        }
    };
    // 上下箭头事件
    var input = useRef(null);
    var inputEl = input.current;
    var handleAdd = function () {
        if (disabled)
            return;
        inputEl && inputEl.stepUp();
        handleChange();
    };
    var handleReduce = function () {
        if (disabled)
            return;
        inputEl && inputEl.stepDown();
        handleChange();
    };
    useEffect(function () {
        inputEl = input.current;
    }, []);
    return (jsxs("div", __assign({ className: "voiletInputNumberWrap" }, { children: [jsx("input", { ref: input, type: "number", className: classes, autoFocus: autoFocus, onChange: handleChange, value: value, step: step, min: min, max: max, onKeyDown: handleKeyDown, disabled: disabled, placeholder: placeholder }), controls && (jsxs("div", __assign({ className: "voiletInputNumberWrap__arrowWrap" }, { children: [jsx("button", __assign({ className: "voiletInputNumberWrap__arrowWrap__arrow", onClick: handleAdd }, { children: "+" })), jsx("button", __assign({ className: "voiletInputNumberWrap__arrowWrap__arrow", onClick: handleReduce }, { children: "-" }))] })))] })));
};

var MenuContext = createContext({
    index: '0',
    mode: 'horizontal',
});
/**
 * > 为页面和功能提供导航的菜单列表。
 *
 * ### 何时使用
 * 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。
 *
 * 一般分为**顶部导航**和**侧边导航**，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
 *
 * ### 开发者注意事项
 * Menu组件的使用，需搭配 `Menu.Item`/`Menu.SubMenu` 作为子组件来进行开发
 */
var Menu = function (_a) {
    var className = _a.className, onSelect = _a.onSelect, style = _a.style, _b = _a.defaultIndex, defaultIndex = _b === void 0 ? '0' : _b, _c = _a.mode, mode = _c === void 0 ? 'horizontal' : _c, children = _a.children;
    var _d = useState(defaultIndex), activeIndex = _d[0], setActiveIndex = _d[1];
    function handleClick(index) {
        setActiveIndex(index);
        onSelect && onSelect(index);
    }
    var passContext = {
        index: activeIndex,
        onSelect: handleClick,
        mode: mode,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childEl = child;
            var childName = childEl.type['name'];
            if (childName === 'MenuItem' || childName === 'SubMenu') {
                return React.cloneElement(childEl, { index: index.toString() });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    var classes = cn(className, 'violetMenu', {
        'violetMenu--vertical': mode === 'vertical',
    });
    return (jsx("ul", __assign({ className: classes, style: style, "data-testid": "test-menu" }, { children: jsx(MenuContext.Provider, __assign({ value: passContext }, { children: renderChildren() })) })));
};

var SubMenu = function (_a) {
    var title = _a.title, className = _a.className, index = _a.index, children = _a.children;
    var context = useContext(MenuContext);
    // 控制 dropdown 的出现
    var _b = useState(context.mode === 'horizontal' ? false : true), dropdownShow = _b[0], setDropdownShow = _b[1];
    var hoverEvents = context.mode === 'horizontal'
        ? {
            onMouseOver: function () { return setDropdownShow(true); },
            onMouseLeave: function () { return setDropdownShow(false); },
        }
        : {};
    var handleClick = function () {
        if (context.onSelect && typeof index === 'string') {
            context.onSelect(index);
        }
    };
    var clickEvents = context.mode === 'vertical'
        ? {
            onClick: function () {
                handleClick();
                setDropdownShow(!dropdownShow);
            },
        }
        : { onClick: handleClick };
    var classes = cn(className, 'violetMenu__subMenu', {
        'violetMenu__subMenu--active': context.index.startsWith(index),
        'violetMenu__menuItem--activeAsfirstLevelItem': context.index.startsWith(index) && (index === null || index === void 0 ? void 0 : index.length) === 1,
    });
    var dropdownIconClasses = cn('violetMenu__subMenu__title__icon', {
        'violetMenu__subMenu__title__icon--arrowUp': dropdownShow,
    });
    var menuRef = useRef(null);
    var menuEl = menuRef.current;
    var menuHeight = menuEl === null || menuEl === void 0 ? void 0 : menuEl.clientHeight;
    var renderChildren = function () {
        var childrenComponents = React.Children.map(children, function (child, i) {
            var childEl = child;
            var childName = childEl.type['name'];
            if (childName === 'MenuItem') {
                return React.cloneElement(childEl, {
                    index: "".concat(index, "-").concat(i),
                    className: 'violetMenu__subMenu__dropDownList__li',
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
        return (jsx("ul", __assign({ className: "violetMenu__subMenu__dropDownList", style: { top: "".concat(menuHeight + 2, "px") } }, { children: childrenComponents })));
    };
    return (jsxs("li", __assign({ className: classes }, hoverEvents, { ref: menuRef }, { children: [jsxs("div", __assign({ className: "violetMenu__subMenu__title" }, clickEvents, { children: [title, jsx(Icon, { icon: "angle-down", className: dropdownIconClasses })] })), jsx(Transition, __assign({ in: dropdownShow, animation: "zoom-in-top", timeout: 300 }, { children: renderChildren() }))] }), index));
};

var MenuItem = function (_a) {
    var style = _a.style, className = _a.className, disabled = _a.disabled, index = _a.index, children = _a.children;
    var context = useContext(MenuContext);
    var handleClick = function () {
        if (!disabled && context.onSelect && typeof index === 'string') {
            context.onSelect(index);
        }
    };
    var classes = cn(className, 'violetMenu__menuItem', {
        'violetMenu__menuItem--disabled': disabled === true,
        'violetMenu__menuItem--active': context.index === index,
        'violetMenu__menuItem--activeAsfirstLevelItem': context.index === index && index.length === 1,
    });
    return (jsx("li", __assign({ className: classes, style: style, onClick: handleClick }, { children: children }), index));
};

var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

/**
 * > 展示工作流的进度
 *
 * ### 何时使用
 * 当需要较长时间完成一样任务时，你可以通过`progress`来记录当前的进度和状态
 *
 *
 */
var Progress = function (props) {
    var _a;
    var percent = props.percent, showInfo = props.showInfo; props.status; props.strokeColor; props.strokeLinecap; var success = props.success, innerColor = props.innerColor, type = props.type, className = props.className; props.children; var size = props.size; __rest(props, ["percent", "showInfo", "status", "strokeColor", "strokeLinecap", "success", "innerColor", "type", "className", "children", "size"]);
    var classes = cn('violetProgress', className, (_a = {},
        _a["violetProgress--".concat(size)] = size !== undefined,
        _a["violetProgress--".concat(type)] = type !== undefined,
        _a));
    if (percent !== undefined) {
        if ('type' in props && type === 'circle') {
            if (('success' in props && success == true) || percent >= 100) {
                return (jsx("div", __assign({ className: classes }, { children: jsx("div", __assign({ className: "violetProgress__circle", style: {
                            background: "conic-gradient(#96c24e 0deg, #96c24e 360deg)",
                        } }, { children: jsx("div", __assign({ className: "violetProgress__circle__percent", style: { background: innerColor } }, { children: showInfo ? jsx("label", { children: "\u221A" }) : null })) })) })));
            }
            return (jsx("div", __assign({ className: classes }, { children: jsx("div", __assign({ className: "violetProgress__circle", style: {
                        background: "conic-gradient(#8076a3 0deg, #8076a3 ".concat(percent * 3.6, "deg, #e9d7df ").concat(percent * 3.6, "deg, #e9d7df 360deg)"),
                    } }, { children: jsx("div", __assign({ className: "violetProgress__circle__percent", style: { background: innerColor } }, { children: showInfo ? jsxs("label", { children: [" ", percent, "%"] }) : null })) })) })));
        }
        if (percent >= 100 || ('success' in props && success == true)) {
            return (jsxs("div", __assign({ className: classes }, { children: [jsx("div", __assign({ className: "violetProgress__line__container" }, { children: jsx("div", { className: "violetProgress__line__progress", style: { width: 240, background: '#96c24e' } }) })), showInfo ? jsx("label", { children: " \u221A" }) : null] })));
        }
        return (jsxs("div", __assign({ className: classes }, { children: [jsx("div", __assign({ className: "violetProgress__line__container" }, { children: jsx("div", { className: "violetProgress__line__progress", style: { width: ((percent * 1.0) / 100) * 240 } }) })), showInfo ? jsxs("label", { children: [" ", percent, "%"] }) : null] })));
    }
    else if ('success' in props && success === true) {
        if (type === 'circle') {
            return (jsx("div", __assign({ className: classes }, { children: jsx("div", __assign({ className: "violetProgress__circle", style: {
                        background: "conic-gradient(#96c24e 0deg, #96c24e 360deg)",
                    } }, { children: jsx("div", __assign({ className: "violetProgress__circle__percent", style: { background: innerColor } }, { children: showInfo ? jsx("label", { children: "\u221A" }) : null })) })) })));
        }
        else {
            return (jsxs("div", __assign({ className: classes }, { children: [jsx("div", __assign({ className: "violetProgress__line__container" }, { children: jsx("div", { className: "violetProgress__line__progress", style: { width: 240, background: '#96c24e' } }) })), showInfo ? jsx("label", { children: " \u221A" }) : null] })));
        }
    }
    else {
        return (jsxs("div", __assign({ className: classes }, { children: [jsx("div", __assign({ className: "violetProgress__line__container" }, { children: jsx("div", { className: "violetProgress__line__progress", style: { width: 0 } }) })), showInfo ? jsx("label", { children: " 0%" }) : null] })));
    }
};

var Radio = function (props) {
    var className = props.className, value = props.value, key = props.key, disabled = props.disabled, children = props.children, style = props.style, type = props.type, onChange = props.onChange; __rest(props, ["className", "value", "key", "disabled", "children", "style", "type", "onChange"]);
    var _a = useState(false), checked = _a[0], setChecked = _a[1];
    var classes = cn('violetRadio', className, {
        'violetRadio--disabled': disabled,
        'violetRadio--checked': checked,
    });
    React.useEffect(function () {
        if ('checked' in props &&
            props.checked !== checked &&
            props.checked != undefined) {
            setChecked(props.checked);
        }
    }, [props.checked]);
    var handleClick = function (e) {
        if (disabled) {
            return;
        }
        if (!('checked' in props)) {
            setChecked(false);
        }
        if (checked) {
            setChecked(false);
        }
        else {
            setChecked(true);
        }
        if (typeof onChange === 'function') {
            onChange(e);
        }
    };
    if ('type' in props && type == 'button') {
        return (jsx("span", __assign({ className: classes }, { children: jsxs("div", __assign({ className: "violetRadio__button", onClick: handleClick, onChange: handleClick }, { children: [jsx("input", { type: 'radio', disabled: disabled, value: value, checked: checked, style: style }, key), jsx("label", { children: children })] })) })));
    }
    return (jsx("span", __assign({ className: classes }, { children: jsxs("div", __assign({ className: "violetRadio__dot" }, { children: [jsx("input", { type: "radio", disabled: disabled, value: value, checked: checked, style: style, onChange: handleClick }, key), jsx("label", {}), jsx("span", { children: props.children })] })) })));
};
Radio.defaultProps = {
    disabled: false,
    checked: false,
};

/**
 * > 单选，由用户从一个或多个选项中做出选择
 *
 * ### 何时使用
 * 在众多选项中选出一个状态
 *
 * 与select组件相比，radio能够使用户更为清晰地比较各个选项，所以不宜添加过多的选项
 *
 *
 */
var RadioGroup = function (props) {
    var _a;
    var className = props.className, disabled = props.disabled, children = props.children, size = props.size; props.style; var type = props.type, onChange = props.onChange; __rest(props, ["className", "disabled", "children", "size", "style", "type", "onChange"]);
    var _b = useState(props.defaultValue || props.value), value = _b[0], setValue = _b[1];
    var classes = cn('violetRadioGroup', className, (_a = {},
        _a['violetRadioGroup--${size}'] = size,
        _a['violetRadioGroup--disabled'] = disabled,
        _a));
    var handleClick = function (e) {
        var newValue = e.target.innerHTML;
        setValue(newValue);
        onChange && onChange(e);
    };
    var newChildren = React.Children.map(children, function (child) {
        if (child.type !== Radio) {
            return null;
        }
        if ('type' in props && type == 'button') {
            return React.cloneElement(child, {
                checked: child.props.value === value,
                disabled: disabled,
                onChange: handleClick,
                type: 'button',
            });
        }
        return React.cloneElement(child, {
            checked: child.props.value === value,
            disabled: disabled,
            onChange: handleClick,
        });
    });
    return jsx("span", __assign({ className: classes }, { children: newChildren }));
};

var index = { Radio: Radio, RadioGroup: RadioGroup };

var Option = function (props) {
    var index = props.index, value = props.value, label = props.label, disabled = props.disabled, children = props.children, onSelect = props.onSelect, selectedValues = props.selectedValues, multiple = props.multiple;
    // 判断当前value是否已选中
    var isSelected = selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.includes(value);
    // 每个option的点击处理函数
    var handleClick = function (e, value, isSelected) {
        e.preventDefault();
        if (onSelect && !disabled)
            onSelect(value, isSelected);
    };
    // 拼接class
    var className = cn('violetSelect__item', {
        'violetSelectItem--disabled': disabled,
        'violetSelectItem--selected': isSelected,
    });
    return (
    // 有children，则显示children；否则，有label，显示label，否则显示 value
    jsxs("li", __assign({ className: className, onClick: function (e) { return handleClick(e, value, isSelected || false); } }, { children: [children || (label ? label : value), multiple && isSelected && jsx(Icon, { icon: "check" })] }), index));
};
// 设置displayName,在调试中会看到，否则显示component
Option.displayName = 'Option';

/** 定义全局的量 */
/** 当没有provide，则用括号里的默认值 */
createContext({
    selectedValues: [],
});
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 */
var Select = function (props) {
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
                return (jsx(Option, __assign({ index: "select-".concat(index) }, item, { onSelect: handleOptionClick, selectedValues: selectedValues, multiple: multiple }), index));
            });
        }
        else {
            return jsx(Option, { disabled: true, value: '暂无数据' });
        }
    };
    // 类名拼接
    var className = cn('violetSelect', {
        'violetSelect--menuOpen': menuOpen,
        'violetSelect--disabled': disabled,
        'violetSelect--multiple': multiple,
    });
    return (
    // input上的图标的动画是css写的
    jsxs("div", __assign({ className: className, ref: containerRef }, { children: [jsxs("div", __assign({ className: "violetSelect__input" }, { children: [!showSearch && (jsx(Input, { ref: input, placeholder: placeholder, value: value, disabled: disabled, name: name, readOnly: true, icon: "angle-down", size: size, onClick: handleClick })), showSearch && (jsx(Input, { ref: input, disabled: disabled, name: name, icon: "angle-down", size: size, value: value, onChange: handleInputChange, onClick: handleSearchClick, autoComplete: "off" }))] })), jsx(Transition, __assign({ in: menuOpen, animation: "zoom-in-top", timeout: 300 }, { children: jsx("ul", __assign({ className: "violetSelect__dropdown" }, { children: generateOptions() })) })), multiple && (jsx("div", __assign({ className: "violetSelected__tags", style: { maxWidth: containerWidth.current - 32 } }, { children: selectedValues.map(function (item, index) {
                    return (jsxs("span", __assign({ className: "violetSelected__tags__tag" }, { children: [item, jsx(Icon, { icon: "times", onClick: function () {
                                    handleOptionClick(item, true);
                                } })] }), "tag-".concat(index)));
                }) })))] })));
};
Select.defaultProps = {
    name: 'violetSelect',
    placeholder: '请选择',
    filterOption: true,
    defaultValue: '',
};

var Switch = function (props) {
    var _a;
    var className = props.className, disabled = props.disabled, defaultChecked = props.defaultChecked, pchecked = props.checked, size = props.size, checkedChildren = props.checkedChildren, unCheckedChildren = props.unCheckedChildren, onChange = props.onChange, _b = props.theme, theme = _b === void 0 ? 'primary' : _b, others = __rest(props, ["className", "disabled", "defaultChecked", "checked", "size", "checkedChildren", "unCheckedChildren", "onChange", "theme"]);
    var _c = useState(defaultChecked || pchecked || false), checked = _c[0], setChecked = _c[1];
    useEffect(function () {
        if ('checked' in props && pchecked !== undefined) {
            setChecked(pchecked);
        }
    }, [pchecked, props]);
    var handleClick = function () {
        if (!disabled) {
            if (!('checked' in props)) {
                setChecked(!checked);
            }
            onChange === null || onChange === void 0 ? void 0 : onChange(!checked);
        }
    };
    var cls = cn((_a = {
            violetSwitch: true,
            'violetSwitch--small': size === 'small',
            'violetSwitch--checked': checked,
            'violetSwitch--disabled': disabled
        },
        _a["violetSwitch--".concat(theme)] = theme,
        _a[className] = !!className,
        _a));
    return (jsxs("button", __assign({}, others, { type: "button", role: "Switch", "aria-checked": "true", className: cls, onClick: handleClick }, { children: [jsx("div", { className: "violetSwitch__handle" }), jsx("span", __assign({ className: "violetSwitch__inner" }, { children: checked ? checkedChildren : unCheckedChildren }))] })));
};

/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 */
var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, children = props.children, type = props.type, mode = props.mode;
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleClick = function (e, index, disabled) {
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var tabsClass = cn({
        'violetTabs--horizontal': mode !== 'vertical' && mode !== null,
        'violetTabs--vertical': mode === 'vertical',
    });
    var contentClass = cn({
        'violetTabs__content--horizontal': mode !== 'vertical' && mode !== null,
        'violetTabs__content--vertical': mode === 'vertical',
    });
    var navClass = cn('violetTabs__nav', {
        'violetTabs__nav--line': type === 'line',
        'violetTabs__nav--card': type === 'card',
        'nav--vertical': mode === 'vertical' && type === 'line',
    });
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            var classes = cn('violetTabs__navItem', {
                isActive: activeIndex === index,
                disabled: disabled,
            });
            return (jsx("li", __assign({ className: classes, onClick: function (e) {
                    handleClick(e, index, disabled);
                } }, { children: label }), "navItem-".concat(index)));
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === activeIndex) {
                return child;
            }
        });
    };
    return (jsxs("div", __assign({ className: "violetTabs ".concat(className, "  ").concat(tabsClass) }, { children: [jsx("ul", __assign({ className: navClass }, { children: renderNavLinks() })), jsx("div", __assign({ className: "violetTabs__content ".concat(contentClass) }, { children: renderContent() }))] })));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line',
};

var TabItem = function (_a) {
    var children = _a.children;
    return jsx("div", __assign({ className: "violetTab_panel" }, { children: children }));
};

var TransTabs = Tabs;
TransTabs.Item = TabItem;

/**
 * > 多选框。
 *
 * ### 何时使用
 * 在一组可选项中进行多项选择时使用多选框；
 *
 * 单独使用时可以表示两种状态之间的切换，一般用于状态标记。
 */
var CheckBox = function (props) {
    var _a = props.type, type = _a === void 0 ? 'default' : _a, _b = props.disabled, disabled = _b === void 0 ? false : _b, _c = props.checked, checked = _c === void 0 ? false : _c, value = props.value, name = props.name, label = props.label, indeterminate = props.indeterminate;
    var _d = useState(checked || false), checkBoxChecked = _d[0], setCheckBoxChecked = _d[1];
    var _e = useState(false), isIndeterminate = _e[0], setIsIndeterminate = _e[1];
    useEffect(function () {
        setCheckBoxChecked(checked);
    }, [checked]);
    useEffect(function () {
        setIsIndeterminate(indeterminate || false);
    }, [indeterminate]);
    function handleChange(evt) {
        setCheckBoxChecked(evt.target.checked);
        props.onChange && props.onChange(evt);
    }
    cn({
        'violetCheckBox--disabled': disabled,
        'violetCheckBox--indeterminate': isIndeterminate,
    });
    return (jsx("div", __assign({ className: [
            'violetCheckBox',
            cn({
                'violetCheckBox--disabled': disabled
            })
        ].join(' ') }, { children: jsxs("label", { children: [jsx("input", { type: 'checkbox', checked: checkBoxChecked, name: name, disabled: disabled, onChange: handleChange, value: value || label, className: [
                        "violetCheckBox".concat(type),
                        cn({
                            '--disabled': disabled,
                            '--indeterminate': isIndeterminate
                        })
                    ].join(' ') }), jsx("span", { children: props.children ? props.children : label ? label : value })] }) })));
};

var Row = function (_a) {
    var justify = _a.justify, align = _a.align, children = _a.children;
    var _b = useState({}), tbalign = _b[0], setTbalign = _b[1];
    var _c = useState({}), tbjustify = _c[0], setTbjustify = _c[1];
    useEffect(function () {
        pjustify();
        palign();
    }, []);
    function pjustify() {
        switch (justify) {
            case 'start':
                setTbjustify({
                    justifyContent: 'flex-start'
                });
                break;
            case 'center':
                setTbjustify({
                    justifyContent: 'center'
                });
                break;
            case 'end':
                setTbjustify({
                    justifyContent: 'flex-end'
                });
                break;
            case 'space-around':
                setTbjustify({
                    justifyContent: 'space-around'
                });
                break;
            case 'space-between':
                setTbjustify({
                    justifyContent: 'space-between'
                });
                break;
            default:
                setTbjustify({});
        }
    }
    function palign() {
        switch (align) {
            case 'top':
                setTbalign({
                    alignItems: 'flex-start'
                });
                break;
            case 'middle':
                setTbalign({
                    alignItems: 'center'
                });
                break;
            case 'bottom':
                setTbalign({
                    alignItems: 'flex-end'
                });
                break;
            default:
                setTbalign({});
        }
    }
    return (jsx("div", __assign({ className: "violetRow", style: __assign(__assign({}, tbalign), tbjustify) }, { children: children })));
};

// 入口文件
library.add(fas);

export { Affix, AutoComplete, Button, Cascader, CheckBox, Form, Icon, Input, InputNumber, TransMenu as Menu, Progress, index as Radio, index as RadioGroup, Row, Select, Switch as Switcher, TransTabs as Tabs, Transition };
