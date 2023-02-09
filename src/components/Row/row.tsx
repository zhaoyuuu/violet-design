import React, { FC, useEffect, useState } from 'react'

interface RowProps {
  justify: string
  align: string 
  gutter: number 
  children?: React.ReactNode;
}

export const Row: FC<RowProps> = ({ justify, align, children }) => {
  const [tbalign, setTbalign] = useState({})
  const [tbjustify, setTbjustify] = useState({})

  useEffect(() => {
    pjustify()
    palign()
  }, [])

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