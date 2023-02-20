import React, { ReactNode, createContext } from 'react'
import { InputSize } from '../Input/input'
import { SelectOptionProps } from './option'

export default interface SelectProps {
  /** 指定默认选中的条目 */
  defaultValue?: string | string[]
  /** 指定当前选中的条目，多选时为一个数组 */
  value?: string | string[]
  /** 选择框默认文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否支持多选*/
  multiple?: boolean
  /** select input 的 name 属性 */
  name?: string
  /** 选中值发生变化时触发 */
  onChange?: (selectedValue: any, selectedValues?: string[]) => void
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
  /** 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 */
  options:
    | SelectOptionProps[]
    | { label: string; options: SelectOptionProps[] }[]
  /** 选择框大小 */
  size?: InputSize
  /** 配置是否可搜索 */
  showSearch?: boolean
  /** 是否根据输入项进行筛选 */
  filterOption?:
    | boolean
    | ((inputValue: string, options: SelectOptionProps[]) => boolean)
  /** 文本框值变化时回调 */
  onSearch?: (value: string) => void
  style?: React.CSSProperties
}
