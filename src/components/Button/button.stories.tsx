import React, { ReactNode } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button, { ButtonType, ButtonSize } from './button'


export default {
    title: 'Example/Button',
    component: Button,
    argTypes: {
        backgroundColor: {control:'color'},
    },
} as ComponentMeta <typeof Button>;


//default button
const Template: ComponentStory<typeof Button> = (args) => (
    <Button {...args}></Button>
)
export const Default = Template.bind({})
Default.args = {
    children: 'Default Button'
}

//Large Button
export const Large = Template.bind({});
Large.args = {
    size: ButtonSize.Large,
    children: 'Large Button',
}
//small Button
export const Small = Template.bind({});
Small.args = {
    size: ButtonSize.Small,
    children: 'Small Button',
}

//primary Button
export const Primary = Template.bind({});
Primary.args = {
    btnType: ButtonType.Primary,
    children: 'Primary Button',
}

//danger Button
export const Danger = Template.bind({});
Danger.args = {
    btnType: ButtonType.Danger,
    children: 'Danger Button',
}

//link Button
export const Link = Template.bind({});
Link.args = {
    btnType: ButtonType.Link,
    children: 'Link Button',
    href: 'https://google.com'
}


// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// export const Primary = Template.bind({});

// Primary.args = {
//     btnType: ButtonType.Primary,
//     children: 'Button'
// }

// const style = {
//     marginLeft: 8
// }

// export const Basic = () => {
//     return <>
//         <Button btnType={ButtonType.Primary}>Primary Button</Button>
//         <Button style={style}>Default Button</Button>
//         <Button btnType={ButtonType.Danger}>Danger Button</Button>
//         <Button btnType={ButtonType.Link}>Link Button</Button>
//     </>
//   };



