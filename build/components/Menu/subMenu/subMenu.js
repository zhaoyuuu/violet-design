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
import React, { useContext, useState, useRef } from 'react';
import cn from 'classnames';
import { MenuContext } from '../menu';
import Icon from '../../Icon';
import Transition from '../../Transition/transition';
export var SubMenu = function (_a) {
    var title = _a.title, className = _a.className, index = _a.index, children = _a.children;
    var context = useContext(MenuContext);
    // 控制 dropdown 的出现
    var _b = useState(context.mode === 'horizontal' ? false : true), dropdownShow = _b[0], setDropdownShow = _b[1];
    var hoverEvents = context.mode === 'horizontal'
        ? {
            onMouseOver: function () { return setDropdownShow(true); },
            onMouseLeave: function () { return setDropdownShow(false); },
        }
        : {};
    var handleClick = function () {
        if (context.onSelect && typeof index === 'string') {
            context.onSelect(index);
        }
    };
    var clickEvents = context.mode === 'vertical'
        ? {
            onClick: function () {
                handleClick();
                setDropdownShow(!dropdownShow);
            },
        }
        : { onClick: handleClick };
    var classes = cn(className, 'violetMenu__subMenu', {
        'violetMenu__subMenu--active': context.index.startsWith(index),
        'violetMenu__menuItem--activeAsfirstLevelItem': context.index.startsWith(index) && (index === null || index === void 0 ? void 0 : index.length) === 1,
    });
    var dropdownIconClasses = cn('violetMenu__subMenu__title__icon', {
        'violetMenu__subMenu__title__icon--arrowUp': dropdownShow,
    });
    var menuRef = useRef(null);
    var menuEl = menuRef.current;
    var menuHeight = menuEl === null || menuEl === void 0 ? void 0 : menuEl.clientHeight;
    var renderChildren = function () {
        var childrenComponents = React.Children.map(children, function (child, i) {
            var childEl = child;
            var childName = childEl.type['name'];
            if (childName === 'MenuItem') {
                return React.cloneElement(childEl, {
                    index: "".concat(index, "-").concat(i),
                    className: 'violetMenu__subMenu__dropDownList__li',
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
        return (React.createElement("ul", { className: "violetMenu__subMenu__dropDownList", style: { top: "".concat(menuHeight + 2, "px") } }, childrenComponents));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents, { ref: menuRef }),
        React.createElement("div", __assign({ className: "violetMenu__subMenu__title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: dropdownIconClasses })),
        React.createElement(Transition, { in: dropdownShow, animation: "zoom-in-top", timeout: 300 }, renderChildren())));
};
export default SubMenu;
