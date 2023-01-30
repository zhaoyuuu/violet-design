import React, { useState } from 'react'
import Radio from './components/Radio/radio'
import RadioGroup from './components/Radio/radioGroup'
import InputNumber from './components/InputNumber/inputNumber'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu/subMenu'
import Cascader from './components/Cascader/cascader'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Input from './components/Input/Input'

interface Option {
  value: string | number
  label: React.ReactNode
  disabled?: boolean
  children?: Option[]
}

function App() {
  // InputNumber
  //#region
  const [value, setValue] = useState('1')
  const onChange = (val: string) => {
    setValue(val)
  }
  const onPressEnter = () => {
    alert('press enter !')
  }
  //#endregion

  // Cascader
  //#region
  const [cascaderValue, setCascaderValue] = useState<React.ReactNode[]>([])
  const onCascaderChange = (value: React.ReactNode[]) => {
    setCascaderValue(value)
  }
  const options: Option[] = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ]

  //#endregion

  return (
    <div className="App">
      <h1 className="App__title">Hello violetUI !</h1>
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
      <Button btnType="primary" disabled>
        disabled button
      </Button>
      <Button
        size='lg'
        btnType="primary"
        className="violetButton"
      >
        Large Primary
      </Button>
      <Button
        size='sm'
        btnType="danger"
        className="violetButton"
      >
        Small Danger
      </Button>
      <Button
        size='lg'
        btnType="link"
        href="http://www.baidu.com"
        className="violetButton"
      >
        Large Link
      </Button>
      <Button
        size='lg'
        btnType="link"
        disabled
        className="violetButton"
      >
        Large Link
      </Button>
      <hr/>
      {/* <hr />
      <Menu mode="vertical">
        <MenuItem>first link</MenuItem>
        <MenuItem>second link</MenuItem>
        <MenuItem disabled>third link</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
          <MenuItem>dropdown 3</MenuItem>
        </SubMenu>
      </Menu> */}
      {/* <hr />
      <InputNumber
        value={value}
        onChange={onChange}
        step={2}
        max={10}
        min={-10}
        onPressEnter={onPressEnter}
      /> */}
      <hr />

      <Cascader
        value={cascaderValue}
        onChange={onCascaderChange}
        placeholder="请选择"
        options={options}
        // disabled={true}
        // changeOnSelect={true}
        // status="success"
      />
    </div>
  )
}

export default App
