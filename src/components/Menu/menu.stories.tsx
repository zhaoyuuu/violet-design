import React from 'react'
import Menu from './index'

import { ComponentMeta, ComponentStory } from '@storybook/react'

// 大标题
const menuMeta: ComponentMeta<typeof Menu> = {
  title: '组件/导航/Menu 导航菜单',
  component: Menu,
}

export default menuMeta

// 页面
const Template: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
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
  <Menu.Item>active</Menu.Item>
  <Menu.Item disabled>disabled</Menu.Item>
  <Menu.Item>xyz</Menu.Item>
  <Menu.SubMenu title="dropdown">
    <Menu.Item>drop1</Menu.Item>
    <Menu.Item>drop2</Menu.Item>
    <Menu.Item>drop3</Menu.Item>
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
  defaultIndex: '2',
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
<Menu defaultIndex={2} mode='vertical'>
  <Menu.Item>active</Menu.Item>
  <Menu.Item disabled>disabled</Menu.Item>
  <Menu.Item>xyz</Menu.Item>
  <Menu.SubMenu title="dropdown">
    <Menu.Item>drop1</Menu.Item>
    <Menu.Item>drop2</Menu.Item>
    <Menu.Item>drop3</Menu.Item>
  </Menu.SubMenu>
</Menu>
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}
