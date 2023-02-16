import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'

describe('Button Component', () => {
  const defaultProps: ButtonProps = {
    children: 'Button',
    onClick: jest.fn(),
  }

  it('should render the button', () => {
    const { getByText } = render(<Button {...defaultProps} />)
    expect(getByText('Button')).toBeInTheDocument()
  })

  it('should render the correct class name', () => {
    const { container } = render(<Button {...defaultProps} className="test" />)
    expect(
      container.querySelector('.violetButton')?.classList.contains('test')
    ).toBeTruthy()
  })

  it('should be disabled when disabled is true', () => {
    const { getByText } = render(<Button {...defaultProps} disabled={true} />)
    expect(getByText('Button')).toBeDisabled()
  })

  it('should render the correct size', () => {
    const { getByText } = render(<Button {...defaultProps} size="lg" />)
    expect(getByText('Button')).toHaveClass('violetButton--lg')
  })

  it('should render the correct type', () => {
    const { getByText } = render(<Button {...defaultProps} btnType="primary" />)
    expect(getByText('Button')).toHaveClass('violetButton--primary')
  })

  it('should render the correct children', () => {
    const { getByText } = render(
      <Button {...defaultProps}>Custom Button</Button>
    )
    expect(getByText('Custom Button')).toBeInTheDocument()
  })

  it('should render the correct href', () => {
    const { getByRole } = render(
      <Button {...defaultProps} btnType="link" href="https://example.com" />
    )
    const link = getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('should call onClick callback when the button is clicked', () => {
    const { getByText } = render(
      <Button {...defaultProps}>Custom Button</Button>
    )
    const button = getByText('Custom Button')
    fireEvent.click(button)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
})
