import React,{ReactNode, useState, useRef} from "react";
import classNames from "classnames";

export interface RadioProps{
    className?: string;
    value? : string;
    key?: string;
    //是否选中
    checked?: boolean;
    //是否禁用
    disabled?: boolean;
    children?: ReactNode;
    size?: string;
    style?: React.CSSProperties;
    onChange?: Function;
}

const Radio: React.FC<RadioProps> = (props) =>{
    const{
        className,
        value,
        key,
        disabled,
        children,
        size,
        style,
        onChange,
        ...restProps
    } = props

    const [checked, setChecked] = useState(false);

    const classes = classNames('violetRadio', className, {
        ['violetRadio--${size}']: size,
        'violetRadio--disabled': disabled,
        'violetRadio--checked': checked
    })



    const handleClick = (e: any) => {
        if (disabled) {
            return;
        }

        if(checked){
            setChecked(false);
        }else{
            setChecked(true);
        }

        if (typeof onChange === 'function') {
            onChange(e);
        }
    }

    return(
        <span onClick={(e) => {handleClick(e)}} >
            <input type="radio"
                   className={classes}
                   disabled={disabled}
                   value={value}
                   key={key}
                   checked={checked}
                   style={style}
            />
            <span>{props.children}</span>
        </span>

    )

}

Radio.defaultProps = {
    disabled: false,
    checked: false
}

export default Radio;
