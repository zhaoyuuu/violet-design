import React from 'react'
import CheckBox from './checkbox'

import { ComponentMeta, ComponentStory } from '@storybook/react'

const checkboxMeta: ComponentMeta<typeof CheckBox> = {
  title: '组件/数据录入/CheckBox 多选框',
  component: CheckBox,
}

export default checkboxMeta

const Template: ComponentStory<typeof CheckBox> = args => (
  <CheckBox {...args}></CheckBox>
)

export const Default = Template.bind({})
Default.args = {
  children: 'Default CheckBox',
}
// export const Default: ComponentStory<typeof CheckBox> = (args) => (
//     <CheckBox {...args}>Default CheckBox</CheckBox>
// )
Default.storyName = '默认样式'

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: 'Disabled CheckBox',
}
Disabled.storyName = '禁用样式'

export const Checked = Template.bind({})
Checked.args = {
  checked: true,
  children: 'Checked CheckBox',
}
Checked.storyName = '勾选样式'
