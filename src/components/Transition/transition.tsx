import React, { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-bottom'
  | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName
  wrapper?: boolean
  children?: ReactNode
}

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
}

export default Transition
