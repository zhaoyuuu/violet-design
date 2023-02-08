import React, { ReactNode } from 'react';
export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'text';
interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: ReactNode;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | undefined;
}
type AnchorButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<AnchorButtonProps>;
export declare const Button: {
    (props: ButtonProps): JSX.Element;
    defaultProps: {
        disabled: boolean;
        btnType: string;
    };
};
export default Button;
