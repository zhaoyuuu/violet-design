import React, { ReactNode } from 'react';
export interface ISubMenuProps {
    index?: string;
    title: string;
    className?: string;
    children?: ReactNode;
}
export declare const SubMenu: React.FC<ISubMenuProps & React.PropsWithChildren>;
export default SubMenu;
