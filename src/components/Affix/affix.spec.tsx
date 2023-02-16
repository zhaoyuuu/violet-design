import React from 'react'
import { render, screen } from '@testing-library/react'
// import { useInView } from 'react-intersection-observer'
import { Affix } from './affix'

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}))

describe('Affix component', () => {
  //   const childrenText = 'Hello World'
  //   const offsetTop = 100

  //   beforeEach(() => {
  //     // mock useInView hook
  //     jest.spyOn(React, 'useRef').mockReturnValueOnce({
  //       current: {
  //         inView: false,
  //         entry: null,
  //       },
  //     })
  //   })

  //   afterEach(() => {
  //     jest.clearAllMocks()
  //   })

  it('renders children', () => {
    render(<Affix>Child</Affix>)

    expect(screen.getByText('Child')).toBeInTheDocument()
  })

  it('does not initially render affixed', () => {
    render(<Affix>Child</Affix>)

    expect(screen.getByText('Child')).not.toHaveStyle('position: fixed')
  })

  //   it('affixes element when scrolled below offsetTop', () => {
  //     render(
  //       <div style={{ height: '1000px' }}>
  //         <Affix offsetTop={100}>Child</Affix>
  //       </div>
  //     )

  //     expect(screen.getByText('Child')).not.toHaveStyle('position: fixed')

  //     window.scrollTo(0, 200)

  //     expect(screen.getByText('Child')).toHaveStyle('position: fixed')
  //   })

  it('should not be affixed if the element is not scrolled beyond the offsetTop value', () => {
    render(<Affix offsetTop={200}>Affixed Element</Affix>)

    const affixedElement = screen.getByText('Affixed Element')
    expect(affixedElement).not.toHaveStyle({ position: 'fixed', top: '200px' })
  })
})
