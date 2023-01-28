import Radio from './radio'
import RadioGroup from './radioGroup'
import React, { ReactNode } from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

const radioMeta: ComponentMeta<typeof Radio> = {
  title: 'Radio 导航菜单',
  component: Radio,
}

export default radioMeta

export const Default: ComponentStory<typeof Radio> = args => (
  <>
    <Radio {...args}>Default radio</Radio>
  </>
)

