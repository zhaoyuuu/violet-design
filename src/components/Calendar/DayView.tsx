import classNames from 'classnames'
import dayjs from 'dayjs'
import React from 'react'
import TableCell from './TableCell'
import TableMatrixView from './TableMatrixView'

import {
  getDayMatrix,
  isDayEqual,
  isDayRange,
  getWeekDays,
  ifExistCall,
  DatePickerDefaults,
  isYearEqual,
} from '../../_utils/DateUtil'
import { IDatePicker } from '../../_utils/types'

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

class DayView extends React.Component<Props & PrivateProps> {
  public static defaultProps = {
    locale: DatePickerDefaults.locale,
  }

  public getDayClass = (date: string): string => {
    const { current, customDayClass, startDay, endDay, selected, disableDay } =
      this.props
    const currentDate = dayjs(current).date(parseInt(date, 10))

    let classArr: string[] = []

    if (!date.trim()) {
      return ''
    }

    if (customDayClass !== undefined) {
      const customClass = customDayClass(currentDate)
      classArr = classArr.concat(
        typeof customClass === 'string' ? [customClass] : customClass
      )
    }

    const dayClass = classNames(
      'calendar__day',
      `calendar__day--${dayjs(currentDate).day()}`,
      classArr,
      {
        'calendar__day--end': isDayEqual(currentDate, endDay),
        'calendar__day--range': isDayRange(currentDate, startDay, endDay),
        'calendar__day--selected': this.isIncludeDay(date, selected),
        'calendar__day--disabled': disableDay ? disableDay(currentDate) : false,
        'calendar__day--start': isDayEqual(currentDate, startDay),
        'calendar__day--today': isDayEqual(currentDate, dayjs()),
      }
    )

    return dayClass
  }

  public getCustomText = (date: string): string => {
    const { current, customDayText } = this.props
    const currentDate = dayjs(current).date(parseInt(date, 10))

    if (!date.trim()) {
      return ''
    }
    if (!customDayText) {
      return ''
    }

    return customDayText(currentDate)
  }

  public isIncludeDay = (date: string, dates?: dayjs.Dayjs[]): boolean => {
    const { current } = this.props
    if (dates === undefined) {
      return false
    }
    return dates.some(v =>
      isDayEqual(dayjs(current).date(parseInt(date, 10)), v)
    )
  }

  public handleClick = (date: string) => {
    const { current, disableDay } = this.props
    const currentDate = dayjs(current).date(parseInt(date, 10))
    if (!(disableDay && disableDay(currentDate))) {
      ifExistCall(this.props.onClick, date)
    }
  }

  public handleMouseOver = (date: string) => {
    const { onMouseOver, current } = this.props
    ifExistCall(onMouseOver, dayjs(current).date(parseInt(date, 10)))
  }

  public render() {
    const { current, locale } = this.props

    const dayMatrix = getDayMatrix(
      dayjs(current).year(),
      dayjs(current).month()
    )
    const weekdays = getWeekDays(locale)

    return (
      <TableMatrixView
        headers={weekdays}
        matrix={dayMatrix}
        cell={(date, key) => (
          <TableCell
            className={this.getDayClass(date)}
            subText={this.getCustomText(date)}
            onClick={this.handleClick}
            onMouseOver={this.handleMouseOver}
            text={date}
            key={key}
          />
        )}
      />
    )
  }
}

export default DayView
