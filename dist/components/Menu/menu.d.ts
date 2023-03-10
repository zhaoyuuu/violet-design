import React, { ReactNode } from 'react';
type selectCallback = (selectIndex: string) => void;
type Mode = 'vertical' | 'horizontal';
export interface IMenuProps {
    /** 添加自定义类名 */
    className?: string;
    /** 设置点击触发的回调函数 */
    onSelect?: selectCallback;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 设置默认高亮选项 */
    defaultIndex?: string;
    /** 横向 or 纵向 */
    mode?: Mode;
    children?: ReactNode;
}
export interface IMenuContext {
    index: string;
    onSelect?: selectCallback;
    mode: Mode;
}
export declare const MenuContext: React.Context<IMenuContext>;
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
export declare const Menu: React.FC<IMenuProps>;
export default Menu;
