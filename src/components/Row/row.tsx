import React, { FC, useEffect, useState } from 'react'

interface RowProps {
  justify?: string
  align?: string 
  gutter?: number 
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
    switch (justify) {
      case 'start':
        setTbjustify({
          justifyContent: 'flex-start'
        });
        break;
      case 'center':
        setTbjustify({
          justifyContent: 'center'
        });
        break;
      case 'end':
        setTbjustify({
          justifyContent: 'flex-end'
        });
        break;
      case 'space-around':
        setTbjustify({
          justifyContent: 'space-around'
        });
        break;
      case 'space-between':
        setTbjustify({
          justifyContent: 'space-between'
        });
        break;
      default:
        setTbjustify({});
    }
  }
  function palign() {
    switch (align) {
      case 'top':
        setTbalign({
          alignItems: 'flex-start'
        });
        break;
      case 'middle':
        setTbalign({
          alignItems: 'center'
        });
        break;
      case 'bottom':
        setTbalign({
          alignItems: 'flex-end'
        });
        break;
      default:
        setTbalign({});
    }
  }

  return (
    <div className="violetRow" style={{ ...tbalign, ...tbjustify }}>
      {children}
    </div>
  )
}

export default Row
