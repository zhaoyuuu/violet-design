import React from 'react'
import Affix from './affix'
import Button from '../Button/button'

import { ComponentMeta, ComponentStory } from '@storybook/react'

// 大标题
const affixMeta: ComponentMeta<typeof Affix> = {
  title: 'Affix 固钉',
  component: Affix,
}

export default affixMeta

// 页面
const Template: ComponentStory<typeof Affix> = args => {
  return (
    <Affix {...args}>
      <Button btnType="primary">affix button</Button>
    </Affix>
  )
}

export const Default = Template.bind({})
Default.storyName = '基本'
Default.args = {
  offsetTop: 250,
}

// export const Disabled = Template.bind({})
// Disabled.storyName = '禁用'
// Disabled.args = {
//   disabled: true,
// }

// export const ChangeonSelect = Template.bind({})
// ChangeonSelect.storyName = '选择即改变'
// ChangeonSelect.args = {
//   changeOnSelect: true,
// }

// export const Status = Template.bind({})
// Status.storyName = '状态设置'
// Status.args = {
//   status: 'success',
// }
