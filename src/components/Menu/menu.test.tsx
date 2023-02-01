import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import Menu from './index'
import { IMenuProps } from './menu'

const testVerProps: IMenuProps = {
  mode: 'vertical',
  defaultIndex: '1',
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
