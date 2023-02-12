import Progress from './progress'
import React, { ReactNode } from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

const progressMeta: ComponentMeta<typeof Progress> = {
  title: '组件/反馈/Progress 进度条',
  component: Progress,
}

export default progressMeta

export const Default: ComponentStory<typeof Progress> = args => (
  <>
    <Progress {...args}>Default Progress</Progress>
  </>
)

Default.storyName = '默认样式'

export const DifferentTypeProgress: ComponentStory<typeof Progress> = args => (
  <>
    <Progress type="line" percent={30} showInfo={true} {...args}></Progress>
    <Progress type="circle" percent={70} showInfo={true} {...args}></Progress>
  </>
)
DifferentTypeProgress.storyName = '不同样式的进度条'

export const NoInfoProgress: ComponentStory<typeof Progress> = args => (
  <>
    <Progress type="line" percent={30} showInfo={false} {...args}></Progress>
    <Progress type="circle" percent={70} showInfo={false} {...args}></Progress>
  </>
)
NoInfoProgress.storyName = '不展示信息的进度条'

export const SuccessProgress: ComponentStory<typeof Progress> = args => (
  <>
    <Progress type="line" success={true} showInfo={true}></Progress>
    <Progress type="circle" success={true} showInfo={true}></Progress>
  </>
)
SuccessProgress.storyName = '已完成的进度条'
