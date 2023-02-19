import React from 'react'
import { Props as IPickerInputProps } from '../DatePicker/PickerInput'
import { Merge, Omit } from '../../_utils/DateUtil'
export declare enum FieldType {
  START = 0,
  END = 1,
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
declare class RangePickerInput extends React.Component<Props> {
  handleChange: (
    fieldType: FieldType
  ) => (e: React.FormEvent<HTMLInputElement>) => void | undefined
  handleBlur: (
    fieldType: FieldType
  ) => (e: React.FormEvent<HTMLInputElement>) => void | undefined
  handleClick: (fieldType: FieldType) => () => void | undefined
  handleClear: (fieldType: FieldType) => () => void | undefined
  renderStartInput: () => JSX.Element
  renderEndInput: () => JSX.Element
  renderPickerInput: (
    fieldType: FieldType,
    value?: string,
    placeholder?: string
  ) => JSX.Element
  render(): JSX.Element
}
export default RangePickerInput
