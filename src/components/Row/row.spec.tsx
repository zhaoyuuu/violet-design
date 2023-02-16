import React from 'react'
import { render, screen } from '@testing-library/react'
import Row from './row'

describe('Row', () => {
  it('renders children', () => {
    render(
      <Row>
        <span>test</span>
      </Row>
    )
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  //   it('applies justify and align styles', () => {
  //     render(
  //       <Row justify="start" align="top">
  //         <span>test</span>
  //       </Row>
  //     )
  //     const row = screen.getByRole('row')
  //     expect(row).toHaveStyle('justify-content: flex-start')
  //     expect(row).toHaveStyle('align-items: flex-start')
  //   })

  //   it('applies default styles when justify and align are not specified', () => {
  //     render(
  //       <Row>
  //         <span>test</span>
  //       </Row>
  //     )
  //     const row = screen.getByRole('row')
  //     expect(row).toHaveStyle('justify-content: flex-start')
  //     expect(row).toHaveStyle('align-items: stretch')
  //   })
})
