import React, { useContext, useState } from 'react'
import cn from 'classnames'
import { MenuContext } from '../menu'
import { IMenuItemProps } from '../menuItem'
import './subMenu.scss'

export interface ISubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<ISubMenuProps & React.PropsWithChildren> = ({
  title,
  className,
  index,
  children,
}) => {
  const context = useContext(MenuContext)
  // 控制 dropdown 的出现
  const [dropdownShow, setDropdownShow] = useState(true)
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

  const classes = cn(className, 'violetMenu__menuItem violetMenu__subMenu', {
    'violetMenu__subMenu--active': context.index === index,
    'violetMenu__subMenu--show': dropdownShow,
  })

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
      <ul className="violetMenu__subMenu__dropDownList">
        {childrenComponents}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="violetMenu__subMenu__title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

export default SubMenu
