import React from 'react'
import { render } from '@testing-library/react'
import Icon, { IconProps } from './icon'
// 引入图标，组件库该步骤在index.tsx中，整体引入
// 为了测试需要，这里再引入一次
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

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
