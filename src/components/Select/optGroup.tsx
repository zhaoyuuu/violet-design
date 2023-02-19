import React, { FC } from 'react'
import classNames from 'classnames'
import Option, { SelectOptionProps } from './option'

export interface OptionGroupProps {
  key: string
  /** 组名 */
  label: string
  /** 分组里的选项 */
  options: SelectOptionProps[]
  onSelect: (value: string, isSelected?: boolean | undefined) => void
  selectedValues: string[]
  multiple: boolean | undefined
}

export const Optgroup: FC<OptionGroupProps> = props => {
  const { label, options, onSelect, selectedValues, multiple } = props
  const generateOptions = () => {
    return options.map((item, index) => {
      return (
        <Option
          index={`select-${index}`}
          key={index}
          {...item}
          onSelect={onSelect}
          selectedValues={selectedValues}
          multiple={multiple}
        ></Option>
      )
    })
  }

  return (
    <>
      <dt className="violetSelect__optGroup">{label}</dt>
      {generateOptions()}
    </>
  )
}

export default Optgroup
