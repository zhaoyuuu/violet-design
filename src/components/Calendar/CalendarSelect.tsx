import React from 'react'
import dayjs from 'dayjs'
import Calendar, { Props as ICalendarProps } from './Calendar'
import { Omit, Merge } from '../../_utils/DateUtil'
import Button from '../Button'

type CalendarProps = Merge<
  Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
  {
    /** 显示视图的个数 */
    showMonthCnt?: number
  }
>

interface IProps {
  /** 日视图下是否多选 */
  multiple?: boolean
}

interface State {
  selected: dayjs.Dayjs[]
}

type Props = CalendarProps & IProps
/**
 * 日历。支持年/月/日切换。
 *
 * 支持国际化配置（支持多种语言）。
 *
 */
export class CalendarSelect extends React.Component<Props, State> {
  public static defaultProps = {
    /** 默认不多选 */
    multiple: false,
    /** 默认为日视图 */
    view: 'day',
  }

  public state = {
    selected: [],
  }

  public handleChange = (
    year?: dayjs.Dayjs,
    month?: dayjs.Dayjs,
    date?: dayjs.Dayjs
  ) => {
    const { multiple } = this.props
    if (date) {
      this.setState({
        selected: multiple ? [...this.state.selected, date] : [date],
      })
    } else if (year) {
      this.setState({
        selected: multiple ? [...this.state.selected, year] : [year],
      })
    } else if (month) {
      this.setState({
        selected: multiple ? [...this.state.selected, month] : [month],
      })
    }
  }

  public handleClear = () => {
    this.setState({
      selected: [],
    })
  }

  public render() {
    const { selected } = this.state
    return (
      <div>
        <Calendar
          {...this.props}
          selected={selected}
          onChange={this.handleChange}
        />
        {this.props.multiple && (
          <div>
            <Button onClick={this.handleClear} btnType="primary">
              Clear
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default CalendarSelect
