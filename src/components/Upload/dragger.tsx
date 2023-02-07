import React, { FC, useState } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void
  children?: React.ReactNode
}
export const Dragger: FC<DraggerProps> = props => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const className = classNames('violetUpload__dragger', {
    'violetUpload__dragger--dragover': dragOver,
  })
  const handleDrage = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    // 取消DragEvent的默认行为，否则不能区域中放置文件
    e.preventDefault()
    setDragOver(over)
  }
  // 拖动元素在可释放目标元素上释放的处理函数
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  return (
    <div
      className={className}
      onDragOver={e => handleDrage(e, true)}
      onDragLeave={e => handleDrage(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger
