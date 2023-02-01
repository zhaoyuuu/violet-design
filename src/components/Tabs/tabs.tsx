import React, { FC, useState, FunctionComponentElement, ReactNode } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabItem'

type Mode = 'vertical' | 'horizontal'

export interface TabsProps {
  /**当前激活 tab 面板的 index，默认为0 */
  defaultIndex?: number
  /**可以扩展的 className */
  className?: string
  /**点击 Tab 触发的回调函数 */
  onSelect?: (selectedIndex: number) => void
  /**Tabs的样式，两种可选，默认为 line */
  type?: 'line' | 'card'
  mode?: Mode
  children?: ReactNode
}

/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 */
export const Tabs: FC<TabsProps> = props => {
  const { defaultIndex, className, onSelect, children, type, mode } = props
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const handleClick = (
    e: React.MouseEvent,
    index: number,
    disabled: boolean | undefined
  ) => {
    if (!disabled) {
      setActiveIndex(index)
      if (onSelect) {
        onSelect(index)
      }
    }
  }

  const tabsClass = classNames({
    'violetTabs--horizontal': mode !== 'vertical' && mode !== null,
    'violetTabs--vertical': mode === 'vertical',
  })

  const contentClass = classNames({
    'violetTabs__content--horizontal': mode !== 'vertical' && mode !== null,
    'violetTabs__content--vertical': mode === 'vertical',
  })

  const navClass = classNames('violetTabs__nav', {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
    'nav--vertical': mode === 'vertical' && type === 'line',
  })

  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      const { label, disabled } = childElement.props
      const classes = classNames('violetTabs__navItem', {
        isActive: activeIndex === index,
        disabled: disabled,
      })
      return (
        <li
          className={classes}
          key={`navItem-${index}`}
          onClick={e => {
            handleClick(e, index, disabled)
          }}
        >
          {label}
        </li>
      )
    })
  }

  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child
      }
    })
  }

  return (
    <div className={`violetTabs ${className}  ${tabsClass}`}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className={`violetTabs__content ${contentClass}`}>
        {renderContent()}
      </div>
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line',
}
export default Tabs
