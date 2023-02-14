// 入口文件

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
// 样式
import './styles/index.scss'
console.log('lint---')

export { default as Affix } from './components/Affix'
export { default as AutoComplete } from './components/AutoComplete'
export { default as Button } from './components/Button'
export { default as Cascader } from './components/Cascader'
export { default as Form } from './components/Form'
export { default as Icon } from './components/Icon'
export { default as Input } from './components/Input'
export { default as InputNumber } from './components/InputNumber'
export { default as Menu } from './components/Menu'
export { default as Progress } from './components/Progress'
export { default as RadioGroup } from './components/Radio'
export { default as Radio } from './components/Radio'
export { default as Select } from './components/Select'
export { default as Switcher } from './components/Switcher'
export { default as Tabs } from './components/Tabs'
export { default as Transition } from './components/Transition'
export { default as CheckBox } from './components/CheckBox'
export { default as Row } from './components/Row'
