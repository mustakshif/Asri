简体中文 ｜ [English](https://github.com/mustakshif/Asri-for-SiYuan/blob/main/README.md)

<!-- [![Releases](https://img.shields.io/github/downloads/mustakshif/Asri/total?label=Downloads&color=477BF9&style=flat)](https://github.com/mustakshif/Asri/releases/latest)
[![Stars](https://img.shields.io/github/stars/mustakshif/Asri?style=flat)](https://star-history.com/#mustakshif/Asri) -->

<br />

![banner](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/banner_v20.png)

# Asri, theme for SiYuan

Asri 是一款极富现代感的[思源笔记](https://github.com/siyuan-note/siyuan)主题，以简洁、符合直觉的设计，带来优雅、高效、个性化的笔记体验。

## 最近更新

### v3.1.15

* 优化块高亮状态的样式和过渡动画
* 优化删除按钮样式
* 行内公式支持应用下划线样式

### v3.1.14

* 适配思源 v3.1.11 的样式改动
* 优化 PDF 标注色块大小和形状
* 修复主题样式造成的移动端 CPU 占用过高的问题
* 修复非全宽显示数据库条目勾选框持续显示的问题

### ...

### v3.0.0

![custom theme color preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri@main/doc/theme-config_zh_CN.gif)

🎨 采用基于感知亮度的色彩系统重构主题配色，全局色调支持无级调节，也可跟随系统强调色（`#Windows` `#macOS`），带来完全个性化的笔记体验。（配置选项信息见下方「主题配置」一节）

点击[这里](./CHANGELOG.md)查看全部更新日志。

## 主题特性

### 🪄 简洁现代的设计

* 👨‍🎨 主题色无极调节，带来完全个性化的笔记体验[^1]
* ⚖️ 顶栏融合，实现顶栏与标签栏的无缝整合[^2]
* 🧊 引入毛玻璃材质，带来富有层次感的视觉体验
* 🌓 支持亮色模式和暗色模式、模式切换平滑过渡
* ➖ 精简分割线，打造一体化的界面风格
* ⚙️ 现代化的控件样式设计

### 📐 优雅高效的排版

* 🔢 为表格、数据库启用等宽数字变体，提升阅读效率
* 👁️ 启用高可读性字形变体，适应笔记场景[^3] `#macOS` `#iOS` `#iPadOS`
* 🛋️ 亮暗色模式分设字体平滑模式，保持视觉字重一致性 `#macOS` `#iOS` `#iPadOS`
* 🦋 支持图片、视频、挂件、数据库、超级块等的全宽显示，提供多样化的排版效果
* 🚏 支持文档级别的文字方向设定，满足不同语言的排版需求
* 🧩 优化超级块内外部间距，轻松实现网格、瀑布流布局

### 🧭 便捷清晰的导航

* 🗂️ 添加文档树、大纲缩进参考线
* 🔍 清晰的搜索列表、反链列表展示
* ↕️ 采用系统原生滚动条，可自动隐藏，减少视觉干扰[^4] `#macOS`

### 👆 灵动流畅的交互

* ⏱️ 优化动画响应时机，改善界面反馈频率，减少用户注意力分散
* 💫 适当加入鲜活动效，丰富交互体验
* 🚀 保持较高的流畅度表现

[^1]: 新特性仅在支持 `oklch()` 及其相对颜色语法的平台有效。部分设备由于浏览器内核版本较低，仍采用旧版本配色方案。

[^2]: 顶栏空白区域均可用于拖动窗口（页签间隙除外）。

[^3]: 如需禁用此特性，或在使用自定义字体时发现字形错误，可在代码片段中添加以下 CSS 代码恢复原字形：
    ```CSS
    .layout-tab-container, .protyle-content, .b3-typography {
        font-feature-settings: normal !important;
    }
    ```

[^4]: 自动隐藏滚动条需要在「系统设置-外观」中，将「显示滚动条」设置为「滚动时」。

## 开始使用

* **应用内下载更新（推荐）**：进入思源笔记应用，在 `设置 - 集市 - 主题` 中搜索下载「Asri」并应用
* GitHub 下载更新：下载 release 中的 `package.zip`，手动解压至思源笔记工作空间下的 `conf/appearance/themes`，重启思源，在应用 `设置 - 外观` 中选择 Asri 主题

## 主题配置

### 🌈 自定义主题色
![asri config menu](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/asri-config-menu_zh_CN_v2.png)

点击右上角 `外观模式` 图标即可弹出 Asri 主题配置菜单，定制主题配色。

* `自定义主题色`：使用自选色作为主题基准色，生成相应配色方案并直接应用
* `跟随系统强调色`：使用系统强调色作为主题基准色，仅在 Windows 和 macOS 桌面端可用
* `色度滑块`：调整背景和普通文本的色彩浓度，取值范围为 `0 - 5`，`0` 表示纯灰度色，默认值为 `1`

### 📐 自定义属性

#### 1. `afwd`：全宽显示（Asri full-width display）

![full-width-display preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/custom-attributes-preview_v7.gif)

使应用了此属性的块撑满页面宽度显示，可用于强调特定内容或美化排版等。全宽显示的样式对图片、数据库、 iframe、表格和水平布局的超级块生效。

要启用全宽显示，可点击**文档块**和**上述内容块**的块标，在弹出的菜单中选择 `全宽显示`，进行相应配置即可。

此特性依赖自定义属性功能，因此也可手动配置块属性，属性名和属性值如下表所示：

| 属性名 | 属性值 | 说明 |
| --- | --- | --- |
| `afwd`　　 |- `all`（使文档中支持此属性的块全部全宽显示）<br />- `p`（使文档中所有图片全宽显示）<br />- `db`（使文档中所有数据库块全宽显示）<br />- `iframe`（使文档中所有 iframe 块全宽显示，包括视频、挂件和嵌入的网页）<br />- `sb`（使文档中所有**水平布局的**超级块全宽显示）<br />- `t`（使文档中所有表格块全宽显示） | 应用于文档块。<br />除 `all` 以外的属性值均可以多个同时使用，用**空格**分隔 |
| `afwd`　　 |- `on`（单独启用块的全宽显示）<br />- `off`（单独关闭块的全宽显示） | 应用于段落块、数据库块、 iframe 块、超级块和表格块。|

##### <em>注意事项</em>

* 全宽显示仅对文档中**第一层级**的块生效。如果一个块被嵌套在其他内容块中，对其应用此属性不会产生任何效果。例如，对引述块中的图片段落块应用此属性，该段落块不会有样式变化，除非将外部引述块取消。
* 全宽显示仅在主窗口和小窗编辑区有效，块引用预览窗、导出预览、反链面板和搜索结果预览等场景均不生效。
* 启用全宽显示可能导致编辑区大小改变后，自动返回光标所在位置时页面的跳动感增强。

#### 2. `tdir`：文档文字方向

仅应用于文档块，使文档内容统一从左至右或从右至左渲染，方便写作和阅读。该属性不受全局设置影响，不会覆盖文档中块的单独布局设置。

| 属性名 | 属性值 | 说明 |
| -------- | -------- | --------- |
| `tdir`       | `ltr`       | 使文档内容从左至右渲染，适合中文、英文等从左至右书写的文本 |
| `tdir`       | `rtl`       | 使文档内容从右向左渲染，适合阿拉伯文等从右至左书写的文本 |

该属性在反链列表和导出场景不生效。

## 鸣谢

主题制作过程中参考借鉴了以下来源，在此对各位作者表示感谢：

| 借鉴内容 | 来源 | 作者 |
|--- | --- | --- |
| - 菜单背景模糊 | 主题：[Cliff-Dark](https://github.com/chenshinshi/Cliff-Dark) | [Crowds21](https://github.com/chenshinshi) |
| - 侧栏面板列表项前圆点<br />- 大纲列表标题图标<br />- 状态栏<br />- 搜索列表<br />- 表格列宽<br />- `/` 菜单多栏布局<br />- 底栏和状态栏合并<br />- 多级列表序号 | 主题：[Savor](https://github.com/royc01/notion-theme) | [Roy](https://github.com/royc01) |
| - 顶栏页签栏合并<br />- 文档树缩进线<br />- DOM 变动观察相关函数 | 主题：[Rem Craft](https://github.com/svchord/Rem-Craft) | [Seven Chord](https://github.com/svchord) |
| - 文档树缩进线 | [链滴帖子](https://ld246.com/article/1724305128590#comments) | [wilsons](https://ld246.com/member/wilsons) |

(以上排名不分先后)

## 反馈和建议
- [项目主页](https://github.com/mustakshif/Asri/)提交 issue 或 PR
- 发送邮件至 mustakshif@icloud.com

## 其他

* 设置窗口拖移区域仅保留左栏顶部区域
* 隐藏了对话框右上角的关闭按钮，可通过点击对话框外部区域关闭对话框

<!--## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mustakshif/Asri&type=Date)](https://star-history.com/#mustakshif/Asri&Date)-->