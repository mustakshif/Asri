![banner](https://cdn.jsdelivr.net/gh/mustakshif/Hadeeth@main/assets/banner_v9.png)

<br/>

简体中文 ｜ [English](https://github.com/mustakshif/Hadeeth-for-SiYuan/blob/main/README_en_US.md)

# Hadeeth - theme for SiYuan

Hadeeth 是一款极富现代感的类 macOS [思源笔记](https://github.com/siyuan-note/siyuan)主题，以轻量、极简的风格，带来优雅、高效的笔记体验。

## 主题特性

* 📃 隐藏顶栏，调整窗口拖动区域，获得更多显示空间

  * 📌 鼠标移至窗口顶部左侧和右侧有图标的区域，即可快速呼出顶栏
  * 📌 主窗口拖动区域调整为**以下区域的空白部分**：

    * **页签栏（不是顶栏）**
    * **面包屑**
    * **侧栏面板标题及上部**
* ➖ 精简分割线，打造一体化的版面风格，更为清爽整洁
* 🧩 优化超级块内外部间距，轻松实现网格、瀑布流布局，打造优雅排版
* 📐 取消页面区块间的多余间距，扩大展示范围
* 🌓 支持亮色模式和暗色模式
* 🗂️ 添加文档树、大纲缩进参考线
* 🔗 优化反链列表展示
* ⚙️ 重新设计 iFrame、视频、图片等控件样式
* 🧊 引入毛玻璃材质，带来富有层次感的视觉体验
* 💫 适当加入鲜活动效，丰富交互体验
* 🚀 保持较高的流畅度表现
* ↕️ 修改 Mac 端滚动条为系统样式，可自动隐藏，减少视觉干扰
* 🚥 调整 Mac 端红绿灯位置，优化版面节奏

  * 📌 切换至其他主题后需要重启应用才能将红绿灯恢复至默认位置
* ……

## 如何使用

* **应用内下载更新（推荐）**：进入思源笔记应用，在 `设置 - 集市 - 主题` 中搜索下载「Hadeeth」并应用
* GitHub 下载更新：下载 release 中的 `package.zip`，手动解压至思源笔记工作空间下的 `conf/appearance/themes`，重启思源，在应用 `设置 - 外观` 中选择 Hadeeth 主题

## 更新日志

最近更新：

### v1.0.8

* 优化搜索列表按文档分组显示
* 修复主题简介无法找到的问题

### v1.0.7

* 重新设计文档标签，改为单色样式，与题头图更好地融合
* 重新设计搜索列表和搜索结果高亮，优化按文档分组显示
* 去除设置菜单设置项之间的分割线

查看全部日志 👉 [更新日志](./CHANGELOG.md)

## 计划

* 适配移动端
* 持续优化流畅度
* 优化数据库元素样式
* 优化闪卡样式

## 鸣谢

主题制作过程中参考借鉴了以下主题的思路，在此对各位主题开发者表示感谢 🙏：

| 借鉴内容                                                 | 来自主题 | 作者 |
| ---------------------------------------------------------- | ---------- | ------ |
| 菜单背景模糊                                             | [Cliff-Dark](https://github.com/chenshinshi/Cliff-Dark)         | [Crowds21](https://github.com/chenshinshi)     |
| 隐藏顶栏<br />侧栏面板列表项前圆点<br />大纲列表标题图标<br />状态栏<br />搜索列表 | [Savor](https://github.com/royc01/notion-theme)         | [Roy](https://github.com/royc01)     |
| 文档树缩进线<br />`setMutationObserver` 函数                                      | [Rem Craft](https://github.com/svchord/Rem-Craft)         | [Seven Chord](https://github.com/svchord)     |

(以上排名不分先后)

其他参考内容：
* macOS Sonoma 系统应用样式
* [苹果人机界面指南 - 基础 - 颜色](https://developer.apple.com/cn/design/human-interface-guidelines/color)

## 反馈和建议
- [项目主页](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues)提交 issue
- 发送邮件至 mustakshif@icloud.com

## 其他

* 设置菜单拖移区域仅保留左栏顶部区域
* 隐藏了对话框右上角的关闭按钮，可通过点击对话框外部区域关闭对话框

## 项目依赖

* [GitHub - siyuan-note/siyuan: A privacy-first, self-hosted, fully open source personal knowledge management software, written in typescript and golang.](https://github.com/siyuan-note/siyuan)
* [GitHub - sass/sass: Sass makes CSS fun!](https://github.com/sass/sass)

