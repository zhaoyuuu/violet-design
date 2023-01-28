import React, { ReactNode, CSSProperties, useState, useEffect } from 'react'
import classNames from 'classnames'

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
}

const Switch = (props: SwitchProps) => {
  const {
    className,
    disabled,
    defaultChecked,
    checked: pchecked,
    children,
    style,
    checkedChildren,
    unCheckedChildren,
    onChange,
    ...others
  } = props

  const [checked, setChecked] = useState(defaultChecked || pchecked || false)

  useEffect(() => {
    if ('checked' in props && pchecked !== undefined) {
      setChecked(pchecked)
    }
  }, [pchecked])

  const handleClick = () => {
    if (!('checked' in props)) {
      setChecked(!checked)
    }

    onChange?.(!checked)
  }
  const cls = classNames({
    VioletSwitch: true,
    'VioletSwitch-checked': checked,
    'VioletSwitch-disabled': disabled,
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
      <div className="VioletSwitch-handle"></div>
      <span className="VioletSwitch-inner">
        {checked ? checkedChildren : unCheckedChildren}
      </span>
    </button>
  )
}

export default Switch
