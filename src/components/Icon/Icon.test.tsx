import React from 'react'
import { render } from '@testing-library/react'
import Icon, { IconProps } from './Icon'

const defaultProps: IconProps = {
  icon: 'check',
}

const themeProps: IconProps = {
  icon: 'check',
  theme: 'success',
}
describe('test Icon component', () => {
  it('default icon', () => {
    const wrapper = render(
      <Icon {...defaultProps} data-testid="default-icon" />
    )
    const element = wrapper.getByTestId('default-icon')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('svg')
    expect(element).toHaveClass('violetIcon')
  })
  it('theme icon', () => {
    const wrapper = render(<Icon {...themeProps} data-testid="theme-icon" />)
    const element = wrapper.getByTestId('theme-icon')
    expect(element).toHaveClass('icon--success')
  })
})
