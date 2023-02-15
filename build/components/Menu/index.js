import Menu from './menu';
import SubMenu from './subMenu/subMenu';
import MenuItem from './menuItem';
var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
