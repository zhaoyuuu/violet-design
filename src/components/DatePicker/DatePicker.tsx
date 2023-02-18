import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import CX from 'classnames'
import Calendar, { Props as ICalendarProps } from '../Calendar/Calendar'
import TimeContainer from './TimeComponents/TimeContainer'
import Picker, { PickerProps, PickerAction } from './Picker'

import {
  formatDate,
  ifExistCall,
  Omit,
  Merge,
  DatePickerDefaults,
} from '../../_utils/DateUtil'
import PickerInput, { Props as InputProps } from './PickerInput'
import Icon from '../Icon'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export enum TabValue {
  DATE,
  TIME,
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

export class DatePicker extends React.Component<Props, State> {
  public static defaultProps = {
    includeTime: false,
    showMonthCnt: 1,
    locale: DatePickerDefaults.locale,
    portal: false,
    showDefaultIcon: false,
    view: 'day',
  }

  constructor(props: Props) {
    super(props)
    dayjs.extend(customParseFormat)
    const { initialDate, includeTime, showTimeOnly } = this.props
    const selected = []
    let date
    let year
    let month
    if (initialDate) {
      date = initialDate
      selected.push(date)
    }

    if (includeTime && showTimeOnly) {
      throw new Error('incldueTime & showTimeOnly cannot be used together')
    }
    //设置得初始值
    this.state = {
      year,
      month,
      date,
      selected,
      tabValue: TabValue.DATE,
      inputValue: formatDate(date, this.getDateFormat()),
    }
  }

  public getDateFormat() {
    const { dateFormat, includeTime, showTimeOnly } = this.props

    if (!dateFormat) {
      if (includeTime) {
        return DatePickerDefaults.dateTimeFormat
      }
      if (showTimeOnly) {
        return DatePickerDefaults.timeFormat
      }
      return DatePickerDefaults.dateFormat
    }
    return dateFormat
  }

  public getMonthFormat() {
    const { monthFormat } = this.props
    if (!monthFormat) {
      return DatePickerDefaults.monthFormat
    }
    return monthFormat
  }

  public handleDateChange = (
    year?: dayjs.Dayjs,
    month?: dayjs.Dayjs,
    date?: dayjs.Dayjs
  ) => {
    const { onChange } = this.props
    // const view = this.props.view
    let format: string
    let value: string
    switch (true) {
      case year !== undefined:
        format = 'YYYY'
        value = dayjs(year).format(format)
        ifExistCall(onChange, year, value)
        this.setState({
          ...this.state,
          year,
          inputValue: value,
          selected: year ? [year] : [],
        })
        break
      case month !== undefined:
        format = this.getMonthFormat()
        value = dayjs(month).format(format)
        ifExistCall(onChange, month, value)
        this.setState({
          ...this.state,
          month,
          inputValue: value,
          selected: month ? [month] : [],
        })
        break
      case date !== undefined:
      default:
        format = this.getDateFormat()
        value = dayjs(date).format(format)
        ifExistCall(onChange, date, value)
        this.setState({
          ...this.state,
          date,
          inputValue: value,
          selected: date ? [date] : [],
        })
        break
    }
  }

  public handleTimeChange = (hour: number, minute: number) => {
    const { onChange } = this.props
    let date = this.state.date
    let selected = this.state.selected

    if (!date) {
      date = dayjs()
      selected = [date]
    }

    date = date.hour(hour).minute(minute)
    const inputValue = date.format(this.getDateFormat())

    ifExistCall(onChange, date, inputValue)

    this.setState({
      ...this.state,
      date,
      selected,
      inputValue,
    })
  }

  public handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { onChange } = this.props
    const value = e.currentTarget.value

    ifExistCall(onChange, value, undefined)

    this.setState({
      ...this.state,
      inputValue: e.currentTarget.value,
    })
  }

  public handleInputClear = () => {
    const { onChange } = this.props

    ifExistCall(onChange, '', undefined)

    this.setState({
      ...this.state,
      inputValue: '',
    })
  }

  public handleInputBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const view = this.props.view
    const { year, month, date } = this.state
    const value = e.currentTarget.value
    if (value) {
      if (view === 'year') {
        const value = e.currentTarget.value
        const parseYear = dayjs(value, 'YYYY')
        let updateYear: dayjs.Dayjs | undefined

        updateYear = year

        if (dayjs(parseYear).isValid()) {
          updateYear = parseYear
        }
        const selected = []
        selected.push(updateYear)
        this.setState({
          ...this.state,
          year: updateYear,
          inputValue: dayjs(updateYear).format('YYYY'),
          selected: selected,
        })
      } else if (view === 'month') {
        const value = e.currentTarget.value
        const parsedMonth = dayjs(value, this.getMonthFormat())
        let updateMonth: dayjs.Dayjs | undefined

        updateMonth = month

        if (dayjs(parsedMonth).isValid()) {
          updateMonth = parsedMonth
        }
        const selected = []
        selected.push(updateMonth)
        this.setState({
          ...this.state,
          month: updateMonth,
          inputValue: dayjs(updateMonth).format(this.getMonthFormat()),
          selected: selected,
        })
      } else if (view === 'day') {
        const value = e.currentTarget.value
        const parsedDate = dayjs(value, this.getDateFormat())
        let updateDate: dayjs.Dayjs | undefined

        updateDate = date

        if (dayjs(parsedDate).isValid()) {
          updateDate = parsedDate
        }
        const selected = []
        selected.push(updateDate)
        this.setState({
          ...this.state,
          date: updateDate,
          inputValue: dayjs(updateDate).format(this.getDateFormat()),
          selected: selected,
        })
      }
    }
  }

  public renderInputComponent = (): JSX.Element => {
    const {
      inputComponent,
      readOnly,
      disabled,
      clear,
      autoFocus,
      showDefaultIcon,
      placeholder,
    } = this.props
    const { inputValue } = this.state
    const inputProps = {
      readOnly,
      autoFocus,
      disabled,
      clear,
      placeholder,
      onChange: this.handleInputChange,
      onClear: this.handleInputClear,
      onBlur: this.handleInputBlur,
      value: inputValue,
      icon: showDefaultIcon ? <Icon icon="calendar"></Icon> : undefined,
    }
    return inputComponent ? (
      inputComponent({ ...inputProps })
    ) : (
      <PickerInput {...inputProps} />
    )
  }

  public handleTab = (val: TabValue) => () => {
    this.setState({
      ...this.state,
      tabValue: val,
    })
  }

  public renderTabMenu = (): JSX.Element | null => {
    const { tabValue } = this.state

    const renderButton = (type: TabValue, label: string, icon: IconProp) => (
      <button
        className={CX({
          active: tabValue === type,
        })}
        onClick={this.handleTab(type)}
        type="button"
      >
        <Icon icon={icon}></Icon>
        {label}
      </button>
    )
    return (
      <div className="picker__container__tab">
        {renderButton(TabValue.DATE, 'DATE', 'calendar')}
        {renderButton(TabValue.TIME, 'TIME', 'calendar-times')}
      </div>
    )
  }

  //渲染日期
  public renderCalendar = (actions: PickerAction): JSX.Element | null => {
    const { selected, date } = this.state
    return (
      <Calendar
        {...this.props}
        base={date}
        onChange={(year, month, date) => {
          this.handleDateChange(year, month, date)
          actions.hide()
        }}
        selected={selected}
      />
    )
  }

  //渲染时间的
  public renderTime = (): JSX.Element | null => {
    const date = this.state.date || dayjs()

    return (
      <TimeContainer
        hour={date.hour()}
        minute={date.minute()}
        onChange={this.handleTimeChange}
      />
    )
  }

  public renderContents = (actions: PickerAction): JSX.Element => {
    const { includeTime, showTimeOnly } = this.props
    const { tabValue } = this.state
    let component: JSX.Element

    component = (
      <div className="picker__container__calonly">
        {this.renderCalendar(actions)}
      </div>
    )

    if (showTimeOnly) {
      component = (
        <div className="picker__container__timeonly">{this.renderTime()}</div>
      )
    }

    if (includeTime) {
      component = (
        <div className="picker__container__include-time">
          {this.renderTabMenu()}
          {tabValue === TabValue.DATE
            ? this.renderCalendar(actions)
            : this.renderTime()}
        </div>
      )
    }
    return component
  }

  public render() {
    const { includeTime, portal, direction, disabled, readOnly } = this.props

    return (
      <Picker
        portal={portal}
        direction={direction}
        readOnly={readOnly}
        disabled={disabled}
        className={CX({ include__time: includeTime })}
        renderTrigger={() => this.renderInputComponent()}
        renderContents={({ actions }) => this.renderContents(actions)}
      />
    )
  }
}

export default DatePicker
