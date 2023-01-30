import { FC } from 'react'
import Menu, { IMenuProps } from './menu'
import SubMenu, { ISubMenuProps } from './subMenu/subMenu'
import MenuItem, { IMenuItemProps } from './menuItem'

export type IMenuComponent = FC<IMenuProps> & {
  Item: FC<IMenuItemProps>
  SubMenu: FC<ISubMenuProps>
}

const TransMenu = Menu as IMenuComponent
TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
