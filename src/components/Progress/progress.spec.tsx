import { render, screen } from '@testing-library/react'
import { Progress, ProgressProps } from './progress'

describe('Progress', () => {
  const defaultProps: ProgressProps = {
    percent: 0,
    showInfo: true,
  }

  //   it('renders line progress correctly', () => {
  //     render(<Progress {...defaultProps} />)
  //     const progress = screen.getByRole('progressbar')
  //     expect(progress).toBeInTheDocument()
  //   })

  //   it('renders circle progress correctly', () => {
  //     render(<Progress {...defaultProps} type="circle" />)
  //     const progress = screen.getByRole('progressbar')
  //     expect(progress).toBeInTheDocument()
  //   })

  it('renders correct percent text', () => {
    render(<Progress {...defaultProps} percent={50} />)
    const progress = screen.getByText('50%')
    expect(progress).toBeInTheDocument()
  })

  //   it('renders success status correctly', () => {
  //     render(<Progress {...defaultProps} success />)
  //     const successIcon = screen.getByLabelText('success')
  //     expect(successIcon).toBeInTheDocument()
  //   })

  //   it('renders exception status correctly', () => {
  //     render(<Progress {...defaultProps} status="exception" />)
  //     const exceptionIcon = screen.getByLabelText('exception')
  //     expect(exceptionIcon).toBeInTheDocument()
  //   })

  //   it('renders active status correctly', () => {
  //     render(<Progress {...defaultProps} status="active" />)
  //     const activeIcon = screen.getByLabelText('active')
  //     expect(activeIcon).toBeInTheDocument()
  //   })
})
