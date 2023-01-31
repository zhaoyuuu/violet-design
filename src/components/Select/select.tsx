import classNames from 'classnames'
import React, {
  ReactNode,
  FC,
  createContext,
  FunctionComponentElement,
  cloneElement,
  useState,
  useRef,
  useEffect,
} from 'react'
import Transition from '../Transition/transition'
import Input from '../Input/input'
import { SelectOptionProps } from './option'
import Icon from '../Icon'

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
  /**选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void
  /**下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
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

export const Select: FC<SelectProps> = props => {
  // 取出props
  const {
    defaultValue,
    placeholder,
    disabled,
    multiple,
    name,
    onChange,
    onVisibleChange,
    children,
  } = props

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
  // 存储多选的已选值
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  )

  // 处理option的点击事件
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    // 非多选模式
    if (!multiple) {
      // 点击option后，下拉框隐藏
      setOpen(false)
      setValue(value)
      if (onVisibleChange) {
        onVisibleChange(false)
      }
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
    if (onChange) {
      onChange(value, updatedValues)
    }
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
  })
  // 鼠标点击select框外面时，关闭下拉框
  useEffect(() => {
    const ref = containerRef
    // 事件监听函数
    // 使用的是原生的 doucment.addEventListener 的方法添加，那么它是一个原生的 DOM事件，它的事件对象是原生的事件对象(比如这里的 MouseEvent)
    // React.MouseEvent （各种 react event 事件对象），都是 React 的事件，它并不是 DOM 原生的对象，和普通的 DOM 事件是不一样的
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return
      }
      // 执行至此，表示鼠标点击select框外面
      setOpen(false)
      if (onVisibleChange && menuOpen) {
        onVisibleChange(false)
      }
    }
    document.addEventListener('click', listener)
    // useEffect中的return，在下一次执行该useEffect时先执行return的函数
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [containerRef])

  // 点击input框的处理函数
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // 当input框可用（!disabled），menuOpen变量取反
    if (!disabled) {
      setOpen(!menuOpen)
      // 当存在onVisibleChange，则执行(参数为当前menuOpen状态，由于useState缘故，此时menuOpen仍然为 没有执行setOpen(!menuOpen)的状态，故这里要取反)
      if (onVisibleChange) {
        onVisibleChange(!menuOpen)
      }
    }
  }
  // 传递给option组件的li元素的一些属性
  const passedContext: IselectContext = {
    onSelect: handleOptionClick,
    selectedValues: selectedValues,
    multiple: multiple,
  }
  // 生成下拉框各选项
  const generateOptions = () => {
    // React.Children.map(children,function(child, index){})
    // 在Select组件中对其children（props取出来）进行遍历，并执行函数
    // 在这里，即对select 中的每一个option进行处理，生成li元素
    return React.Children.map(children, function (child, index) {
      // child 是 option组件return的元素，即FunctionComponentElement
      const childElement = child as FunctionComponentElement<SelectOptionProps>
      if (childElement.type.displayName === 'Option') {
        // 克隆option组件生成的li元素，并添加第二个参数(做key用），增加props
        return React.cloneElement(childElement, { index: `select-${index}` })
      } else {
        console.error(
          'Warning: Select has a child which is not a Option component'
        )
      }
    })
  }
  // 类名拼接
  const className = classNames('violetSelect', {
    'menu-is-open': menuOpen,
    'is-disabled': disabled,
    'is-multiple': multiple,
  })
  return (
    // input上的图标的动画是css写的
    <div className={className} ref={containerRef}>
      <div className="violetSelect__input" onClick={handleClick}>
        <Input
          ref={input}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          name={name}
          readOnly
          icon="angle-down"
        />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
          <ul className="violetSelect__dropdown">{generateOptions()}</ul>
        </Transition>
      </SelectContext.Provider>
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
}
export default Select
