import React, { useState } from 'react'
import { ComponentMeta } from '@storybook/react'
import Transition from '../Transition'
import Button from '../Button'

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
  const ulStyle = {
    listStyle: 'none',
    paddingLeft: 0,
    marginTop: '8px',
    background: '#fff',
    border: '1px solid #dee2e6',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04)',
    width: '300px',
  }
  const liStyle = {
    padding: ' 0.5rem 1rem',
    transition: 'color 0.15s ease-in-out, border-color 0.15s ease-in-out',
    color: '#212529',
    cursor: 'pointer',
  }
  return (
    <>
      <Button onClick={() => setInProp(!inProp)}>显示/隐藏</Button>
      <Transition in={inProp} timeout={300} {...args} animation="zoom-in-top">
        <ul style={ulStyle}>
          <li style={liStyle}>北京</li>
          <li style={liStyle}>上海</li>
          <li style={liStyle}>广州</li>
          <li style={liStyle}>深圳</li>
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
