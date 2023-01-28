import React, { useState } from 'react'
import './App.scss'
import Radio from './components/Radio/radio'
import InputNumber from './components/InputNumber/inputNumber'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu/subMenu'
import Button from './components/Button/button'
import Icon from './components/Icon'
import Switch from './components/Switch'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'

function App() {
  const [value, setValue] = useState('1')
  const onChange = (val: string) => {
    setValue(val)
  }
  const onPressEnter = () => {
    alert('press enter !')
  }

  return (
    <div className="App">
      <h1 className="App__title">Hello violetUI !</h1>
      <hr />
      <Menu mode="vertical">
        <MenuItem>first link</MenuItem>
        <MenuItem>second link</MenuItem>
        <MenuItem disabled>third link</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
          <MenuItem>dropdown 3</MenuItem>
        </SubMenu>
      </Menu>
      <hr />
      <InputNumber
        value={value}
        onChange={onChange}
        step={2}
        max={10}
        min={-10}
        onPressEnter={onPressEnter}
      />
      <hr />
      <Icon icon="check" theme="primary"></Icon>
      <br />
      <Switch
        size="medium"
        theme="danger"
        checkedChildren="on"
        unCheckedChildren="off"
      ></Switch>
      <br />
      {/* <Tabs>
        <TabItem label="Tab 1">Content 1</TabItem>
        <TabItem label="Tab 2">Content 2</TabItem>
        <TabItem label="Tab 3">Content 3</TabItem>
      </Tabs> */}
      <br />
      <Tabs mode="vertical">
        <TabItem label="Tab 1">Content 1</TabItem>
        <TabItem label="Tab 2">Content 2</TabItem>
        <TabItem label="Tab 3">Content 3</TabItem>
      </Tabs>
    </div>
  )
}

export default App
