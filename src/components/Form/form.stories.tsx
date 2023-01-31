import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Form from './form'
import FormItem from './formItem'
import Input from '../Input/input'
import Button, { ButtonType } from '../Button/button'
import exp from 'constants'

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

export const BasicForm = () => {
  return (
    <Form>
      <FormItem label="user">
        <Input />
      </FormItem>
      <FormItem label="PASSWORD">
        <Input type="password" />
      </FormItem>
      <FormItem>
        <Input placeholder="no-label" />
      </FormItem>
      <div className="violet-form-submit-area">
        <Button type="submit" btnType="primary">
          sign in
        </Button>
      </div>
    </Form>
  )
}
