import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Switch from './switcher'

export default {
  title: 'Switch',
  id: 'Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

export const ADefault = () => (
  <>
    <Switch>Default Switch</Switch>
  </>
)
export const BSwitchWithSize = () => (
  <>
    <Switch size="small"> small switch </Switch>
    <Switch size="medium"> medium switch </Switch>
  </>
)
export const CSwitchWithTheme = () => (
  <>
    <Switch theme="primary"> primary switch </Switch>
    <Switch theme="danger"> danger switch </Switch>
    <Switch theme="light"> light switch </Switch>
  </>
)

//添加storyName
ADefault.storyName = '默认开关样式'
BSwitchWithSize.storyName = '不同尺寸的开关'
CSwitchWithTheme.storyName = '不同主题的开关'
