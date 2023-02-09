import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { config } from 'react-transition-group'
import Select from './index'
// 将动画关闭，否则判断点击option后option选项不在页面上，会出错。
// 因为是测试是立马执行的，而动画会有时间
config.disabled = true

// mock函数，使得使用icon图标时，生成该span标签，不实际生成图标，标签text为icon名，之后getByText('check')获取该标签
jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})

const defaultProps = {
  defaultValue: '',
  placeholder: 'test',
  onChange: jest.fn(),
  onVisibleChange: jest.fn(),
}
const multipleProps = {
  ...defaultProps,
  multiple: true,
}

describe('test Select component', () => {
  it('default select', () => {
    const wrapper = render(
      <Select
        {...defaultProps}
        options={[
          { value: 'nihao' },
          { value: 'nihao2' },
          { value: 'nihao3', disabled: true },
        ]}
      />
    )
    const { getByPlaceholderText, getByText } = wrapper
    const element = getByPlaceholderText('test') as HTMLInputElement
    expect(element).toBeInTheDocument()
    // 1.点击input框，应，显示option选项,触发onVisibleChange(true)，focus框
    fireEvent.click(element)
    const firstItem = getByText('nihao')
    expect(firstItem).toBeInTheDocument()
    // 注意：toBeCalled 等同 toHaveBeenCalled
    expect(defaultProps.onVisibleChange).toBeCalledWith(true)
    // 2.点击disabled的option选项，应，无效,即选项仍在页面上
    const disabledItem = getByText('nihao3')
    fireEvent.click(disabledItem)
    expect(disabledItem).toBeInTheDocument()
    // 3.点击其他正常option，应，收起选项,触发onVisibleChange(false)、onChange(xxx)，且input框的value更改
    fireEvent.click(firstItem)
    expect(firstItem).not.toBeInTheDocument()
    expect(defaultProps.onVisibleChange).toBeCalledWith(false)
    expect(defaultProps.onChange).toBeCalledWith('nihao', ['nihao'])
    expect(element.value).toEqual('nihao')
  })
  it('multiple select', () => {
    const wrapper = render(
      <Select
        {...multipleProps}
        options={[{ value: 'nihao' }, { value: 'nihao2' }, { value: 'nihao3' }]}
      />
    )
    const { getByPlaceholderText, getByText, container } = wrapper
    const element = getByPlaceholderText('test') as HTMLInputElement
    fireEvent.click(element)
    const firstItem = getByText('nihao')
    const secondItem = getByText('nihao2')
    // 1.点击nihao选项
    fireEvent.click(firstItem)
    // 1.1 应有特殊类名
    expect(firstItem).toHaveClass('violetSelectItem--selected')
    // 1.2 应出现check图标
    expect(getByText('check')).toBeInTheDocument()
    // 1.3 应触发onChange
    expect(multipleProps.onChange).toBeCalledWith('nihao', ['nihao'])
    // 1.4 应生成tag
    expect(
      container.querySelectorAll('.violetSelected__tags__tag').length
    ).toEqual(1)
    // 1.5 placeholder被清空
    expect(element.placeholder).toEqual('')
    // 2.点击nihao2选项
    fireEvent.click(secondItem)
    // 2.1 触发onChange
    expect(multipleProps.onChange).toBeCalledWith('nihao2', ['nihao', 'nihao2'])
    // 2.2 增加tag
    expect(
      container.querySelectorAll('.violetSelected__tags__tag').length
    ).toEqual(2)
    // 3.再次点击nihao2选项
    fireEvent.click(secondItem)
    // 3.1 selected类名消失
    expect(secondItem).not.toHaveClass('violetSelectItem--selected')
    // 3.2 触发onChange
    expect(multipleProps.onChange).toBeCalledWith('nihao2', ['nihao'])
    // 3.3 减少tag
    expect(
      container.querySelectorAll('.violetSelected__tags__tag').length
    ).toEqual(1)
    // 4.点击tag的关闭按钮
    fireEvent.click(getByText('times'))
    // 4.1 触发onChange
    expect(multipleProps.onChange).toBeCalledWith('nihao', [])
    // 4.2 减少tag
    expect(
      container.querySelectorAll('.violetSelected__tags__tag').length
    ).toEqual(0)
    // 4.3 至此已没有选中的选项，placeholder恢复为test
    expect(element.placeholder).toEqual('test')
  })
})
