import React, { useState } from 'react'
import Cascader from './cascader'

import { ComponentMeta, ComponentStory } from '@storybook/react'

// 大标题
const cascaderMeta: ComponentMeta<typeof Cascader> = {
  title: 'Cascader 级联选择',
  component: Cascader,
}

export default cascaderMeta

interface Option {
  value: React.ReactNode
  disabled?: boolean
  children?: Option[]
}
// 页面
const Template: ComponentStory<typeof Cascader> = args => {
  const [value, setValue] = useState<React.ReactNode[]>([])
  const onChange = (value: React.ReactNode[]) => {
    setValue(value)
  }
  const options: Option[] = [
    {
      value: 'zhejiang',
      children: [
        {
          value: 'hangzhou',
          children: [
            {
              value: 'xihu',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      children: [
        {
          value: 'nanjing',
          children: [
            {
              value: 'zhonghuamen',
            },
          ],
        },
      ],
    },
  ]
  return (
    <Cascader
      {...args}
      value={value}
      onChange={onChange}
      placeholder="请选择"
      options={options}
    />
  )
}

export const Default = Template.bind({})
Default.storyName = '基本样式'

export const Disabled = Template.bind({})
Disabled.storyName = '禁用'
Disabled.args = {
  disabled: true,
}

export const ChangeonSelect = Template.bind({})
ChangeonSelect.storyName = '选择即改变'
ChangeonSelect.args = {
  changeOnSelect: true,
}

export const Status = Template.bind({})
Status.storyName = '状态设置'
Status.args = {
  status: 'success',
}
