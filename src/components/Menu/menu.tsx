import React, { createContext, useState } from 'react'
import cn from 'classnames'
import './menu.scss'
import { IMenuItemProps } from './menuItem'

type selectCallback = (selectIndex: string) => void
type Mode = 'vertical' | 'horizontal'
export interface IMenuProps {
  className?: string
  onSelect?: selectCallback
  style?: React.CSSProperties
  defaultIndex?: string
  mode?: Mode
}
export interface IMenuContext {
  index: string
  onSelect?: selectCallback
  mode: Mode
}

export const MenuContext = createContext<IMenuContext>({
  index: '0',
  mode: 'horizontal',
})

const Menu: React.FC<IMenuProps & React.PropsWithChildren> = ({
  className,
  onSelect,
  style,
  defaultIndex = '0',
  mode = 'horizontal',
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  function handleClick(index: string) {
    setActiveIndex(index)
    onSelect && onSelect(index)
  }
  const passContext: IMenuContext = {
    index: activeIndex,
    onSelect: handleClick,
    mode: mode,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childEl = child as React.FunctionComponentElement<IMenuItemProps>
      const childName = childEl.type['name']

      if (childName === 'MenuItem' || childName === 'SubMenu') {
        return React.cloneElement(childEl, { index: index.toString() })
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
