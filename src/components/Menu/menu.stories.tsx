import React from 'react'
import Menu from './index'

import { ComponentMeta, ComponentStory } from '@storybook/react'

// 大标题
const menuMeta: ComponentMeta<typeof Menu> = {
  title: 'Menu 导航菜单',
  component: Menu,
}

export default menuMeta

// 页面
const Template: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <Menu.Item>first link</Menu.Item>
    <Menu.Item>second link</Menu.Item>
    <Menu.Item disabled>third link</Menu.Item>
    <Menu.SubMenu title="dropdown">
      <Menu.Item>dropdown 1</Menu.Item>
      <Menu.Item>dropdown 2</Menu.Item>
      <Menu.Item>dropdown 3</Menu.Item>
    </Menu.SubMenu>
  </Menu>
)

export const horizontalMenu = Template.bind({})
horizontalMenu.storyName = '横向菜单'
horizontalMenu.decorators = [
  Story => (
    <div style={{ marginBottom: '100px' }}>
      <Story />
    </div>
  ),
]
horizontalMenu.parameters = {
  docs: {
    source: {
      code: `
<Menu>
  <Menu.Item>first link</Menu.Item>
  <Menu.Item>second link</Menu.Item>
  <Menu.Item disabled>third link</Menu.Item>
  <Menu.SubMenu title="dropdown">
    <Menu.Item>dropdown 1</Menu.Item>
    <Menu.Item>dropdown 2</Menu.Item>
    <Menu.Item>dropdown 3</Menu.Item>
  </Menu.SubMenu>
</Menu>
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}

export const verticalMenu = Template.bind({})
verticalMenu.args = {
  defaultIndex: '1',
  mode: 'vertical',
}
verticalMenu.storyName = '纵向菜单'
verticalMenu.decorators = [
  Story => (
    <div style={{ width: '300px' }}>
      <Story />
    </div>
  ),
]
verticalMenu.parameters = {
  docs: {
    source: {
      code: `
<Menu defaultIndex={1} mode='vertical'>
  <Menu.Item>first link</Menu.Item>
  <Menu.Item>second link</Menu.Item>
  <Menu.Item disabled>third link</Menu.Item>
  <Menu.SubMenu title="dropdown">
    <Menu.Item>dropdown 1</Menu.Item>
    <Menu.Item>dropdown 2</Menu.Item>
    <Menu.Item>dropdown 3</Menu.Item>
  </Menu.SubMenu>
</Menu>
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}
