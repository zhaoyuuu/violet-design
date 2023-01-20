import React from 'react'
import './App.scss'
import Radio from "./components/Radio/radio"
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu/subMenu'
import Button from './components/Button/button'

function App() {
  return (
    <div className="App">
      <h1 className="App__title">Hello violetUI !</h1>
      <h2 className="App__subtitle">项目已经配置好，请往我身上添加组件吧！</h2>
      <Radio value="test">Test</Radio>

      <hr />
      <Menu onSelect={index => console.log(index)} defaultIndex="0">
        <MenuItem>first link</MenuItem>
        <MenuItem disabled>second link</MenuItem>

        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>

        <MenuItem>third link</MenuItem>
      </Menu>
      <Button btnType="primary" size="lg">primary按钮</Button>
      <Button btnType="danger" size="sm" disabled>disabled按钮</Button>
      <Button btnType="default">default按钮</Button>
      <Button btnType="link" href="https://coding.imooc.com/class/chapter/428.html#Anchor" target="_blank">普通链接</Button>
      <Button btnType="link" href="https://coding.imooc.com/class/chapter/428.html#Anchor" disabled={true}>disabled链接</Button>
    </div>
  )
}

export default App
