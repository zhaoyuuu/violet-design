import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import DatePicker from './DatePicker'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'

describe('rendering time test', () => {
  it('render in less than 50ms', () => {
    const defaultProps = {
      onChange: action('onChange'),
      locale: 'zh-cn',
      docsStyle: { height: '400px' },
    }
    const startTime = performance.now()
    const { container } = render(
      <>
        <DatePicker
          {...defaultProps}
          dateFormat={text('dateformat', 'YYYY/MM/DD')}
        />
      </>
    )
    const endTime = performance.now()
    const renderingTime = endTime - startTime
    console.log(renderingTime)
    expect(renderingTime).toBeLessThan(50)
  })
})
