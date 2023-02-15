import React from 'react'
import dayjs from 'dayjs'
import { IDatePicker } from '../../../_utils/@types'
import { Props as DayViewProps } from '../DayView'
interface CalendarBodyProps {
  /** Calendar viewMode(Year, Month, Day) */
  viewMode: IDatePicker.ViewMode
  /** Calendar current Date */
  current: dayjs.Dayjs
  /** DayClick Event */
  onClick: (value: string) => void
  /** Locale to use */
  locale: IDatePicker.Locale
}
export type Props = DayViewProps & CalendarBodyProps
export declare class CalendarBody extends React.Component<Props> {
  static defaultProps: {
    viewMode: IDatePicker.ViewMode
    locale: string
  }
  render(): JSX.Element
}
export default CalendarBody
