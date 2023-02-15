import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
/**
 * > 多选框。
 *
 * ### 何时使用
 * 在一组可选项中进行多项选择时使用多选框；
 *
 * 单独使用时可以表示两种状态之间的切换，一般用于状态标记。
 */
export var CheckBox = function (props) {
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
    var componentClass = classnames({
        'violetCheckBox--disabled': disabled,
        'violetCheckBox--indeterminate': isIndeterminate,
    });
    return (React.createElement("div", { className: [
            'violetCheckBox',
            classnames({
                'violetCheckBox--disabled': disabled
            })
        ].join(' ') },
        React.createElement("label", null,
            React.createElement("input", { type: 'checkbox', checked: checkBoxChecked, name: name, disabled: disabled, onChange: handleChange, value: value || label, className: [
                    "violetCheckBox".concat(type),
                    classnames({
                        '--disabled': disabled,
                        '--indeterminate': isIndeterminate
                    })
                ].join(' ') }),
            React.createElement("span", null, props.children ? props.children : label ? label : value))));
};
export default CheckBox;
