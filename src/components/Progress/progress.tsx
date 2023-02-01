import React, { ReactNode, useState, useRef } from 'react'
import classNames from 'classnames'

export type ProgressType = 'line' | 'circle' | 'dashboard'
export type ProgressStatus = 'success' | 'exception' | 'normal' | 'active'
export type ProgressSize = 'lg' | 'md' | 'sm'

export interface ProgressProps {
  /**百分比*/
  percent?: number
  /**是否呈现进度和状态标志*/
  showInfo?: boolean
  /**进度条状态*/
  status?: ProgressStatus
  /**进度条颜色*/
  strokeColor?: string
  /**stroke-linecap的样式*/
  strokeLinecap?: string
  /**是否已经完成（达到100%）*/
  success?: boolean
  /**未填充部分的颜色*/
  trailColor?: string
  /**进度条样式*/
  type?: ProgressType
  /**大小*/
  size?: ProgressSize
  /**类名*/
  className?: string
  children?: ReactNode
}

export const Progress: React.FC<ProgressProps> = props => {
  const {
    percent,
    showInfo,
    status,
    strokeColor,
    strokeLinecap,
    success,
    trailColor,
    type,
    className,
    children,
    size,
    ...restProps
  } = props

  const classes = classNames('violetProgress', className, {
    [`violetProgress--${size}`]: size !== undefined,
    [`violetProgress--${type}`]: type !== undefined,
  })

  if ('type' in props && type === 'circle') {
    return (
      <div className={classes}>
        <div
          className="violetProgress--circle"
          style={{
            background: `conic-gradient(#8076a3 0deg, #8076a3 ${
              percent * 3.6
            }deg, #e9d7df ${percent * 3.6}deg, #e9d7df 360deg)`,
          }}
        >
          {percent}
        </div>
      </div>
    )
  } else if ('type' in props && type === 'dashboard') {
    return (
      <div>
        <progress value={(percent * 1.0) / 100}></progress>
        {showInfo ? <label> {percent}%</label> : null}
      </div>
    )
  }

  return (
    <div className={classes}>
      <div className="violetProgress--line--container">
        <div
          className="violetProgress--line--progress"
          style={{ width: ((percent * 1.0) / 100) * 240 }}
        ></div>
      </div>
      {showInfo ? <label> {percent}%</label> : null}
    </div>
  )
}

export default Progress
