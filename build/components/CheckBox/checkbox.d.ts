import React, { FC } from 'react'
export interface CheckBoxProps {
  /** 样式选择 */
  type?: string
  /** 是否勾选 */
  checked?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 多选框的value值 */
  value?: string | number
  /** name属性 */
  name?: string
  /** label名称 */
  label?: string
  /** 是否为统一全选控制按键 */
  indeterminate?: any
  onChange?: (evt: any) => void
  /** 可选的子组件 */
  children?: React.ReactNode
}
/**
 * > 多选框。
 *
 * ### 何时使用
 * 在一组可选项中进行多项选择时使用多选框；
 *
 * 单独使用时可以表示两种状态之间的切换，一般用于状态标记。
 */
export declare const CheckBox: FC<CheckBoxProps>
export default CheckBox
