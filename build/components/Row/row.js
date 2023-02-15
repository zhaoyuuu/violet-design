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
import React, { useEffect, useState } from 'react';
export var Row = function (_a) {
    var justify = _a.justify, align = _a.align, children = _a.children;
    var _b = useState({}), tbalign = _b[0], setTbalign = _b[1];
    var _c = useState({}), tbjustify = _c[0], setTbjustify = _c[1];
    useEffect(function () {
        pjustify();
        palign();
    }, []);
    function pjustify() {
        switch (justify) {
            case 'start':
                setTbjustify({
                    justifyContent: 'flex-start'
                });
                break;
            case 'center':
                setTbjustify({
                    justifyContent: 'center'
                });
                break;
            case 'end':
                setTbjustify({
                    justifyContent: 'flex-end'
                });
                break;
            case 'space-around':
                setTbjustify({
                    justifyContent: 'space-around'
                });
                break;
            case 'space-between':
                setTbjustify({
                    justifyContent: 'space-between'
                });
                break;
            default:
                setTbjustify({});
        }
    }
    function palign() {
        switch (align) {
            case 'top':
                setTbalign({
                    alignItems: 'flex-start'
                });
                break;
            case 'middle':
                setTbalign({
                    alignItems: 'center'
                });
                break;
            case 'bottom':
                setTbalign({
                    alignItems: 'flex-end'
                });
                break;
            default:
                setTbalign({});
        }
    }
    return (React.createElement("div", { className: "violetRow", style: __assign(__assign({}, tbalign), tbjustify) }, children));
};
export default Row;
