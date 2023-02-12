import React, { FC, useEffect, useState } from 'react'
import classnames from 'classnames';

export interface CheckBoxProps {
  /** 样式选择 */
  type?: string, 
  /** 是否勾选 */
  checked?: boolean, 
  /** 是否禁用 */
  disabled?: boolean, 
  /** 多选框的value值 */
  value?: string | number, 
  /** name属性 */
  name?: string, 
  /** label名称 */
  label?: string, 
  /** 是否为统一全选控制按键 */
  indeterminate?: any, 
  onChange?: (evt: any) => void,
  /** 可选的子组件 */
  children?: React.ReactNode; 
}

/**
 * > 多选框。
 * 
 * ### 何时使用
 * 在一组可选项中进行多项选择时使用多选框；
 * 
 * 单独使用时可以表示两种状态之间的切换，一般用于状态标记。
 */

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
