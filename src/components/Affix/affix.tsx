import React, { useState, ReactNode, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import cn from 'classnames'

export interface IAffixProps extends React.HTMLAttributes<HTMLDivElement> {
  offsetTop?: number
  className?: string
  children?: ReactNode
}

/**
 * > 将页面元素钉在可视范围。
 *
 * ### 何时使用
 * 当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。
 *
 * 页面可视范围过小时，慎用此功能以免遮挡页面内容。
 */
export const Affix: React.FC<IAffixProps> = ({
  className,
  offsetTop = 0,
  children,
}) => {
  // 是否affix
  const [isAffixed, setAffixed] = useState(false)

  // 占原位的 div 样式
  const [substituteStyle, setSubstituteStyle] =
    useState<React.CSSProperties | null>(null)

  const wrapperRefCB = useCallback((node: any) => {
    if (node === null) return

    function updatePosition() {
      const { width, height, top } = node.getBoundingClientRect()

      if (top < offsetTop && !isAffixed) {
        // affix
        setSubstituteStyle({
          width,
          height,
        })
        setAffixed(true)
      } else {
        // 取消affix
        setAffixed(false)
      }
    }

    window.addEventListener('scroll', updatePosition, false)

    // 监听元素是否发生尺寸变化
    const ob = new ResizeObserver(updatePosition)
    ob.observe(node)
  }, [])

  return (
    <div className={'violetAffix'} ref={wrapperRefCB}>
      {/* substitude */}
      {isAffixed && <div style={substituteStyle as React.CSSProperties}></div>}
      {/* children */}
      <div
        className={cn(className, 'violetAffix__content')}
        style={
          isAffixed
            ? {
                position: 'fixed',
                top: offsetTop,
              }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  )
}

export default Affix
