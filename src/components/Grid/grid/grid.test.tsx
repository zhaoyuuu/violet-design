import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Row from './row'
import Col from './col'

it('render in less than 50ms', () => {
  const startTime = performance.now()
  const grid = (
    <>
      <Row>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
      <Row>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
        <Col span={6}>col-6</Col>
      </Row>
    </>
  )
  const { container } = render(grid)
  const endTime = performance.now()
  const renderingTime = endTime - startTime
  console.log(renderingTime)
  expect(renderingTime).toBeLessThan(50)
})
