import React, { ReactNode } from 'react'
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
export declare const Affix: React.FC<IAffixProps>
export default Affix
