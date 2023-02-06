import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
// 文件需要各自的id和状态、上传百分比等，故定义一个数组fileList来存储文件信息
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}
export interface UploadProps {
  /**必选参数, 上传的地址 */
  action: string
  /**默认已经上传的文件列表 */
  defaultFileList?: UploadFile[]
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: UploadFile) => void
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: UploadFile) => void
  /**文件上传失败时的钩子 */
  onError?: (err: any, file: UploadFile) => void
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
  onChange?: (file: UploadFile) => void
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void
  /**设置上传的请求头部 */
  headers?: { [key: string]: any }
  /**上传的文件字段名 */
  name?: string
  /**上传时附带的额外参数 */
  data?: { [key: string]: any }
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean
  /**接受上传的文件类型 */
  accept?: string
  /**是否支持多选文件 */
  multiple?: boolean
  children?: React.ReactNode
  /**是否支持拖拽上传 */
  drag?: boolean
}
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'violetUI'
 * ~~~
 */
export const Upload: FC<UploadProps> = props => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    // useState是异步的，为了获得当前最新的fileList值，setFileList里写函数形式即可
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    onRemove && onRemove(file)
  }
  // 函数：执行文件的上传
  const uploadFiles = (files: FileList) => {
    // 把filelist格式转为数组
    const postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        // beforeUpload的结果分为 boolean 和 Promise，分情况：
        if (result && result instanceof Promise) {
          // then只有一个参数，代表成功的函数，故拒绝的期约不会执行post()
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  // 真正发起post文件上传的部分
  const post = (file: File) => {
    // 整理好文件
    const _file: UploadFile = {
      uid: Date.now() + 'uploadFile',
      status: 'ready',
      size: file.size,
      name: file.name,
      raw: file,
    }
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    // 添加用户自定义的data
    data &&
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    axios
      .post(action, formData, {
        // 文件上传必须使用该值
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        // axios本来就支持的属性:withCredentials(是否携带cookie)
        withCredentials,
        onUploadProgress: (e: any) => {
          const percentage = Math.round((e.loaded * 100) / e.total)
          if (percentage < 100) {
            // 更新file文件的status和percent值
            updateFileList(_file, { status: 'uploading', percent: percentage })
            onProgress && onProgress(percentage, _file)
          }
        },
      })
      .then(res => {
        console.log(res)
        updateFileList(_file, { status: 'success', response: res.data })
        onSuccess && onSuccess(res.data, _file)
        onChange && onChange(_file)
      })
      .catch(err => {
        console.log(err)
        updateFileList(_file, { status: 'error', error: err })
        onError && onError(err, _file)
        onChange && onChange(_file)
      })
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    uploadFiles(files)
    // 上传完，将文件地址即input的value清空
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  console.log(fileList)

  return (
    <div className="violetUpload">
      <div
        className="violetUpload__input"
        onClick={handleClick}
        // style={{ display: 'inline-block' }}
      >
        {drag ? (
          <Dragger
            onFile={files => {
              uploadFiles(files)
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
      </div>
      <input
        className="violetInput"
        style={{ display: 'none' }}
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload
