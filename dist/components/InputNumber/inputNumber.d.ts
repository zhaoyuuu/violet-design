import React from 'react';
type Status = 'default' | 'error' | 'warning' | 'success';
export interface IInputNumberProps {
    placeholder?: string;
    /** 自动获取焦点 */
    autoFocus?: boolean;
    /** 是否显示增减按钮 */
    controls?: boolean;
    /** 禁用 */
    disabled?: boolean;
    /** 是否启用键盘快捷行为 */
    keyboard?: boolean;
    /** 最大值 */
    max?: number;
    /** 最小值 */
    min?: number;
    /** 设置校验状态 */
    status?: Status;
    /** 输入框大小 */
    size?: 'default' | 'small' | 'large';
    /** 每次改变步数 */
    step?: number;
    /** 当前值 */
    value?: string;
    /** 变化回调 */
    onChange?: (value: string) => void;
    /** 按下回车的回调 */
    onPressEnter?: () => void;
}
/**
 * > 通过鼠标或键盘，输入范围内的数值。
 *
 * ### 何时使用
 * 当需要获取标准数值时。
 */
export declare const InputNumber: React.FC<IInputNumberProps>;
export default InputNumber;
