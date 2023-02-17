import React from 'react'
import dayjs from 'dayjs'
import {
  isDayAfter,
  isDayBefore,
  isDayEqual,
  isDayRange,
  formatDate,
  DatePickerDefaults,
  Merge,
  Omit,
  ifExistCall,
} from '../../../_utils/DateUtil'
import Picker, { PickerProps, PickerAction } from '../Picker'
import RangePickerInput, { FieldType, InputProps } from './RangePickerInput'
import Calendar, { Props as ICalendarProps } from '../../Calendar/Calendar'

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

export class RangeDatePicker extends React.Component<Props, State> {
  public static defaultProps = {
    dateFormat: DatePickerDefaults.dateFormat,
    portal: false,
    initialDate: dayjs(),
    showMonthCnt: 2,
    startText: '',
    endText: '',
    view: 'day',
  }

  public constructor(props: Props) {
    super(props)
    const { dateFormat, initialStartDate, initialEndDate } = props
    const start = initialStartDate
    const end = initialEndDate

    this.state = {
      start,
      end,
      startValue: formatDate(start, dateFormat),
      endValue: formatDate(end, dateFormat),
    }
  }

  public handleDateChange =
    (actions: PickerAction) =>
    (year?: dayjs.Dayjs, month?: dayjs.Dayjs, date?: dayjs.Dayjs) => {
      const { onChange, dateFormat } = this.props
      const { start, end } = this.state
      let startDate: dayjs.Dayjs | undefined
      let endDate: dayjs.Dayjs | undefined

      startDate = start
      endDate = end

      if (!start) {
        startDate = date
      } else {
        if (end) {
          startDate = date
          endDate = undefined
        } else {
          if (date && !isDayBefore(date, start)) {
            endDate = date
          } else {
            startDate = date
          }
        }
      }

      ifExistCall(onChange, startDate, endDate)

      this.setState(
        {
          ...this.state,
          start: startDate,
          end: endDate,
          startValue: formatDate(startDate, dateFormat),
          endValue: formatDate(endDate, dateFormat),
        },
        () => {
          if (this.state.start && this.state.end) {
            actions.hide()
          }
        }
      )
    }

  public handleInputChange = (fieldType: FieldType, value: string) => {
    const key = fieldType === FieldType.START ? 'startValue' : 'endValue'
    this.setState({
      ...this.state,
      [key]: value,
    })
  }

  public handleMouseOver = (date: dayjs.Dayjs) => {
    this.setState({
      ...this.state,
      hoverDate: date,
    })
  }

  public handleInputBlur = (fieldType: FieldType, value: string) => {
    const { dateFormat } = this.props
    const { start, end } = this.state
    const parsedDate = dayjs(value, dateFormat)
    let startDate = start
    let endDate = end
    // Swapping Date
    let temp: dayjs.Dayjs
    if (parsedDate.isValid() && dateFormat.length === value.length) {
      if (fieldType === FieldType.END) {
        endDate = parsedDate
      } else if (fieldType === FieldType.START) {
        startDate = parsedDate
      }
    }

    if (startDate && endDate) {
      if (isDayBefore(endDate, startDate) || isDayAfter(startDate, endDate)) {
        temp = startDate
        startDate = endDate
        endDate = temp
      }
    }

    this.setState({
      ...this.state,
      start: startDate,
      end: endDate,
      startValue: formatDate(startDate, dateFormat),
      endValue: formatDate(endDate, dateFormat),
    })
  }

  public handleCalendarText = (date: dayjs.Dayjs) => {
    const { startText, endText, customDayText } = this.props
    const { start, end } = this.state
    if (isDayEqual(start, date)) return startText
    if (isDayEqual(end, date)) return endText
    ifExistCall(customDayText, date)
    return ''
  }

  public handleCalendarClass = (date: dayjs.Dayjs) => {
    const { customDayClass } = this.props
    const { start, end, hoverDate } = this.state
    if (start && !end && hoverDate) {
      if (isDayRange(date, start, hoverDate)) {
        return 'calendar__day--range'
      }
    }
    ifExistCall(customDayClass, date)
    return ''
  }

  public handleInputClear = (fieldType: FieldType) => {
    if (fieldType === FieldType.START) {
      this.setState({
        ...this.state,
        start: undefined,
        startValue: '',
      })
    } else if (fieldType === FieldType.END) {
      this.setState({
        ...this.state,
        end: undefined,
        endValue: '',
      })
    }
  }

  public renderRangePickerInput = () => {
    const { startPlaceholder, endPlaceholder, readOnly, disabled, clear } =
      this.props
    const { startValue, endValue } = this.state
    return (
      <RangePickerInput
        startPlaceholder={startPlaceholder}
        readOnly={readOnly}
        disabled={disabled}
        clear={clear}
        endPlaceholder={endPlaceholder}
        startValue={startValue}
        endValue={endValue}
        onChange={this.handleInputChange}
        onBlur={this.handleInputBlur}
        onClear={this.handleInputClear}
      />
    )
  }

  public renderCalendar = (actions: PickerAction) => {
    const { showMonthCnt, initialDate, wrapper } = this.props
    const { start, end } = this.state
    let component: JSX.Element

    const calendar = (
      <Calendar
        {...this.props}
        base={start || initialDate}
        startDay={start}
        endDay={end}
        showMonthCnt={showMonthCnt}
        onChange={this.handleDateChange(actions)}
        onMouseOver={this.handleMouseOver}
        customDayText={this.handleCalendarText}
        customDayClass={this.handleCalendarClass}
      />
    )

    component = calendar

    if (wrapper) {
      component = wrapper(calendar)
    }

    return component
  }

  public render() {
    const { portal, direction, disabled, readOnly } = this.props

    return (
      <Picker
        portal={portal}
        direction={direction}
        readOnly={readOnly}
        disabled={disabled}
        renderTrigger={() => this.renderRangePickerInput()}
        renderContents={({ actions }) => {
          return this.renderCalendar(actions)
        }}
      />
    )
  }
}

export default RangeDatePicker
