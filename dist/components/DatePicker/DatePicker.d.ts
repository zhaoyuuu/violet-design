import React from 'react'
import dayjs from 'dayjs'
import { Props as ICalendarProps } from '../Calendar/Calendar'
import { PickerProps, PickerAction } from './Picker'
import { Omit, Merge } from '../../_utils/DateUtil'
import { Props as InputProps } from './PickerInput'
export declare enum TabValue {
  DATE = 0,
  TIME = 1,
}
interface DatePickerProps {
  /** 月份输入格式 (Day.js format) */
  monthFormat?: string
  /** 日期输入格式 (Day.js format) */
  dateFormat?: string
  /** 是否包含时间选择器 true/false */
  includeTime?: boolean
  /** 是否为时间选择器 */
  showTimeOnly?: boolean
  /** 初始化日期 */
  initialDate?: dayjs.Dayjs
  /** 重写输入组件 */
  inputComponent?: (props: InputProps) => JSX.Element
  /** 更改值触发事件 */
  onChange?: (
    year?: dayjs.Dayjs,
    month?: dayjs.Dayjs,
    date?: dayjs.Dayjs
  ) => void
  /** 默认图标是否显示 true/false*/
  showDefaultIcon: boolean
}
export interface State {
  tabValue: TabValue
  date?: dayjs.Dayjs
  month?: dayjs.Dayjs
  year?: dayjs.Dayjs
  inputValue: string
  selected: any
}
type CalendarProps = Merge<
  Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
  {
    /** 显示多个日历视图 */
    showMonthCnt?: number
  }
>
export type Props = DatePickerProps &
  Omit<InputProps, 'onChange'> &
  CalendarProps &
  PickerProps
/**
 * 输入或选择日期/时间的控件。
 */
export declare class DatePicker extends React.Component<Props, State> {
  static defaultProps: {
    includeTime: boolean
    showMonthCnt: number
    locale: string
    portal: boolean
    showDefaultIcon: boolean
    view: string
  }
  constructor(props: Props)
  getDateFormat(): string
  getMonthFormat(): string
  handleDateChange: (
    year?: dayjs.Dayjs,
    month?: dayjs.Dayjs,
    date?: dayjs.Dayjs
  ) => void
  handleTimeChange: (hour: number, minute: number) => void
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void
  handleInputClear: () => void
  handleInputBlur: (e: React.FormEvent<HTMLInputElement>) => void
  renderInputComponent: () => JSX.Element
  handleTab: (val: TabValue) => () => void
  renderTabMenu: () => JSX.Element | null
  renderCalendar: (actions: PickerAction) => JSX.Element | null
  renderTime: () => JSX.Element | null
  renderContents: (actions: PickerAction) => JSX.Element
  render(): JSX.Element
}
export default DatePicker
