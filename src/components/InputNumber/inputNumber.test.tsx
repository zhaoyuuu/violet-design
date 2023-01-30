import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import InputNumber, { IInputNumberProps } from './inputNumber'
import userEvent from '@testing-library/user-event'

const testProps: IInputNumberProps = {
  onChange: jest.fn(),
  placeholder: 'input_number',
}

let input: HTMLInputElement
describe('test InputNumber component', () => {
  // beforeEach(() => {
  //   const wrapper = render(<InputNumber {...testProps} />)
  //   input = wrapper.getByRole('input') as HTMLInputElement
  // })

  it('change values via the fireEvent.change method', () => {
    const wrapper = render(<InputNumber {...testProps} />)
    input = wrapper.getByPlaceholderText('input_number') as HTMLInputElement
    fireEvent.change(input, { target: { value: '2' } })
    expect(testProps.onChange).toHaveBeenCalledTimes(1)
    expect(input.value).toEqual('2')
  })

  // it('shoud provide keyboard support', () => {})

  // it('click outside should hide the dropdown', () => {})

  // it('should be disabled when set disabled', () => {})

  // it('value should be >= min && <= max', () => {})

  // it('status & size setting is valid', () => {})

  // it('step setting is valid', () => {})

  // it('call the onPressEnter function correctly when pressing enter', () => {})
})
