import React, { ReactNode, useState, useRef } from 'react'
import classNames from 'classnames'

export type RadioSize = 'sm' | 'lg'

export interface RadioProps {
  /**设置类名*/
  className?: string
  value?: string
  key?: string
  /**是否选中*/
  checked?: boolean
  /**是否禁用*/
  disabled?: boolean
  children?: ReactNode
  /**调整radio大小*/
  size?: RadioSize
  /**设置radio的样式*/
  style?: React.CSSProperties
  /**添加函数*/
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
}

export const Radio: React.FC<RadioProps> = props => {
  const {
    className,
    value,
    key,
    disabled,
    children,
    size,
    style,
    onChange,
    ...restProps
  } = props

  const [checked, setChecked] = useState(false)

  const classes = classNames('violetRadio', className, {
    [`violetRadio--${size}`]: size !== undefined,
    'violetRadio--disabled': disabled,
    'violetRadio--checked': checked,
  })

  React.useEffect(() => {
    if (
      'checked' in props &&
      props.checked !== checked &&
      props.checked != undefined
    ) {
      setChecked(props.checked)
    }
  }, [props.checked])

  const handleClick = (e: any) => {
    if (disabled) {
      return
    }

    if (!('checked' in props)) {
      setChecked(false)
    }

    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }

    if (typeof onChange === 'function') {
      onChange(e)
    }
  }

  return (
    <span className={classes}>
      <input
        type="radio"
        disabled={disabled}
        value={value}
        key={key}
        checked={checked}
        style={style}
        onChange={handleClick}
      />
      <span>{props.children}</span>
    </span>
  )
}

Radio.defaultProps = {
  disabled: false,
  checked: false,
}

export default Radio
