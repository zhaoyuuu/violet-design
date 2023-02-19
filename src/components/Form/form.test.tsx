import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'

import Form, { FormProps } from './form'
import Item from './formItem'
import Input from '../Input'
import Button from '../Button/button'

const testProps: FormProps = {
  name: 'test-form',
  initialValues: { name: 'viking', password: '12345', confirmPwd: '23456' },
  onFinish: jest.fn(),
  onFinishFailed: jest.fn(),
}
let nameInput: HTMLInputElement,
  pwdInput: HTMLInputElement,
  conPwdInput: HTMLInputElement,
  submitButton: HTMLButtonElement

describe('testing Form component', () => {
  beforeEach(() => {
    render(
      <Form {...testProps}>
        <Item
          label="Name"
          name="name"
          rules={[
            { type: 'string', required: true, message: 'name error' },
            { type: 'string', min: 3, message: 'less than 3' },
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Password"
          name="password"
          rules={[
            { type: 'string', required: true, message: 'password error' },
            { type: 'string', min: 4, message: 'less then 4' },
          ]}
        >
          <Input type="password" />
        </Item>
        <Item
          label="Confirm"
          name="confirmPwd"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'confirm password error',
            },
            { type: 'string', min: 4, message: 'less then 4' },
            ({ getFieldValue }) => ({
              asyncValidator(rule, value) {
                return new Promise((resolve, reject) => {
                  if (value !== getFieldValue('password')) {
                    reject('Do not match!')
                  }
                  resolve()
                })
              },
            }),
          ]}
        >
          <Input type="password" />
        </Item>
        <Button type="submit" btnType="primary">
          Log in
        </Button>
      </Form>
    )
    const { getByDisplayValue, getByText } = screen
    nameInput = getByDisplayValue('viking')
    pwdInput = getByDisplayValue('12345')
    conPwdInput = getByDisplayValue('23456')
    submitButton = getByText('Log in')
  })
  it('should render the correct Form component', () => {
    const { getByText } = screen
    // should contains two labels
    expect(getByText('Name')).toBeInTheDocument()
    expect(getByText('Password')).toBeInTheDocument()
    expect(getByText('Confirm')).toBeInTheDocument()
    // should fill in three inputs
    expect(nameInput).toBeInTheDocument()
    expect(pwdInput).toBeInTheDocument()
    expect(conPwdInput).toBeInTheDocument()
    // should render the submit button
    expect(submitButton).toBeInTheDocument()
  })
  it('submit form with invliad values should show the error message', () => {
    const { getByText } = screen
    fireEvent.change(nameInput, { target: { value: '' } })
    fireEvent.change(pwdInput, { target: { value: '' } })
    fireEvent.click(submitButton)
    waitFor(() => {
      expect(getByText('name error')).toBeInTheDocument()
      expect(getByText('password error')).toBeInTheDocument()
      expect(testProps.onFinishFailed).toHaveBeenCalled()
    })
  })
  it('change single input to invalid values should trigger the validate', () => {
    const { getByText } = screen
    // name input, type: string
    fireEvent.change(nameInput, { target: { value: '' } })
    fireEvent.blur(nameInput)
    waitFor(() => {
      expect(getByText('name error')).toBeInTheDocument()
    })
    fireEvent.change(nameInput, { target: { value: '12' } })
    fireEvent.blur(nameInput)
    waitFor(() => {
      expect(getByText('less than 3')).toBeInTheDocument()
    })
  })
  it('custom rules should work', () => {
    const { getByText } = screen
    // change and blur comfirmPwd
    fireEvent.change(conPwdInput, { target: { value: '23456' } })
    fireEvent.blur(conPwdInput)
    waitFor(() => {
      expect(getByText('Do not match!')).toBeInTheDocument()
    })
    // change to the same
    fireEvent.change(conPwdInput, { target: { value: '12345' } })
    fireEvent.blur(conPwdInput)
    waitFor(() => {
      expect(getByText('Do not match!')).not.toBeInTheDocument()
    })
    fireEvent.click(submitButton)
    // submit the form with the right data
    waitFor(() => {
      expect(testProps.onFinish).toHaveBeenCalled()
    })
  })
})
