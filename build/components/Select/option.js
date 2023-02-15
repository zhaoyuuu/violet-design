import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
export var Option = function (props) {
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
    var className = classNames('violetSelect__item', {
        'violetSelectItem--disabled': disabled,
        'violetSelectItem--selected': isSelected,
    });
    return (
    // 有children，则显示children；否则，有label，显示label，否则显示 value
    React.createElement("li", { key: index, className: className, onClick: function (e) { return handleClick(e, value, isSelected || false); } },
        children || (label ? label : value),
        multiple && isSelected && React.createElement(Icon, { icon: "check" })));
};
// 设置displayName,在调试中会看到，否则显示component
Option.displayName = 'Option';
export default Option;
