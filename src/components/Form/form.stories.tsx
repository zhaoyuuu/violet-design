import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Form from './form'
import FormItem from './formItem'
import Input from '../Input/input'
import Button from '../Button/button'
import { CustomRule } from './useStore'
const meta: ComponentMeta<typeof Form> = {
  title: 'Form 组件',
  id: 'Form',
  component: Form,
  subcomponents: { Item: FormItem },
  decorators: [
    Story => (
      <div style={{ width: '550px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
const confirmRules: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      console.log('the value', getFieldValue('password'))
      console.log(value)
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue('password')) {
          reject('The two passwords that you entered do not match!')
        }
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
  }),
]
export const BasicForm = () => {
  return (
    <Form>
      <FormItem
        label="用户名"
        name="username"
        rules={[{ type: 'string', required: true, min: 3 }]}
      >
        <Input />
      </FormItem>
      <FormItem
        label="密码"
        name="password"
        rules={[{ type: 'string', required: true, min: 3, max: 8 }]}
      >
        <Input type="password" />
      </FormItem>
      <FormItem label="重复密码" name="confirmPwd" rules={confirmRules}>
        <Input type="password" />
      </FormItem>
      <div
        className="agreement-section"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <FormItem
          name="agreement"
          valuePropName="checked"
          getValueFromEvent={e => e.target.checked}
        >
          <input type="checkbox" />
        </FormItem>
        <span className="agree-text">
          注册即代表同意<a href="#">用户协议</a>
        </span>
      </div>
      <div className="violetForm--submit_area">
        <Button type="submit" btnType="primary" size="sm">
          sign in
        </Button>
      </div>
    </Form>
  )
}
