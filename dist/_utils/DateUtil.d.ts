import { IDatePicker } from './types'
import dayjs from 'dayjs'
export declare const DatePickerDefaults: {
  monthFormat: string
  dateFormat: string
  dateTimeFormat: string
  timeFormat: string
  locale: string
}
export declare const lpad: (val: string, length: number, char: '0') => string
export declare const chunk: (arr: any[], n: number) => any[][]
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N
export type { Omit, Merge }
export declare const ifExistCall: (
  func?: ((...args: any[]) => void) | undefined,
  ...args: any[]
) => void | undefined
export declare const getMonthShort: (locale: IDatePicker.Locale) => any[]
export declare const getWeekDays: (locale: IDatePicker.Locale) => any[]
export declare const getToday: (locale: IDatePicker.Locale) => string
export declare const range: (n1: number, n2?: number) => number[]
export declare const repeat: (el: any, n: number) => any[]
/**
 * Getting Div position as far as distance
 * @param node
 * @param direction
 * @param distance
 */
export declare const getDivPosition: (
  node: HTMLDivElement | null,
  direction: IDatePicker.PickerDirection | undefined,
  height: number,
  distance: 5
) => IDatePicker.Position
export declare const getDomHeight: (node: HTMLDivElement | null) => number
export declare const getDayMatrix: (year: number, month: number) => string[][]
export declare const getMonthMatrix: (locale: IDatePicker.Locale) => any[][]
export declare const getYearMatrix: (year: number) => string[][]
export declare const isYearEqual: (
  year1?: dayjs.Dayjs,
  year2?: dayjs.Dayjs
) => boolean
export declare const isDayEqual: (
  day1?: dayjs.Dayjs,
  day2?: dayjs.Dayjs
) => boolean
export declare const isYearAfter: (
  year1: dayjs.Dayjs,
  year2: dayjs.Dayjs
) => boolean
export declare const isYearBefore: (
  year1: dayjs.Dayjs,
  year2: dayjs.Dayjs
) => boolean
export declare const isMonthAfter: (
  month1: dayjs.Dayjs,
  month2: dayjs.Dayjs
) => boolean
export declare const isMonthBefore: (
  month1: dayjs.Dayjs,
  month2: dayjs.Dayjs
) => boolean
export declare const isDayAfter: (
  day1: dayjs.Dayjs,
  day2: dayjs.Dayjs
) => boolean
export declare const isDayBefore: (
  day1: dayjs.Dayjs,
  day2: dayjs.Dayjs
) => boolean
export declare const isDayRange: (
  date: dayjs.Dayjs,
  start?: dayjs.Dayjs,
  end?: dayjs.Dayjs
) => boolean
export declare const isYearRange: (
  year: dayjs.Dayjs,
  start?: dayjs.Dayjs,
  end?: dayjs.Dayjs
) => boolean
export declare const formatDate: (
  date: dayjs.Dayjs | undefined,
  format: string
) => string
