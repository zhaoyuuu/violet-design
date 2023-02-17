
<p align="center">
  <a href="https://zhaoyuuu.github.io/violet-design">
    <img width="200" src="https://github.com/zhubeijia/source/blob/main/srclogo/violet-logo.svg?raw=true">
  </a>
</p>

<div align="center">

[![version](https://img.shields.io/badge/version-v0.1.4-mediumpurple.svg)](https://github.com/zhaoyuuu/violet-design)
[![lisence](https://img.shields.io/badge/lisence-MIT-slateblue.svg)](https://github.com/zhaoyuuu/violet-design)
[![docs](https://img.shields.io/badge/docsby-storybook-purple.svg)](https://zhaoyuuu.github.io/violet-design)

</div>

<div>
基于「 React 」框架的个性化 UI 组件库，主要用于企业级中后台系统。
</div>

## 目录

- [目录](#目录)
- [介绍](#介绍)
  - [特性](#特性)
  - [兼容性](#兼容性)
- [安装](#安装)
  - [使用npm安装](#使用npm安装)
  - [使用 yarn 安装](#使用-yarn-安装)
  - [浏览器引入](#浏览器引入)
- [示例](#示例)
  - [按需加载](#按需加载)
  - [TypeScript](#typescript)
- [组件](#组件)
- [链接](#链接)
- [开发人员](#开发人员)

## 介绍

为了满足设计规范要求，本团队自行开发了「 Violet Design 」—— 一套基于 React 的 UI 组件库。 Violet Design 提供了丰富的组件和功能，在满足不同业务需求的同时，也极具美观和协调性。

### 特性

- 🌈 自主设计的符合直觉的交互语言和视觉风格。
- 📦 开箱即用的高质量 `React` 组件。
- 🛡️ 使用 `TypeScript` 开发，提供完整的类型定义文件。
- ☀️ 友好的 API ，自由灵活地使用空间。
- 🎨 细致、漂亮的 UI。
- 📁 清晰明了的演示站点，细致的文档。

### 兼容性

| <img src="https://github.com/zhubeijia/source/blob/main/srclogo/icon-edge.06c7aa18.svg?raw=true" width="20px">Edge | <img src="https://github.com/zhubeijia/source/blob/main/srclogo/icon-firefox.ffa00c88.svg?raw=true" width="20px">Firefox | <img src="https://github.com/zhubeijia/source/blob/main/srclogo/icon-chrome.99f0b30c.svg?raw=true" width="20px">Chrome | <img src="https://github.com/zhubeijia/source/blob/main/srclogo/icon-safari.1bf88a3e.svg?raw=true" width="20px">Safari | <img src="https://github.com/zhubeijia/source/blob/main/srclogo/icon-opera.de286680.svg?raw=true" width="20px">Opera |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Edge                                                         | Last two versions                                                          | Last two versions                                                          | Last two versions                                                          | Last two versions                                                          |

## 安装

### 使用npm安装

推荐使用 npm 来安装，享受生态圈和工具带来的便利，可以在开发环境轻松调试，也可以在生态环境打包部署使用。

``` $ npm install violet-design ```

### 使用 yarn 安装

`$ yarn add violet-design`

### 浏览器引入

在浏览器中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `VioletDesign`。

__引入CSS：__

```html
<link rel="stylesheet" href="https://unpkg.com/violet-design/dist/index.css">
```

__引入JS：__

```html
<script src="https://unpkg.com/violet-design/dist/index.umd.js"></script>
```

## 示例

```js
import React from 'react';
import { Button } from 'violet-design';

const App = () => (
  <>
    <Button btnType="primary" size="lg">PRESS ME</Button>
  </>
);
```

### 按需加载

`violet-design` 默认支持基于 ES modules 的 tree shaking。

### TypeScript

`violet-design`使用 TypeScript 进行书写并提供了完整的定义文件。

## 组件

- 🔘 通用型组件：Button 按钮、Icon 图标
- 🗂️ 导航型组件：Menu 导航菜单
- 🪄 数据录入型组件：AutoComplete 自动完成、Cascader 级联选择、CheckBox 多选框、DatePicker 日期选择器、RangeDatePicker 日期范围选择器、Form 表单、Input 输入框、InputNumber 数字输入框、RadioGroup 单选按钮组、Select 选择器、Switch 开关、Upload 上传
- 📆 数据展示型组件：Calendar 日历、Tabs 标签页
- 📈 反馈型组件：Progress 进度条
- 📌 其他组件：Affix 图钉、Transition 过渡、Row 行布局

## 链接

- [文档站](https://zhaoyuuu.github.io/violet-design)
- [组件库](https://github.com/zhaoyuuu/violet-design)

## 开发人员

[@ZhaoYuhang](https://github.com/zhaoyuuu). [@LiWei](https://github.com/5liwei). [@WangZijun](https://github.com/violetwzj). [@YangJiawei](https://github.com/666laoyang). [@WanYuhui](https://github.com/wyuhuiNJU). [@ZhuBeijia](https://github.com/zhubeijia). [@ChenXinyi](https://github.com/quas-modo).

如果你希望参与贡献，欢迎 Pull Request ！

