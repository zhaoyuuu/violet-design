import React from 'react'
import { ComponentMeta } from '@storybook/react'

import Select from './index'
export default {
  title: 'Select组件',
  component: Select,
  id: 'Select',
  // subcomponents: { Option: Select.Option },
  // 让整个story包在width:350px的div内
  decorators: [
    Story => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Select>
const options = [
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true },
]
export const DefaultSelect = (args: any) => (
  <Select {...args} placeholder="请选择" options={options} />
)
DefaultSelect.storyName = '默认的Select'
DefaultSelect.parameters = {
  docs: {
    source: {
      code: `
<Select placeholder="请选择" options={[
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true }]} />`,
    },
  },
}

export const MultipleSelect = (args: any) => (
  <Select {...args} placeholder="多选框" multiple options={options} />
)
MultipleSelect.storyName = '支持多选的Select'
MultipleSelect.parameters = {
  docs: {
    source: {
      code: `
<Select placeholder="多选框" multiple options={[
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true }]} />`,
    },
  },
}

export const DisabledSelect = (args: any) => (
  <Select {...args} placeholder="禁选框" disabled options={options} />
)
DisabledSelect.storyName = '被禁用的 Select'
DisabledSelect.parameters = {
  docs: {
    source: {
      code: `
<Select placeholder="禁选框" disabled options={[
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true }]} />`,
    },
  },
}
