import Radio from './radio'
import RadioGroup from './radioGroup'
import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

const radioGroupMeta: ComponentMeta<typeof RadioGroup> = {
  title: 'RadioGroup 单选按钮组',
  component: RadioGroup,
}

export default radioGroupMeta

export const DefaultRadio: ComponentStory<typeof Radio> = args => (
  <>
    <Radio {...args}>Default radio</Radio>
  </>
)

DefaultRadio.storyName = '默认单选按钮'

export const DifferentSizeRadio: ComponentStory<typeof Radio> = args => (
  <>
    <Radio size="sm">Small Radio</Radio>
    <br />
    <Radio>Middle Radio</Radio>
    <br />
    <Radio size="lg">Large Radio</Radio>
  </>
)
DifferentSizeRadio.storyName = '不同大小的按钮'

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
