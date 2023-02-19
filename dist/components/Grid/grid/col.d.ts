import React from 'react'
import './_style.scss'
export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span: number
  offset?: number
}
export declare function Col(props: ColProps): JSX.Element
export default Col
