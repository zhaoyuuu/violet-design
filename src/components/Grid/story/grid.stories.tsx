import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import Row from '../grid/row'
import Col from '../grid/col'
import './grid.scss'

export default {
  title: '组件/布局/grid 栅格',
  id: 'grid',
  Row,
  Col,
} as ComponentMeta<React.ComponentType<{}>>

export const Default: ComponentStory<React.ComponentType<{}>> = () => (
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

Default.storyName = '基础栅格'

export const BDefault: ComponentStory<React.ComponentType<{}>> = () => (
  <>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8} offset={8}>
        col-8
      </Col>
    </Row>
    <Row>
      <Col span={6} offset={6}>
        col-6 col-offset-6
      </Col>
      <Col span={6} offset={6}>
        col-6 col-offset-6
      </Col>
    </Row>
    <Row>
      <Col span={12} offset={6}>
        col-12 col-offset-6
      </Col>
    </Row>
  </>
)

BDefault.storyName = '左右偏移'
