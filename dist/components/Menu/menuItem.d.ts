import React, { ReactNode } from 'react';
export interface IMenuItemProps {
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
    index?: string;
    children?: ReactNode;
}
export declare const MenuItem: React.FC<IMenuItemProps>;
export default MenuItem;
