import React, { useState, ReactNode, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export interface IAffixProps extends React.HTMLAttributes<HTMLDivElement> {
  offsetTop?: number
  className?: string
  children?: ReactNode
}

/**
 * > 通过鼠标或键盘，输入范围内的数值。
 *
 * ### 何时使用
 * 当需要获取标准数值时。
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
      console.log(width, height, top)

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
        className={className}
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
