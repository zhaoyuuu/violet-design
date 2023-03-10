import React, { ReactNode } from 'react'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-bottom'
  | 'zoom-in-right'
export interface TransitionProps extends CSSTransitionProps {
  /** 设置组件的显示或隐藏状态(逻辑上的概念) */
  in: boolean
  /** 设置可以在初始化时隐藏组件 */
  mountOnEnter?: boolean
  /** 设置当组件处于 exited 状态时卸载组件 */
  unmountOnExit?: boolean
  /** 设置初始进入时拥有过渡效果 */
  appear?: boolean
  /** 设置入场时是否有过渡效果 */
  enter?: boolean
  /** 设置出场时是否有过渡效果 */
  exit?: boolean
  /** 过渡持续时间 */
  timeout:
    | number
    | {
        enter?: number
        exit?: number
        appear?: number
      }
  /** 在 entering 状态之前调用 */
  onEnter?: () => void
  /** 在 entering 状态之后调用 */
  onEntering?: () => void
  /** 在 entered 状态之后调用 */
  onEntered?: () => void
  /** 在 exiting 状态之前调用 */
  onExit?: () => void
  /** 在 exiting 状态之后调用 */
  onExiting?: () => void
  /** 在 exited 状态之后调用 */
  onExited?: () => void
  /** 展开的动画效果 */
  animation?: AnimationName
  /** 避免自身动画消失，故嵌套一层节点 */
  wrapper?: boolean
  /** 组件包含的子节点 */
  children?: ReactNode
}
/**
 * 过渡动画
 *
 * ###何时使用
 * 当需要一些过渡动画效果时使用，如下拉菜单。
 *
 * ###使用方法
 * 给 Transition 组件设置 `className` 后（若无 `className` ,也可用 `animation` ），在相应的 css 文件中设置不同阶段的样式。阶段分为：
 *
 *     进入的三阶段：`className-enter`,  `className-enter-active`, `className-enter-done`
 *
 *     离开的三阶段：`className-exit`,  `className-exit-active`,  `className-exit-done`
 *
 * 本组件库提供一种下拉菜单的效果可供使用，分为四种:
 *
 *     1.从顶部滑出 `zoom-in-top`
 *
 *     2.从底部滑出 `zoom-in-bottom`
 *
 *     3.从左上角滑出 `zoom-in-left`
 *
 *     4.从右上角滑出 `zoom-in-right`
 *
 * 使用时将 `className` 或者 `animation` 设置为效果名即可。
 */
export declare const Transition: React.FC<TransitionProps>
export default Transition
