import { FC, ReactNode } from 'react'
import { CustomRule } from './useStore'
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>
export interface FormItemProps {
  name: string
  label?: string
  children?: ReactNode
  valuePropName?: string
  trigger?: string
  getValueFromEvent?: (event: any) => any
  rules?: CustomRule[]
  validateTrigger?: string
}
declare const FormItem: FC<FormItemProps>
export default FormItem
