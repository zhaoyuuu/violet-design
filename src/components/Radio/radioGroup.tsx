import React, {ReactNode, useState} from "react";
import classNames from "classnames";

import Radio from './radio';

import './radio.scss';
import {clickOptions} from "@testing-library/user-event/dist/click";

export interface RadioGroupProps{
    className?: string;
    value? : string;
    defaultValue?: string;
    //是否禁用
    disabled?: boolean;
    children?: ReactNode;
    size?: string;
    style?: React.CSSProperties;
    onChange?: Function;
}

const RadioGroup: React.FC<RadioGroupProps> = (props) =>{
    const{
        className,
        disabled,
        children,
        size,
        style,
        onChange,
        ...restProps
    } = props

    const [value, setValue] = useState(props.defaultValue);

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