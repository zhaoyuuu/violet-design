import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../src/styles/index.scss'
import dayjs from 'dayjs'
library.add(fas)
import { locale } from 'dayjs'

export const parameters = {
  docsMode: true,
  showCanvas: false,
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    canvas: {
      // 隐藏canvas tab
      hidden: true,
      disable: true,
    },
  },
  options: {
    storySort: {
      order: [
        'Violet Design',
        '组件',
        ['通用', '导航', '数据录入', '数据展示', '反馈', '布局', '其他'],
      ],
    },
  },
}
