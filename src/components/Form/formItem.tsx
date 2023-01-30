import React, {FC, ReactNode } from 'react';
import classNames from 'classnames';

export interface FormItemProps {
    label?: string;
    children?: ReactNode;
}

const FormItem: FC<FormItemProps> = (props) => {
    const {label, children} = props

    const rowClass = classNames('violet-row', {
        'violet-row-no-label': !label,

    })
    return (
        <div className={rowClass}>
            {
                label && 
                <div className='violet-form-item-label'>
                    <label title={label}>
                        {label}
                    </label>
                </div>
            }
            <div className='vilet-form-item'>
                {children}
            </div>
        </div>
    )
} 

export default FormItem