import React, { ReactNode, useState, useRef } from 'react'
import classNames from 'classnames'

export type ProgressType = 'line' | 'circle'
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
  /**圆环特有属性：内部圆环颜色*/
  innerColor?: string
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
    innerColor,
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

  if (percent !== undefined) {
    if ('type' in props && type === 'circle') {
      if (('success' in props && success == true) || percent >= 100) {
        return (
          <div className={classes}>
            <div
              className="violetProgress__circle"
              style={{
                background: `conic-gradient(#96c24e 0deg, #96c24e 360deg)`,
              }}
            >
              <div
                className="violetProgress__circle__percent"
                style={{ background: innerColor }}
              >
                {showInfo ? <label>√</label> : null}
              </div>
            </div>
          </div>
        )
      }

      return (
        <div className={classes}>
          <div
            className="violetProgress__circle"
            style={{
              background: `conic-gradient(#8076a3 0deg, #8076a3 ${
                percent * 3.6
              }deg, #e9d7df ${percent * 3.6}deg, #e9d7df 360deg)`,
            }}
          >
            <div
              className="violetProgress__circle__percent"
              style={{ background: innerColor }}
            >
              {showInfo ? <label> {percent}%</label> : null}
            </div>
          </div>
        </div>
      )
    }

    if (percent >= 100 || ('success' in props && success == true)) {
      return (
        <div className={classes}>
          <div className="violetProgress__line__container">
            <div
              className="violetProgress__line__progress"
              style={{ width: 240, background: '#96c24e' }}
            ></div>
          </div>
          {showInfo ? <label> √</label> : null}
        </div>
      )
    }

    return (
      <div className={classes}>
        <div className="violetProgress__line__container">
          <div
            className="violetProgress__line__progress"
            style={{ width: ((percent * 1.0) / 100) * 240 }}
          ></div>
        </div>
        {showInfo ? <label> {percent}%</label> : null}
      </div>
    )
  } else if ('success' in props && success === true) {
    if (type === 'circle') {
      return (
        <div className={classes}>
          <div
            className="violetProgress__circle"
            style={{
              background: `conic-gradient(#96c24e 0deg, #96c24e 360deg)`,
            }}
          >
            <div
              className="violetProgress__circle__percent"
              style={{ background: innerColor }}
            >
              {showInfo ? <label>√</label> : null}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={classes}>
          <div className="violetProgress__line__container">
            <div
              className="violetProgress__line__progress"
              style={{ width: 240, background: '#96c24e' }}
            ></div>
          </div>
          {showInfo ? <label> √</label> : null}
        </div>
      )
    }
  } else {
    return (
      <div className={classes}>
        <div className="violetProgress__line__container">
          <div
            className="violetProgress__line__progress"
            style={{ width: 0 }}
          ></div>
        </div>
        {showInfo ? <label> 0%</label> : null}
      </div>
    )
  }
}

export default Progress
