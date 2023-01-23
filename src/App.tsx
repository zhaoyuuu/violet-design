import React, { useState } from 'react'
import './App.scss'


import Radio from './components/Radio/radio'
import InputNumber from './components/InputNumber/inputNumber'

import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu/subMenu'
import Button from './components/button'
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

      
      <Button type="primary">click me</Button>
      <Button></Button>
      <Button type = "primary" className="violet-btn">primary button</Button>
      {/* <hr />
      <Menu onSelect={index => console.log(index)} defaultIndex="0">
        <MenuItem>first link</MenuItem>
        <MenuItem disabled>second link</MenuItem>

      <Radio value="test">Test</Radio>

      <hr />


      <Menu>
        <MenuItem>first link</MenuItem>
        <MenuItem>second link</MenuItem>
        <MenuItem disabled>third link</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
          <MenuItem>dropdown 3</MenuItem>
        </SubMenu>


        <MenuItem>third link</MenuItem>
      </Menu> */}

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

    </div>
  )
}

export default App
