import React, { ReactNode, CSSProperties, useState, useEffect } from 'react'
import classNames from 'classnames'

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

export interface SwitchProps {
  className?: string
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  checkedChildren?: ReactNode
  unCheckedChildren?: ReactNode
  size?: 'small' | 'medium'
  children?: ReactNode
  style?: CSSProperties
  theme?: ThemeProps
}

export const Switch: React.FC<SwitchProps> = props => {
  const {
    className,
    disabled,
    defaultChecked,
    checked: pchecked,
    size,
    checkedChildren,
    unCheckedChildren,
    onChange,
    theme = 'primary',
    ...others
  } = props

  const [checked, setChecked] = useState(defaultChecked || pchecked || false)

  useEffect(() => {
    if ('checked' in props && pchecked !== undefined) {
      setChecked(pchecked)
    }
  }, [pchecked, props])
  const handleClick = () => {
    if (!disabled) {
      if (!('checked' in props)) {
        setChecked(!checked)
      }

      onChange?.(!checked)
    }
  }
  const cls = classNames({
    VioletSwitch: true,
    'VioletSwitch--small': size === 'small',
    'VioletSwitch--checked': checked,
    'VioletSwitch--disabled': disabled,
    [`VioletSwitch--${theme}`]: theme,
    [className as string]: !!className,
  })

  return (
    <button
      {...others}
      type="button"
      role="Switch"
      aria-checked="true"
      className={cls}
      onClick={handleClick}
    >
      <div className="VioletSwitch__handle"></div>
      <span className="VioletSwitch__inner">
        {checked ? checkedChildren : unCheckedChildren}
      </span>
    </button>
  )
}

export default Switch
