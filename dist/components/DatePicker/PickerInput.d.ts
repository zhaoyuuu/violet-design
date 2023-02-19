import React from 'react'
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
declare class PickerInput extends React.Component<Props> {
  inputRef: React.RefObject<HTMLInputElement>
  constructor(props: Props)
  componentDidMount(): void
  handleClear: (e: React.MouseEvent) => void
  renderInput: () => JSX.Element
  renderClear: () => JSX.Element
  render(): JSX.Element
}
export default PickerInput
