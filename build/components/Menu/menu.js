import React, { createContext, useState } from 'react';
import cn from 'classnames';
export var MenuContext = createContext({
    index: '0',
    mode: 'horizontal',
});
/**
 * > 为页面和功能提供导航的菜单列表。
 *
 * ### 何时使用
 * 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。
 *
 * 一般分为**顶部导航**和**侧边导航**，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
 *
 * ### 开发者注意事项
 * Menu组件的使用，需搭配 `Menu.Item`/`Menu.SubMenu` 作为子组件来进行开发
 */
export var Menu = function (_a) {
    var className = _a.className, onSelect = _a.onSelect, style = _a.style, _b = _a.defaultIndex, defaultIndex = _b === void 0 ? '0' : _b, _c = _a.mode, mode = _c === void 0 ? 'horizontal' : _c, children = _a.children;
    var _d = useState(defaultIndex), activeIndex = _d[0], setActiveIndex = _d[1];
    function handleClick(index) {
        setActiveIndex(index);
        onSelect && onSelect(index);
    }
    var passContext = {
        index: activeIndex,
        onSelect: handleClick,
        mode: mode,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childEl = child;
            var childName = childEl.type['name'];
            if (childName === 'MenuItem' || childName === 'SubMenu') {
                return React.cloneElement(childEl, { index: index.toString() });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    var classes = cn(className, 'violetMenu', {
        'violetMenu--vertical': mode === 'vertical',
    });
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passContext }, renderChildren())));
};
export default Menu;
