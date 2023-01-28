import Radio from './radio'
import RadioGroup from './radioGroup'
import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

const radioGroupMeta: ComponentMeta<typeof Radio> = {
  title: 'RadioGroup 导航菜单',
  component: Radio,
}

export default radioGroupMeta

export const Default: ComponentStory<typeof RadioGroup> = args => (
  <>
    <RadioGroup {...args}>
      <Radio>1</Radio>
      <Radio>2</Radio>
      <Radio>3</Radio>
    </RadioGroup>
  </>
)

