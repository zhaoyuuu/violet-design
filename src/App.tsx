import React, { useState } from 'react'
import './App.scss'
import Radio from './components/Radio/radio'
import RadioGroup from './components/Radio/radioGroup'
import InputNumber from './components/InputNumber/inputNumber'
import Menu from './components/Menu'
import Switch from './components/Switcher'
import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'
import Cascader from './components/Cascader'
import Button from './components/Button/button'
import Input from './components/Input/input'
import Affix from './components/Affix'
import AutoComplete, {
  DataSourceType,
} from './components/AutoComplete/autoComplete'

interface LakerPlayerProps {
  value: string
  number: number
}

function App() {
  const lakers = [
    'bradley',
    'pope',
    'caruso',
    'cook',
    'cousins',
    'james',
    'AD',
    'green',
    'howard',
    'kuzma',
    'McGee',
    'rando',
  ]
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ]
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter(p => p.value.includes(query))
  }
  // const handleFetch = (query: string) => {
  //   return fetch(`https://api.github.com/search/users?q=${query}`)
  //     .then(res => res.json())
  //     .then(({ items }) => {
  //       return items
  //         .slice(0, 10)
  //         .map((item: any) => ({ value: item.login, ...item }))
  //     })
  // }
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        <h2>name: {itemWithNumber.value}</h2>
        <p>number: {itemWithNumber.number}</p>
      </>
    )
  }

  return (
    <div className="App">
      <h1 className="App__title">Hello violetUI !</h1>

      <Affix offsetTop={40}>
        <Button btnType="primary">affix button</Button>
      </Affix>

      {/* <Cascader
        value={value}
        onChange={onChange}
        placeholder="请选择"
        options={options}
        // changeOnSelect
      /> */}

      <Switch disabled></Switch>
      <Input size="sm" icon="search" />
      <Input size="lg" append=".com" />
      <Input size="sm" prepend="https://" />

      <Radio value="test">Test</Radio>
      <Radio disabled={true}>Disabled Test</Radio>
      <br />
      <RadioGroup>
        <Radio value={'1'}>1</Radio>
        <Radio value={'2'}>2</Radio>
        <Radio value={'3'}>3</Radio>
        <Radio value={'4'}>4</Radio>
      </RadioGroup>
      <br />
      <Button className="custom">Hello</Button>
      <Button btnType="primary" disabled>
        disabled button
      </Button>
      <Button size="lg" btnType="primary" className="violetButton">
        Large Primary
      </Button>
      <Button size="sm" btnType="danger" className="violetButton">
        Small Danger
      </Button>
      <Button
        size="lg"
        btnType="link"
        href="http://www.baidu.com"
        className="violetButton"
      >
        Large Link
      </Button>
      <Button size="lg" btnType="link" disabled className="violetButton">
        Large Link
      </Button>

      <Menu>
        <Menu.Item>active</Menu.Item>
        <Menu.Item disabled>disabled</Menu.Item>
        <Menu.Item>xyz</Menu.Item>
        <Menu.SubMenu title="dropdown">
          <Menu.Item>drop1</Menu.Item>
          <Menu.Item>drop2</Menu.Item>
          <Menu.Item>drop3</Menu.Item>
        </Menu.SubMenu>
      </Menu>

      <AutoComplete
        fetchSuggestions={handleFetch}
        // renderOption={renderOption}
      />
    </div>
  )
}

export default App
