import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import InputNumber, { IInputNumberProps } from './inputNumber'

const testProps: IInputNumberProps = {
  onChange: jest.fn(),
  placeholder: 'input_number',
  onPressEnter: jest.fn(),
  min: 0,
  max: 10,
}
const testPropsWithCustomRender: IInputNumberProps = {
  ...testProps,
  placeholder: 'input_number_2',
  step: 3,
}

let input: HTMLInputElement, wrapper: RenderResult
describe('test InputNumber component', () => {
  beforeEach(() => {
    wrapper = render(<InputNumber {...testProps} />)
    input = wrapper.getByPlaceholderText('input_number') as HTMLInputElement
  })

  it('should render the correct default InputNumber', () => {
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('voiletInputNumberWrap__inputNumber')
    fireEvent.change(input, { target: { value: '2' } })
    expect(testProps.onChange).toHaveBeenCalledTimes(1)
    expect(input.value).toEqual('2')
  })

  // it('shoud provide keyboard support', () => {})

  // it('should be disabled when set disabled', () => {})

  it('value should be >= min && <= max', () => {
    const addButton = wrapper.container.querySelectorAll(
      '.voiletInputNumberWrap__arrowWrap__arrow'
    )[0]
    const reduceButton = wrapper.container.querySelectorAll(
      '.voiletInputNumberWrap__arrowWrap__arrow'
    )[1]
    // max
    fireEvent.change(input, { target: { value: '10' } })
    fireEvent.click(addButton)
    expect(input.value).toEqual('10')
    // min
    fireEvent.change(input, { target: { value: '0' } })
    fireEvent.click(reduceButton)
    expect(input.value).toEqual('0')
  })

  it('step setting is valid', () => {
    const wrapper = render(<InputNumber {...testPropsWithCustomRender} />)
    input = wrapper.getByPlaceholderText('input_number_2') as HTMLInputElement
    const addButton = wrapper.container.querySelectorAll(
      '.voiletInputNumberWrap__arrowWrap__arrow'
    )[0]
    fireEvent.change(input, { target: { value: '0' } })
    fireEvent.click(addButton)
    expect(input.value).toEqual('3')
  })

  it('call the onPressEnter function correctly when pressing enter', () => {
    input.focus()
    fireEvent.keyDown(input, { keyCode: 13 })
    expect(testProps.onPressEnter).toHaveBeenCalledTimes(1)
  })
})
