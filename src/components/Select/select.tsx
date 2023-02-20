import classNames from 'classnames'
import React, { FC, useState, useRef, useEffect, ChangeEvent } from 'react'
import Transition from '../Transition/transition'
import Input from '../Input/input'
import Option, { SelectOptionProps } from './option'
import Icon from '../Icon'
import useClickOutside from '../../hooks/useClickOutside'
import useDebounce from '../../hooks/useDebounce'
import useNotFirstUpdate from '../../hooks/useNotFirstUpdate'
import Optgroup from './optGroup'
import SelectProps from './selectProps'
/**
 * 下拉选择器。
 *
 * ###何时使用
 * - 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * - 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。
 */
export const Select: FC<SelectProps> = props => {
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
    value,
    style,
    multiple,
  } = props
  // 通过useRef定义个input变量，在input 元素上定义ref={input},这样通过input.current就可以获取到input Dom 元素
  const input = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLInputElement>(null)
  const containerWidth = useRef(0)
  // 控制 下拉框显示与否
  const [menuOpen, setOpen] = useState(false)
  // 控制 input框的value
  const [inputValue, setInputValue] = useState(
    value ? value : typeof defaultValue === 'string' ? defaultValue : ''
  )
  // 防抖
  const debouncedValue = useDebounce(inputValue, 300)
  // 存储多选的已选值
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  )
  // 搜索功能下，再次点击input
  const [reClick, setReClick] = useState(false)
  let selectOptions:
    | SelectOptionProps[]
    | { label: string; options: SelectOptionProps[] }[]
  // 处理option的点击事件
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    // 非多选模式
    if (!multiple) {
      // 点击option后，下拉框隐藏
      setOpen(false)
      setInputValue(value)
      onVisibleChange && onVisibleChange(false)
      onChange && onChange(value)
    } else {
      setInputValue('')
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
    if (showSearch && multiple) {
      // 改变光标位置
      const tags = document.querySelectorAll(
        '.violetSelected__tags__tag'
      ) as NodeListOf<HTMLSpanElement>
      let totalWidth = 4
      for (let i = 0; i < tags.length; i++) {
        totalWidth += tags[i].offsetWidth + 6
      }
      input.current && (input.current.style.paddingLeft = totalWidth + 'px')
    }
  })
  // 第一遍渲染不更新(避免无value传过来的框显示异常)
  useNotFirstUpdate(value, () => {
    setInputValue(value as string | string[])
  })
  // 鼠标点击select框外面时，关闭下拉框
  useClickOutside(containerRef, () => {
    setOpen(false)
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false)
    }
    if (showSearch && inputValue !== (value || defaultValue) && !reClick) {
      if ('options' in selectOptions[0]) {
        setInputValue(
          selectOptions[0].options[0]?.value ?? value ?? defaultValue
        )
      } else {
        setInputValue(selectOptions[0]?.value ?? value ?? defaultValue)
      }
    }
  })
  // 点击input框的处理函数
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!showSearch) {
      // 当input框可用（!disabled），menuOpen变量取反
      if (!disabled) {
        setOpen(!menuOpen)
        // 当存在onVisibleChange，则执行(参数为当前menuOpen状态，由于useState缘故，此时menuOpen仍然为 没有执行setOpen(!menuOpen)的状态，故这里要取反)
        onVisibleChange && onVisibleChange(!menuOpen)
      }
    } else {
      // 当input框可用（!disabled）且menuOpen为关闭，让menuOpen打开
      if (!disabled && !menuOpen) {
        setOpen(true)
        onVisibleChange && onVisibleChange(true)
      }
      inputValue !== defaultValue && setReClick(true)
    }
  }
  // input搜索框change的处理函数
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim()
    setInputValue(inputValue)
    onSearch && onSearch(inputValue)
    setReClick(false)
  }
  // 生成下拉框各选项
  const generateOptions = () => {
    // 根据是否带搜索功能，得到不同的options
    const reg = new RegExp('^' + debouncedValue)
    if (showSearch && filterOption && !reClick) {
      // 执行搜索
      if ('options' in options[0]) {
        const assertOptions = options as {
          label: string
          options: SelectOptionProps[]
        }[]
        const optionArr: {
          label: string
          options: SelectOptionProps[]
        }[] = []
        assertOptions.filter(item => {
          const array = item.options.filter(item =>
            reg.test(item?.label ?? item.value)
          )
          return array.length == 0
            ? false
            : optionArr.push({ label: item.label, options: array })
        })
        selectOptions = optionArr
      } else {
        const assertOptions = options as SelectOptionProps[]
        selectOptions = assertOptions.filter(item =>
          reg.test(item?.label ?? item.value)
        )
      }
    } else {
      // 不执行搜索
      selectOptions = options
    }
    // 在Select组件中对options进行遍历，并执行函数。在这里，即对select 中的每一个option进行处理，生成dt,dd元素
    if (selectOptions.length) {
      if ('options' in selectOptions[0]) {
        selectOptions = selectOptions as {
          label: string
          options: SelectOptionProps[]
        }[]
        return selectOptions.map(function (item, index) {
          return (
            <Optgroup
              key={`optGroup-${index}`}
              label={item.label}
              onSelect={handleOptionClick}
              selectedValues={selectedValues}
              multiple={multiple}
              options={item.options}
            ></Optgroup>
          )
        })
      } else {
        selectOptions = selectOptions as SelectOptionProps[]
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
      }
    } else {
      return <Option disabled value={'暂无数据'}></Option>
    }
  }
  const className = classNames('violetSelect', {
    'violetSelect--menuOpen': menuOpen,
    'violetSelect--disabled': disabled,
    'violetSelect--multiple': multiple,
  })
  return (
    <div className={className} ref={containerRef} style={style}>
      <div className="violetSelect__input" onClick={handleClick}>
        {!showSearch && (
          <Input
            ref={input}
            placeholder={placeholder}
            value={inputValue}
            disabled={disabled}
            name={name}
            readOnly
            icon="angle-down"
            size={size}
          />
        )}
        {showSearch && (
          <Input
            ref={input}
            disabled={disabled}
            name={name}
            icon="angle-down"
            size={size}
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
          />
        )}
      </div>
      <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
        <dl className="violetSelect__dropdown">{generateOptions()}</dl>
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
