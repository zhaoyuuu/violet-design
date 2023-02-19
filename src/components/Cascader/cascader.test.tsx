import React from 'react'
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react'
import Cascader, { ICascader } from './cascader'

const testProps: ICascader = {
  value: [],
  onChange: jest.fn(),
  options: [
    {
      value: 'zhejiang',
      children: [
        {
          value: 'hangzhou',
          children: [
            {
              value: 'xihu',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      children: [
        {
          value: 'nanjing',
          children: [
            {
              value: 'zhonghuamen',
            },
          ],
        },
      ],
    },
  ],
  placeholder: 'test-cascader',
}

let input: HTMLInputElement, wrapper: RenderResult
describe('test Cascader component', () => {
  beforeEach(() => {
    wrapper = render(<Cascader {...testProps} />)
    input = wrapper.getByPlaceholderText('test-cascader') as HTMLInputElement
  })

  it('should render the correct Cascader', () => {
    expect(input).toBeInTheDocument()
    expect(
      wrapper.container.querySelector('.violetCascaderWrap__optionsWrap')
    ).not.toBeInTheDocument()
  })

  it('change the input value directly should not be valid', () => {
    fireEvent.change(input, { target: { value: ['hubei', 'wuhan'] } })
    expect(input.value).not.toEqual(['hubei', 'wuhan'])
  })

  it('popup show & hide correctly', async () => {
    fireEvent.mouseDown(input)
    waitFor(() => {
      expect(
        wrapper.container.querySelector('.violetCascaderWrap__optionsWrap')
      ).toBeInTheDocument()
    })
    // click outside
    fireEvent.click(document)
    waitFor(() => {
      expect(
        wrapper.container.querySelector('.violetCascaderWrap__optionsWrap')
      ).not.toBeInTheDocument()
    })
  })

  it('change the input value by selecting options', async () => {
    fireEvent.mouseDown(input)
    waitFor(() => {
      fireEvent.click(wrapper.getByText('zhejiang'))
      fireEvent.click(wrapper.getByText('hangzhou'))
      fireEvent.click(wrapper.getByText('xihu'))
      expect(input.value).toEqual('zhejiang / hangzhou / xihu')
    })
  })
})

describe('rendering time test', () => {
  it('render in less than 50ms', () => {
    const startTime = performance.now()
    const { container } = render(<Cascader {...testProps} />)
    const endTime = performance.now()
    const renderingTime = endTime - startTime
    console.log(renderingTime)
    expect(renderingTime).toBeLessThan(50)
  })
})
