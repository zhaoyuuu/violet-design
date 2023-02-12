import React from 'react'
import Affix from './affix'
import Button from '../Button/button'
import Tabs from '../Tabs/tabs'
import TabItem from '../Tabs/tabItem'

import { ComponentMeta, ComponentStory } from '@storybook/react'

// 大标题
const affixMeta: ComponentMeta<typeof Affix> = {
  title: '组件/其他/Affix 固钉',
  component: Affix,
}

export default affixMeta

// 页面
export const AffixButton: ComponentStory<typeof Affix> = args => {
  return (
    <Affix {...args}>
      <Button btnType="primary">affix button</Button>
    </Affix>
  )
}
AffixButton.storyName = '示例1'
AffixButton.args = {
  offsetTop: 100,
}

export const AffixTab: ComponentStory<typeof Affix> = args => {
  return (
    <Affix {...args}>
      <Tabs type="card">
        <TabItem label="card1">this is card one</TabItem>
        <TabItem label="card2">this is content two</TabItem>
        <TabItem label="disabled" disabled>
          this is content three
        </TabItem>
      </Tabs>
    </Affix>
  )
}
AffixTab.storyName = '示例2'
AffixTab.decorators = [
  Story => (
    <div style={{ marginBottom: '500px' }}>
      <Story />
    </div>
  ),
]
AffixTab.parameters = {
  docs: {
    source: {
      code: `
<Affix offsetTop={250}>
  // children -- Tabs
  <Tabs type="card">
    <TabItem label="card1">
      this is card one
    </TabItem>
    <TabItem label="card2">
      this is content two
    </TabItem>
    <TabItem
      disabled
      label="disabled"
    >
      this is content three
    </TabItem>
  </Tabs>
</Affix>
      `,
    },
  },
}
