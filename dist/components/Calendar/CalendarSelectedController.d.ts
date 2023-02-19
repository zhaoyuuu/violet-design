import React from 'react'
import dayjs from 'dayjs'
import { Props as ICalendarProps } from './Calendar'
import { Omit, Merge } from '../../_utils/DateUtil'
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
export declare class CalendarSelectedController extends React.Component<
  Props,
  State
> {
  static defaultProps: {
    /** 默认不多选 */
    multiple: boolean
    /** 默认为日视图 */
    view: string
  }
  state: {
    selected: never[]
  }
  handleChange: (
    year?: dayjs.Dayjs,
    month?: dayjs.Dayjs,
    date?: dayjs.Dayjs
  ) => void
  handleClear: () => void
  render(): JSX.Element
}
export default CalendarSelectedController
