module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  // viewMode: 'docs',
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  // showRoots: true, // 这里至关重要！
  // previewTabs: {
  //   'docs': {
  //     hidden: false, // 默认显示文档tab
  //     path: '/', // 默认显示文档页
  //   },
  // }
}
