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
export var Radio = function (props) {
    var className = props.className, value = props.value, key = props.key, disabled = props.disabled, children = props.children, style = props.style, type = props.type, onChange = props.onChange, restProps = __rest(props, ["className", "value", "key", "disabled", "children", "style", "type", "onChange"]);
    var _a = useState(false), checked = _a[0], setChecked = _a[1];
    var classes = classNames('violetRadio', className, {
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
        return (React.createElement("span", { className: classes },
            React.createElement("div", { className: "violetRadio__button", onClick: handleClick, onChange: handleClick },
                React.createElement("input", { type: 'radio', disabled: disabled, value: value, key: key, checked: checked, style: style }),
                React.createElement("label", null, children))));
    }
    return (React.createElement("span", { className: classes },
        React.createElement("div", { className: "violetRadio__dot" },
            React.createElement("input", { type: "radio", disabled: disabled, value: value, key: key, checked: checked, style: style, onChange: handleClick }),
            React.createElement("label", null),
            React.createElement("span", null, props.children))));
};
Radio.defaultProps = {
    disabled: false,
    checked: false,
};
export default Radio;
