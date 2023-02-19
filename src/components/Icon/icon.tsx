import React, { FC } from 'react'
import classNames from 'classnames'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

// 自带size 属性，需要一个字符串值,如 xs、lg、2x、3x 等
export interface IconProps extends FontAwesomeIconProps {
  /** 支持框架主题 根据主题显示不同的颜色 */
  theme?: ThemeProps
}

/**
 * 提供了一套常用的图标集合 基于 react-fontawesome。
 *
 * ###何时使用
 *需要使用图标表达或装饰时
 *
 */
export const Icon: FC<IconProps> = props => {
  // icon-primary
  const { className, theme, ...restProps } = props
  const classes = classNames('violetIcon', className, {
    [`icon--${theme}`]: theme,
  })
  return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon
