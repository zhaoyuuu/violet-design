import React, {ReactNode, useState} from "react";
import classNames from "classnames";

import Radio from './radio';

import './radio.scss';
import {clickOptions} from "@testing-library/user-event/dist/click";

export interface RadioGroupProps{
    /**设置类名*/
    className?: string;
    value? : string;
    /**默认的值*/
    defaultValue?: string;
    //是否禁用
    disabled?: boolean;
    children?: ReactNode;
    /**调整radio大小*/
    size?: string;
    /**设置radio的样式*/
    style?: React.CSSProperties;
    /**添加函数*/
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = (props) =>{
    const{
        className,
        disabled,
        children,
        size,
        style,
        onChange,
        ...restProps
    } = props

    const [value, setValue] = useState(props.defaultValue || props.value);

    const classes = classNames('violetRadioGroup', className, {
        ['violetRadioGroup--${size}']: size,
        'violetRadioGroup--disabled': disabled
    })

    const handleClick = (e: any) => {
        const value = e.target.value;
        setValue(value);
    }

    const newChildren = React.Children.map(children, (child:any) => {
        if (child.type !== Radio) {
            return null;
        }
        return React.cloneElement(child, {
            checked: child.props.value === value,
            disabled: disabled,
            onChange: handleClick,
        });
    })

    return (
        <span className = {classes}>
            {newChildren}
        </span>
    )
}

export default RadioGroup;