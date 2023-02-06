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

export interface IAutoCompleteProps
  extends Omit<InputProps, 'onSelect' | 'onChange'> {
  /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  /** 文本框发生改变的时候触发的事件*/
  onChange?: (value: string) => void
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void
  /** 支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement
  /** 自定义类名 */
  className?: string
}

/**
 * > 输入框自动完成功能。
 *
 * ### 何时使用
 * - 需要一个输入框而不是选择器。
 * - 需要输入建议/辅助提示。
 *
 * 和 `Select` 的区别是：
 *
 * - `AutoComplete` 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助输入。
 * - `Select` 是在限定的可选项中进行选择，关键词是选择。
 */
export const AutoComplete: React.FC<IAutoCompleteProps> = ({
  fetchSuggestions,
  onChange,
  onSelect,
  value,
  renderOption,
  className,
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
      const res = fetchSuggestions(debouncedValue)
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
    console.log(value)
    setInputValue(value)
    if (onChange) {
      onChange(value)
    }
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
    <div className={cn('violetAutoComplete', className)} ref={autoComplete}>
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
