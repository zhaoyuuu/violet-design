import React, { useState } from 'react'
import Radio from './components/Radio/radio'
import RadioGroup from './components/Radio/radioGroup'
import InputNumber from './components/InputNumber/inputNumber'
<<<<<<< HEAD
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu/subMenu'
// import Icon from './components/Icon'
=======
import Menu from './components/Menu'
>>>>>>> cfa06bb30f3916d5fc293d8e5c43f2dfe36bfbaa
import Switch from './components/Switcher'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'
import Cascader from './components/Cascader/cascader'
import Button from './components/Button/button'
import Input from './components/Input/input'

function App() {
  return (
    <div className="App">
      <h1 className="App__title">Hello violetUI !</h1>
<<<<<<< HEAD
      <Tabs mode="vertical">
        <TabItem label="选项卡一">this is content one</TabItem>
        <TabItem label="选项卡二">this is content two</TabItem>
        <TabItem label="用户管理">this is content three</TabItem>
      </Tabs>
=======

>>>>>>> cfa06bb30f3916d5fc293d8e5c43f2dfe36bfbaa
      <Switch disabled></Switch>
      <Input size="sm" />
      <Input size="lg" />
      <br />
      <Button className="custom">Hello</Button>
      <Button btnType="primary" disabled>
        disabled button
      </Button>
      <Button size="lg" btnType="primary" className="violetButton">
        Large Primary
      </Button>
      <Button size="sm" btnType="danger" className="violetButton">
        Small Danger
      </Button>
      <Button
        size="lg"
        btnType="link"
        href="http://www.baidu.com"
        className="violetButton"
      >
        Large Link
      </Button>
      <Button size="lg" btnType="link" disabled className="violetButton">
        Large Link
      </Button>
      <Menu mode="vertical">
        <Menu.Item>active</Menu.Item>
        <Menu.Item disabled>disabled</Menu.Item>
        <Menu.Item>xyz</Menu.Item>
        <Menu.SubMenu title="dropdown">
          <Menu.Item>drop1</Menu.Item>
          <Menu.Item>drop2</Menu.Item>
          <Menu.Item>drop3</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  )
}

export default App
