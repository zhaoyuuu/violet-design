import React from 'react'
import './App.scss'

import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu/subMenu'
import Button from './components/button'
function App() {
  return (
    <div className="App">
      <h1 className="App__title">Hello violetUI !</h1>
      
      <Button type="primary">click me</Button>
      <Button></Button>
      <Button type = "primary" className="violet-btn">primary button</Button>
      {/* <hr />
      <Menu onSelect={index => console.log(index)} defaultIndex="0">
        <MenuItem>first link</MenuItem>
        <MenuItem disabled>second link</MenuItem>

        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>

        <MenuItem>third link</MenuItem>
      </Menu> */}
    </div>
  )
}

export default App
