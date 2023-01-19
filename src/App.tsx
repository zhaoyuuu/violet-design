import React from 'react'
import './App.scss'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className="App">
      <h1 className="App__title">Hello violetUI !</h1>
      <h2 className="App__subtitle">项目已经配置好，请往我身上添加组件吧！</h2>

      <hr />
      <Menu
        onSelect={index => console.log(index)}
        mode="vertical"
        style={{
          width: '200px',
        }}
      >
        <MenuItem index={0}>first link</MenuItem>
        <MenuItem index={1} disabled>
          second link
        </MenuItem>
        <MenuItem index={2}>third link</MenuItem>
      </Menu>
      <hr />
    </div>
  )
}

export default App
