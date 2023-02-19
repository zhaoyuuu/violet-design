import React from 'react'
import { render } from '@testing-library/react'
import Affix, { IAffixProps } from './affix'

describe('test Affix component', () => {
  it('should render affix correctly', () => {
    const wrapper = render(<Affix>affix</Affix>)
    expect(wrapper.getByText('affix')).toBeInTheDocument()
  })
})
