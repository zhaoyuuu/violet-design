import React, { ReactNode } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './button'
import Icon from '../Icon'

export default {
  title: '组件/通用/Button 按钮',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>

//default button
const Template: ComponentStory<typeof Button> = args => (
  <Button {...args}></Button>
)
export const Default = Template.bind({})
Default.args = {
  children: 'Default Button',
  onClick: () => console.log(123),
}
Default.storyName = 'Defalut Button 默认按钮'
//primary Button
export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button',
}
Primary.storyName = 'Primary Button 主按钮'
//danger Button
export const Danger = Template.bind({})
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button',
}
Danger.storyName = 'Danger Button 危险按钮'
//link Button
export const Link = Template.bind({})
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com',
}
Link.storyName = 'Link Button 链接按钮'
//text Button
export const Text = Template.bind({})
Text.args = {
  btnType: 'text',
  children: 'Text Button',
}
Text.storyName = 'Text Button 文本按钮'
//icon button
export const IconButton = (args: any) => (
  <Button btnType="primary">
    <Icon icon="upload" /> Icon Button
  </Button>
)
IconButton.storyName = 'Icon Button 图标按钮'

//export const
//icon button

export const DashButton = (args: any) => (
  <Button btnType="dash">Dashed Button</Button>
)
DashButton.storyName = 'Dash Button 虚线按钮'

//Large Button
export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  children: 'Large Button',
}
Large.storyName = 'Large Button 大按钮'
//small Button
export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  children: 'Small Button',
}
Small.storyName = 'Small Button 小按钮'
