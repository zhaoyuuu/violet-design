import React, {FC, ReactNode } from 'react';


export interface FormProps {
    name?: string;
    children?: ReactNode;
}

export const Form: FC<FormProps> = (props) => {
    const {name, children} = props
    return (
        <form name={name} className='violetForm'>
            {children}
        </form>
    )
} 

Form.defaultProps = {
    name: 'violetForm'
}

export default Form