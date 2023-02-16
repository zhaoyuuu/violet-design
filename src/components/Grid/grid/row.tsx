import React from 'react'
import RowContext from './RowContext'
import './_style.scss'

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number
}

export function Row(props: RowProps) {
  const { gutter = 0, children } = props

  const rowContext = React.useMemo(() => ({ gutter }), [gutter])

  const rowStyle: React.CSSProperties = {}

  if (gutter && gutter > 0) {
    rowStyle.marginLeft = gutter / -2
    rowStyle.marginRight = gutter / -2
  }

  return (
    <RowContext.Provider value={rowContext}>
      <div className="row" style={{ ...rowStyle }}>
        {children}
      </div>
    </RowContext.Provider>
  )
}

export default Row
