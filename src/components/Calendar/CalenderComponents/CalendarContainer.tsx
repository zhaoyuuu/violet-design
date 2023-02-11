import classNames from 'classnames'
import dayjs from 'dayjs'
import React from 'react'
import CalendarBody from './CalendarBody'
import CalendarHead from './CalendarHead'
import { Props as DayViewProps } from '../DayView'

import { IDatePicker } from '../../../_utils/@types'
import { DatePickerDefaults, ifExistCall } from '../../../_utils/DateUtil'

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

export class CalendarContainer extends React.Component<Props, State> {
  public static defaultProps = {
    current: dayjs(),
    show: true,
    showMonthCnt: 1,
    showToday: false,
    locale: DatePickerDefaults.locale,
  }

  //获取view
  private getViewMode(view: Props['view']) {
    switch (view) {
      case 'year':
        return IDatePicker.ViewMode.YEAR
      case 'month':
        return IDatePicker.ViewMode.MONTH

      case 'day':
        return IDatePicker.ViewMode.DAY
      default:
        return IDatePicker.ViewMode.DAY
    }
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      viewMode: this.getViewMode(props.view),
    }
  }

  public getHeaderTitle = () => {
    const { current } = this.props
    const year = dayjs(current).year()
    return {
      [IDatePicker.ViewMode.YEAR]: `${year - 4} - ${year + 4}`,
      [IDatePicker.ViewMode.MONTH]: `${year}`,
      [IDatePicker.ViewMode.DAY]: dayjs(current).format('YYYY.MM'),
    }[this.state.viewMode]
  }

  public handleTitleClick = () => {
    const { viewMode } = this.state
    const { showMonthCnt } = this.props
    let changedMode: IDatePicker.ViewMode = viewMode

    if (viewMode === IDatePicker.ViewMode.MONTH) {
      changedMode = IDatePicker.ViewMode.YEAR
    } else if (viewMode === IDatePicker.ViewMode.DAY) {
      changedMode = IDatePicker.ViewMode.MONTH
    }
    this.setState({
      viewMode: showMonthCnt > 1 ? IDatePicker.ViewMode.DAY : changedMode,
    })
  }

  public handleChange = (value: string) => {
    const { viewMode } = this.state
    const { current, onChange, setBase, showMonthCnt, base } = this.props
    if (!value.trim()) return
    //表示许哟啊显示多个月份视图
    if (showMonthCnt > 1) {
      const date = dayjs(current).date(parseInt(value, 10)).toDate()
      //判断一个函数是否存在并执行该函数
      ifExistCall(onChange, undefined, undefined, date)
      return
    }

    if (this.props.view === 'year') {
      const year = dayjs(base).year(parseInt(value, 10))
      ifExistCall(onChange, year, undefined, undefined)
    } else if (this.props.view === 'month') {
      const month = dayjs(base).month(parseInt(value, 12))
      ifExistCall(onChange, undefined, month, undefined)
    } else {
      if (viewMode === IDatePicker.ViewMode.YEAR) {
        //用于修改组件的基准日期
        //将字符串 value 解析为整数
        setBase(dayjs(base).year(parseInt(value, 10)))
        this.setState({
          viewMode: IDatePicker.ViewMode.MONTH,
        })
      } else if (viewMode === IDatePicker.ViewMode.MONTH) {
        setBase(dayjs(base).month(parseInt(value, 10)))
        this.setState({
          viewMode: IDatePicker.ViewMode.DAY,
        })
      } else {
        const date = dayjs(current).date(parseInt(value, 10))
        ifExistCall(onChange, undefined, undefined, date)
      }
    }
  }

  public handleBase = (method: string) => () => {
    const { base, setBase } = this.props
    const { viewMode } = this.state
    const date: any = dayjs(base)
    if (viewMode === IDatePicker.ViewMode.YEAR) {
      //基准日期修改为过去或未来 10 年
      setBase(date[method](9, 'year'))
    } else if (viewMode === IDatePicker.ViewMode.MONTH) {
      //将基准日期修改为过去或未来 1 年
      setBase(date[method](1, 'year'))
    } else {
      //将基准日期修改为过去或未来 1 个月
      setBase(date[method](1, 'month'))
    }
  }

  public handleToday = () => {
    const { setBase } = this.props
    setBase(dayjs())
  }

  public renderCalendarHead = () => {
    const { prevIcon, nextIcon } = this.props
    return (
      <CalendarHead
        onPrev={this.handleBase('subtract')}
        onNext={this.handleBase('add')}
        prevIcon={prevIcon}
        nextIcon={nextIcon}
        onTitleClick={this.handleTitleClick}
        title={this.getHeaderTitle()}
      />
    )
  }

  public renderCalendarBody = () => {
    const {
      customDayClass,
      customDayText,
      disableDay,
      selected,
      startDay,
      endDay,
      onMouseOver,
      current,
      locale = DatePickerDefaults.locale,
    } = this.props

    return (
      <CalendarBody
        viewMode={this.state.viewMode}
        current={current}
        selected={selected}
        startDay={startDay}
        endDay={endDay}
        disableDay={disableDay}
        onClick={this.handleChange}
        onMouseOver={onMouseOver}
        customDayClass={customDayClass}
        customDayText={customDayText}
        locale={locale}
      />
    )
  }

  public render() {
    const { show } = this.props
    const calendarClass = classNames('calendar__container', {
      'calendar--show': show,
    })

    return (
      <div className={calendarClass}>
        {this.renderCalendarHead()}
        {this.renderCalendarBody()}
      </div>
    )
  }
}

export default CalendarContainer
