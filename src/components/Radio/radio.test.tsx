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
    expect(element.parentElement).toHaveClass('violetRadio')
    //todo: some problems with click func
    if (element.parentElement != null) {
      element.parentElement.click()
      expect(defaultProps.onChange).toHaveBeenCalled()
    }
  })
})
