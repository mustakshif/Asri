![banner](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/banner_v15.png)

<br/>

简体中文 ｜ [English](https://github.com/mustakshif/Asri-for-SiYuan/blob/main/README_en_US.md)

# Asri - theme for SiYuan

Asri 是一款极富现代感的类 macOS [思源笔记](https://github.com/siyuan-note/siyuan)主题，以轻量、极简的风格，带来优雅、高效的笔记体验。

## 最近更新

### v2.0.2

* 调整 Windows 端顶栏左侧的可调间距位置到「前进」按钮后，更加充分利用顶栏空间
* 调整侧栏面板标题左边距
* 调整 `工作空间` 按钮边框粗细和文字字重
* 修复 `工作空间` 按钮文字中字母降部被裁切的问题
* 修复在浏览器中使用时顶栏右侧图标和侧栏图标重叠的问题

### v2.0.1

* 提升顶栏融合的适应性，确保页签在极小宽度下的展示
* [优化提示条样式，提示条文本不自动换行](https://github.com/mustakshif/Asri-for-SiYuan/pull/14)
* 修复 Mac 端切换全屏后顶栏图标错位的问题
* [适配 `自定义块样式` 插件导图视图中连接线段的颜色](https://github.com/mustakshif/Asri-for-SiYuan/issues/13)

### v2.0.0

* 🎉 全新顶栏设计，与标签栏无缝融合，兼顾美感与效率
* 主题更名为 Asri，简洁凝练，更具现代气息
* [修复自定义字体 CSS 代码失效的问题](https://github.com/mustakshif/Asri-for-SiYuan/issues/11)
* 其他细节优化

查看全部日志 👉 [更新日志](./CHANGELOG.md)

## 主题特性

* ⚖️ 顶栏融合，兼顾美感与效率

  * 📌 顶栏空白区域均可用于拖动窗口（页签间隙除外）
  * 📌 旧版本固定顶栏的代码已失效，可手动删除
* 🚥 调整 Mac 端红绿灯位置，优化版面节奏

  * 📌 切换至其他主题后需要重启应用才能将红绿灯恢复至默认位置
* ↕️ 修改 Mac 端滚动条为系统样式，可自动隐藏，减少视觉干扰
* ➖ 精简分割线，打造一体化的版面风格，更为清爽整洁
* 🧩 优化超级块内外部间距，轻松实现网格、瀑布流布局，打造优雅排版
* 📐 取消页面区块间的多余间距，扩大展示范围
* 🔛 宽度自适应布局，充分利用屏幕空间
* 🌓 支持亮色模式和暗色模式
* 🗂️ 添加文档树、大纲缩进参考线
* 🔍 优化搜索列表、反链列表展示
* ⚙️ 重新设计 iFrame、视频、图片等控件样式
* 🧊 引入毛玻璃材质，带来富有层次感的视觉体验
* 💫 适当加入鲜活动效，丰富交互体验
* 🚀 保持较高的流畅度表现
* ……

## 如何使用

* **应用内下载更新（推荐）**：进入思源笔记应用，在 `设置 - 集市 - 主题` 中搜索下载「Asri」并应用
* GitHub 下载更新：下载 release 中的 `package.zip`，手动解压至思源笔记工作空间下的 `conf/appearance/themes`，重启思源，在应用 `设置 - 外观` 中选择 Asri 主题

## 计划

* 适配移动端
* 持续优化流畅度
* 优化数据库元素样式
* 优化闪卡样式
* 持续优化顶栏使用体验
* 优化有序列表序号

## 鸣谢

主题制作过程中参考借鉴了以下主题的思路，在此对各位主题开发者表示感谢 🙏：

| 借鉴内容                                                 | 来自主题 | 开发者 |
| ---------------------------------------------------------- | ---------- | ------ |
|- 菜单背景模糊                                             | [Cliff-Dark](https://github.com/chenshinshi/Cliff-Dark)         | [Crowds21](https://github.com/chenshinshi)     |
|- 隐藏顶栏<br />- 侧栏面板列表项前圆点<br />- 大纲列表标题图标<br />- 状态栏<br />- 搜索列表<br />- 表格列宽<br />- `/` 菜单多栏布局 | [Savor](https://github.com/royc01/notion-theme)         | [Roy](https://github.com/royc01)     |
|- 顶栏页签栏合并<br />- 文档树缩进线<br />- DOM 变动观察相关函数                                      | [Rem Craft](https://github.com/svchord/Rem-Craft)         | [Seven Chord](https://github.com/svchord)     |

(以上排名不分先后)

其他参考内容：
* macOS Sonoma 系统应用样式
* [苹果人机界面指南 - 基础 - 颜色](https://developer.apple.com/cn/design/human-interface-guidelines/color)

## 反馈和建议
- [项目主页](https://github.com/mustakshif/Asri-for-SiYuan/issues)提交 issue 或 PR
- 发送邮件至 mustakshif@icloud.com

## 其他

* 设置菜单拖移区域仅保留左栏顶部区域
* 隐藏了对话框右上角的关闭按钮，可通过点击对话框外部区域关闭对话框

## 项目依赖

* [GitHub - siyuan-note/siyuan: A privacy-first, self-hosted, fully open source personal knowledge management software, written in typescript and golang.](https://github.com/siyuan-note/siyuan)
* [GitHub - sass/sass: Sass makes CSS fun!](https://github.com/sass/sass)

