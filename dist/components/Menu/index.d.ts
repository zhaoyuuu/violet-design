import { FC } from 'react';
import { IMenuProps } from './menu';
import { ISubMenuProps } from './subMenu/subMenu';
import { IMenuItemProps } from './menuItem';
export type IMenuComponent = FC<IMenuProps> & {
    Item: FC<IMenuItemProps>;
    SubMenu: FC<ISubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
