import React, { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-bottom'
  | 'zoom-in-right'

export type TransitionProps = CSSTransitionProps & {
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
  timeout: number | { enter?: number; exit?: number; appear?: number }
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
  wrapper?: boolean
  children?: ReactNode
}
/**
 * 过渡动画
 *
 * ###何时使用
 * 当需要一些过渡动画效果时使用，如下拉菜单。
 */
const Transition: React.FC<TransitionProps> = props => {
  const { children, classNames, animation, wrapper, ...restProps } = props
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}
Transition.defaultProps = {
  // 设置当组件处于 exited 状态时卸载组件
  unmountOnExit: true,
  // 设置初始进入时拥有过渡效果
  appear: true,
  // mountOnEnter: true,
}
export default Transition
