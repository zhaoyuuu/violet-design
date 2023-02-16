import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import InputNumber from './inputNumber'

describe('InputNumber', () => {
  //   it('renders without crashing', () => {
  //     render(<InputNumber onChange={() => {}} />)
  //     expect(screen.getByRole('spinbutton')).toBeInTheDocument()
  //   })
  //   it('displays the correct initial value', () => {
  //     render(<InputNumber value="10" onChange={() => {}} />)
  //     expect(screen.getByRole('spinbutton')).toHaveValue('10')
  //   })
  // it('increments the value when the up arrow is clicked', () => {
  //   const handleChange = jest.fn()
  //   render(<InputNumber value="10" onChange={handleChange} />)
  //     fireEvent.click(screen.getByText('+'))
  //     expect(handleChange).toHaveBeenCalledWith('11')
  //     expect(screen.getByRole('spinbutton')).toHaveValue('11')
  //   })
  //   it('decrements the value when the down arrow is clicked', () => {
  //     const handleChange = jest.fn()
  //     render(<InputNumber value="10" onChange={handleChange} />)
  //     fireEvent.click(screen.getByText('-'))
  //     expect(handleChange).toHaveBeenCalledWith('9')
  //     expect(screen.getByRole('spinbutton')).toHaveValue('9')
  //   })
  //   it('does not increment the value beyond the max prop', () => {
  //     const handleChange = jest.fn()
  //     render(<InputNumber value="100" max={100} onChange={handleChange} />)
  //     fireEvent.click(screen.getByText('+'))
  //     expect(handleChange).not.toHaveBeenCalled()
  //     expect(screen.getByRole('spinbutton')).toHaveValue('100')
  //   })
  //   it('does not decrement the value beyond the min prop', () => {
  //     const handleChange = jest.fn()
  //     render(<InputNumber value="-100" min={-100} onChange={handleChange} />)
  //     fireEvent.click(screen.getByText('-'))
  //     expect(handleChange).not.toHaveBeenCalled()
  //     expect(screen.getByRole('spinbutton')).toHaveValue('-100')
  //   })
  it('calls the onPressEnter callback when the enter key is pressed', () => {
    const handlePressEnter = jest.fn()
    render(<InputNumber value="10" onPressEnter={handlePressEnter} />)
    fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'Enter' })
    expect(handlePressEnter).toHaveBeenCalled()
  })
})
