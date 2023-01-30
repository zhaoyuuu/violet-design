import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './style.scss';

// export enum ButtonSize {
//     Large = 'lg',
//     Small = 'sm'
// }
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

// export enum ButtonType {
//     Primary = 'primary',
//     Default = 'default',
//     Danger = 'danger',
//     Link = 'link'
// }

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: ReactNode;
    href?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps &  AnchorButtonProps>

export const Button = (props: ButtonProps) => {
    const {
        btnType,
        className, 
        disabled,
        size,
        children,
        href,
        ... restProps} = props;

    //violetButton,violetButton-lg,violetButton-primary,
    const cls = classNames(
        'violetButton',
        className, {
        [`violetButton--${btnType}`]: btnType,
        [`violetButton--${size}`]: size,
        'violetButton--disabled': (btnType === 'link') && disabled,
    
        })
    if (btnType === 'link' && href) {
        return (
            <a
            className={cls}
            href={href}
            {...restProps}
            >{children}</a>
        )
    } else {
        return (
            <button className={cls} disabled={disabled} {...restProps}>{children}</button>
        )

    }
    
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button