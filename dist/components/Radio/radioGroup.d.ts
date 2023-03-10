import React, { ReactNode } from 'react';
export type RadioGroupType = 'button' | 'dot';
export interface RadioGroupProps {
    /**设置类名*/
    className?: string;
    value?: string;
    /**默认的值*/
    defaultValue?: string;
    disabled?: boolean;
    children?: ReactNode;
    /**调整radio大小*/
    size?: string;
    /**设置radio的样式*/
    style?: React.CSSProperties;
    /**设置radio的类型*/
    type?: RadioGroupType;
    /**添加函数*/
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}
/**
 * > 单选，由用户从一个或多个选项中做出选择
 *
 * ### 何时使用
 * 在众多选项中选出一个状态
 *
 * 与select组件相比，radio能够使用户更为清晰地比较各个选项，所以不宜添加过多的选项
 *
 *
 */
export declare const RadioGroup: React.FC<RadioGroupProps>;
export default RadioGroup;
