import React, { useContext } from 'react'
import cn from 'classnames'
import { MenuContext } from './menu'

export interface IMenuItemProps {
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  index: number
}

const MenuItem: React.FC<IMenuItemProps & React.PropsWithChildren> = ({
  style,
  className,
  disabled,
  index,
  children,
}) => {
  const context = useContext(MenuContext)

  const handleClick = () => {
    if (!disabled && context.onSelect) {
      context.onSelect(index)
    }
  }

  const classes = cn(className, 'violetMenu__menuItem', {
    'violetMenu__menuItem--disabled': disabled === true,
    'violetMenu__menuItem--active': context.index === index,
  })

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem
