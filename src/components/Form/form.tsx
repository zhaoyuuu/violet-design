import { ValidateError } from 'async-validator'
import React, { FC, ReactNode, createContext } from 'react'
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
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = props => {
  const { name, children, initialValues, onFinish, onFinishFailed } = props
  const { form, fields, dispatch, validateField, validateAllFields } =
    useStore()
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  }
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { isValid, errors, values } = await validateAllFields()
    if (isValid && onFinish) {
      onFinish(values)
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors)
    }
  }
  let childrenNode: ReactNode
  if (typeof children === 'function') {
    childrenNode = children(form)
  } else {
    childrenNode = children
  }
  return (
    <>
      <form name={name} className="violetForm" onSubmit={submitForm}>
        <FormContext.Provider value={passedContext}>
          {childrenNode}
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
