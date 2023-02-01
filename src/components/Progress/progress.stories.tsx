import Progress from './progress'
import React, { ReactNode } from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

const progressMeta: ComponentMeta<typeof Progress> = {
  title: 'Progress 进度条',
  component: Progress,
}

export default progressMeta

export const Default: ComponentStory<typeof Progress> = args => (
  <>
    <Progress {...args}>Default Progress</Progress>
  </>
)
