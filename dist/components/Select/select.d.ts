import React, { ReactNode, FC } from 'react'
import { InputSize } from '../Input/input'
import { SelectOptionProps } from './option'
export interface SelectProps {
  /** 指定默认选中的条目 */
  defaultValue?: string | string[]
  /** 选择框默认文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否支持多选*/
  multiple?: boolean
  /** select input 的 name 属性 */
  name?: string
  /** 选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
  /** 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 */
  options: SelectOptionProps[]
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
}
/** 下拉框 */
export interface IselectContext {
  onSelect?: (value: string, isSelected?: boolean) => void
  selectedValues: string[]
  multiple?: boolean
}
/** 定义全局的量 */
/** 当没有provide，则用括号里的默认值 */
export declare const SelectContext: React.Context<IselectContext>
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 */
export declare const Select: FC<SelectProps>
export default Select
