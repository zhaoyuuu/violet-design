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
  value: string | number
  label: React.ReactNode
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
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
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
