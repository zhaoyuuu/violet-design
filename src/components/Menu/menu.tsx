import React, { createContext, useState } from 'react'
import cn from 'classnames'
import './menu.scss'
import { IMenuItemProps } from './menuItem'

type selectCallback = (selectIndex: number) => void
export interface IMenuProps {
  className?: string
  onSelect?: selectCallback
  style?: React.CSSProperties
  defaultIndex?: number
  mode?: 'vertical' | 'horizontal'
}
export interface IMenuContext {
  index: number
  onSelect?: selectCallback
}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<IMenuProps & React.PropsWithChildren> = ({
  className,
  onSelect,
  style,
  defaultIndex = 0,
  mode = 'horizontal',
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  function handleClick(index: number) {
    setActiveIndex(index)
    onSelect && onSelect(index)
  }
  const passContext: IMenuContext = {
    index: activeIndex,
    onSelect: handleClick,
  }

  const renderChildren = () => {
    return React.Children.map(children, child => {
      const childEl = child as React.FunctionComponentElement<IMenuItemProps>

      if (childEl.type['name'] === 'MenuItem') {
        return childEl
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        )
      }
    })
  }

  const classes = cn(className, 'violetMenu', {
    'violetMenu--vertical': mode === 'vertical',
  })

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu
