import React, { useContext, useState, useRef, ReactNode } from 'react'
import cn from 'classnames'
import { MenuContext } from '../menu'
import { IMenuItemProps } from '../menuItem'
import Icon from '../../Icon'

export interface ISubMenuProps {
  index?: string
  title: string
  className?: string
  children?: ReactNode
}

export const SubMenu: React.FC<ISubMenuProps & React.PropsWithChildren> = ({
  title,
  className,
  index,
  children,
}) => {
  const context = useContext(MenuContext)
  // 控制 dropdown 的出现
  const [dropdownShow, setDropdownShow] = useState(
    context.mode === 'horizontal' ? false : true
  )
  const hoverEvents =
    context.mode === 'horizontal'
      ? {
          onMouseOver: () => setDropdownShow(true),
          onMouseLeave: () => setDropdownShow(false),
        }
      : {}
  const handleClick = () => {
    if (context.onSelect && typeof index === 'string') {
      context.onSelect(index)
    }
  }
  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: () => {
            handleClick()
            setDropdownShow(!dropdownShow)
          },
        }
      : { onClick: handleClick }

  const classes = cn(className, 'violetMenu__subMenu', {
    'violetMenu__subMenu--active': context.index.startsWith(index as string),
    'violetMenu__menuItem--activeAsfirstLevelItem':
      context.index.startsWith(index as string) && index?.length === 1,
  })
  const dropdownIconClasses = cn('violetMenu__subMenu__title__icon', {
    'violetMenu__subMenu__title__icon--arrowUp': dropdownShow,
  })

  const menuRef = useRef(null)
  const menuEl = menuRef.current as HTMLLIElement | null
  const menuHeight = menuEl?.clientHeight as number

  const renderChildren = () => {
    const childrenComponents = React.Children.map(children, (child, i) => {
      const childEl = child as React.FunctionComponentElement<IMenuItemProps>
      const childName = childEl.type['name']

      if (childName === 'MenuItem') {
        return React.cloneElement(childEl, {
          index: `${index}-${i}`,
          className: 'violetMenu__subMenu__dropDownList__li',
        })
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        )
      }
    })

    return (
      <ul
        className="violetMenu__subMenu__dropDownList"
        style={{ top: `${menuHeight + 2}px` }}
      >
        {childrenComponents}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents} ref={menuRef}>
      <div className="violetMenu__subMenu__title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className={dropdownIconClasses} />
      </div>
      {dropdownShow && renderChildren()}
    </li>
  )
}

export default SubMenu
