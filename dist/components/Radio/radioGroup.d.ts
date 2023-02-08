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
export declare const RadioGroup: React.FC<RadioGroupProps>;
export default RadioGroup;
