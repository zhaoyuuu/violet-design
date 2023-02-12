import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Tabs from './tabs'
import TabItem from './tabItem'
import Icon from '../Icon/icon'
export default {
  title: '组件/数据展示/Tabs 标签页',
  id: 'Tabs',
  component: Tabs,
  subcomponents: { TabItem: TabItem },
} as ComponentMeta<typeof Tabs>

export const ADefaultTabs: ComponentStory<typeof Tabs> = args => (
  <Tabs {...args}>
    <TabItem label="选项卡一">this is content one</TabItem>
    <TabItem label="选项卡二">this is content two</TabItem>
    <TabItem label="用户管理">this is content three</TabItem>
  </Tabs>
)
ADefaultTabs.storyName = '默认的Tabs'
export const BCardTabs: ComponentStory<typeof Tabs> = args => (
  <Tabs {...args} type="card">
    <TabItem label="card1">this is card one</TabItem>
    <TabItem label="card2">this is content two</TabItem>
    <TabItem label="disabled" disabled>
      this is content three
    </TabItem>
  </Tabs>
)
BCardTabs.storyName = '选项卡样式的Tabs'
export const CCustomTabs: ComponentStory<typeof Tabs> = args => (
  <Tabs {...args} mode="vertical">
    <TabItem label="card1">this is card one</TabItem>
    <TabItem label="card2">this is content two</TabItem>
    <TabItem label="disabled" disabled>
      this is content three
    </TabItem>
    <TabItem label="tab2">this is content two</TabItem>
  </Tabs>
)
CCustomTabs.storyName = 'vertical tabs'

export const DCustomTabs: ComponentStory<typeof Tabs> = args => (
  <Tabs {...args} type="card">
    <TabItem
      label={
        <>
          <Icon icon="check-circle" /> 自定义图标
        </>
      }
    >
      this is card one
    </TabItem>
    <TabItem label="tab2">this is content two</TabItem>
  </Tabs>
)
DCustomTabs.storyName = '自定义选项卡样式'
