import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Switch, { ThemeProps } from './switcher'

describe('Switch', () => {
  it('render correctly', () => {
    const { getByRole } = render(<Switch />)
    const switchBtn = getByRole('Switch')
    expect(switchBtn).toBeInTheDocument()
    expect(switchBtn).toHaveClass('violetSwitch')
    expect(switchBtn).toHaveClass('violetSwitch--primary')
    expect(switchBtn).not.toHaveClass('violetSwitch--small')
    expect(switchBtn).not.toHaveClass('violetSwitch--checked')
    expect(switchBtn).not.toHaveClass('violetSwitch--disabled')
  })

  it('render small size', () => {
    const { getByRole } = render(<Switch size="small" />)
    const switchBtn = getByRole('Switch')
    expect(switchBtn).toHaveClass('violetSwitch--small')
  })

  it('render checked', () => {
    const { getByRole } = render(<Switch checked />)
    const switchBtn = getByRole('Switch')
    expect(switchBtn).toHaveClass('violetSwitch--checked')
  })

  it('render disabled', () => {
    const { getByRole } = render(<Switch disabled />)
    const switchBtn = getByRole('Switch')
    expect(switchBtn).toHaveClass('violetSwitch--disabled')
  })

  it('render with different theme', () => {
    const theme: ThemeProps = 'danger'
    const { getByRole } = render(<Switch theme={theme} />)
    const switchBtn = getByRole('Switch')
    const className = `violetSwitch--${theme}`
    expect(switchBtn).toHaveClass(className)
  })

  it('render checkedChildren and unCheckedChildren', () => {
    const checkedChildren = 'On'
    const unCheckedChildren = 'Off'
    const { getByRole, getByText } = render(
      <Switch
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
      />
    )
    const switchBtn = getByRole('Switch')
    expect(getByText(unCheckedChildren)).toBeInTheDocument()
    fireEvent.click(switchBtn)
    expect(getByText(checkedChildren)).toBeInTheDocument()
  })

  it('onChange should be called correctly', () => {
    const onChange = jest.fn()
    const { getByRole } = render(<Switch onChange={onChange} />)
    const switchBtn = getByRole('Switch')
    expect(onChange).not.toHaveBeenCalled()
    fireEvent.click(switchBtn)
    expect(onChange).toHaveBeenCalledWith(true)
    fireEvent.click(switchBtn)
    expect(onChange).toHaveBeenCalledWith(false)
  })
})
