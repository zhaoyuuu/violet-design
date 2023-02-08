import React, { ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface IAutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
    /**
     * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
     * type DataSourceType<T = {}> = T & DataSourceObject
     */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 文本框发生改变的时候触发的事件*/
    onChange?: (value: string) => void;
    /** 点击选中建议项时触发的回调*/
    onSelect?: (item: DataSourceType) => void;
    /** 支持自定义渲染下拉项，返回 ReactElement */
    renderOption?: (item: DataSourceType) => ReactElement;
    /** 自定义类名 */
    className?: string;
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
export declare const AutoComplete: React.FC<IAutoCompleteProps>;
export default AutoComplete;
