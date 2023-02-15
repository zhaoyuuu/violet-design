import React, { useState } from 'react';
import classNames from 'classnames';
/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 */
export var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, children = props.children, type = props.type, mode = props.mode;
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleClick = function (e, index, disabled) {
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var tabsClass = classNames({
        'violetTabs--horizontal': mode !== 'vertical' && mode !== null,
        'violetTabs--vertical': mode === 'vertical',
    });
    var contentClass = classNames({
        'violetTabs__content--horizontal': mode !== 'vertical' && mode !== null,
        'violetTabs__content--vertical': mode === 'vertical',
    });
    var navClass = classNames('violetTabs__nav', {
        'violetTabs__nav--line': type === 'line',
        'violetTabs__nav--card': type === 'card',
        'nav--vertical': mode === 'vertical' && type === 'line',
    });
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            var classes = classNames('violetTabs__navItem', {
                isActive: activeIndex === index,
                disabled: disabled,
            });
            return (React.createElement("li", { className: classes, key: "navItem-".concat(index), onClick: function (e) {
                    handleClick(e, index, disabled);
                } }, label));
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === activeIndex) {
                return child;
            }
        });
    };
    return (React.createElement("div", { className: "violetTabs ".concat(className, "  ").concat(tabsClass) },
        React.createElement("ul", { className: navClass }, renderNavLinks()),
        React.createElement("div", { className: "violetTabs__content ".concat(contentClass) }, renderContent())));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line',
};
export default Tabs;
