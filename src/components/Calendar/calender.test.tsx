import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Calendar from './Calendar'

describe('rendering time test', () => {
  it('render in less than 200ms', () => {
    const startTime = performance.now()
    const { container } = render(<Calendar />)
    const endTime = performance.now()
    const renderingTime = endTime - startTime
    console.log(renderingTime)
    expect(renderingTime).toBeLessThan(200)
  })
})
