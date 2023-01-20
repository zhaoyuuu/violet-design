import React,{ReactNode, useState, useRef} from "react";
import classNames from "classnames";

export interface RadioProps{
    className?: string;
    value? :string;
    checked?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    size?: string;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = (props) =>{
    const{
        className,
        value,
        disabled,
        children,
        size,
        onChange,
        ...restProps
    } = props

    const [checked, setChecked] = useState(false);
    const inputEl = useRef(null);

    const classes = classNames('violetRadio', className, {
        ['violetRadio--${size}']: size,
        'disabled': disabled
    })

    const handleClick = (e: any) => {
        if (disabled || checked) {
            return;
        }

        if (!('checked' in props)) {
            setChecked(true);
        }

    }


    return(
        <span onClick={(e) => {handleClick(e)}} >
            <input type="radio"
                   className={classes}
                   disabled={disabled}
                   value={value}
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
