import React, { FC, ReactNode, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { RuleItem } from 'async-validator'
import { FormContext } from './form'
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

const FormItem: FC<FormItemProps> = props => {
  const {
    label,
    children,
    name,
    valuePropName,
    trigger,
    getValueFromEvent,
    rules,
    validateTrigger,
  } = props as SomeRequired<
    FormItemProps,
    'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'
  >
  const { dispatch, fields, initialValues, validateField } =
    useContext(FormContext)
  const rowClass = classNames('violetRow', {
    '.violetRow--no__label': !label,
  })

  useEffect(() => {
    const value = (initialValues && initialValues[name]) || ''
    dispatch({
      type: 'addField',
      name,
      value: { label, name, value, rules: rules || [], errors: [] },
    })
  }, [])
  //获取store对应的value
  const fieldState = fields[name]
  const value = fieldState && fieldState.value
  const errors = fieldState && fieldState.errors
  const isRequired = rules?.some(
    rule => typeof rule !== 'function' && rule.required
  )
  const hasError = errors && errors.length > 0

  const labelClass = classNames({
    'violetForm--item__required': isRequired,
  })

  const itemClass = classNames('violetForm--item__control', {
    'violetForm--item__has__error': hasError,
  })

  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e)
    console.log('new value', value)
    dispatch({ type: 'updateValue', name, value })
  }
  const onValueValidate = async () => {
    await validateField(name)
  }
  // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
  const controlProps: Record<string, any> = {}
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueUpdate
  if (rules) {
    controlProps[validateTrigger] = onValueValidate
  }
  // 2 获取 children 数组的第一个元素
  const childList = React.Children.toArray(children)
  // 没有子组件
  if (childList.length === 0) {
    console.error(
      'No child element found in Form.Item, please provide one form component'
    )
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn(
      'Only support one child element in Form.Item, others will be omitted'
    )
  }
  // 不是 ReactElement 的子组件
  if (!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid React Element')
  }

  const child = childList[0] as React.ReactElement
  // 3 cloneElement，混合这个child 以及 手动的属性列表
  const returnChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  })
  return (
    <div className={rowClass}>
      {label && (
        <div className="violetForm--item__label">
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      )}
      <div className="violetForm--item ">
        <div className={itemClass}>{returnChildNode}</div>
        {hasError && (
          <div className="violetForm--item__explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  )
}

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur',
  getValueFromEvent: e => e.target.value,
}

export default FormItem
