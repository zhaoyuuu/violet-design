import { storiesOf, ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import dayjs from 'dayjs'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import DatePicker from './DatePicker'

export default {
  title: '组件/数据录入/DatePicker 日期选择器',
  id: 'DatePicker',
  component: DatePicker,
  decorators: [
    Story => (
      <div style={{ height: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof DatePicker>

const defaultProps = {
  onChange: action('onChange'),
  locale: 'zh-cn',
  docsStyle: { height: '400px' },
}

export const Default = () => (
  <>
    <DatePicker />
  </>
)
Default.storyName = 'DatePicker 日期选择器'

export const DefaultDatePicker = () => (
  <>
    <DatePicker />
  </>
)
DefaultDatePicker.storyName = 'defaultDatePicker 默认日期选择器'
DefaultDatePicker.parameters = {
  docs: {
    description: {
      story: `最简单的用法，在浮层中可以选择或者输入日期。`,
    },
  },
}

export const DayView = () => (
  <>
    <DatePicker view="day" />
  </>
)
DayView.storyName = 'DayPicker 日期选择器'
DayView.parameters = {
  docs: {
    description: {
      story: `配置参数view为day，显示日视图，点击title可选择年份、月份`,
    },
  },
}

export const MonthView = () => (
  <>
    <DatePicker view="month" />
  </>
)
MonthView.storyName = 'MonthPicker 月份选择器'
MonthView.parameters = {
  docs: {
    description: {
      story: `配置参数view为month，显示月视图,月份选择器`,
    },
  },
}

export const YearView = () => (
  <>
    <DatePicker view="year" />
  </>
)
YearView.storyName = 'YearPicker 年份选择器'
YearView.parameters = {
  docs: {
    description: {
      story: `配置参数view为year，显示年视图，年份选择器`,
    },
  },
}

export const internalization01 = () => (
  <>
    <div>
      <div
        style={{
          display: 'inline-block',
          marginRight: '20px',
        }}
      >
        <span style={{ marginRight: '10px' }}>英文</span>
        <DatePicker locale="en" />
      </div>
      <div
        style={{
          display: 'inline-block',
          marginRight: '20px',
        }}
      >
        <span style={{ marginRight: '10px' }}>中文</span>
        <DatePicker locale="zh-cn" />
      </div>
      <div
        style={{
          display: 'inline-block',
          marginRight: '20px',
        }}
      >
        <span style={{ marginRight: '10px' }}>日文</span>
        <DatePicker locale="ja" />
      </div>
    </div>
  </>
)
internalization01.storyName = 'internalization 国际化配置'
internalization01.parameters = {
  docs: {
    description: {
      story: `配置参数locale为dayjs中不同的语言环境，以实现国际化配置。
      内置中文、英文、日文,设置locale参数为'zh-cn'、'en'、'ja'实现三种语言环境视图。若需要配置其他语言可引入dayjs中相关语言环境，如import 'dayjs/locale/yo'，并配置locale为yo。支持的语言列表见此：https://dayjs.gitee.io/docs/zh-CN/i18n/i18n`,
    },
  },
}

export const customDayText = () => (
  <>
    <div>
      <span style={{ marginRight: '10px' }}>自定义日期下方文字</span>
      <DatePicker
        customDayText={(date: dayjs.Dayjs) => {
          // for test (year, month remove)
          const classMap: { [key: string]: string } = {
            '2-1': '除夕',
            '2-2': '春节',
          }
          return classMap[dayjs(date).format('M-D')]
        }}
      />
    </div>
  </>
)
customDayText.storyName = 'customDayText 定制日期单元格内容'
customDayText.parameters = {
  docs: {
    description: {
      story: `通过配置参数customDayText，实现自定义日期单元格内容。customDayText类型为(date: dayjs.Dayjs) => string`,
    },
  },
}

export const customDayClass = () => (
  <>
    <div>
      <span style={{ marginRight: '10px' }}>自定义日期样式</span>
      <DatePicker
        customDayClass={(date: dayjs.Dayjs) => {
          const classMap: { [key: string]: string } = {
            '2-21': 'custom-class',
          }
          return classMap[dayjs(date).format('M-D')]
        }}
      />
    </div>
  </>
)
customDayClass.storyName = 'customDayClass 定制日期单元格样式'
customDayClass.parameters = {
  docs: {
    description: {
      story: `通过配置参数customDayClass，实现自定义日期单元格样式。customDayClass类型为： (date: dayjs.Dayjs) => string | string[]`,
    },
  },
}

export const dateFormat = () => (
  <>
    <DatePicker dateFormat={text('dateformat', 'YYYY/MM/DD')} />
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

export const includeTime = () => (
  <>
    <DatePicker includeTime />
  </>
)
includeTime.storyName = 'includeTime 日期时间选择器'
includeTime.parameters = {
  docs: {
    description: {
      story: `添加includeTime参数。增加时间选择。`,
    },
  },
}

export const showTimeOnly = () => (
  <>
    <DatePicker showTimeOnly />
  </>
)
showTimeOnly.storyName = 'showTimeOnly 时间选择器'
showTimeOnly.parameters = {
  docs: {
    description: {
      story: `添加showTimeOnly参数。设置为时间选择器`,
    },
  },
}

export const initialDatePicker = () => (
  <>
    <DatePicker initialDate={dayjs()} />
  </>
)
initialDatePicker.storyName = 'initialDatePicker 设置默认日期'
initialDatePicker.parameters = {
  docs: {
    description: {
      story: `设置initialDate参数，使输入框及日历默认选择当前日期。`,
    },
  },
}

export const portalversion = () => (
  <>
    <DatePicker portal />
  </>
)
portalversion.storyName = 'portalversion 遮罩层视图'
portalversion.parameters = {
  docs: {
    description: {
      story: `添加portal参数。点击输入框，弹出浮层，显示遮罩层。`,
    },
  },
}

export const showMonthCnt = () => (
  <>
    <DatePicker showMonthCnt={2} />
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

export const onTop = () => (
  <>
    <div style={{ paddingTop: '300px' }}>
      <DatePicker direction={0} />
    </div>
  </>
)
onTop.storyName = 'onTop 日历视图显示在输入框上方'
onTop.parameters = {
  docs: {
    description: {
      story: `添加参数direction设置其值为0/1。控制日历显示再输入框上方/下方`,
    },
  },
}

export const placeholder = () => (
  <>
    <DatePicker placeholder="选择日期" />
  </>
)
placeholder.storyName = 'placeholder 占位提示文字'
placeholder.parameters = {
  docs: {
    description: {
      story: `使用placeholder属性，自定义默认显示文字`,
    },
  },
}

export const showDefaultIcon = () => (
  <>
    <DatePicker showDefaultIcon />
  </>
)
showDefaultIcon.storyName = 'showDefaultIcon 显示默认图标'
showDefaultIcon.parameters = {
  docs: {
    description: {
      story: `使用showDefaultIcon属性，显示默认input框icon`,
    },
  },
}

export const clear = () => (
  <>
    <DatePicker clear />
  </>
)
clear.storyName = 'clear 清除输入框'
clear.parameters = {
  docs: {
    description: {
      story: `使用clear属性，显示一键清空输入框图标`,
    },
  },
}

export const readOnly = () => (
  <>
    <DatePicker show readOnly />
  </>
)
readOnly.storyName = 'readOnly 仅可读'
readOnly.parameters = {
  docs: {
    description: {
      story: `使用readOnly属性，使组件仅可读`,
    },
  },
}

export const disabled = () => (
  <>
    <DatePicker disabled />
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
