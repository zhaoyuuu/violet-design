import React, { ReactNode, useState, useRef } from 'react'
import classNames from 'classnames'

export type RadioType = 'button' | 'dot'

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
  /**设置radio的样式*/
  style?: React.CSSProperties
  /**设置样式*/
  type?: RadioType
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
    style,
    type,
    onChange,
    ...restProps
  } = props

  const [checked, setChecked] = useState(false)

  const classes = classNames('violetRadio', className, {
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

  if ('type' in props && type == 'button') {
    return (
      <span className={classes}>
        <div className="violetRadio__button">
          <input
            type={'radio'}
            disabled={disabled}
            value={value}
            key={key}
            checked={checked}
            style={style}
            onChange={handleClick}
          />
          <label>{children}</label>
        </div>
      </span>
    )
  }

  return (
    <span className={classes}>
      <div className="violetRadio__dot">
        <input
          type="radio"
          disabled={disabled}
          value={value}
          key={key}
          checked={checked}
          style={style}
          onChange={handleClick}
        />
        <label></label>
        <span>{props.children}</span>
      </div>
    </span>
  )
}

Radio.defaultProps = {
  disabled: false,
  checked: false,
}

export default Radio
