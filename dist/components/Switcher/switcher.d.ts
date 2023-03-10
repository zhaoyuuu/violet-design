import React, { ReactNode, CSSProperties } from 'react';
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface SwitchProps {
    className?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    checkedChildren?: ReactNode;
    unCheckedChildren?: ReactNode;
    size?: 'small' | 'medium';
    children?: ReactNode;
    style?: CSSProperties;
    theme?: ThemeProps;
}
export declare const Switch: React.FC<SwitchProps>;
export default Switch;
