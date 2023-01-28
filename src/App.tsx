import React, { useState } from 'react'
import './App.scss'
import Radio from './components/Radio/radio'
import RadioGroup from './components/Radio/radioGroup'
import InputNumber from './components/InputNumber/inputNumber'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu/subMenu'
import Button from './components/Button/button'

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
      <Radio value="test" >Test</Radio>
      <Radio disabled={true}>Disabled Test</Radio>
        <br/>
      <RadioGroup>
          <Radio>1</Radio>
          <Radio>2</Radio>
          <Radio>3</Radio>
      </RadioGroup>
        <br/>
      <Button type="primary">click me</Button>
      <Button></Button>
      <Button type="primary" className="violetButton">
        primary button
      </Button>
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
    </div>
  )
}

export default App
