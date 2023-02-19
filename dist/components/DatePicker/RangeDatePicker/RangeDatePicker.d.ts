import React from 'react'
import dayjs from 'dayjs'
import { Merge, Omit } from '../../../_utils/DateUtil'
import { PickerProps, PickerAction } from '../Picker'
import { FieldType, InputProps } from './RangePickerInput'
import { Props as ICalendarProps } from '../../Calendar/Calendar'
interface RangeDatePickerProps {
  /** 输入格式 (Day.js format) */
  dateFormat: string
  /** 初始日历基准日期（如果未设置开始日期) */
  initialDate: dayjs.Dayjs
  /** 初始开始日期 */
  initialStartDate?: dayjs.Dayjs
  /** 初始结束日期 */
  initialEndDate?: dayjs.Dayjs
  /** 更改触发事件 */
  onChange?: (start?: dayjs.Dayjs, end?: dayjs.Dayjs) => void
  /** 开始日期显示文字（可选） */
  startText: string
  /** 结束日期显示文字（可选 */
  endText: string
  /** 日历包装元素 */
  wrapper?: (calendar: JSX.Element) => JSX.Element
}
export interface State {
  start?: dayjs.Dayjs
  end?: dayjs.Dayjs
  hoverDate?: dayjs.Dayjs
  startValue: string
  endValue: string
  mode?: FieldType
}
type CalendarProps = Merge<
  Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
  {
    showMonthCnt?: number
  }
>
export type Props = RangeDatePickerProps &
  CalendarProps &
  InputProps &
  PickerProps
export declare class RangeDatePicker extends React.Component<Props, State> {
  static defaultProps: {
    dateFormat: string
    portal: boolean
    initialDate: dayjs.Dayjs
    showMonthCnt: number
    startText: string
    endText: string
    view: string
  }
  constructor(props: Props)
  handleDateChange: (
    actions: PickerAction
  ) => (year?: dayjs.Dayjs, month?: dayjs.Dayjs, date?: dayjs.Dayjs) => void
  handleInputChange: (fieldType: FieldType, value: string) => void
  handleMouseOver: (date: dayjs.Dayjs) => void
  handleInputBlur: (fieldType: FieldType, value: string) => void
  handleCalendarText: (date: dayjs.Dayjs) => string
  handleCalendarClass: (date: dayjs.Dayjs) => '' | 'calendar__day--range'
  handleInputClear: (fieldType: FieldType) => void
  renderRangePickerInput: () => JSX.Element
  renderCalendar: (actions: PickerAction) => JSX.Element
  render(): JSX.Element
}
export default RangeDatePicker
