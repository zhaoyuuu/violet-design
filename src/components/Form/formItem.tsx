import React, { FC, ReactNode, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { FormContext } from './form'
export interface FormItemProps {
  name: string
  label?: string
  children?: ReactNode
  valuePropName?: string
  trigger?: string
  getValueFromEvent?: (event: any) => any
}

const FormItem: FC<FormItemProps> = props => {
  const { label, children, name, valuePropName, trigger, getValueFromEvent } =
    props
  const { dispatch, fields } = useContext(FormContext)
  const rowClass = classNames('violetRow', {
    '.violetRow--no__label': !label,
  })

  useEffect(() => {
    dispatch({ type: 'addField', name, value: { label, name, value: '' } })
  }, [])
  //获取store对应的value
  const fieldState = fields[name]
  const value = fieldState && fieldState.value

  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent && getValueFromEvent(e)
    console.log('new value', value)
    dispatch({ type: 'updateValue', name, value })
  }
  // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
  const controlProps: Record<string, any> = {}
  controlProps[valuePropName!] = value
  controlProps[trigger!] = onValueUpdate
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
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="violetForm--item ">{returnChildNode}</div>
    </div>
  )
}

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  // validateTrigger: 'onBlur',
  getValueFromEvent: e => e.target.value,
}

export default FormItem
