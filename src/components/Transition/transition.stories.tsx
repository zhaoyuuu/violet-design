import React, { useState } from 'react'
import { ComponentMeta } from '@storybook/react'
import Transition from '../Transition'
import Button from '../Button'

import './_transition.stories.scss'
export default {
  title: '组件/其他/Transition 过渡',
  component: Transition,
  id: 'Transition',
  decorators: [
    Story => (
      <div style={{ height: '200px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Transition>

export const MenuTransition = (args: any) => {
  const [inProp, setInProp] = useState(false)
  return (
    <>
      <Button onClick={() => setInProp(!inProp)}>显示/隐藏</Button>
      <Transition in={inProp} timeout={300} {...args} animation="zoom-in-top">
        <ul>
          <li>北京</li>
          <li>上海</li>
          <li>广州</li>
          <li>深圳</li>
        </ul>
      </Transition>
    </>
  )
}
MenuTransition.storyName = '过渡动画'
MenuTransition.parameters = {
  docs: {
    source: {
      code: `
const [inProp, setInProp] = useState(false)
return(
  <>
    <Button onClick={() => setInProp(!inProp)}>显示/隐藏</Button>
    <Transition in={inProp} timeout={300} {...args} animation="zoom-in-top">
      <ul>
        <li>北京</li>
        <li>上海</li>
        <li>广州</li>
        <li>深圳</li>
      </ul>
    </Transition>
  </>
)`,
    },
  },
}
