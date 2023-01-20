import React from 'react'
import './App.scss'
import Radio from "./components/Radio/radio"

function App() {

  return (
    <div className="App">
      <h1 className="App__title">Hello violetUI !</h1>
      <h2 className="App__subtitle">项目已经配置好，请往我身上添加组件吧！</h2>
      <Radio value="test">Test</Radio>
    </div>
  )
}

export default App
