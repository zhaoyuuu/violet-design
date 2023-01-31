import React, { useState, ChangeEvent } from 'react'
import InputNumber from './inputNumber'

import { ComponentMeta, ComponentStory } from '@storybook/react'

// 大标题
const InputNumberMeta: ComponentMeta<typeof InputNumber> = {
  title: 'InputNumber 数字输入框',
  component: InputNumber,
}

export default InputNumberMeta

// 页面
const Template: ComponentStory<typeof InputNumber> = args => {
  const [value, setValue] = useState('0')
  const onChange = (value: string) => {
    setValue(value)
  }
  return <InputNumber {...args} value={value} onChange={onChange} />
}

export const defaultInputNumber = Template.bind({})
defaultInputNumber.storyName = '默认样式'
defaultInputNumber.decorators = [Story => <Story />]
defaultInputNumber.parameters = {
  docs: {
    source: {
      code: `
const [value, setValue] = useState('0')
const onChange = (val: string) => {
  setValue(val)
}
return <InputNumber value={value} onChange={onChange} />
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}

export const autoFocusInputNumber = Template.bind({})
autoFocusInputNumber.args = {
  autoFocus: true,
}
autoFocusInputNumber.storyName = '自动获取焦点'
autoFocusInputNumber.decorators = [Story => <Story />]
autoFocusInputNumber.parameters = {
  docs: {
    source: {
      code: `
const [value, setValue] = useState('0')
const onChange = (val: string) => {
  setValue(val)
}
return <InputNumber autoFocus={true} value={value} onChange={onChange} />
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}

export const controlInputNumber = Template.bind({})
controlInputNumber.args = {
  controls: false,
}
controlInputNumber.storyName = '是否显示增减按钮'
controlInputNumber.decorators = [Story => <Story />]
controlInputNumber.parameters = {
  docs: {
    source: {
      code: `
const [value, setValue] = useState('0')
const onChange = (val: string) => {
  setValue(val)
}
return <InputNumber controls={true} value={value} onChange={onChange} />
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}

export const disabledInputNumber = Template.bind({})
disabledInputNumber.args = {
  disabled: true,
}
disabledInputNumber.storyName = '禁用'
disabledInputNumber.decorators = [Story => <Story />]
disabledInputNumber.parameters = {
  docs: {
    source: {
      code: `
const [value, setValue] = useState('0')
const onChange = (val: string) => {
  setValue(val)
}
return <InputNumber disabled={true} value={value} onChange={onChange} />
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}

export const maxInputNumber = Template.bind({})
maxInputNumber.args = {
  max: 10,
  min: 0,
}
maxInputNumber.storyName = '设置上限/下线'
maxInputNumber.decorators = [Story => <Story />]
maxInputNumber.parameters = {
  docs: {
    source: {
      code: `
const [value, setValue] = useState('0')
const onChange = (val: string) => {
  setValue(val)
}
return <InputNumber max={10} min={0} value={value} onChange={onChange} />
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}

export const keyBoardInputNumber = Template.bind({})
keyBoardInputNumber.args = {
  keyboard: false,
}
keyBoardInputNumber.storyName = '是否启用键盘快捷行为'
keyBoardInputNumber.decorators = [Story => <Story />]
keyBoardInputNumber.parameters = {
  docs: {
    source: {
      code: `
const [value, setValue] = useState('0')
const onChange = (val: string) => {
  setValue(val)
}
return <InputNumber keyboard={false} value={value} onChange={onChange} />
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}

export const statusInputNumber = Template.bind({})
statusInputNumber.args = {
  status: 'success',
}
statusInputNumber.storyName = '设置校验状态'
statusInputNumber.decorators = [Story => <Story />]
statusInputNumber.parameters = {
  docs: {
    source: {
      code: `
const [value, setValue] = useState('0')
const onChange = (val: string) => {
  setValue(val)
}
return <InputNumber status='success' value={value} onChange={onChange} />
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}

export const sizeInputNumber = Template.bind({})
sizeInputNumber.args = {
  size: 'large',
}
sizeInputNumber.storyName = '输入框大小'
sizeInputNumber.decorators = [Story => <Story />]
sizeInputNumber.parameters = {
  docs: {
    source: {
      code: `
const [value, setValue] = useState('0')
const onChange = (val: string) => {
  setValue(val)
}
return <InputNumber size='large' value={value} onChange={onChange} />
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}

export const stepInputNumber = Template.bind({})
stepInputNumber.args = {
  step: 3,
}
stepInputNumber.storyName = '每次改变步数'
stepInputNumber.decorators = [Story => <Story />]
stepInputNumber.parameters = {
  docs: {
    source: {
      code: `
const [value, setValue] = useState('0')
const onChange = (val: string) => {
  setValue(val)
}
return <InputNumber step={3} value={value} onChange={onChange} />
      `,
      language: 'jsx',
      type: 'auto',
    },
  },
}
