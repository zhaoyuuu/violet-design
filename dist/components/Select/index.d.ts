import { FC } from 'react';
import { SelectProps } from './select';
import { SelectOptionProps } from './option';
export type IselectComponent = FC<SelectProps> & {
    Option: FC<SelectOptionProps>;
};
declare const TransSelect: IselectComponent;
export default TransSelect;
