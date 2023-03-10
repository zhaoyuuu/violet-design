import { FC } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    /** 支持框架主题 根据主题显示不同的颜色 */
    theme?: ThemeProps;
}
/**
 * 提供了一套常用的图标集合 基于 react-fontawesome。
 *
 * ###何时使用
 *需要使用图标表达或装饰时
 *
 */
export declare const Icon: FC<IconProps>;
export default Icon;
