import dayjs from 'dayjs'
import React from 'react'
import { IDatePicker } from '../../_utils/@types'
export interface Props {
  /** 要在日历中显示的选定日期 */
  selected?: dayjs.Dayjs[]
  /** 要在日历中显示的开始日期 */
  startDay?: dayjs.Dayjs
  /** 要在日历中显示的结束日期 */
  endDay?: dayjs.Dayjs
  /** 日视图下鼠标点击事件 */
  onClick?: (date: string) => void
  /** 日视图下鼠标悬停事件 */
  onMouseOver?: (date: dayjs.Dayjs) => void
  /** 日视图下要在一天中显示的自定义日类 */
  customDayClass?: (date: dayjs.Dayjs) => string | string[]
  /** 日视图下自定义日期文本以天为单位显示 */
  customDayText?: (date: dayjs.Dayjs) => string
  /** 日视图下禁用日期 */
  disableDay?: (date: dayjs.Dayjs) => void
}
interface PrivateProps {
  current: dayjs.Dayjs
  locale: IDatePicker.Locale
}
declare class DayView extends React.Component<Props & PrivateProps> {
  static defaultProps: {
    locale: string
  }
  getDayClass: (date: string) => string
  getCustomText: (date: string) => string
  isIncludeDay: (date: string, dates?: dayjs.Dayjs[]) => boolean
  handleClick: (date: string) => void
  handleMouseOver: (date: string) => void
  render(): JSX.Element
}
export default DayView
