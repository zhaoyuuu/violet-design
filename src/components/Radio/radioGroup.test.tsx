import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import RadioGroup from './radioGroup'
import Radio from './radio'

describe('RadioGroup', () => {
  test('Default RadioGroup', () => {
    const wrapper = render(
      <RadioGroup>
        <Radio value={'1'}>1</Radio>
        <Radio value={'2'}>2</Radio>
        <Radio value={'3'}>3</Radio>
      </RadioGroup>
    )
    const element = wrapper.getByText('1')
    if (element && element.parentElement) {
      expect(element.parentElement.parentElement).toHaveClass('violetRadio')
    }
  })
})
