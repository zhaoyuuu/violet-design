import { FC } from 'react'

import Select, { SelectProps } from './select'
import Option, { SelectOptionProps } from './option'

export type IselectComponent = FC<SelectProps> & {
  Option: FC<SelectOptionProps>
}

const TransSelect = Select as IselectComponent
TransSelect.Option = Option

export default TransSelect
