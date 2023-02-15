import * as React from 'react';
import Icon from '../../Icon';
var defaultProps = {
    title: '',
};
var CalendarHead = function (_a) {
    var onPrev = _a.onPrev, onNext = _a.onNext, prevIcon = _a.prevIcon, nextIcon = _a.nextIcon, title = _a.title, onTitleClick = _a.onTitleClick;
    return (React.createElement("div", { className: "calendar__head" },
        React.createElement("div", { className: "calendar__head--prev" }, prevIcon && (React.createElement("button", { onClick: onPrev, className: "calendar__head--button", type: "button" },
            React.createElement(Icon, { icon: "angles-left", color: "#00000040" })))),
        React.createElement("h2", { className: "calendar__head--title", onClick: onTitleClick }, title),
        React.createElement("div", { className: "calendar__head--next" }, nextIcon && (React.createElement("button", { onClick: onNext, className: "calendar__head--button", type: "button" },
            React.createElement(Icon, { icon: "angles-right", color: "#00000040" }))))));
};
CalendarHead.defaultProps = defaultProps;
export default CalendarHead;
