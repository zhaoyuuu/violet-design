export const DefaultSelectCode = `
<Select placeholder="请选择" options={[
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true }]} />`

export const MultipleSelectCode = `
<Select placeholder="多选框" multiple options={[
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true }]} />`

export const DisabledSelectCode = `
<Select placeholder="禁选框" disabled options={[
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true }]} />`

export const SizeSelectCode = `
const [size, setSize] = useState('md')
const handleSizeChange = (e: any) => {
  setSize(e.target.value)
}
const options = [
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true },
]
<RadioGroup type={'button'} value={size} onChange={handleSizeChange}>
  <Radio value={'lg'}>large</Radio>
  <Radio value={'md'}>middle</Radio>
  <Radio value={'sm'}>small</Radio>
</RadioGroup>
<br />
<br />
<Select placeholder="单选框" options={options} size={size} />
<Select
  placeholder="多选框"
  multiple
  options={options}
  size={size}
/>`

export const SearchSelectCode = `
<Select placeholder="单选框" options={[
  { value: 'a11' },
  { value: 'b12' },
  { value: 'c13' },
  { value: 'd14' }]} 
  showSearch/>
<Select
placeholder="多选框"
multiple
options={[
  { value: 'a11' },
  { value: 'b12' },
  { value: 'c13' },
  { value: 'd14' },
]}
showSearch
/>`

export const GroupSelectCode = `
<Select
  placeholder="请选择"
  showSearch
  options={[
    { label: '第一组', options: [{ value: 'a11' }, { value: 'a12' }] },
    { label: '第二组', options: [{ value: 'b11' }, { value: 'b12' }] },
    { label: '第三组', options: [{ value: 'c11' }, { value: 'c12' }] },
  ]}
/>`

export const LongRangeSearchSelectCode =
  `
import jsonp from 'fetch-jsonp'
import qs from 'qs'

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
` +
  '  jsonp(`https://suggest.taobao.com/sug?${str}`)' +
  `
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
      `

export const LinkageSelectCode = `
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
      `
