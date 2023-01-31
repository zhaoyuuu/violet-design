import { ValidateFieldsError } from 'async-validator'
import React, { FC, ReactNode, createContext } from 'react'
import useStore from './useStore'
export interface FormProps {
  name?: string
  initialValues?: Record<string, any>
  children?: ReactNode
}

export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields' | 'validateField'
> &
  Pick<FormProps, 'initialValues'>
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = props => {
  const { name, children, initialValues } = props
  const { form, fields, dispatch, validateField } = useStore()
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  }
  return (
    <>
      <form name={name} className="violetForm">
        <FormContext.Provider value={passedContext}>
          {children}
        </FormContext.Provider>
      </form>
      <div>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(fields)}</pre>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(form)}</pre>
      </div>
    </>
  )
}

Form.defaultProps = {
  name: 'violet_form',
}

export default Form
