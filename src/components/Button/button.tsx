import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './style.scss';

interface buttonProps {
    className?: string;
    type?: 'normal' | 'primary';
    children?: ReactNode;
}


const Button = (props: buttonProps) => {
    const {className, type, children} = props;

    const cls = classNames({
        'violetButton': true,
        [`violetButton--${type}`]: type,
        //[className as string]: className

    })
    return <button className={cls}>{children}</button>
}
export default Button