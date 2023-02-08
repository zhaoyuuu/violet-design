import React, { ReactNode, FC } from 'react';
export interface SelectProps {
    /** 指定默认选中的条目 */
    defaultValue?: string | string[];
    /** 选择框默认文本 */
    placeholder?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否支持多选*/
    multiple?: boolean;
    /** select input 的 name 属性 */
    name?: string;
    /**选中值发生变化时触发 */
    onChange?: (selectedValue: string, selectedValues: string[]) => void;
    /**下拉框出现/隐藏时触发 */
    onVisibleChange?: (visible: boolean) => void;
    children?: ReactNode;
}
/** 下拉框 */
export interface IselectContext {
    onSelect?: (value: string, isSelected?: boolean) => void;
    selectedValues: string[];
    multiple?: boolean;
}
/** 定义全局的量 */
/** 当没有provide，则用括号里的默认值 */
export declare const SelectContext: React.Context<IselectContext>;
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'violetUI'
 * // 然后可以使用 <Select> 和 <Select.Option>
 * ~~~
 */
export declare const Select: FC<SelectProps>;
export default Select;
