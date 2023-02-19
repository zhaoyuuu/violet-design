import { storiesOf, ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import dayjs from 'dayjs'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import RangeDatePicker from './RangeDatePicker'
export default {
  title: '组件/数据录入/RangeDatePicker 日期范围选择器',
  id: 'RangeDatePicker',
  component: RangeDatePicker,
  decorators: [
    Story => (
      <div style={{ height: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof RangeDatePicker>

const defaultProps = {
  onChange: action('onChange'),
  locale: 'zh-cn',
}

export const Default = () => (
  <>
    <RangeDatePicker />
  </>
)
Default.storyName = 'default 默认日期范围选择器'
Default.parameters = {
  docs: {
    description: {
      story: `在浮层中可以选择或者输入日期范围。`,
    },
  },
}

export const B = () => (
  <>
    <RangeDatePicker
      initialStartDate={dayjs().subtract(7, 'day')}
      initialEndDate={dayjs()}
    />
  </>
)
B.storyName = 'initial Start & End Date 初始起始日期和结束日期'
B.parameters = {
  docs: {
    description: {
      story: `使用initialStartDate和initialEndDate属性设置默认起始日期和结束日期`,
    },
  },
}

export const C = () => (
  <>
    <RangeDatePicker
      startText={text('startText', 'Start')}
      endText={text('endText', 'End')}
    />
  </>
)
C.storyName = 'startText & endText 自定义起始日期和结束日期文字'
C.parameters = {
  docs: {
    description: {
      story: `使用startText和endText属性设置起始日期和结束日期内容`,
    },
  },
}

export const D = () => (
  <>
    <RangeDatePicker
      portal
      startText={text('startText', 'Start')}
      endText={text('endText', 'End')}
    />
  </>
)
D.storyName = 'portalversion 遮罩层视图'
D.parameters = {
  docs: {
    description: {
      story: `添加portal参数。点击输入框，弹出浮层，显示遮罩层`,
    },
  },
}

export const E = () => (
  <>
    <div style={{ paddingTop: '300px' }}>
      <RangeDatePicker
        direction={0}
        startPlaceholder={text('startPlaceholder', 'Start Date')}
        endPlaceholder={text('endPlaceholder', 'End Date')}
      />
    </div>
  </>
)
E.storyName = 'onTop 显示日历在输入框上方'
E.parameters = {
  docs: {
    description: {
      story: `添加参数direction设置其值为0/1。控制日历显示再输入框上方/下方`,
    },
  },
}
export const showMonthCnt = () => (
  <>
    <RangeDatePicker showMonthCnt={3} />
  </>
)
showMonthCnt.storyName = 'showMonthCnt 显示多个日历视图'
showMonthCnt.parameters = {
  docs: {
    description: {
      story: `通过配置参数showMonthCnt，可显示多个相连的日历视图`,
    },
  },
}
export const dateFormat = () => (
  <>
    <RangeDatePicker dateFormat={text('dateformat', 'YYYY/MM/DD')} />
  </>
)
dateFormat.storyName = 'dateFormat 自定义格式'
dateFormat.parameters = {
  docs: {
    description: {
      story: `使用dateFormat属性，可以自定义日期显示格式。如： dateFormat={text('dateformat', 'YYYY/MM/DD')}`,
    },
  },
}

export const readOnly = () => (
  <>
    <RangeDatePicker readOnly />
  </>
)
readOnly.storyName = 'readonly 仅可读'
readOnly.parameters = {
  docs: {
    description: {
      story: `使用readOnly属性，使组件仅可读`,
    },
  },
}

export const disabled = () => (
  <>
    <RangeDatePicker disabled />
  </>
)
disabled.storyName = 'disabled 禁用'
disabled.parameters = {
  docs: {
    description: {
      story: `使用disabled属性，禁用组件`,
    },
  },
}
export const clear = () => (
  <>
    <RangeDatePicker clear />
  </>
)
clear.storyName = 'clear 显示清除按钮'
clear.parameters = {
  docs: {
    description: {
      story: `使用clear属性，显示一键清空输入框图标`,
    },
  },
}
export const placeholder = () => (
  <>
    <RangeDatePicker startPlaceholder="Start Date" endPlaceholder="End Date" />
  </>
)
placeholder.storyName = 'placeholder 占位文字'
placeholder.parameters = {
  docs: {
    description: {
      story: `使用placeholder属性，自定义默认显示文字`,
    },
  },
}
