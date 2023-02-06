import React, { FC } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon'
import Progress from '../Progress'
interface UploadListProps {
  fileList: UploadFile[]
  onRemove: (file: UploadFile) => void
}
export const UploadList: FC<UploadListProps> = props => {
  const { fileList, onRemove } = props
  return (
    <ul className="violetUpload__list">
      {fileList.map(item => {
        return (
          <li className="violetUpload__list__item" key={item.uid}>
            <span className={`fileName fileName--${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            <span className="fileStatus">
              {(item.status === 'uploading' || item.status === 'ready') && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {item.status === 'success' && (
                <Icon icon="check-circle" theme="success" />
              )}
              {item.status === 'error' && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>
            <span className="fileActions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(item)
                }}
              />
            </span>
            {item.status === 'uploading' && (
              <Progress percent={item.percent || 0} showInfo={true}></Progress>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList
