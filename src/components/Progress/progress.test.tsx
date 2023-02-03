import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Progress from './progress'

describe('Progress', () => {
  test('default progress', () => {
    const wrapper = render(<Progress showInfo={true}></Progress>)
    const element = wrapper.getByText(/0/)
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('LABEL')
    expect(element.parentElement).toHaveClass('violetProgress')
  })

  test('success progress', () => {
    const wrapper = render(<Progress success={true} showInfo={true}></Progress>)
    const element = wrapper.getByText('√')
    expect(element).toBeInTheDocument()
  })
})
