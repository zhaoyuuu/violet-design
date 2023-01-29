import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import './cascader.scss'
import produce from 'immer'

export interface Option {
  value: string | number
  label: React.ReactNode
  index?: string
  isSelected?: boolean
  disabled?: boolean
  children?: Option[]
}

interface ICascader {
  /** 禁用 */
  disabled?: boolean
  /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
  changeOnSelect?: boolean
  /** 自定义输入框类名 */
  inputClassName?: string
  /** 自定义浮层类名 */
  popupClassName?: string
  /** 次级菜单的展开方式，可选 'click' 和 'hover' */
  expandTrigger?: string
  /** 当下拉列表为空时显示的内容 */
  notFoundContent?: string
  /** 输入框占位文本 */
  placeholder?: string
  /** 可选项数据源 */
  options?: Option[]
  /** 浮层预设位置 */
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
  /** 输入框大小 */
  size?: 'large' | 'middle' | 'small'
  /** 设置校验状态 */
  status?: 'default' | 'error' | 'success'
  /** 指定选中项 */
  value: string[] | number[]
  /** 选择完成后的回调 */
  onChange: (value: string[] | number[]) => void
  /** 自定义下拉框内容 */
  dropdownRender?: (menus: React.ReactNode) => React.ReactNode
}

export const Cascader: React.FC<ICascader> = ({
  disabled = false,
  changeOnSelect = false,
  inputClassName,
  popupClassName,
  expandTrigger = 'click',
  notFoundContent = 'there is nothing here...',
  placeholder,
  options,
  placement = 'bottomLeft',
  size = 'middle',
  status = 'default',
  value,
  onChange,
  dropdownRender,
}) => {
  const inputClasses = cn('violetCascaderWrap__input', inputClassName)
  const popupClasses = cn(
    'violetCascaderWrap__optionsWrap',
    `violetCascaderWrap__optionsWrap--${placement}`,
    popupClassName
  )

  // 输入框显示的值
  const displayValue = value.join(' / ')

  // 控制浮层的出现
  const [isPopupShow, setPopupShow] = useState(false)

  // 浮层的列表内容  content结构:[[option, option, ..], [..], [..], ..]
  const [content, setContent] = useState<Array<Option[]>>([])
  useEffect(() => {
    const queue = []
    if (options?.length) {
      // 把第一级推入队列
      for (let i = 0; i < options.length; i++) {
        const processedOption = {
          ...options[i],
          isSelected: false,
          index: i.toString(), // 添加索引
        } as Option
        queue.push(processedOption)
      }
    }
    // 把children推入队列
    while (queue.length) {
      const queueSize = queue.length
      const curLevel = [] as Option[]
      for (let i = 0; i < queueSize; i++) {
        const headItem = queue.shift() as Option
        const item = {
          value: headItem.value,
          label: headItem.label,
          disabled: headItem.disabled,
          index: headItem.index,
          isSelected: false,
        }
        curLevel.push(item)
        // 如果不是disabled，把children推入队尾
        if (!headItem.disabled && headItem.children) {
          for (let i = 0; i < headItem.children.length; i++) {
            const item = {
              value: headItem.children[i].value,
              label: headItem.children[i].label,
              disabled: headItem.children[i].disabled,
              children: headItem.children[i].children,
              index: `${headItem.index}-${i}`, // 注意索引值
              isSelected: false,
            }
            queue.push(item)
          }
        }
      }
      content.push(curLevel)
      // setContent(
      //   produce(draft => {
      //     draft.push(curLevel)
      //   })
      // )
    }
  }, [])

  // let queueSize = queue.length
  // let curLevel = [] as Option[]
  // for (let i = 0; i < queueSize; i++) {
  //   const headItem = queue.shift() as Option
  //   const item = { ...headItem }
  //   curLevel.push(item)
  //   // 如果不是disabled，把children推入队尾
  //   if (!headItem.disabled && headItem.children) {
  //     for (let i = 0; i < headItem.children.length; i++) {
  //       const child = {
  //         ...headItem.children[i],
  //         index: `${headItem.index}-${i}`, // 注意索引值
  //         isSelected: false,
  //       }
  //       queue.push(child)
  //     }
  //   }
  // }
  // content.push(curLevel)
  // setContent(
  //   produce(draft => {
  //     draft.push(curLevel)
  //   })
  // )

  // select option
  const handleSelectOption = (option: Option) => {
    option.isSelected = true
  }

  return (
    <div className="violetCascaderWrap">
      <input
        type="text"
        className={inputClasses}
        placeholder={placeholder}
        value={displayValue}
      />
      {/* 下拉icon */}
      <div className="violetCascaderWrap__downIcon"></div>
      {/* 浮层 */}
      <div className={popupClasses}>
        {content.map((options, index) => (
          // 每个列表
          <ul key={index} className="violetCascaderWrap__optionsWrap__list">
            {options.map((option, index) => (
              // 每一项
              <li
                key={index}
                className={cn('violetCascaderWrap__optionsWrap__list__item', {
                  'violetCascaderWrap__optionsWrap__list__item--selected':
                    option.isSelected,
                })}
                onClick={() => handleSelectOption(option)}
              >
                {option.label}
                {/* icon */}
                <div className="violetCascaderWrap__optionsWrap__list__item__iconBox">
                  {'>'}
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default Cascader
