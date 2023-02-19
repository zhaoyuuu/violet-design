import React from 'react'
import './_style.scss'
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number
}
export declare function Row(props: RowProps): JSX.Element
export default Row
