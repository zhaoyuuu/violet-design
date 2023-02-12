import { range } from '../../_utils/DateUtil'
import dayjs from 'dayjs'
import React from 'react'
import CalendarContainer, {
  InheritProps as ContainerProps,
} from './CalenderComponents/CalendarContainer'

export interface Props extends ContainerProps {
  /** Calendar Initial Date Parameters */
  base: dayjs.Dayjs
  /**显示视图的个数 */
  showMonthCnt: number
  /**日历的视图,包含年月日三种视图 */
  view: 'year' | 'month' | 'day'
}

export interface State {
  base: dayjs.Dayjs
}

class Calendar extends React.Component<Props, State> {
  public static defaultProps = {
    base: dayjs(),
    showMonthCnt: 1,
    view: 'day',
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      base: props.base,
    }
  }

  public setBase = (base: dayjs.Dayjs) => {
    this.setState({ base })
  }

  public render() {
    const { showMonthCnt } = this.props
    const { base } = this.state

    return (
      <div className="calendar">
        <div className="calendar__list">
          {range(showMonthCnt).map(idx => (
            <div className="calendar__item" key={idx}>
              <CalendarContainer
                {...this.props}
                base={this.state.base}
                current={dayjs(base).add(idx, 'month')}
                prevIcon={idx === 0}
                nextIcon={idx === showMonthCnt! - 1}
                setBase={this.setBase}
                view={this.props.view}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Calendar
