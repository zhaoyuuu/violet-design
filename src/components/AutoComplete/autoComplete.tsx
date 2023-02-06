import React, {
  useRef,
  useEffect,
  ChangeEvent,
  useState,
  ReactElement,
  KeyboardEvent,
} from 'react'
import cn from 'classnames'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition/transition'
import Icon from '../Icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface IAutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSeggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

/**
 * > 通过鼠标或键盘，输入范围内的数值。
 *
 * ### 何时使用
 * 当需要获取标准数值时。
 */
export const AutoComplete: React.FC<IAutoCompleteProps> = ({
  fetchSeggestions,
  onSelect,
  value,
  renderOption,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [isLoading, setLoading] = useState(false)
  const debouncedValue = useDebounce(inputValue, 500)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const autoComplete = useRef(null)

  // click outside
  useClickOutside(autoComplete, () => setSuggestions([]))

  // 生成suggestion（防抖）
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const res = fetchSeggestions(debouncedValue)
      if (res instanceof Promise) {
        setLoading(true)
        res.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(res)
      }
    } else {
      setSuggestions([])
    }
    // 键盘事件初始化
    setHighlightIndex(-1)
  }, [debouncedValue])

  // 键盘事件
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) index = suggestions.length - 1
    console.log(index)
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setSuggestions([])
        break
      default:
        break
    }
  }

  // onChange
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim()
    setInputValue(value)
    setSuggestions([])
    triggerSearch.current = true
  }

  // onSelect
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) onSelect(item)
    triggerSearch.current = false
  }

  // 自定义生成选项
  const renderItem = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul className="violetAutoComplete__dropdown">
        {suggestions.map((item, index) => (
          <li
            key={index}
            onClick={() => handleSelect(item)}
            className={cn('violetAutoComplete__dropdown__item', {
              'violetAutoComplete__dropdown__item--highlight':
                index === highlightIndex,
            })}
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="violetAutoComplete" ref={autoComplete}>
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handleKeyDown}
      />
      {/* suggestions */}
      {isLoading && (
        <div className="violetAutoComplete__loading">
          <Icon icon="spinner" spin />
        </div>
      )}
      <Transition
        in={suggestions.length > 0}
        animation="zoom-in-top"
        timeout={300}
      >
        {generateDropdown()}
      </Transition>
    </div>
  )
}

export default AutoComplete
