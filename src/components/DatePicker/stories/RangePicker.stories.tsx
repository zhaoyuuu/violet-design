import { storiesOf, ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import dayjs from 'dayjs'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import RangeDatePicker from '../RangeDatePicker/RangeDatePicker'
export default {
  title: 'RangeDatePicker 日期范围选择器',
  id: 'RangeDatePicker',
  component: RangeDatePicker,
} as ComponentMeta<typeof RangeDatePicker>

const defaultProps = {
  onChange: action('onChange'),
  locale: 'zh-cn',
}

export const Adefault: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <RangeDatePicker {...args} />
  </>
)
Adefault.storyName = 'default 默认日期范围选择器'

export const B: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <RangeDatePicker
      initialStartDate={dayjs().subtract(7, 'day')}
      initialEndDate={dayjs()}
      {...args}
    />
  </>
)
B.storyName = 'initial Start & End Date 初始起始日期和结束日期'

export const C: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <RangeDatePicker
      startText={text('startText', 'Start')}
      endText={text('endText', 'End')}
    />
  </>
)
C.storyName = 'startText & endText 自定义起始日期和结束日期文字'

export const D: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <RangeDatePicker
      portal
      startText={text('startText', 'Start')}
      endText={text('endText', 'End')}
    />
  </>
)
D.storyName = 'portalversion 遮罩层视图'

export const E: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <div style={{ paddingTop: '300px' }}>
      <RangeDatePicker
        direction={0}
        startPlaceholder={text('startPlaceholder', 'Start Date')}
        endPlaceholder={text('endPlaceholder', 'End Date')}
        {...args}
      />
    </div>
  </>
)
E.storyName = 'onTop 显示日历在输入框上方'

export const F: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <RangeDatePicker showMonthCnt={3} {...args} />
  </>
)
F.storyName = '3 month 显示三个月日历视图'

export const G: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <RangeDatePicker dateFormat={text('dateformat', 'YYYY/MM/DD')} />
  </>
)
G.storyName = 'dateFormat 自定义格式'

export const H: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <RangeDatePicker readOnly {...args} />
  </>
)
H.storyName = 'readonly 仅可读'

export const I: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <RangeDatePicker disabled {...args} />
  </>
)
I.storyName = 'disabled 禁用'

export const GJ: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <RangeDatePicker clear {...args} />
  </>
)
GJ.storyName = 'clear 显示清除按钮'

export const o: ComponentStory<typeof RangeDatePicker> = args => (
  <>
    <RangeDatePicker
      startPlaceholder="Start Date"
      endPlaceholder="End Date"
      {...args}
    />
  </>
)
o.storyName = 'placeholder 占位文字'
