import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import dayjs from 'dayjs'
import CalendarSelect from './CalendarSelect'
import { number } from '@storybook/addon-knobs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/ja'
import './custom.css'
export default {
  title: '组件/数据展示/Calendar 日历',
  id: 'Calendar',
  component: CalendarSelect,
} as ComponentMeta<typeof CalendarSelect>

export const Default = () => (
  <>
    <CalendarSelect />
  </>
)
Default.storyName = 'Calendar 默认日历'

export const DayView = () => (
  <>
    <CalendarSelect view="day" />
  </>
)
DayView.storyName = 'DayView 日视图'
DayView.parameters = {
  docs: {
    description: {
      story: `配置参数view为day，显示日视图，点击title可选择年份、月份`,
    },
  },
}

export const MonthView = () => (
  <>
    <CalendarSelect view="month" />
  </>
)
MonthView.storyName = 'MonthView 月视图'
MonthView.args = {
  view: 'month',
}
MonthView.parameters = {
  docs: {
    description: {
      story: `配置参数view为month，显示月视图`,
    },
  },
}

export const YearView = () => (
  <>
    <CalendarSelect view="year" />
  </>
)
YearView.storyName = 'YearView 年视图'
YearView.args = {
  view: 'year',
}
YearView.parameters = {
  docs: {
    description: {
      story: `配置参数view为year，显示年视图`,
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
          textAlign: 'center',
        }}
      >
        <CalendarSelect locale="en" />
        <span>英文</span>
      </div>
      <div
        style={{
          display: 'inline-block',
          marginRight: '20px',
          textAlign: 'center',
        }}
      >
        <CalendarSelect locale="zh-cn" />
        <span>中文</span>
      </div>
      <div
        style={{
          display: 'inline-block',
          marginRight: '20px',
          textAlign: 'center',
        }}
      >
        <CalendarSelect locale="ja" />
        <span>日文</span>
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

export const showMultiCnt = () => (
  <>
    <div style={{ textAlign: 'center' }}>
      <span>显示两个日历</span>
      <CalendarSelect showMonthCnt={2} />
    </div>
    <div style={{ textAlign: 'center' }}>
      <span>显示三个日历</span>
      <CalendarSelect showMonthCnt={3} />
    </div>
  </>
)
showMultiCnt.storyName = 'showMultiCnt 显示多个视图'
showMultiCnt.parameters = {
  docs: {
    description: {
      story: `通过配置参数showMonthCnt，可实现显示多个相连的日历视图`,
    },
  },
}

export const disableDay = () => (
  <>
    <div style={{ textAlign: 'center' }}>
      <span>禁用小于七号的日期</span>
      <CalendarSelect
        disableDay={(date: dayjs.Dayjs) => {
          return dayjs(date).date() < 7
        }}
      />
    </div>
    <div style={{ textAlign: 'center' }}>
      <span>禁用二月二十一号</span>
      <CalendarSelect
        disableDay={(date: dayjs.Dayjs) => {
          return dayjs(date).format('M-D') === '2-21'
        }}
      />
    </div>
  </>
)
disableDay.storyName = 'disableDay 禁用日期'
disableDay.parameters = {
  docs: {
    description: {
      story: `通过配置参数disableDay,实现指定日期禁用。 disableDay类型需为(date: dayjs.Dayjs) => void`,
    },
  },
}

export const multipleselect = () => (
  <>
    <div style={{ textAlign: 'center' }}>
      <span>禁用小于七号的日期</span>
      <CalendarSelect multiple />
    </div>
  </>
)
multipleselect.storyName = 'multipleselect 可选择多个日期'
multipleselect.parameters = {
  docs: {
    description: {
      story: `通过添加参数multiple,实现日期可多选。点击clear清除所选日期`,
    },
  },
}

export const customDayText = () => (
  <>
    <div style={{ textAlign: 'center' }}>
      <span>自定义日期下方文字</span>
      <CalendarSelect
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
    <div style={{ textAlign: 'center' }}>
      <span>自定义日期样式</span>
      <CalendarSelect
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
