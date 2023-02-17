import { IDatePicker } from './types'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import weekday from 'dayjs/plugin/weekday'

/*常量 */
export const DatePickerDefaults = {
  monthFormat: 'YYYY-MM',
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm A',
  timeFormat: 'HH:mm A',
  locale: 'en',
}

/*StringUtil */
export const lpad = (val: string, length: number, char: '0') =>
  val.length < length ? char.repeat(length - val.length) + val : val

/*ArrayUtil */
export const chunk = (arr: any[], n: number) => {
  const result = []
  let i = 0
  while (i < arr.length / n) {
    result.push(arr.slice(i * n, i * n + n))
    i += 1
  }

  return result
}

/*TypeUtil */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

export type { Omit, Merge }

/*FunctionUtil */
export const ifExistCall = (func?: (...args: any[]) => void, ...args: any[]) =>
  func && func(...args)

/*LocaleUtil */
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(weekday)

export const getMonthShort = (locale: IDatePicker.Locale) => {
  dayjs.locale(locale)
  return range(0, 12).map(v =>
    dayjs().localeData().monthsShort(dayjs().month(v))
  )
}

export const getWeekDays = (locale: IDatePicker.Locale) => {
  dayjs.locale(locale)
  return range(7).map(v =>
    dayjs().localeData().weekdaysShort(dayjs().weekday(v))
  )
}

export const getToday = (locale: IDatePicker.Locale) => {
  return dayjs().locale(locale).format('LL')
}

export const range = (n1: number, n2?: number) => {
  const result = []
  let first = !n2 ? 0 : n1
  let last = n2

  if (!last) {
    last = n1
  }

  while (first < last) {
    result.push(first)
    first += 1
  }
  return result
}

export const repeat = (el: any, n: number) => {
  return range(n).map(() => el)
}

/*DOMUtil */
const convertPx = (value: number) => `${value}px`
/**
 * Getting Div position as far as distance
 * @param node
 * @param direction
 * @param distance
 */
export const getDivPosition = (
  node: HTMLDivElement | null,
  direction: IDatePicker.PickerDirection = IDatePicker.PickerDirection.BOTTOM,
  height: number,
  distance: 5
): IDatePicker.Position => {
  if (!node) return { left: '', top: '', bottom: '' }

  let top = 0
  let left = 0

  switch (direction) {
    case IDatePicker.PickerDirection.BOTTOM:
      top = node.offsetTop + node.offsetHeight + distance
      left = node.offsetLeft
      break
    case IDatePicker.PickerDirection.TOP:
      top = node.offsetTop - height - distance
      left = node.offsetLeft
      break
  }

  return {
    top: convertPx(top),
    left: convertPx(left),
  }
}

export const getDomHeight = (node: HTMLDivElement | null): number => {
  return node ? node.clientHeight : 0
}

/*DateUtil */
export const getDayMatrix = (year: number, month: number): string[][] => {
  const date = dayjs().year(year).month(month)

  const startOfMonth = date.startOf('month').date()
  const endOfMonth = date.endOf('month').date()

  const startDay = date.startOf('month').day()
  const remain = (startDay + endOfMonth) % 7

  return chunk(
    [
      ...repeat(' ', startDay),
      ...range(startOfMonth, endOfMonth + 1).map(v => `${v}`),
      ...(7 - remain === 7 ? [] : repeat(' ', 7 - remain)),
    ],
    7
  )
}

export const getMonthMatrix = (locale: IDatePicker.Locale) => {
  return chunk(getMonthShort(locale), 3)
}

export const getYearMatrix = (year: number): string[][] => {
  return chunk(
    range(year - 4, year + 5).map(v => `${v}`),
    3
  )
}

export const isYearEqual = (year1?: dayjs.Dayjs, year2?: dayjs.Dayjs) => {
  if (!year1 || !year2) return false
  return dayjs(year1).isSame(year2, 'year')
}

export const isDayEqual = (day1?: dayjs.Dayjs, day2?: dayjs.Dayjs) => {
  if (!day1 || !day2) return false
  return dayjs(day1).isSame(day2, 'date')
}

export const isYearAfter = (year1: dayjs.Dayjs, year2: dayjs.Dayjs) => {
  return dayjs(year1).isAfter(year2, 'year')
}
export const isYearBefore = (year1: dayjs.Dayjs, year2: dayjs.Dayjs) => {
  return dayjs(year1).isBefore(year2, 'year')
}

export const isMonthAfter = (month1: dayjs.Dayjs, month2: dayjs.Dayjs) => {
  return dayjs(month1).isAfter(month2, 'month')
}
export const isMonthBefore = (month1: dayjs.Dayjs, month2: dayjs.Dayjs) => {
  return dayjs(month1).isBefore(month2, 'month')
}
export const isDayAfter = (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => {
  return dayjs(day1).isAfter(day2, 'date')
}

export const isDayBefore = (day1: dayjs.Dayjs, day2: dayjs.Dayjs) => {
  return dayjs(day1).isBefore(day2, 'date')
}
export const isDayRange = (
  date: dayjs.Dayjs,
  start?: dayjs.Dayjs,
  end?: dayjs.Dayjs
) => {
  if (!start || !end) return false

  return isDayAfter(date, start) && isDayBefore(date, end)
}

export const isYearRange = (
  year: dayjs.Dayjs,
  start?: dayjs.Dayjs,
  end?: dayjs.Dayjs
) => {
  if (!start || !end) return false

  return isYearAfter(year, start) && isYearBefore(year, end)
}

export const formatDate = (date: dayjs.Dayjs | undefined, format: string) => {
  if (date === undefined) return ''
  return dayjs(date).format(format)
}
