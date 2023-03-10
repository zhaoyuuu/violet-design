import React from 'react'
import CX from 'classnames'
import { IDatePicker } from '../../_utils/types'
import { getDivPosition, getDomHeight } from '../../_utils/DateUtil'
import Backdrop from './Backdrop'
import Transition from '../Transition'

export interface PickerAction {
  show: () => void
  hide: () => void
}

export interface PickerRenderProps {
  actions: PickerAction
}

export interface PickerProps {
  /** 是否弹出遮罩层 */
  portal?: boolean
  /** 选择器显示位置 (0 = TOP , 1 = BOTTOM) */
  direction?: IDatePicker.PickerDirection
}

export interface Props {
  readOnly?: boolean
  disabled?: boolean
  className?: string
  renderTrigger: (props: PickerRenderProps) => JSX.Element
  renderContents: (props: PickerRenderProps) => JSX.Element
}

export interface State {
  show: boolean
  position: IDatePicker.Position
}
class Picker extends React.Component<Props & PickerProps, State> {
  public state = {
    show: false,
    position: {
      left: '',
      top: '',
    },
  }

  private triggerRef: React.RefObject<HTMLDivElement>
  private contentsRef: React.RefObject<HTMLDivElement>

  constructor(props: Props) {
    super(props)
    this.triggerRef = React.createRef()
    this.contentsRef = React.createRef()
  }

  public showContents = () => {
    const { portal, disabled, readOnly } = this.props
    if (disabled || readOnly) return

    this.setState(
      {
        show: true,
      },
      () => {
        if (!portal) {
          this.setPosition()
        }
      }
    )
  }

  public hideContents = () => {
    this.setState({
      show: false,
    })
  }

  public setPosition = () => {
    const { direction } = this.props
    this.setState({
      position: getDivPosition(
        this.triggerRef.current,
        direction,
        getDomHeight(this.contentsRef.current),
        5
      ),
    })
  }

  public render() {
    const { portal, className, renderTrigger, renderContents } = this.props
    const { show, position } = this.state
    const actions = {
      show: this.showContents,
      hide: this.hideContents,
    }

    return (
      <div className="picker">
        <div
          className="picker__trigger"
          onClick={this.showContents}
          ref={this.triggerRef}
        >
          {renderTrigger({ actions })}
        </div>
        {/* {show && (
          <div
            className={CX('picker__container', { portal, className })}
            role="dialog"
            aria-modal="true"
            style={position}
            ref={this.contentsRef}
          >
            {renderContents({ actions })}
          </div>
        )} */}
        <Transition in={show} animation="zoom-in-top" timeout={200}>
          <div
            className={CX('picker__container', { portal, className })}
            role="dialog"
            aria-modal="true"
            style={position}
            ref={this.contentsRef}
          >
            {renderContents({ actions })}
          </div>
        </Transition>
        <Backdrop show={show} invert={portal} onClick={this.hideContents} />
      </div>
    )
  }
}

export default Picker
