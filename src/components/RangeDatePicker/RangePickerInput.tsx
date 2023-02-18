import React from 'react'
import PickerInput, {
  Props as IPickerInputProps,
} from '../DatePicker/PickerInput'
import { Merge, Omit, ifExistCall } from '../../_utils/DateUtil'
import Icon from '../Icon'

export enum FieldType {
  START,
  END,
}

interface RangePickerInputProps {
  /** 起始日期 */
  startValue?: string
  /** 结束日期 */
  endValue?: string
  /** 输入改变触发事件 */
  onChange?: (fieldType: FieldType, value: string) => void
  /** 获取焦点触发事件 */
  onBlur?: (fieldType: FieldType, value: string) => void
  /** 点击事件 */
  onClick?: (fieldTyp: FieldType) => void
  /** 清除输入 */
  onClear?: (fieldType: FieldType) => void
}

export type InputProps = Merge<
  Omit<
    IPickerInputProps,
    'onBlur' | 'onClear' | 'onChange' | 'onClick' | 'placeholder'
  >,
  {
    /** 起始输入框placeholder */
    startPlaceholder?: string
    /** 结束输入框placeholder */
    endPlaceholder?: string
  }
>

type Props = RangePickerInputProps & InputProps

class RangePickerInput extends React.Component<Props> {
  public handleChange =
    (fieldType: FieldType) => (e: React.FormEvent<HTMLInputElement>) =>
      ifExistCall(this.props.onChange, fieldType, e.currentTarget.value)
  public handleBlur =
    (fieldType: FieldType) => (e: React.FormEvent<HTMLInputElement>) =>
      ifExistCall(this.props.onBlur, fieldType, e.currentTarget.value)
  public handleClick = (fieldType: FieldType) => () =>
    ifExistCall(this.props.onClick, fieldType)
  public handleClear = (fieldType: FieldType) => () =>
    ifExistCall(this.props.onClear, fieldType)

  public renderStartInput = () => {
    const { startValue, startPlaceholder } = this.props
    return this.renderPickerInput(FieldType.START, startValue, startPlaceholder)
  }

  public renderEndInput = () => {
    const { endValue, endPlaceholder } = this.props
    return this.renderPickerInput(FieldType.END, endValue, endPlaceholder)
  }

  public renderPickerInput = (
    fieldType: FieldType,
    value?: string,
    placeholder?: string
  ) => {
    const { readOnly, disabled, clear } = this.props
    return (
      <PickerInput
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        clear={clear}
        className="range"
        onClear={this.handleClear(fieldType)}
        onClick={this.handleClick(fieldType)}
        onChange={this.handleChange(fieldType)}
        onBlur={this.handleBlur(fieldType)}
        placeholder={placeholder}
      />
    )
  }

  public render() {
    return (
      <div className="range-picker-input">
        <span className="range-picker-input__start">
          {this.renderStartInput()}
        </span>
        <span className="range-picker-input__icon">
          <Icon icon="arrow-right"></Icon>
        </span>
        <span className="range-picker-input__end">{this.renderEndInput()}</span>
      </div>
    )
  }
}

export default RangePickerInput
