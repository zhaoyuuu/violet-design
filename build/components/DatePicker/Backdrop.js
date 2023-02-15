import React from 'react';
import classNames from 'classnames';
var Backdrop = function (_a) {
    var invert = _a.invert, show = _a.show, onClick = _a.onClick;
    return (React.createElement(React.Fragment, null, show && (React.createElement("div", { onClick: onClick, className: classNames('rc-backdrop', { invert: invert }) }))));
};
export default Backdrop;
