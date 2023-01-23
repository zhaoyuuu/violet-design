import React, { useState } from 'react'
import './App.scss'
import Radio from './components/Radio/radio'
import InputNumber from './components/InputNumber/inputNumber'

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
      <Radio value="test">Test</Radio>

      <hr />

      <InputNumber
        value={value}
        onChange={onChange}
        step={2}
        max={10}
        min={-10}
        onPressEnter={onPressEnter}
      />
    </div>
  )
}

export default App
