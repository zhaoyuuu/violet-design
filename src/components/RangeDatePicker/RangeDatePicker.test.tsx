import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import RangeDatePicker from './RangeDatePicker'
import dayjs from 'dayjs'

describe('randering time test', () => {
  it('render in less than 150ms', () => {
    const startTime = performance.now()
    const { container } = render(
      <>
        <RangeDatePicker
          initialStartDate={dayjs().subtract(7, 'day')}
          initialEndDate={dayjs()}
        />
      </>
    )
    const endTime = performance.now()
    const renderingTime = endTime - startTime
    console.log(renderingTime)
    expect(renderingTime).toBeLessThan(150)
  })
})
