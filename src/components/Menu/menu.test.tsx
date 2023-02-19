import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react'
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
        <Menu.Item>drop2</Menu.Item>
        <Menu.Item>drop3</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe('test menu component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
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
    expect(wrapper.queryByText('drop1')).not.toBeInTheDocument()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    expect(wrapper.queryByText('drop1')).toBeVisible()
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseEnter(wrapper.getByText('active'))
    waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeInTheDocument()
    })
  })
})

describe('test Menu component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
  })

  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('violetMenu--vertical')
  })

  it('should show dropdown items when click on subMenu for vertical mode', async () => {
    const dropDownItem = wrapper2.queryByText('drop1')
    expect(dropDownItem).toBeVisible()
    fireEvent.click(wrapper2.getByText('dropdown'))
    waitFor(() => {
      expect(dropDownItem).not.toBeVisible()
    })
  })
})
