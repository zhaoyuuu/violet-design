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
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
export var Switch = function (props) {
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
    var cls = classNames((_a = {
            violetSwitch: true,
            'violetSwitch--small': size === 'small',
            'violetSwitch--checked': checked,
            'violetSwitch--disabled': disabled
        },
        _a["violetSwitch--".concat(theme)] = theme,
        _a[className] = !!className,
        _a));
    return (React.createElement("button", __assign({}, others, { type: "button", role: "Switch", "aria-checked": "true", className: cls, onClick: handleClick }),
        React.createElement("div", { className: "violetSwitch__handle" }),
        React.createElement("span", { className: "violetSwitch__inner" }, checked ? checkedChildren : unCheckedChildren)));
};
export default Switch;
