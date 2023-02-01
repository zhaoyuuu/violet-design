import React, { useState } from 'react'
import Radio from './components/Radio/radio'
import RadioGroup from './components/Radio/radioGroup'
import InputNumber from './components/InputNumber/inputNumber'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu/subMenu'
import Icon from './components/Icon'
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
    </div>
  )
}

export default App
