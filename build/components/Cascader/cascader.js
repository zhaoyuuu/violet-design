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
import React, { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import produce from 'immer';
import useClickOutside from '../../hooks/useClickOutside';
import Icon from '../Icon';
import Transition from '../Transition/transition';
/**
 * > 级联选择框。
 *
 * ### 何时使用
 * - 需要从一组**相关联**的数据集合进行选择，例如省市区，公司层级，事物分类等。
 * - 从一个**较大的数据集合**中进行选择时，用多级分类进行分隔，方便选择。
 * - 比起 `Select` 组件，可以在同一个浮层中完成选择，有较好的体验。
 */
export var Cascader = function (_a) {
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
    return (React.createElement("div", { className: "violetCascaderWrap" },
        React.createElement("input", { ref: cascaderInput, type: "text", className: inputClasses, placeholder: placeholder, value: displayValue, onChange: function () {
                return;
            }, onMouseDown: handleInputMouseDown, disabled: disabled }),
        React.createElement("div", { className: cn('violetCascaderWrap__downIcon', disabled && 'violetCascaderWrap__downIcon__icon--disabled'), onMouseDown: handleInputMouseDown },
            React.createElement(Icon, { icon: "angle-down", className: cn('violetCascaderWrap__downIcon__icon', isPopupShow && 'violetCascaderWrap__downIcon__icon--arrowUp') })),
        React.createElement(Transition, { in: isPopupShow, animation: "zoom-in-top", timeout: 300 },
            React.createElement("div", { className: popupClasses, ref: popup }, content.length ? (content.map(function (options, index) { return (
            // 每个列表
            React.createElement("ul", { key: index, className: "violetCascaderWrap__optionsWrap__list" }, options.map(function (option, index) {
                // 每一项
                return option.isFatherSelected && (React.createElement("li", { key: index, className: cn('violetCascaderWrap__optionsWrap__list__item', {
                        'violetCascaderWrap__optionsWrap__list__item--selected': option.isSelected,
                    }), onClick: function () { return handleSelectOption(option); } },
                    option.value,
                    !option.isLeaf && (React.createElement("div", { className: "violetCascaderWrap__optionsWrap__list__item__iconBox" },
                        React.createElement(Icon, { icon: "angle-right", className: "violetCascaderWrap__optionsWrap__list__item__iconBox__icon" })))));
            }))); })) : (React.createElement("span", { className: "violetCascaderWrap__optionsWrap__notFound" }, notFoundContent))))));
};
export default Cascader;
