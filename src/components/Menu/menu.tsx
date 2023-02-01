import React, { createContext, useState, ReactNode } from 'react'
import cn from 'classnames'
import { IMenuItemProps } from './menuItem'

type selectCallback = (selectIndex: string) => void
type Mode = 'vertical' | 'horizontal'
export interface IMenuProps {
  /** 添加自定义类名 */
  className?: string
  /** 设置点击触发的回调函数 */
  onSelect?: selectCallback
  /** 自定义样式 */
  style?: React.CSSProperties
  /** 设置默认高亮选项 */
  defaultIndex?: string
  /** 横向 or 纵向 */
  mode?: Mode
  children?: ReactNode
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

/**
 * > 为页面和功能提供导航的菜单列表。
 *
 * ### 何时使用
 * 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。
 *
 * 一般分为**顶部导航**和**侧边导航**，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
 *
 * ### 开发者注意事项
 * Menu组件的使用，需搭配 `MenuItem`/`SubMenu` 作为子组件来进行开发
 */
export const Menu: React.FC<IMenuProps> = ({
  className,
  onSelect,
  style,
  defaultIndex = '0',
  mode = 'horizontal',
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  function handleClick(index: string) {
    console.log(index)

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
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu
