import React, { useState } from 'react'
import './App.scss'
import Radio from './components/Radio/radio'
import InputNumber from './components/InputNumber/inputNumber'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu/subMenu'
import Cascader from './components/Cascader/cascader'
import { Option } from './components/Cascader/cascader'

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
  const [cascaderValue, setCascaderValue] = useState<string[] | number[]>([
    '湖北省',
    '武汉市',
    '1037号',
    '华中科技大学',
  ])
  const onCascaderChange = (value: string[] | number[]) => {
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

      <Cascader
        value={cascaderValue}
        onChange={onCascaderChange}
        placeholder="请选择"
        options={options}
      />
    </div>
  )
}

export default App
