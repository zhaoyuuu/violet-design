import React from 'react'
import CheckBox from './CheckBox'

import { ComponentMeta, ComponentStory } from '@storybook/react'

const checkboxMeta: ComponentMeta<typeof CheckBox> = {
    title: 'CheckBox',
    component: CheckBox
}

export default checkboxMeta

export const Default: ComponentStory<typeof CheckBox> = () => (
    <CheckBox>Default CheckBox</CheckBox>
)
Default.storyName = '默认checkbox样式'

export const CheckBoxDisabled: ComponentStory<typeof CheckBox> = () => (
    <>
    <CheckBox disabled = {true}> Disabled Checkbox</CheckBox>
    <CheckBox disabled = {false}> Enabled Checkbox</CheckBox>
    </>
)
CheckBoxDisabled.storyName = '是否禁用checkbox样式'

export const CheckBoxChecked: ComponentStory<typeof CheckBox> = () => (
    <>
    <CheckBox checked = {true}> Checked Checkbox</CheckBox>
    <CheckBox checked = {false}> Unchecked Checkbox</CheckBox>
    </>
)
CheckBoxChecked.storyName = '是否勾选checkbox样式'

