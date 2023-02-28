import classNames from 'classnames'
import React, { FC, useState, useRef, useEffect, ChangeEvent } from 'react'
import Transition from '../Transition/transition'
import Input from '../Input/input'
import Option, { SelectOptionProps } from './option'
import Icon from '../Icon'
import useClickOutside from '../../hooks/useClickOutside'
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
  const input = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLInputElement>(null)
  const containerWidth = useRef(0)
  const [menuOpen, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(
    value ? value : typeof defaultValue === 'string' ? defaultValue : ''
  )
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  )
  const [reClick, setReClick] = useState(false)
  let selectOptions:
    | SelectOptionProps[]
    | { label: string; options: SelectOptionProps[] }[]
  // hasCompositon判断是否在composition阶段，afterDebounce判断是否是composition后的防抖值
  const hasCompositon = useRef(false)
  const [afterDebounce, setAfterDebounce] = useState(true)
  const [debouncedValue, setDebouncedValue] = useState(inputValue)
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    if (!multiple) {
      setOpen(false)
      setInputValue(value)
      onVisibleChange && onVisibleChange(false)
      onChange && onChange(value)
    } else {
      setInputValue('')
    }
    let updatedValues = [value]
    if (multiple) {
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
      setInputValue(
        'options' in selectOptions[0]
          ? selectOptions[0].options[0]?.value ?? value ?? defaultValue
          : selectOptions[0]?.value ?? value ?? defaultValue
      )
    }
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!showSearch) {
      if (!disabled) {
        setOpen(!menuOpen)
        onVisibleChange && onVisibleChange(!menuOpen)
      }
    } else {
      if (!disabled && !menuOpen) {
        setOpen(true)
        onVisibleChange && onVisibleChange(true)
      }
      inputValue !== defaultValue && setReClick(true)
    }
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim()
    setInputValue(inputValue)
    onSearch && onSearch(inputValue)
    setReClick(false)
  }
  input.current &&
    input.current.addEventListener('compositionstart', (e: any) => {
      hasCompositon.current = true
      setAfterDebounce(false)
    })
  input.current &&
    input.current.addEventListener('compositionend', (e: any) => {
      hasCompositon.current = false
    })
  // 防抖 + composition优化
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue)
      if (!hasCompositon.current) setAfterDebounce(true)
    }, 300)
    return () => {
      clearTimeout(handler)
    }
  }, [inputValue])
  const generateOptions = () => {
    if (!hasCompositon.current && afterDebounce) {
      const reg = new RegExp('^' + debouncedValue)
      if (showSearch && filterOption && !reClick) {
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
        selectOptions = options
      }
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
