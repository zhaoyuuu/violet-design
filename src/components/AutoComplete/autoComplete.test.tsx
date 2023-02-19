import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import AutoComplete, {
  IAutoCompleteProps,
  DataSourceType,
} from './autoComplete'

// 测试用例
const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
]
const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{
    value: string
    number: number
  }>
  return <>name: {itemWithNumber.value}</>
}

// props
const testProps: IAutoCompleteProps = {
  fetchSuggestions: query => {
    return testArray.filter(item => item.value.includes(query))
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}
const testPropsWithCustomRender: IAutoCompleteProps = {
  ...testProps,
  placeholder: 'auto-complete-2',
  renderOption,
}

let wrapper: RenderResult, Input: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    Input = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })

  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(Input, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.getByText('ab')).toBeInTheDocument()
    })
    expect(
      wrapper.container.querySelectorAll('.violetAutoComplete__dropdown__item')
        .length
    ).toEqual(2)
    // 点击选项
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toBeCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    //fill the input
    expect(Input.value).toBe('ab')
  })

  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(Input, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')

    // arrowdown
    fireEvent.keyDown(Input, { keyCode: 40 })
    expect(firstResult).toHaveClass(
      'violetAutoComplete__dropdown__item--highlight'
    )
    // arrowdown
    fireEvent.keyDown(Input, { keyCode: 40 })
    expect(secondResult).toHaveClass(
      'violetAutoComplete__dropdown__item--highlight'
    )
    // arrowup
    fireEvent.keyDown(Input, { keyCode: 38 })
    expect(firstResult).toHaveClass(
      'violetAutoComplete__dropdown__item--highlight'
    )
    // enter
    fireEvent.keyDown(Input, { keyCode: 13 })
    expect(testProps.onSelect).toBeCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(Input.value).toEqual('ab')
  })

  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(Input, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // click outside
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  it('renderOption should generate the right template', async () => {
    const wrapper2 = render(<AutoComplete {...testPropsWithCustomRender} />)
    const Input2 = wrapper2.getByPlaceholderText(
      'auto-complete-2'
    ) as HTMLInputElement
    fireEvent.change(Input2, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper2.queryByText('name: ab')).toBeInTheDocument()
    })
  })

  it('async fetchSuggestions should works fine', async () => {
    const testPropsWithPromise: IAutoCompleteProps = {
      ...testProps,
      fetchSuggestions: jest.fn(query => {
        return Promise.resolve(
          testArray.filter(item => item.value.includes(query))
        )
      }),
      placeholder: 'auto-complete-3',
    }
    const wrapper = render(<AutoComplete {...testPropsWithPromise} />)
    const inputNode = wrapper.getByPlaceholderText(
      'auto-complete-3'
    ) as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(testPropsWithPromise.fetchSuggestions).toHaveBeenCalled()
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
  })
})

describe('rendering time test', () => {
  it('render in less than 50ms', () => {
    const startTime = performance.now()
    const { container } = render(<AutoComplete {...testProps} />)
    const endTime = performance.now()
    const renderingTime = endTime - startTime
    console.log(renderingTime)
    expect(renderingTime).toBeLessThan(50)
  })
})
