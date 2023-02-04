import React, { ReactNode } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './button'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>

//default button
const Template: ComponentStory<typeof Button> = args => (
  <Button {...args}></Button>
)
export const Default = Template.bind({})
Default.args = {
  children: 'Default Button',
}

//Large Button
export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  children: 'Large Button',
}
//small Button
export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  children: 'Small Button',
}

//primary Button
export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button',
}

//danger Button
export const Danger = Template.bind({})
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button',
}

//link Button
export const Link = Template.bind({})
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com',
}

//text Button
export const Text = Template.bind({})
Text.args = {
  btnType: 'text',
  children: 'Text Button',
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
