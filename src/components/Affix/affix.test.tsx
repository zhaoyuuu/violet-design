import React from 'react'
import { render } from '@testing-library/react'
import Affix, { IAffixProps } from './affix'

describe('test Affix component', () => {
  it('should render affix correctly', () => {
    const wrapper = render(<Affix>affix</Affix>)
    expect(wrapper.getByText('affix')).toBeInTheDocument()
  })
})

describe('rendering time test', () => {
  it('render in less than 50ms', () => {
    const startTime = performance.now()
    const { container } = render(<Affix>affix</Affix>)
    const endTime = performance.now()
    const renderingTime = endTime - startTime
    console.log(renderingTime)
    expect(renderingTime).toBeLessThan(50)
  })
})
