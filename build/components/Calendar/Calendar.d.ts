import dayjs from 'dayjs'
import React from 'react'
import { InheritProps as ContainerProps } from './CalenderComponents/CalendarContainer'
export interface Props extends ContainerProps {
  /** Calendar Initial Date Parameters */
  base: dayjs.Dayjs
  /**显示视图的个数 */
  showMonthCnt: number
  /**日历的视图,包含年月日三种视图 */
  view: 'year' | 'month' | 'day'
}
export interface State {
  base: dayjs.Dayjs
}
declare class Calendar extends React.Component<Props, State> {
  static defaultProps: {
    base: dayjs.Dayjs
    showMonthCnt: number
    view: string
  }
  constructor(props: Props)
  setBase: (base: dayjs.Dayjs) => void
  render(): JSX.Element
}
export default Calendar
