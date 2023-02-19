import React from 'react'
import { render, screen } from '@testing-library/react'
import CheckBox from './checkbox'

const disabledProps = {
  disabled: true,
  onChange: jest.fn(),
}

const testProps = {
  checked: true,
  disabled: false,
}

describe('test Checkbox component', () => {
  it('should render the correct default checkbox', () => {
    const wrapper = render(<CheckBox>Nice</CheckBox>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(screen.getByText('Nice')).toBeInTheDocument()
    expect(element.disabled).toBeFalsy()
  })
  it('should render the correct component based on different props', () => {
    const wrapper = render(<CheckBox {...testProps}>Nice</CheckBox>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('SPAN')
  })
  test('should render disabled checkbox', () => {
    const wrapper = render(
      <CheckBox {...disabledProps}>Disabled CheckBox</CheckBox>
    )
    const element = wrapper.getByText('Disabled CheckBox')
    expect(element).toBeInTheDocument()
  })
})

describe('rendering time test', () => {
  it('render in less than 50ms', () => {
    const startTime = performance.now()
    const { container } = render(<CheckBox>Nice</CheckBox>)
    const endTime = performance.now()
    const renderingTime = endTime - startTime
    console.log(renderingTime)
    expect(renderingTime).toBeLessThan(50)
  })
})
