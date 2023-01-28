import Radio from './radio'
import RadioGroup from './radioGroup'
import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

const radioGroupMeta: ComponentMeta<typeof RadioGroup> = {
  title: 'RadioGroup 单选按钮组',
  component: RadioGroup,
}

export default radioGroupMeta

export const Default: ComponentStory<typeof RadioGroup> = args => (
  <>
    <RadioGroup {...args}>
      <Radio value={'1'}>1</Radio>
      <Radio value={'2'}>2</Radio>
      <Radio value={'3'}>3</Radio>
    </RadioGroup>
  </>
)
