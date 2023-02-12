import Radio from './radio'
import RadioGroup from './radioGroup'
import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

const radioGroupMeta: ComponentMeta<typeof RadioGroup> = {
  title: '组件/数据录入/RadioGroup 单选按钮组',
  component: RadioGroup,
}

export default radioGroupMeta

export const DefaultRadio: ComponentStory<typeof Radio> = args => (
  <>
    <Radio {...args}>Default Radio</Radio>
  </>
)

DefaultRadio.storyName = '默认单选按钮'

export const ButtonRadio: ComponentStory<typeof Radio> = args => (
  <>
    <Radio type="button">Button Radio</Radio>
  </>
)

ButtonRadio.storyName = '按钮式单选按钮'

export const DefaultGroup: ComponentStory<typeof RadioGroup> = args => (
  <>
    <RadioGroup {...args}>
      <Radio value={'1'}>1</Radio>
      <Radio value={'2'}>2</Radio>
      <Radio value={'3'}>3</Radio>
    </RadioGroup>
  </>
)

DefaultGroup.storyName = '默认单选按钮组'

export const ButtonGroup: ComponentStory<typeof RadioGroup> = args => (
  <>
    <RadioGroup {...args} type={'button'}>
      <Radio value={'1'}>1</Radio>
      <Radio value={'2'}>2</Radio>
      <Radio value={'3'}>3</Radio>
    </RadioGroup>
  </>
)

ButtonGroup.storyName = '按钮式单选按钮组'
