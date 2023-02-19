import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Radio from './radio'

const defaultProps = {
  onChange: jest.fn(),
}

describe('Radio', () => {
  /**it is the abbreviation of test*/
  test('render the radio', () => {
    render(<Radio>Radio Test</Radio>)
    expect(screen.getByText(/Radio/)).toBeInTheDocument()
  })

  test('default radio', () => {
    const wrapper = render(<Radio {...defaultProps}>Default Radio</Radio>)
    const element = wrapper.getByText('Default Radio')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('SPAN')
    expect(element.parentElement).toHaveClass('violetRadio__dot')
    if (element.parentElement != null) {
      element.parentElement.click()
      expect(defaultProps.onChange).toBeCalledTimes(0)
    }
  })
})

it('render in less than 50ms', () => {
  const startTime = performance.now()
  const { container } = render(<Radio>Radio Test</Radio>)
  const endTime = performance.now()
  const renderingTime = endTime - startTime
  console.log(renderingTime)
  expect(renderingTime).toBeLessThan(50)
})
