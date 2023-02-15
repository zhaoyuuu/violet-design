import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
/**
 * > 通过鼠标或键盘，输入范围内的数值。
 *
 * ### 何时使用
 * 当需要获取标准数值时。
 */
export var InputNumber = function (_a) {
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
            default:
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
    return (React.createElement("div", { className: "voiletInputNumberWrap" },
        React.createElement("input", { ref: input, type: "number", className: classes, autoFocus: autoFocus, onChange: handleChange, value: value, step: step, min: min, max: max, onKeyDown: handleKeyDown, disabled: disabled, placeholder: placeholder }),
        controls && (React.createElement("div", { className: "voiletInputNumberWrap__arrowWrap" },
            React.createElement("button", { className: "voiletInputNumberWrap__arrowWrap__arrow", onClick: handleAdd }, "+"),
            React.createElement("button", { className: "voiletInputNumberWrap__arrowWrap__arrow", onClick: handleReduce }, "-")))));
};
export default InputNumber;
