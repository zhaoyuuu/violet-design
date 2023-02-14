import classNames from 'classnames'
import React, {
  ReactNode,
  FC,
  createContext,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react'
import Transition from '../Transition/transition'
import Input, { InputSize } from '../Input/input'
import Option, { SelectOptionProps } from './option'
import Icon from '../Icon'
import useClickOutside from '../../hooks/useClickOutside'
import useDebounce from '../../hooks/useDebounce'

export interface SelectProps {
  /** 指定默认选中的条目 */
  defaultValue?: string | string[]
  /** 选择框默认文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否支持多选*/
  multiple?: boolean
  /** select input 的 name 属性 */
  name?: string
  /** 选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
  /** 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 */
  options: SelectOptionProps[]
  /** 选择框大小 */
  size?: InputSize
  /** 配置是否可搜索 */
  showSearch?: boolean
  /** 是否根据输入项进行筛选 */
  filterOption?:
    | boolean
    | ((inputValue: string, options: SelectOptionProps[]) => boolean)
  /** 文本框值变化时回调 */
  onSearch?: (value: string) => void
}

/** 下拉框 */
export interface IselectContext {
  onSelect?: (value: string, isSelected?: boolean) => void
  selectedValues: string[]
  multiple?: boolean
}

/** 定义全局的量 */
/** 当没有provide，则用括号里的默认值 */
export const SelectContext = createContext<IselectContext>({
  selectedValues: [],
})

/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 */

export const Select: FC<SelectProps> = props => {
  // 取出props
  const {
    defaultValue,
    placeholder,
    disabled,
    name,
    onChange,
    onVisibleChange,
    options,
    size,
    showSearch,
    filterOption,
    onSearch,
  } = props
  let { multiple } = props
  // 通过useRef定义个input变量，在input 元素上定义ref={input},这样通过input.current就可以获取到input Dom 元素
  const input = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLInputElement>(null)
  const containerWidth = useRef(0)
  // 控制 下拉框显示与否
  const [menuOpen, setOpen] = useState(false)
  // 控制 input框的value
  const [value, setValue] = useState(
    typeof defaultValue === 'string' ? defaultValue : ''
  )
  // 防抖
  const debouncedValue = useDebounce(value, 500)
  // 存储多选的已选值
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  )
  // 搜索功能下，再次点击input
  const [reClick, setReClick] = useState(false)
  let selectOptions: SelectOptionProps[]

  // 处理option的点击事件
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    // 非多选模式
    if (!multiple) {
      // 点击option后，下拉框隐藏
      setOpen(false)
      setValue(value)
      onVisibleChange && onVisibleChange(false)
    } else {
      setValue('')
    }
    // 多选模式
    let updatedValues = [value]
    if (multiple) {
      // 若当前option已选中，则从selecedValues中去掉该option；否则，将该value添加到selectedValues中
      updatedValues = isSelected
        ? selectedValues.filter(item => item !== value)
        : [...selectedValues, value]
      setSelectedValues(updatedValues)
    }
    onChange && onChange(value, updatedValues)
  }
  // 多选模式下，placeholder会一直显示，故做处理
  useEffect(() => {
    if (input.current) {
      // input.current.focus()
      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = ''
      } else if (placeholder) {
        input.current.placeholder = placeholder
      }
    }
  }, [selectedValues, multiple, placeholder])
  // 将当前input框的宽保存在containerWidth
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current =
        containerRef.current.getBoundingClientRect().width
    }
    // 接下来设置tag的line-height，使得其文字垂直居中
    const tag = document.querySelector(
      '.violetSelected__tags__tag'
    ) as HTMLElement
    const h = tag?.clientHeight - 4
    h && (tag.style.lineHeight = h + 'px')
    // 搜索功能仅对单选框开放
    showSearch && (multiple = false)
  })
  // 鼠标点击select框外面时，关闭下拉框
  // useClickOutside里，使用的是原生的 doucment.addEventListener 的方法添加，那么它是一个原生的 DOM事件，它的事件对象是原生的事件对象(比如这里的 MouseEvent)
  // 而React.MouseEvent （各种 react event 事件对象），都是 React 的事件，它并不是 DOM 原生的对象，和普通的 DOM 事件是不一样的
  useClickOutside(containerRef, () => {
    // 鼠标点击select框外面的处理函数
    setOpen(false)
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false)
    }
    if (showSearch && value !== defaultValue) {
      setValue(selectOptions[0]?.value ?? defaultValue)
    }
  })
  // 不带搜索框时，点击input框的处理函数
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // 当input框可用（!disabled），menuOpen变量取反
    if (!disabled) {
      setOpen(!menuOpen)
      // 当存在onVisibleChange，则执行(参数为当前menuOpen状态，由于useState缘故，此时menuOpen仍然为 没有执行setOpen(!menuOpen)的状态，故这里要取反)
      onVisibleChange && onVisibleChange(!menuOpen)
    }
  }
  // 带搜索框时，点击input框的处理函数
  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // 当input框可用（!disabled）且menuOpen为关闭，让menuOpen打开
    if (!disabled && !menuOpen) {
      setOpen(true)
      // 当存在onVisibleChange，则执行(参数为当前menuOpen状态，由于useState缘故，此时menuOpen仍然为 没有执行setOpen(!menuOpen)的状态，故这里要取反)
      onVisibleChange && onVisibleChange(true)
    }
    if (value !== defaultValue) {
      setReClick(true)
    }
  }
  // input框change的处理函数
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim()
    setValue(inputValue)
    onSearch && onSearch(inputValue)
    setReClick(false)
  }
  // 生成下拉框各选项
  const generateOptions = () => {
    // 根据是否带搜索功能，得到不同的options
    const reg = new RegExp('^' + debouncedValue)
    selectOptions =
      showSearch && filterOption && !reClick
        ? options.filter(item => reg.test(item?.label ?? item.value))
        : options
    // 在Select组件中对options进行遍历，并执行函数
    // 在这里，即对select 中的每一个option进行处理，生成li元素
    if (selectOptions.length) {
      return selectOptions.map(function (item, index) {
        return (
          <Option
            index={`select-${index}`}
            key={index}
            {...item}
            onSelect={handleOptionClick}
            selectedValues={selectedValues}
            multiple={multiple}
          ></Option>
        )
      })
    } else {
      return <Option disabled value={'暂无数据'}></Option>
    }
  }
  // 类名拼接
  const className = classNames('violetSelect', {
    'violetSelect--menuOpen': menuOpen,
    'violetSelect--disabled': disabled,
    'violetSelect--multiple': multiple,
  })

  return (
    // input上的图标的动画是css写的
    <div className={className} ref={containerRef}>
      <div className="violetSelect__input">
        {!showSearch && (
          <Input
            ref={input}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            name={name}
            readOnly
            icon="angle-down"
            size={size}
            onClick={handleClick}
          />
        )}
        {showSearch && (
          <Input
            ref={input}
            disabled={disabled}
            name={name}
            icon="angle-down"
            size={size}
            value={value}
            onChange={handleInputChange}
            onClick={handleSearchClick}
            autoComplete="off"
          />
        )}
      </div>
      <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
        <ul className="violetSelect__dropdown">{generateOptions()}</ul>
      </Transition>
      {multiple && (
        <div
          className="violetSelected__tags"
          style={{ maxWidth: containerWidth.current - 32 }}
        >
          {selectedValues.map((item, index) => {
            return (
              <span className="violetSelected__tags__tag" key={`tag-${index}`}>
                {item}
                <Icon
                  icon="times"
                  onClick={() => {
                    handleOptionClick(item, true)
                  }}
                />
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
Select.defaultProps = {
  name: 'violetSelect',
  placeholder: '请选择',
  filterOption: true,
  defaultValue: '',
}
export default Select
