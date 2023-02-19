import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Transition from './transition'

describe('test transition', () => {
  it('before transition', () => {
    const wrapper = render(
      <>
        <Transition in={false} timeout={300} animation="zoom-in-top">
          <div>I am transition</div>
        </Transition>
      </>
    )
    const { queryByText } = wrapper
    const divEl = queryByText('I am transition')
    expect(divEl).not.toBeInTheDocument()
  })
  it('transition', async () => {
    const wrapper = render(
      <>
        <Transition in={true} timeout={300} animation="zoom-in-top">
          <div>I am transition</div>
        </Transition>
      </>
    )
    const { queryByText } = wrapper
    const divEl = queryByText('I am transition')
    expect(divEl).toBeInTheDocument()
    await waitFor(
      () => {
        expect(divEl).toHaveClass('zoom-in-top-appear-active')
      },
      { timeout: 100 }
    )
    await waitFor(
      () => {
        expect(divEl).toHaveClass('zoom-in-top-appear-done')
      },
      { timeout: 300 }
    )
  })
})
