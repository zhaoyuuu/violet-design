import { render, screen } from '@testing-library/react'
import { TabItem } from './tabItem'

describe('TabItem component', () => {
  it('should render children correctly', () => {
    const children = 'Hello World'
    render(<TabItem>{children}</TabItem>)
    const element = screen.getByText(children)
    expect(element).toBeInTheDocument()
  })

  //   it('should not render when disabled is true', () => {
  //     const children = 'Hello World'
  //     render(<TabItem disabled>{children}</TabItem>)
  //     const element = screen.queryByText(children)
  //     expect(element).not.toBeInTheDocument()
  //   })
})
