import { createContext, Context } from 'react'

export interface RowContextState {
  gutter?: number
}

export const RowContext: Context<RowContextState> = createContext({})

export default RowContext
