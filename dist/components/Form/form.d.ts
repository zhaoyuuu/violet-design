import { ValidateError } from 'async-validator'
import React, { ReactNode } from 'react'
import useStore, { FormState } from './useStore'
export type RenderProps = (form: FormState) => ReactNode
export interface FormProps {
  name?: string
  initialValues?: Record<string, any>
  children?: ReactNode | RenderProps
  onFinish?: (values: Record<string, any>) => void
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void
}
export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields' | 'validateField'
> &
  Pick<FormProps, 'initialValues'>
export type IFormRef = Omit<
  ReturnType<typeof useStore>,
  'fields' | 'dispatch' | 'form'
>
export declare const FormContext: React.Context<IFormContext>
/**
 * >高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。
// /* eslint-disable react/display-name */
/**
 * > 表单控件, 带数据与管理功能, 包含数据录入、校验等
 *
 * ### 何时使用
 * - 用于创建一个实体或收集信息。
 * - 需要对输入的数据类型进行校验时。
 */
export declare const Form: React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<IFormRef>
>
export default Form
