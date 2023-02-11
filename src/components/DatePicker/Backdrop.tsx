import React from 'react'
import classNames from 'classnames'

//
interface Props {
  invert?: boolean
  show?: boolean
  onClick?: () => void
}

const Backdrop: React.FunctionComponent<Props> = ({
  invert,
  show,
  onClick,
}) => (
  <React.Fragment>
    {show && (
      <div
        onClick={onClick}
        className={classNames('rc-backdrop', { invert })}
      />
    )}
  </React.Fragment>
)

export default Backdrop
