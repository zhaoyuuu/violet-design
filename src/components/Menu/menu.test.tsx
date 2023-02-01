import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Menu from './index'
import { IMenuProps } from './menu'

const testProps: IMenuProps = {
  mode: 'horizontal',
  onSelect: jest.fn(),
}
const testVerProps: IMenuProps = {
  mode: 'vertical',
}

const generateMenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <Menu.Item>active</Menu.Item>
      <Menu.Item disabled>disabled</Menu.Item>
      <Menu.Item>xyz</Menu.Item>
      <Menu.SubMenu title="dropdown">
        <Menu.Item>drop1</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}
// 坑人的css
const createStyleFile = () => {
  const cssFile = `
    .violetMenu__subMenu {
      display: none;
    }
    .violetMenu__subMenu--show {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe('test menu component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('violetMenu')
    expect(activeElement).toHaveClass(
      'violetMenu__menuItem violetMenu__menuItem--active'
    )
    expect(disabledElement).toHaveClass(
      'violetMenu__menuItem violetMenu__menuItem--disabled'
    )
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('violetMenu__menuItem--active')
    expect(activeElement).not.toHaveClass('violetMenu__menuItem--active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('violetMenu__menuItem--active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    // await waitFor(() => {
    expect(wrapper.queryByText('drop1')).toBeVisible()
    // })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    // await waitFor(() => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    // })
  })
})

describe('test Menu component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('violetMenu--vertical')
  })
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = wrapper2.queryByText('drop1')
    expect(dropDownItem).toBeVisible()
    fireEvent.click(wrapper2.getByText('dropdown'))
    expect(dropDownItem).not.toBeVisible()
  })
})
