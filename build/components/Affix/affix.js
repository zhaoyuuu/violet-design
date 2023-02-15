import React, { useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import cn from 'classnames';
/**
 * > 将页面元素钉在可视范围。
 *
 * ### 何时使用
 * 当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。
 *
 * 页面可视范围过小时，慎用此功能以免遮挡页面内容。
 */
export var Affix = function (_a) {
    var className = _a.className, _b = _a.offsetTop, offsetTop = _b === void 0 ? 0 : _b, children = _a.children;
    // 是否affix
    var _c = useState(false), isAffixed = _c[0], setAffixed = _c[1];
    // 占原位的 div 样式
    var _d = useState(null), substituteStyle = _d[0], setSubstituteStyle = _d[1];
    var wrapperRefCB = useCallback(function (node) {
        if (node === null)
            return;
        function updatePosition() {
            var _a = node.getBoundingClientRect(), width = _a.width, height = _a.height, top = _a.top;
            if (top < offsetTop && !isAffixed) {
                // affix
                setSubstituteStyle({
                    width: width,
                    height: height,
                });
                setAffixed(true);
            }
            else {
                // 取消affix
                setAffixed(false);
            }
        }
        window.addEventListener('scroll', updatePosition, false);
        // 监听元素是否发生尺寸变化
        var ob = new ResizeObserver(updatePosition);
        ob.observe(node);
    }, []);
    return (React.createElement("div", { className: 'violetAffix', ref: wrapperRefCB },
        isAffixed && React.createElement("div", { style: substituteStyle }),
        React.createElement("div", { className: cn(className, 'violetAffix__content'), style: isAffixed
                ? {
                    position: 'fixed',
                    top: offsetTop,
                }
                : undefined }, children)));
};
export default Affix;
