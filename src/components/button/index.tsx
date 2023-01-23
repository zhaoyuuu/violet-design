import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './index.css'

interface buttonProps {
    className?: string;
    type?: 'normal' | 'primary';
    children?: ReactNode;
}


const Button = (props: buttonProps) => {
    const {className, type, children} = props;

    const cls = classNames({
        'violet-btn': true,
        ['violet-btn-${type}']: type,
        [className as string]: !!className

    })
    return <button className={cls}>{props.children}</button>
}
export default Button