import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload, { UploadFile } from './upload'
import Icon from '../Icon'
import Button from '../Button/button'

export default {
  title: 'Upload组件',
  component: Upload,
  id: 'Upload',
} as ComponentMeta<typeof Upload>

const defaultFileList: UploadFile[] = [
  { uid: '111', size: 1234, name: 'hlo.md', status: 'uploading', percent: 30 },
  { uid: '123', size: 1234, name: 'abc.md', status: 'success', percent: 30 },
  { uid: '188', size: 1234, name: 'ggg.md', status: 'error', percent: 30 },
]
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('上传文件过大')
    return false
  }
  return true
}

export const SimpleUpload = (args: any) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    multiple
  >
    <Button size="lg" btnType="primary">
      <Icon icon="upload" /> 点击上传
    </Button>
  </Upload>
)
SimpleUpload.storyName = '普通的 Upload 组件'

export const CheckUpload = (args: any) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    multiple
    beforeUpload={checkFileSize}
  >
    <Button size="lg" btnType="primary">
      <Icon icon="upload" /> 传50kb以下文件
    </Button>
  </Upload>
)
CheckUpload.storyName = '限制文件大小的 Upload 组件'

export const DragUpload = (args: any) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br />
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
)
DragUpload.storyName = '可拖动上传的 Upload 组件'
