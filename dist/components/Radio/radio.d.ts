import React, { ReactNode } from 'react'
export type RadioType = 'button' | 'dot'
export interface RadioProps {
  /**设置类名*/
  className?: string
  value?: string
  key?: string
  /**是否选中*/
  checked?: boolean
  /**是否禁用*/
  disabled?: boolean
  children?: ReactNode
  /**设置radio的样式*/
  style?: React.CSSProperties
  /**设置样式*/
  type?: RadioType
  /**添加函数*/
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
}
export declare const Radio: React.FC<RadioProps>
export default Radio
