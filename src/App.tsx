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
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Input from './components/Input/Input'

function App() {
  return (
    <div className="App">
      <h1 className="App__title">Hello violetUI !</h1>
      <Switch disabled></Switch>
      <Input size="sm" />
      <Input size="lg" />
      {/* <Radio value="test">Test</Radio>

      <Radio value="test">Test</Radio>
      <Radio size="lg">large radio</Radio>
      <Radio disabled={true}>Disabled Test</Radio>
      <br />
      <RadioGroup>
        <Radio value={'1'}>1</Radio>
        <Radio value={'2'}>2</Radio>
        <Radio value={'3'}>3</Radio>
        <Radio value={'4'}>4</Radio>
      </RadioGroup> */}
      <br />
      <Button className="custom">Hello</Button>
      <Button btnType={ButtonType.Primary} disabled>
        disabled button
      </Button>
      <Button
        size={ButtonSize.Large}
        btnType={ButtonType.Primary}
        className="violetButton"
      >
        Large Primary
      </Button>
      <Button
        size={ButtonSize.Small}
        btnType={ButtonType.Danger}
        className="violetButton"
      >
        Small Danger
      </Button>
      <Button
        size={ButtonSize.Large}
        btnType={ButtonType.Link}
        href="http://www.baidu.com"
        className="violetButton"
      >
        Large Link
      </Button>
      <Button
        size={ButtonSize.Large}
        btnType={ButtonType.Link}
        disabled
        className="violetButton"
      >
        Large Link
      </Button>
    </div>
  )
}

export default App
