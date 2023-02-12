import React, { ReactNode, useState } from 'react'
import classNames from 'classnames'

import Radio from './radio'

import { clickOptions } from '@testing-library/user-event/dist/click'

export type RadioGroupType = 'button' | 'dot'

export interface RadioGroupProps {
  /**设置类名*/
  className?: string
  value?: string
  /**默认的值*/
  defaultValue?: string
  //是否禁用
  disabled?: boolean
  children?: ReactNode
  /**调整radio大小*/
  size?: string
  /**设置radio的样式*/
  style?: React.CSSProperties
  /**设置radio的类型*/
  type?: RadioGroupType
  /**添加函数*/
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
}

export const RadioGroup: React.FC<RadioGroupProps> = props => {
  const {
    className,
    disabled,
    children,
    size,
    style,
    type,
    onChange,
    ...restProps
  } = props

  const [value, setValue] = useState(props.defaultValue || props.value)

  const classes = classNames('violetRadioGroup', className, {
    ['violetRadioGroup--${size}']: size,
    'violetRadioGroup--disabled': disabled,
  })

  const handleClick = (e: any) => {
    const newValue = e.target.innerHTML
    setValue(newValue)
    onChange && onChange(e)
  }

  const newChildren = React.Children.map(children, (child: any) => {
    if (child.type !== Radio) {
      return null
    }
    if ('type' in props && type == 'button') {
      return React.cloneElement(child, {
        checked: child.props.value === value,
        disabled: disabled,
        onChange: handleClick,
        type: 'button',
      })
    }
    return React.cloneElement(child, {
      checked: child.props.value === value,
      disabled: disabled,
      onChange: handleClick,
    })
  })

  return <span className={classes}>{newChildren}</span>
}

export default RadioGroup
