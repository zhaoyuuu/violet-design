import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome Page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 violet-design 组件库</h1>
        <h3>安装试试</h3>
        <code>npm install violet-design</code>
      </>
    )
  },
  { info: { disabled: true } }
)
