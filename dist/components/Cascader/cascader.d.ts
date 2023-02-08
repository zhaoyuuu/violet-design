import React from 'react';
export interface ProcessedOption {
    value: React.ReactNode;
    index?: string;
    isSelected?: boolean;
    disabled?: boolean;
    isFatherSelected?: boolean;
    children?: ProcessedOption[];
    isLeaf?: boolean;
}
export interface ICascader {
    /** 禁用 */
    disabled?: boolean;
    /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
    changeOnSelect?: boolean;
    /** 自定义输入框类名 */
    inputClassName?: string;
    /** 自定义浮层类名 */
    popupClassName?: string;
    /** 当下拉列表为空时显示的内容 */
    notFoundContent?: string;
    /** 输入框占位文本 */
    placeholder?: string;
    /** 可选项数据源 */
    options: ProcessedOption[];
    /** 浮层预设位置 */
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
    /** 设置校验状态 */
    status?: 'default' | 'error' | 'success';
    /** 指定选中项 */
    value: React.ReactNode[];
    /** 选择完成后的回调 */
    onChange: (value: React.ReactNode[]) => void;
}
/**
 * > 级联选择框。
 *
 * ### 何时使用
 * - 需要从一组**相关联**的数据集合进行选择，例如省市区，公司层级，事物分类等。
 * - 从一个**较大的数据集合**中进行选择时，用多级分类进行分隔，方便选择。
 * - 比起 `Select` 组件，可以在同一个浮层中完成选择，有较好的体验。
 */
export declare const Cascader: React.FC<ICascader>;
export default Cascader;
