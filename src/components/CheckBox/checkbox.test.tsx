import React from 'react'
import { fireEvent,render, screen } from '@testing-library/react'
import CheckBox from './Checkbox'

const disabledProps = {
    disabled: true,
    onChange: jest.fn()
  }

const testProps = {
    checked: true,
    disabled: false
  }

describe('test Checkbox component',() => {
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
        const wrapper = render(<CheckBox {...disabledProps}>Disabled CheckBox</CheckBox>)
        const element = wrapper.getByText('Disabled CheckBox')
        expect(element).toBeInTheDocument()
      })
})