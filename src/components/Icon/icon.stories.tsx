import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Icon from './icon'
import Button from '../Button/button'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
import './story.scss'

export default {
  title: '组件/通用/Icon 图标',
  id: 'Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>
export const ADefaultIcons = () => (
  <>
    <div>默认图标</div>
    <ul className="icons-list">
      <li>
        <span className="icon icon-step-backward">
          <Icon icon="check" />
        </span>
        <span className="icon-class">check</span>
      </li>
      <li>
        <span className="icon icon-step-backward">
          <Icon icon="times" />
        </span>
        <span className="icon-class">times</span>
      </li>
      <li>
        <span className="icon icon-step-backward">
          <Icon icon="exclamation-circle" />
        </span>
        <span className="icon-class">exclamation-circle</span>
      </li>
      <li>
        <span className="icon icon-step-backward">
          <Icon icon="anchor" />
        </span>
        <span className="icon-class">anchor</span>
      </li>
    </ul>
  </>
)
ADefaultIcons.storyName = '默认图标'
ADefaultIcons.parameters = {
  docs: {
    description: {
      story: ` <Icon icon="iconName" />引入图标，更多图标见‘所有Icon’`,
    },
  },
}

export const BThemeIcons = () => (
  <>
    <div>自定义颜色的图标</div>
    <ul className="icons-list">
      <li>
        <span className="icon icon-step-backward">
          <Icon icon="check" theme="primary" />
        </span>
        <span className="icon-class">check</span>
      </li>
      <li>
        <span className="icon icon-step-backward">
          <Icon icon="times" theme="warning" />
        </span>
        <span className="icon-class">times</span>
      </li>
      <li>
        <span className="icon icon-step-backward">
          <Icon icon="exclamation-circle" color="red" />
        </span>
        <span className="icon-class">exclamation-circle</span>
      </li>
      <li>
        <span className="icon icon-step-backward">
          <Icon icon="anchor" color="blue" />
        </span>
        <span className="icon-class">anchor</span>
      </li>
    </ul>
  </>
)
BThemeIcons.storyName = '自定义颜色的 Icon'
BThemeIcons.parameters = {
  docs: {
    description: {
      story: ` 通过设置参数theme或color，设置图标的颜色`,
    },
  },
}

export const CSizeIcons = () => (
  <>
    <div>自定义尺寸的图标</div>

    <Icon icon="check" style={{ marginLeft: '20px' }} />

    <Icon icon="times" size="2x" style={{ marginLeft: '20px' }} />

    <Icon icon="exclamation-circle" size="3x" style={{ marginLeft: '20px' }} />

    <Icon icon="anchor" size="4x" style={{ marginLeft: '20px' }} />
  </>
)
CSizeIcons.storyName = '自定义尺寸的 Icon'

export const CCustomIcons = () => (
  <>
    <Icon
      icon="spinner"
      size="2x"
      theme="primary"
      spin
      style={{ marginRight: '20px' }}
    />
    <Icon icon="spinner" size="3x" theme="success" pulse />
  </>
)
CCustomIcons.storyName = '更多行为的 Icon'

export const DAllIcons = () => (
  <>
    <ul className="icons-list">
      {Object.entries(fas).map(([key, value]) => (
        <li key={key}>
          <span className="icon icon-step-backward">
            <Icon icon={value} theme="primary" />
          </span>
          <span className="icon-class">{key}</span>
        </li>
      ))}
    </ul>
  </>
)
DAllIcons.storyName = '所有 Icon'
