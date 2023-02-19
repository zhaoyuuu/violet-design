import React, { FC } from 'react'
interface RowProps {
  /** 水平排列方式 */
  justify?: string
  /** 垂直排列方式 */
  align?: string
  /** 栅格间隔 */
  gutter?: number
  children?: React.ReactNode
}
export declare const Row: FC<RowProps>
export default Row
