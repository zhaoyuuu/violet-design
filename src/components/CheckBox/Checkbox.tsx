
import React, { useEffect, useState } from 'react'
import './index.scss'

const classnames = require('classnames')

export interface Iprops {
  type: string // 样式类型
  checked: boolean // 是否选中
  disabled: boolean // 是否禁用
  value: string | number // 单独 value 值
  name?: string // 原生 name 属性
  label: string // label 名称
  indeterminate?: any // 是否为统一全选控制按钮组件
}
function CheckBox(props: any) {
  const {
    type = 'default',
    disabled = false,
    checked = false,
    value,
    name,
    label,
    indeterminate
  }: Iprops = props
  const [checkBoxChecked, setCheckBoxChecked] = useState(checked || false)
  const [isIndeterminate, setIsIndeterminate] = useState(false)
  useEffect(() => {
    //  监听 初始化判断是否为 多选组选项行为
    {
      setCheckBoxChecked(false)
    }
  }, [props.checkGroupValue]) // eslint-disable-line
  useEffect(() => {
    setCheckBoxChecked(checked)
  }, [props.checked]) // eslint-disable-line

  useEffect(() => {
    console.log(checkBoxChecked, 3333)
  }, [checkBoxChecked]) // eslint-disable-line
  useEffect(() => {
    setIsIndeterminate(indeterminate ? indeterminate : false)
  }, [indeterminate]) // eslint-disable-line
  function handleChange(evt: any) {
    setCheckBoxChecked(evt.target.checked)
    props.onChange && props.onChange(evt)
  }

  return (
    <div
      className={[
        'tb-checkbox',
        classnames({
          'is-disabled': disabled
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
            `checkbox-type_${type}`,
            classnames({
              'is-disabled': disabled,
              // 判断是否需要 全选，如果全选加标记
              'is-indeterminate': isIndeterminate
            })
          ].join(' ')}
        />
        <span>{props.children ? props.children : label ? label : value}</span>
      </label>
    </div>
  )
}

CheckBox.defaultProps = {
  disabled: false,
  type: 'default',
}

export default CheckBox

