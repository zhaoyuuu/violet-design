import React, { useState } from 'react'
import { ComponentMeta } from '@storybook/react'

import Select from './index'
import RadioComponent from '../Radio'
const { Radio, RadioGroup } = RadioComponent
export default {
  title: '组件/数据录入/Select 选择器',
  component: Select,
  id: 'Select',
  // 让整个story包在width:350px的div内
  decorators: [
    Story => (
      <div style={{ width: '350px', height: '200px' }}>
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
DefaultSelect.storyName = '默认的选择器'
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
MultipleSelect.storyName = '支持多选的选择器'
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
DisabledSelect.storyName = '被禁用的选择器'
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

export const SizeSelect = (args: any) => {
  const [size, setSize] = useState('md')
  const handleSizeChange = (e: any) => {
    const newSize = e.target.parentNode.children[0].value
    setSize(newSize === size ? 'md' : newSize)
  }

  return (
    <>
      <RadioGroup type={'button'} value={size} onChange={handleSizeChange}>
        <Radio value={'lg'}>large</Radio>
        <Radio value={'md'}>middle</Radio>
        <Radio value={'sm'}>small</Radio>
      </RadioGroup>
      <br />
      <br />
      <Select {...args} placeholder="请选择" options={options} size={size} />
      <Select
        {...args}
        placeholder="多选框"
        multiple
        options={options}
        size={size}
      />
    </>
  )
}
SizeSelect.storyName = '三种大小的选择器'
SizeSelect.parameters = {
  docs: {
    source: {
      code: `
const [size, setSize] = useState('md')
const handleSizeChange = (e: any) => {
  setSize(e.target.value)
}
const options = [
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true },
]
<RadioGroup type={'button'} value={size} onChange={handleSizeChange}>
  <Radio value={'lg'}>large</Radio>
  <Radio value={'md'}>middle</Radio>
  <Radio value={'sm'}>small</Radio>
</RadioGroup>
<br />
<br />
<Select {...args} placeholder="请选择" options={options} size={size} />
<Select
  {...args}
  placeholder="多选框"
  multiple
  options={options}
  size={size}
/>`,
    },
  },
}

export const SearchSelect = (args: any) => (
  <Select
    {...args}
    placeholder="请选择"
    options={[
      { value: 'a11' },
      { value: 'b12' },
      { value: 'c13' },
      { value: 'd14' },
    ]}
    showSearch
  />
)
SearchSelect.storyName = '可搜索的选择器'
SearchSelect.parameters = {
  docs: {
    source: {
      code: `
<Select placeholder="请选择" options={[
  { value: 'a11' },
  { value: 'b12' },
  { value: 'c13' },
  { value: 'd14' }]} 
  showSearch/>`,
    },
  },
}
