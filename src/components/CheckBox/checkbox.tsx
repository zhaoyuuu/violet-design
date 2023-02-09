import React, { FC, useEffect, useState } from 'react'
import './_style.scss'

import classnames from 'classnames';

export interface CheckBoxProps {
  type?: string, // 样式类型
  checked?: boolean, // 是否选中
  disabled?: boolean, // 是否禁用
  value?: string | number, // 单独 value 值
  name?: string, // 原生 name 属性
  label?: string, // label 名称
  indeterminate?: any, // 是否为统一全选控制按钮组件
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

  const componentClass = classnames('checkbox', {
    'checkbox--disabled': disabled,
    'checkbox--indeterminate': isIndeterminate,
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
          type='CheckBox'
          checked={checkBoxChecked}
          name={name}
          disabled={disabled}
          onChange={handleChange}
          value={value || label}
          className={[
            `violetCheckBox-type_${type}`,
            classnames({
              'violetCheckBox--disabled':disabled,
              'violetCheckBox--indeterminate': isIndeterminate
            })
          ].join(' ')}
        />
        <span>{props.children ? props.children : label ? label : value}</span>
      </label>
    </div>
  )
}

export default CheckBox;
