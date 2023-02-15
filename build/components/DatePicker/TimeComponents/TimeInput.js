import * as React from 'react';
import Icon from '../../Icon';
var TimeInput = function (_a) {
    var onUp = _a.onUp, onDown = _a.onDown, onChange = _a.onChange, onBlur = _a.onBlur, value = _a.value;
    return (React.createElement("div", { className: "time-input" },
        React.createElement("div", { className: "time-input__up" },
            React.createElement("button", { onClick: onUp, type: "button" },
                React.createElement(Icon, { icon: "angles-up" }))),
        React.createElement("div", { className: "time-input__text" },
            React.createElement("input", { type: "text", value: value, onChange: onChange, onBlur: onBlur })),
        React.createElement("div", { className: "time-input__down" },
            React.createElement("button", { onClick: onDown, type: "button" },
                React.createElement(Icon, { icon: "angles-down" })))));
};
TimeInput.defaultProps = {
    value: 0,
};
export default TimeInput;
