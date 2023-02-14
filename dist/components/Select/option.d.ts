import { ReactNode, FC } from 'react';
export interface SelectOptionProps {
    index?: string;
    /** 默认根据此属性值进行筛选，该值不能相同*/
    value: string;
    /** 选项的标签，若不设置则默认与 value 相同*/
    label?: string;
    /** 是否禁用该选项*/
    disabled?: boolean;
    children?: ReactNode;
    onSelect?: (value: string, isSelected?: boolean) => void;
    selectedValues: string[];
    multiple: boolean | undefined;
}
export declare const Option: FC<SelectOptionProps>;
export default Option;
