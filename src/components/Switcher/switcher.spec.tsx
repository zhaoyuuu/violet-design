import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Switch from './switcher'

describe('Switch component', () => {
  it('renders correctly', () => {
    render(<Switch />)
    expect(screen.getByRole('Switch')).toBeInTheDocument()
  })

  it('has correct default props', () => {
    const { container } = render(<Switch />)
    const button = container.firstChild as HTMLButtonElement

    expect(button.disabled).toBeFalsy()
    expect(button).toHaveAttribute('aria-checked', 'true')
    expect(button).toHaveClass('violetSwitch')
    expect(button).toHaveClass('violetSwitch--primary')
  })

  it('displays checked children when checked is true', () => {
    render(<Switch checked checkedChildren="ON" unCheckedChildren="OFF" />)
    expect(screen.getByText('ON')).toBeInTheDocument()
    expect(screen.queryByText('OFF')).toBeNull()
  })

  it('displays unchecked children when checked is false', () => {
    render(
      <Switch checked={false} checkedChildren="ON" unCheckedChildren="OFF" />
    )
    expect(screen.getByText('OFF')).toBeInTheDocument()
    expect(screen.queryByText('ON')).toBeNull()
  })

  //   it('handles click events', () => {
  //     const handleChange = jest.fn()
  //     render(<Switch onChange={handleChange} />)
  //     const button = screen.getByRole('Switch')
  //     fireEvent.click(button)
  //     expect(handleChange).toHaveBeenCalledTimes(1)
  //     expect(button).toHaveAttribute('aria-checked', 'false')
  //   })

  //   it('toggles checked state when clicked', () => {
  //     render(<Switch checked />)
  //     const button = screen.getByRole('Switch')
  //     fireEvent.click(button)
  //     expect(button).not.toHaveClass('violetSwitch--checked')
  //   })

  it('handles disabled state correctly', () => {
    const handleChange = jest.fn()
    render(<Switch disabled onChange={handleChange} />)
    const button = screen.getByRole('Switch')
    fireEvent.click(button)
    expect(handleChange).not.toHaveBeenCalled()
    expect(button).toHaveAttribute('aria-checked', 'true')
    expect(button).toHaveClass('violetSwitch--disabled')
  })

  it('overrides default theme', () => {
    const { container } = render(<Switch theme="secondary" />)
    const button = container.firstChild as HTMLButtonElement

    expect(button).toHaveClass('violetSwitch--secondary')
    expect(button).not.toHaveClass('violetSwitch--primary')
  })

  it('overrides default size', () => {
    const { container } = render(<Switch size="small" />)
    const button = container.firstChild as HTMLButtonElement

    expect(button).toHaveClass('violetSwitch--small')
  })
})
