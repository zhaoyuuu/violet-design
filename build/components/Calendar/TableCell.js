import * as React from 'react';
import { ifExistCall } from '../../_utils/DateUtil';
var Cell = function (_a) {
    var className = _a.className, text = _a.text, subText = _a.subText, onClick = _a.onClick, onMouseOver = _a.onMouseOver;
    return (React.createElement("td", { onClick: function () { return ifExistCall(onClick, text); }, onMouseOver: function () { return ifExistCall(onMouseOver, text); }, className: className },
        React.createElement("div", null, text),
        subText && React.createElement("span", { className: "sub__text" }, subText)));
};
export default Cell;
