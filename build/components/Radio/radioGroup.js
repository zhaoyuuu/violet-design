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
import React, { useState } from 'react';
import classNames from 'classnames';
import Radio from './radio';
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
export var RadioGroup = function (props) {
    var _a;
    var className = props.className, disabled = props.disabled, children = props.children, size = props.size, style = props.style, type = props.type, onChange = props.onChange, restProps = __rest(props, ["className", "disabled", "children", "size", "style", "type", "onChange"]);
    var _b = useState(props.defaultValue || props.value), value = _b[0], setValue = _b[1];
    var classes = classNames('violetRadioGroup', className, (_a = {},
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
    return React.createElement("span", { className: classes }, newChildren);
};
export default RadioGroup;
