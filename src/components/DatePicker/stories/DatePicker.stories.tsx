import { storiesOf, ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import dayjs from 'dayjs'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import DatePicker from '../DatePicker'

export default {
  title: '组件/数据录入/DatePicker 日期选择器',
  id: 'DatePicker',
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>

const defaultProps = {
  onChange: action('onChange'),
  locale: 'zh-cn',
}

const Template: ComponentStory<typeof DatePicker> = args => (
  <DatePicker {...defaultProps} {...args} />
)

export const DefaultDatePicker = Template.bind({})
DefaultDatePicker.storyName = 'defaultDatePicker 默认日期选择器'

export const initialDatePicker = Template.bind({})
initialDatePicker.storyName = 'initialDatePicker 日期默认为当前日期'
initialDatePicker.args = {
  initialDate: dayjs(),
}

export const C: ComponentStory<typeof DatePicker> = args => (
  <>
    <DatePicker {...defaultProps} portal {...args} />
  </>
)
C.storyName = 'portalversion 遮罩层视图'

export const D: ComponentStory<typeof DatePicker> = args => (
  <>
    <DatePicker {...defaultProps} includeTime {...args} />
  </>
)
D.storyName = 'includeTime 包含时间选择器'

export const E: ComponentStory<typeof DatePicker> = args => (
  <>
    <DatePicker {...defaultProps} showTimeOnly {...args} />
  </>
)
E.storyName = 'showTimeOnly 时间选择器'

export const F: ComponentStory<typeof DatePicker> = args => (
  <>
    <DatePicker
      {...defaultProps}
      dateFormat={text('dateformat', 'YYYY/MM/DD')}
      {...args}
    />
  </>
)
F.storyName = 'dateFormat 自定义格式'

export const G: ComponentStory<typeof DatePicker> = args => (
  <>
    <DatePicker {...defaultProps} showMonthCnt={2} {...args} />
  </>
)
G.storyName = 'showMonthCnt 多月视图'

export const I: ComponentStory<typeof DatePicker> = args => (
  <>
    <div style={{ paddingTop: '300px' }}>
      <DatePicker {...defaultProps} direction={0} {...args} />
    </div>
  </>
)
I.storyName = 'onTop 日历视图显示在输入框上方'

export const J: ComponentStory<typeof DatePicker> = args => (
  <>
    <DatePicker {...defaultProps} {...args} placeholder="选择日期" />
  </>
)
J.storyName = 'placeholder 占位提示文字'

export const K: ComponentStory<typeof DatePicker> = args => (
  <>
    <DatePicker {...defaultProps} {...args} showDefaultIcon clear />
  </>
)
K.storyName = 'showDefaultIcon 显示默认图标'

export const L: ComponentStory<typeof DatePicker> = args => (
  <>
    <DatePicker {...defaultProps} readOnly {...args} />
  </>
)
L.storyName = 'readOnly 仅可读'

export const M: ComponentStory<typeof DatePicker> = args => (
  <>
    <DatePicker {...defaultProps} disabled {...args} />
  </>
)
M.storyName = 'disabled 禁用'

export const N: ComponentStory<typeof DatePicker> = args => (
  <>
    <DatePicker {...defaultProps} clear {...args} />
  </>
)
N.storyName = 'clear 清除输入框'
