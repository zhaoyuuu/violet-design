import React, { useState } from 'react'
import { ComponentMeta } from '@storybook/react'
import jsonp from 'fetch-jsonp'
import qs from 'qs'
import Select from './select'
import SelectProps from './selectProps'
import {
  DefaultSelectCode,
  MultipleSelectCode,
  DisabledSelectCode,
  SizeSelectCode,
  SearchSelectCode,
  GroupSelectCode,
  LongRangeSearchSelectCode,
  LinkageSelectCode,
} from './selectStories.code'
import RadioComponent from '../Radio'
const { Radio, RadioGroup } = RadioComponent
export default {
  title: '组件/数据录入/Select 选择器',
  component: Select,
  id: 'Select',
  // 让整个story包在width:350px的div内
  decorators: [
    Story => (
      <div style={{ width: '350px', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Select>
const options = [
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true },
]
export const DefaultSelect = (args: any) => (
  <Select {...args} placeholder="请选择" options={options} />
)
DefaultSelect.storyName = '默认的选择器'
DefaultSelect.parameters = {
  docs: {
    source: {
      code: DefaultSelectCode,
    },
    description: {
      story: `点击选择器框，进行单选`,
    },
  },
}

export const MultipleSelect = (args: any) => (
  <Select {...args} placeholder="多选框" multiple options={options} />
)
MultipleSelect.storyName = '支持多选的选择器'
MultipleSelect.parameters = {
  docs: {
    source: {
      code: MultipleSelectCode,
    },
    description: {
      story: `通过设置multiple参数，实现选择器的多选`,
    },
  },
}

export const DisabledSelect = (args: any) => (
  <Select {...args} placeholder="禁选框" disabled options={options} />
)
DisabledSelect.storyName = '被禁用的选择器'
DisabledSelect.parameters = {
  docs: {
    source: {
      code: DisabledSelectCode,
    },
    description: {
      story: `通过设置disabled参数，实现选择器的禁用`,
    },
  },
}

export const SizeSelect = (args: any) => {
  const [size, setSize] = useState('md')
  const handleSizeChange = (e: any) => {
    const newSize = e.target.parentNode.children[0].value
    setSize(newSize === size ? 'md' : newSize)
  }

  return (
    <>
      <RadioGroup type={'button'} value={size} onChange={handleSizeChange}>
        <Radio value={'lg'}>large</Radio>
        <Radio value={'md'}>middle</Radio>
        <Radio value={'sm'}>small</Radio>
      </RadioGroup>
      <br />
      <br />
      <Select {...args} placeholder="单选框" options={options} size={size} />
      <Select
        {...args}
        placeholder="多选框"
        multiple
        options={options}
        size={size}
      />
    </>
  )
}
SizeSelect.storyName = '三种大小的选择器'
SizeSelect.parameters = {
  docs: {
    source: {
      code: SizeSelectCode,
    },
    description: {
      story: `引入radio组件，通过点击单选按钮，实现选择器的大小切换`,
    },
  },
}

export const SearchSelect = (args: any) => (
  <>
    <Select
      {...args}
      placeholder="单选框"
      options={[
        { value: '南京' },
        { value: '武汉' },
        { value: '长春' },
        { value: '长沙' },
      ]}
      showSearch
    />
    <Select
      {...args}
      placeholder="多选框"
      multiple
      options={[
        { value: '南京' },
        { value: '武汉' },
        { value: '长春' },
        { value: '长沙' },
      ]}
      showSearch
    />
  </>
)
SearchSelect.storyName = '可搜索的选择器'
SearchSelect.parameters = {
  docs: {
    source: {
      code: SearchSelectCode,
    },
    description: {
      story: `通过设置showSearch参数，实现选择器的搜索`,
    },
  },
}

export const GroupSelect = (args: any) => (
  <Select
    {...args}
    placeholder="请选择"
    showSearch
    options={[
      { label: '第一组', options: [{ value: 'a11' }, { value: 'a12' }] },
      { label: '第二组', options: [{ value: 'b11' }, { value: 'b12' }] },
      { label: '第三组', options: [{ value: 'c11' }, { value: 'c12' }] },
    ]}
  />
)
GroupSelect.storyName = '分组的选择器'
GroupSelect.parameters = {
  docs: {
    source: {
      code: GroupSelectCode,
    },
    description: {
      story: `通过传入{ label: string, options: { label: string, value: string }[] }[]形式的options参数，实现选择器的分组`,
    },
  },
}

export const LongRangeSearchSelect = (args: any) => {
  let timeout: ReturnType<typeof setTimeout> | null
  let currentValue: string
  const [data, setData] = useState<SelectProps['options']>([])

  const fetch = (value: string, callback: Function) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    currentValue = value

    const fake = () => {
      const str = qs.stringify({
        code: 'utf-8',
        q: value,
      })
      jsonp(`https://suggest.taobao.com/sug?${str}`)
        .then((response: any) => response.json())
        .then((d: any) => {
          if (currentValue === value) {
            const { result } = d
            const data = result.map((item: any) => ({
              value: item[0],
              text: item[0],
            }))
            callback(data)
          }
        })
    }

    timeout = setTimeout(fake, 300)
  }
  const handleSearch = (newValue: string) => {
    if (newValue) {
      fetch(newValue, setData)
    } else {
      setData([])
    }
  }
  return (
    <Select
      showSearch
      placeholder="请选择"
      filterOption={false}
      onSearch={handleSearch}
      options={(data || []).map((d: any) => ({
        value: d.value,
        label: d.label,
      }))}
    />
  )
}
LongRangeSearchSelect.storyName = '远程搜索的选择器'

LongRangeSearchSelect.parameters = {
  docs: {
    source: {
      code: LongRangeSearchSelectCode,
    },
    description: {
      story: `通过设置showSearch参数，并传入对应的onSearch函数，向后端发起请求获得数据，实现选择器的远程搜索`,
    },
  },
}

export const LinkageSelect = (args: any) => {
  const provinceData = ['Zhejiang', 'Jiangsu']
  const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
  }
  type CityName = keyof typeof cityData
  const [cities, setCities] = useState(cityData[provinceData[0] as CityName])
  const [secondCity, setSecondCity] = useState(
    cityData[provinceData[0] as CityName][0]
  )

  const handleProvinceChange = (value: CityName) => {
    setCities(cityData[value])
    setSecondCity(cityData[value][0])
  }

  const onSecondCityChange = (value: CityName) => {
    setSecondCity(value)
  }
  return (
    <>
      <Select
        defaultValue={provinceData[0]}
        onChange={handleProvinceChange}
        style={{ width: 130, height: 40, display: 'inline-Block' }}
        options={provinceData.map(province => ({
          label: province,
          value: province,
        }))}
      />
      <Select
        value={secondCity}
        style={{ width: 130, height: 40, display: 'inline-Block' }}
        onChange={onSecondCityChange}
        options={cities.map(city => ({ label: city, value: city }))}
      />
    </>
  )
}
LinkageSelect.storyName = '多级联动的选择器'
LinkageSelect.parameters = {
  docs: {
    source: {
      code: LinkageSelectCode,
    },
    description: {
      story: `通过设置相应的onChange函数和value参数，实现选择器的联动`,
    },
  },
}
