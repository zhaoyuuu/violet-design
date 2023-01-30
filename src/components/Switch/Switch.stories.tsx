import React from 'react'
import Switch from './switch'

import { ComponentStory, ComponentMeta } from '@storybook/react'
export default {
  title: 'Switch',
  id: 'Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = args => <Switch {...args} />

export const ADefault = Template.bind({})
ADefault.args = {
  children: 'Default Switch',
}
ADefault.storyName = '默认开关样式'

export const BSwitchWithSize = () => (
  <>
    <Switch size="small"> small switch </Switch>
    <Switch size="medium"> medium switch </Switch>
  </>
)
BSwitchWithSize.storyName = '不同尺寸的开关'

export const CSwitchWithTheme = () => (
  <>
    <Switch theme="primary"> primary switch </Switch>
    <Switch theme="danger"> danger switch </Switch>
    <Switch theme="light"> light switch </Switch>
  </>
)

CSwitchWithTheme.storyName = '不同主题的开关'
