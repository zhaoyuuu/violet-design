import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import dayjs from 'dayjs'
import CalendarSelectedController from './CalendarSelectedController'
import { number } from '@storybook/addon-knobs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/ja'
import './custom.css'
export default {
  title: 'Calendar 日历',
  id: 'Calendar',
  component: CalendarSelectedController,
} as ComponentMeta<typeof CalendarSelectedController>

const Template: ComponentStory<typeof CalendarSelectedController> = args => (
  <CalendarSelectedController {...args} />
)

export const YearView = Template.bind({})
YearView.storyName = 'YearView 年视图'
YearView.args = {
  view: 'year',
}

export const MonthView = Template.bind({})
MonthView.storyName = 'MonthView 月视图'
MonthView.args = {
  view: 'month',
}

export const DayView = Template.bind({})
DayView.storyName = 'DayView 月视图'
DayView.args = {
  view: 'day',
}

export const internalization01 = Template.bind({})
internalization01.storyName = 'internalization 国际化(英文)'
internalization01.args = {
  locale: 'en',
}

export const internalization02 = Template.bind({})
internalization02.storyName = 'internalization 国际化(中文)'
internalization02.args = {
  locale: 'zh-cn',
}

export const internalization03 = Template.bind({})
internalization03.storyName = 'internalization 国际化(日文)'
internalization03.args = {
  locale: 'ja',
}

const showMonthCnt = number('showMonthCnt', 2)
export const showMultiCnt = Template.bind({})
showMultiCnt.storyName = 'showMultiCnt 显示多个视图'
showMultiCnt.args = {
  showMonthCnt: showMonthCnt,
}

const disable = (date: dayjs.Dayjs) => {
  return dayjs(date).date() < 7
}
export const disableDay = Template.bind({})
disableDay.storyName = 'disableDay 禁用日期'
disableDay.args = {
  disableDay: disable,
}

export const selected = Template.bind({})
selected.storyName = 'selected 可选择日期'

export const multipleselect = Template.bind({})
multipleselect.storyName = 'multipleselect 可选择多个日期'
multipleselect.args = {
  multiple: true,
}
const customText = (date: dayjs.Dayjs) => {
  // for test (year, month remove)
  const classMap: { [key: string]: string } = {
    '01': '除夕',
    '02': '春节',
  }
  return classMap[dayjs(date).format('DD')]
}
export const customDayText = Template.bind({})
customDayText.storyName = 'customDayText 自定义日期文字'
customDayText.args = {
  customDayText: customText,
}
const customClass = (date: dayjs.Dayjs) => {
  // for test (year, month remove)
  const classMap: { [key: string]: string } = {
    '01': 'custom-class',
    '02': 'day-test1',
  }
  return classMap[dayjs(date).format('DD')]
}
export const customDayClass = Template.bind({})
customDayClass.storyName = 'customDayClass 自定义日期样式'
customDayClass.args = {
  customDayClass: customClass,
}
// export const Eselected: ComponentStory<
//   typeof CalendarSelectedController
// > = args => (
//   <>
//     <CalendarSelectedController {...args} />
//   </>
// )
// Eselected.storyName = 'selected'

// export const Emultipleselect: ComponentStory<
//   typeof CalendarSelectedController
// > = args => (
//   <>
//     <CalendarSelectedController multiple={true} {...args} />
//   </>
// )
// Emultipleselect.storyName = 'multipleselect'
