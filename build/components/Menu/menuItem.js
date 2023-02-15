import React, { useContext } from 'react';
import cn from 'classnames';
import { MenuContext } from './menu';
export var MenuItem = function (_a) {
    var style = _a.style, className = _a.className, disabled = _a.disabled, index = _a.index, children = _a.children;
    var context = useContext(MenuContext);
    var handleClick = function () {
        if (!disabled && context.onSelect && typeof index === 'string') {
            context.onSelect(index);
        }
    };
    var classes = cn(className, 'violetMenu__menuItem', {
        'violetMenu__menuItem--disabled': disabled === true,
        'violetMenu__menuItem--active': context.index === index,
        'violetMenu__menuItem--activeAsfirstLevelItem': context.index === index && index.length === 1,
    });
    return (React.createElement("li", { key: index, className: classes, style: style, onClick: handleClick }, children));
};
export default MenuItem;
