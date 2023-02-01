import React, { useContext, ReactNode } from 'react'
import cn from 'classnames'
import { MenuContext } from './menu'

export interface IMenuItemProps {
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  index?: string
  children?: ReactNode
}

export const MenuItem: React.FC<IMenuItemProps> = ({
  style,
  className,
  disabled,
  index,
  children,
}) => {
  const context = useContext(MenuContext)

  const handleClick = () => {
    if (!disabled && context.onSelect && typeof index === 'string') {
      context.onSelect(index)
    }
  }

  const classes = cn(className, 'violetMenu__menuItem', {
    'violetMenu__menuItem--disabled': disabled === true,
    'violetMenu__menuItem--active': context.index === index,
    'violetMenu__menuItem--activeAsfirstLevelItem':
      context.index === index && index.length === 1,
  })

  return (
    <li key={index} className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem
