import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './input'

describe('Input component', () => {
  test('renders input component with correct value', async () => {
    render(<Input value="hello" />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('hello')
  })

  test('calls onChange callback when input value changes', async () => {
    const onChange = jest.fn()
    render(<Input onChange={onChange} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(input, 'hello')
    expect(onChange).toHaveBeenCalled()
  })

  //   test('renders input component with icon', async () => {
  //     render(<Input icon="search" />)
  //     const icon = screen.getByTitle('title-search')
  //     expect(icon).toBeInTheDocument()
  //   })
  //   test('renders input component with icon', async () => {
  //     render(<Input icon="search" />)
  //     const icon = await screen.findByTitle('title-search')
  //     expect(icon).toBeInTheDocument()
  //   })
  //   test('renders input component with icon', async () => {
  //     render(<Input icon="search" />)
  //     const icon = screen.getByTitle('title-search')
  //     expect(icon).toBeInTheDocument()
  //     // add this line to debug the DOM output
  //     console.log(document.body.innerHTML)
  //   })

  // Add more test cases as needed
})
