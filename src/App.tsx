import React, { useState } from 'react'
import Radio from './components/Radio/radio'
import InputNumber from './components/InputNumber/inputNumber'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu/subMenu'
import Button, {ButtonType, ButtonSize} from './components/Button/button'
import Input from './components/Input/Input'

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
      <Input size='sm'/>
      <Input size='lg'/>
      <Radio value="test">Test</Radio>
      <Button className='custom'>Hello</Button>
      <Button btnType={ButtonType.Primary} disabled>disabled button</Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary} className="violetButton">
        Large Primary
      </Button>
      <Button size={ButtonSize.Small} btnType={ButtonType.Danger} className="violetButton">
        Small Danger
      </Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Link} href="http://www.baidu.com" className="violetButton">
        Large Link
      </Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Link} disabled className="violetButton">
        Large Link
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
        disabled
      />
      <hr />
    </div>
  )
}

export default App
