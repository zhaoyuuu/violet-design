import React from 'react'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu/subMenu'

import { ComponentMeta, ComponentStory } from '@storybook/react'

// 大标题
const menuMeta: ComponentMeta<typeof Menu> = {
  title: 'Menu 导航菜单',
  component: Menu,
  subcomponents: {
    SubMenu: SubMenu,
    MenuItem: MenuItem,
  },
}

export default menuMeta

// 页面
const Template: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <MenuItem>first link</MenuItem>
    <MenuItem>second link</MenuItem>
    <MenuItem disabled>third link</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>dropdown 1</MenuItem>
      <MenuItem>dropdown 2</MenuItem>
      <MenuItem>dropdown 3</MenuItem>
    </SubMenu>
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
  <MenuItem>first link</MenuItem>
  <MenuItem>second link</MenuItem>
  <MenuItem disabled>third link</MenuItem>
  <SubMenu title="dropdown">
    <MenuItem>dropdown 1</MenuItem>
    <MenuItem>dropdown 2</MenuItem>
    <MenuItem>dropdown 3</MenuItem>
  </SubMenu>
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
  <MenuItem>first link</MenuItem>
  <MenuItem>second link</MenuItem>
  <MenuItem disabled>third link</MenuItem>
  <SubMenu title="dropdown">
    <MenuItem>dropdown 1</MenuItem>
    <MenuItem>dropdown 2</MenuItem>
    <MenuItem>dropdown 3</MenuItem>
  </SubMenu>
</Menu>
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}
