import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'

export interface Props {
  /** 输入值 */
  value?: string
  /** 是否只读 */
  readOnly?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示清除按钮 */
  clear?: boolean
  /** 自定以icon */
  icon?: JSX.Element
  /** 值更改触发事件 */
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  /** 聚焦触发事件 */
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void
  /** 点击触发事件 */
  onClick?: () => void
  /** 值清空触发事件 */
  onClear?: () => void
  /** 自动获取焦点 */
  autoFocus?: boolean
  /** 自定义类名 */
  className?: string
  /** 占位文字 */
  placeholder?: string
}

class PickerInput extends React.Component<Props> {
  public inputRef: React.RefObject<HTMLInputElement>

  constructor(props: Props) {
    super(props)
    this.inputRef = React.createRef<HTMLInputElement>()
  }

  public componentDidMount() {
    const { current } = this.inputRef
    const { autoFocus } = this.props

    if (current && autoFocus) {
      current.focus()
    }
  }

  public handleClear = (e: React.MouseEvent) => {
    const { onClear } = this.props
    if (onClear) onClear()
    e.stopPropagation()
  }

  public renderInput = () => {
    const {
      readOnly = false,
      disabled = false,
      value = '',
      icon,
      onChange,
      onClick,
      onBlur,
      placeholder,
    } = this.props

    return (
      <input
        ref={this.inputRef}
        className="picker-input__text"
        type="text"
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{
          paddingLeft: icon ? '32px' : '10px',
        }}
      />
    )
  }

  public renderClear = () => {
    return (
      <span className="picker-input__clear" onClick={this.handleClear}>
        <Icon icon="calendar-xmark"></Icon>
      </span>
    )
  }

  public render() {
    const { clear, icon, className } = this.props
    return (
      <div className={classNames('picker-input', className)}>
        {icon && <span className="picker-input__icon">{icon}</span>}
        {this.renderInput()}
        {clear && this.renderClear()}
      </div>
    )
  }
}

export default PickerInput
