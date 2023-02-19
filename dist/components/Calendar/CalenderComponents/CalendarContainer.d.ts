import dayjs from 'dayjs'
import React from 'react'
import { Props as DayViewProps } from '../DayView'
import { IDatePicker } from '../../../_utils/types'
export interface CalendarContainerProps {
  /** dayjs中支持的所有语言,使用前导入import 'dayjs/locale/zh-cn',import 'dayjs/locale/ja' */
  locale?: IDatePicker.Locale
  /** 日历显示或隐藏 */
  show?: boolean
  /** 显示或隐藏向前按钮 */
  prevIcon?: boolean
  /** 显示或隐藏向后按钮 */
  nextIcon?: boolean
  /** Event for Calendar day click */
  onChange?: (
    year?: dayjs.Dayjs,
    month?: dayjs.Dayjs,
    date?: dayjs.Dayjs
  ) => void
  view?: string
}
export interface PrivateProps {
  /** CalendarContainer base prop */
  current: dayjs.Dayjs
  /** Default Date parameter in calendar, which is the parent component */
  base: dayjs.Dayjs
  /** Number of months to show at once */
  showMonthCnt: number
  /** Set Calendar initial Date  */
  setBase: (base: dayjs.Dayjs) => void
}
export interface State {
  viewMode: IDatePicker.ViewMode
}
export type InheritProps = DayViewProps & CalendarContainerProps
export type Props = CalendarContainerProps & DayViewProps & PrivateProps
export declare class CalendarContainer extends React.Component<Props, State> {
  static defaultProps: {
    current: dayjs.Dayjs
    show: boolean
    showMonthCnt: number
    showToday: boolean
    locale: string
  }
  private getViewMode
  constructor(props: Props)
  getHeaderTitle: () => string
  handleTitleClick: () => void
  handleChange: (value: string) => void
  handleBase: (method: string) => () => void
  handleToday: () => void
  renderCalendarHead: () => JSX.Element
  renderCalendarBody: () => JSX.Element
  render(): JSX.Element
}
export default CalendarContainer
