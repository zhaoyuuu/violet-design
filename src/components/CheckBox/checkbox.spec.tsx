import { render, fireEvent, screen } from '@testing-library/react'
import CheckBox from './checkbox'

describe('CheckBox', () => {
  it('renders label', () => {
    const label = 'Test Label'
    render(<CheckBox label={label} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('renders children', () => {
    const childrenText = 'Test Children'
    render(<CheckBox>{childrenText}</CheckBox>)
    expect(screen.getByText(childrenText)).toBeInTheDocument()
  })

  it('onChange is called when checkbox is clicked', () => {
    const onChangeMock = jest.fn()
    render(<CheckBox onChange={onChangeMock} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  it('sets checked state when checkbox is clicked', () => {
    render(<CheckBox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('sets checked state', () => {
    render(<CheckBox checked />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('sets disabled state', () => {
    render(<CheckBox disabled />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('sets value attribute', () => {
    const value = 'test'
    render(<CheckBox value={value} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('value', value)
  })

  it('sets name attribute', () => {
    const name = 'test'
    render(<CheckBox name={name} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('name', name)
  })
})
