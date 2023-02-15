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
 * >按钮用于开始一个即时操作。
 *
 * ### 何时使用
 * 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
 * 在violetUI我们提供了7种按钮
 *
 * - 默认按钮：用于没有主次之分的一组行动点。
 * - 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
 * - 危险按钮：删除/移动/修改权限等危险操作，一般需要二次确认。
 * - 链接按钮：一般用于链接，即导航至某位置。
 * - 文本按钮：用于最次级的行动点。
 * - 图标按钮：可以通过Icon组件，为按钮提供各式各样的图标选择。
 * - 虚线按钮：常用于添加操作。
 * - 禁用按钮：行动点不可用的时候，一般需要文案解释。
 *
 *
 * 除了默认按钮尺寸，还提供了两种尺寸配合使用
 * - Large Button
 * - Samll Button
 */
export var Button = function (props) {
    var _a;
    var btnType = props.btnType, className = props.className, disabled = props.disabled, size = props.size, children = props.children, href = props.href, restProps = __rest(props
    // const debounceClick = () => {
    //   console.log('enter handler')
    //   console.log([props.onClick], '--onclick')
    //   if (!props.onClick) return
    //   return _.throttle(props.onClick, 2000)
    // }
    // const debouncedClick = debounceClick()
    //violetButton,violetButton-lg,violetButton-primary,
    , ["btnType", "className", "disabled", "size", "children", "href"]);
    // const debounceClick = () => {
    //   console.log('enter handler')
    //   console.log([props.onClick], '--onclick')
    //   if (!props.onClick) return
    //   return _.throttle(props.onClick, 2000)
    // }
    // const debouncedClick = debounceClick()
    //violetButton,violetButton-lg,violetButton-primary,
    var cls = classNames('violetButton', className, (_a = {},
        _a["violetButton--".concat(btnType)] = btnType,
        _a["violetButton--".concat(size)] = size,
        _a['violetButton--disabled'] = btnType === 'link' && disabled,
        _a));
    if (btnType === 'link' && href) {
        return (React.createElement("a", __assign({ className: cls, href: href }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({ className: cls, disabled: disabled }, restProps), children));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: 'default',
};
export default Button;
