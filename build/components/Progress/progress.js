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
import React from 'react';
import classNames from 'classnames';
/**
 * > 展示工作流的进度
 *
 * ### 何时使用
 * 当需要较长时间完成一样任务时，你可以通过`progress`来记录当前的进度和状态
 *
 *
 */
export var Progress = function (props) {
    var _a;
    var percent = props.percent, showInfo = props.showInfo, status = props.status, strokeColor = props.strokeColor, strokeLinecap = props.strokeLinecap, success = props.success, innerColor = props.innerColor, type = props.type, className = props.className, children = props.children, size = props.size, restProps = __rest(props, ["percent", "showInfo", "status", "strokeColor", "strokeLinecap", "success", "innerColor", "type", "className", "children", "size"]);
    var classes = classNames('violetProgress', className, (_a = {},
        _a["violetProgress--".concat(size)] = size !== undefined,
        _a["violetProgress--".concat(type)] = type !== undefined,
        _a));
    if (percent !== undefined) {
        if ('type' in props && type === 'circle') {
            if (('success' in props && success == true) || percent >= 100) {
                return (React.createElement("div", { className: classes },
                    React.createElement("div", { className: "violetProgress__circle", style: {
                            background: "conic-gradient(#96c24e 0deg, #96c24e 360deg)",
                        } },
                        React.createElement("div", { className: "violetProgress__circle__percent", style: { background: innerColor } }, showInfo ? React.createElement("label", null, "\u221A") : null))));
            }
            return (React.createElement("div", { className: classes },
                React.createElement("div", { className: "violetProgress__circle", style: {
                        background: "conic-gradient(#8076a3 0deg, #8076a3 ".concat(percent * 3.6, "deg, #e9d7df ").concat(percent * 3.6, "deg, #e9d7df 360deg)"),
                    } },
                    React.createElement("div", { className: "violetProgress__circle__percent", style: { background: innerColor } }, showInfo ? React.createElement("label", null,
                        " ",
                        percent,
                        "%") : null))));
        }
        if (percent >= 100 || ('success' in props && success == true)) {
            return (React.createElement("div", { className: classes },
                React.createElement("div", { className: "violetProgress__line__container" },
                    React.createElement("div", { className: "violetProgress__line__progress", style: { width: 240, background: '#96c24e' } })),
                showInfo ? React.createElement("label", null, " \u221A") : null));
        }
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: "violetProgress__line__container" },
                React.createElement("div", { className: "violetProgress__line__progress", style: { width: ((percent * 1.0) / 100) * 240 } })),
            showInfo ? React.createElement("label", null,
                " ",
                percent,
                "%") : null));
    }
    else if ('success' in props && success === true) {
        if (type === 'circle') {
            return (React.createElement("div", { className: classes },
                React.createElement("div", { className: "violetProgress__circle", style: {
                        background: "conic-gradient(#96c24e 0deg, #96c24e 360deg)",
                    } },
                    React.createElement("div", { className: "violetProgress__circle__percent", style: { background: innerColor } }, showInfo ? React.createElement("label", null, "\u221A") : null))));
        }
        else {
            return (React.createElement("div", { className: classes },
                React.createElement("div", { className: "violetProgress__line__container" },
                    React.createElement("div", { className: "violetProgress__line__progress", style: { width: 240, background: '#96c24e' } })),
                showInfo ? React.createElement("label", null, " \u221A") : null));
        }
    }
    else {
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: "violetProgress__line__container" },
                React.createElement("div", { className: "violetProgress__line__progress", style: { width: 0 } })),
            showInfo ? React.createElement("label", null, " 0%") : null));
    }
};
export default Progress;
