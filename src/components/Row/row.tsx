import React, { FC, useEffect, useState } from 'react'
import './index.scss'

interface RowProps {
  justify: string // 水平排列方式
  align: string // 垂直排列方式
  gutter: number // 栅格间隔
  children?: React.ReactNode;
}

export const Row: FC<RowProps> = ({ justify, align, children }) => {
  const [tbalign, setTbalign] = useState({})
  const [tbjustify, setTbjustify] = useState({})

  useEffect(() => {
    pjustify()
    palign()
  }, [])

  // 判断
  function pjustify() {
    if (justify === 'start') {
      setTbjustify({
        justifyContent: 'flex-start'
      })
    } else if (justify === 'center') {
      setTbjustify({
        justifyContent: 'center'
      })
    } else if (justify === 'end') {
      setTbjustify({
        justifyContent: 'flex-end'
      })
    } else if (justify === 'space-around') {
      setTbjustify({
        justifyContent: 'space-around'
      })
    } else if (justify === 'space-between') {
      setTbjustify({
        justifyContent: 'space-between'
      })
    } else {
      setTbjustify({})
    }
  }

  // 判断布局
  function palign() {
    if (align === 'top') {
      setTbalign({
        alignItems: 'flex-start'
      })
    } else if (align === 'middle') {
      setTbalign({
        alignItems: 'center'
      })
    } else if (align === 'bottom') {
      setTbalign({
        alignItems: 'flex-end'
      })
    } else {
      setTbalign({})
    }
  }

  return (
    <div className="tb-row" style={{ ...tbalign, ...tbjustify }}>
      {children}
    </div>
  )
}

export default Row