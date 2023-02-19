import React from 'react'
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react'
import { Upload, UploadProps } from './upload'
import axios from 'axios'

jest.mock('../Icon/index.tsx', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
// 用jest包装axios，假的axios
jest.mock('axios')
// 类型断言，使axios.post有属性mockImplementation
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'xxx.com',
  onChange: jest.fn(),
  onSuccess: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
}
// 定义一个文件 new File(UTF-8编码的文件内容, 文件名，配置项)
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
describe('test Upload component', () => {
  // 文件内每个测试开始前执行的钩子函数:beforeEach
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>点击上传</Upload>)
    fileInput = wrapper.container.querySelector(
      '.violetInput'
    ) as HTMLInputElement
    uploadArea = wrapper.queryByText('点击上传') as HTMLElement
    // 提前定义：axios的post，返回解决的期约，响应的数据res为{ data: '666' }
    // 法二：mockedAxios.post.mockImplementation(() => Promise.resolve({ data: '666' }))
    mockedAxios.post.mockResolvedValue({ data: '666' })
  })
  it('simple upload', async () => {
    const { queryByText, getByText } = wrapper
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    // 触发input的change事件，且e.target.files为 [testFile]
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    // loading的图标出现
    expect(queryByText('spinner')).toBeInTheDocument()
    // 注意********************
    expect(queryByText('test.png')).toBeInTheDocument()
    // success的图标出现
    await waitFor(() => {
      expect(queryByText('check-circle')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toBeCalledWith(
      '666',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: '666',
        name: 'test.png',
      })
    )
    expect(testProps.onChange).toBeCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: '666',
        name: 'test.png',
      })
    )

    // 点击文件的x，删除文件
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(getByText('times'))
    expect(queryByText('test.png')).not.toBeInTheDocument()
    // objectContaining结合toBeCalledWith使用，测试参数是否包含这些属性
    expect(testProps.onRemove).toBeCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      })
    )
  })
  it('drag-and-drop upload', async () => {
    const { queryByText } = wrapper
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('violetUpload__dragger--dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('violetUpload__dragger--dragover')
    // handleDrop处理函数中取文件也是e.dataTransfer.files,相对应
    fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } })
    expect(queryByText('test.png')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('check-circle')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toBeCalledWith(
      '666',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: '666',
        name: 'test.png',
      })
    )
  })
})

it('render in less than 50ms', () => {
  const startTime = performance.now()
  const { container } = render(<Upload {...testProps}>点击上传</Upload>)
  const endTime = performance.now()
  const renderingTime = endTime - startTime
  console.log(renderingTime)
  expect(renderingTime).toBeLessThan(50)
})
