import React, { FC, useEffect, useState } from 'react'
import classnames from 'classnames';

export interface CheckBoxProps {
  type?: string, 
  checked?: boolean, 
  disabled?: boolean, 
  value?: string | number, 
  name?: string, 
  label?: string, 
  indeterminate?: any, 
  onChange?: (evt: any) => void,
  children?: React.ReactNode; // 可选的子组件
}
export const CheckBox: FC<CheckBoxProps> = (props) => {
  const {
    type = 'default',
    disabled = false,
    checked = false,
    value,
    name,
    label,
    indeterminate
  } = props
  const [checkBoxChecked, setCheckBoxChecked] = useState(checked || false)
  const [isIndeterminate, setIsIndeterminate] = useState(false)

  useEffect(() => {
    setCheckBoxChecked(checked)
  }, [checked])

  useEffect(() => {
    setIsIndeterminate(indeterminate || false)
  }, [indeterminate])

  function handleChange(evt: any) {
    setCheckBoxChecked(evt.target.checked)
    props.onChange && props.onChange(evt)
  }

  const componentClass = classnames( {
    'violetCheckBox--disabled': disabled,
    'violetCheckBox--indeterminate': isIndeterminate,
  });

  return (
    <div
      className={[
        'violetCheckBox',
        classnames({
          'violetCheckBox--disabled': disabled
        })
      ].join(' ')}
    >
      <label>
        <input
          type='checkbox'
          checked={checkBoxChecked}
          name={name}
          disabled={disabled}
          onChange={handleChange}
          value={value || label}
          className={[
            `violetCheckBox${type}`,
            classnames({
              '--disabled':disabled,
              '--indeterminate': isIndeterminate
            })
          ].join(' ')}
        />
        <span>{props.children ? props.children : label ? label : value}</span>
      </label>
    </div>
  )
}

export default CheckBox;
