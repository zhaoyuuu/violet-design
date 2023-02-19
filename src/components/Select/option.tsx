import React, { ReactNode, FC } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
export interface SelectOptionProps {
  index?: string
  /** 默认根据此属性值进行筛选，该值不能相同*/
  value: string
  /** 选项的标签，若不设置则默认与 value 相同*/
  label?: string
  /** 是否禁用该选项*/
  disabled?: boolean
  children?: ReactNode
  onSelect?: (value: string, isSelected?: boolean) => void
  selectedValues?: string[]
  multiple?: boolean
}

export const Option: FC<SelectOptionProps> = props => {
  const {
    index,
    value,
    label,
    disabled,
    children,
    onSelect,
    selectedValues,
    multiple,
  } = props
  // 判断当前value是否已选中
  const isSelected = selectedValues?.includes(value)
  // 每个option的点击处理函数
  const handleClick = (
    e: React.MouseEvent,
    value: string,
    isSelected: boolean
  ) => {
    e.preventDefault()
    if (onSelect && !disabled) onSelect(value, isSelected)
  }
  // 拼接class
  const className = classNames('violetSelect__item', {
    'violetSelectItem--disabled': disabled,
    'violetSelectItem--selected': isSelected,
  })
  return (
    // 有children，则显示children；否则，有label，显示label，否则显示 value
    <dd
      key={index}
      className={className}
      onClick={e => handleClick(e, value, isSelected || false)}
    >
      {children || (label ? label : value)}
      {multiple && isSelected && <Icon icon="check" />}
    </dd>
  )
}

// 设置displayName,在调试中会看到，否则显示component
Option.displayName = 'Option'

export default Option
