简体中文 ｜ [English](https://github.com/mustakshif/Asri-for-SiYuan/blob/main/README.md)

<br />

![banner](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/banner_v17.png)

# Asri, a theme for SiYuan

Asri 是一款极富现代感的[思源笔记](https://github.com/siyuan-note/siyuan)主题，以轻量、极简的风格，带来优雅、高效的笔记体验。

## 最近更新

### v2.1.10

* 新增数据库已关联块的主键的鼠标悬停样式
* 调整文本框提示文字颜色
* 修复全宽显示的数据库选中条目勾选框的位置偏移
* 修复暗色模式下数据库关联列中主键的编辑菜单边框差异
* 修复全宽显示的数据库中固定列左侧的空隙
* 移除全宽显示数据库的横向滚动条
* 移除对 `asri-full-width-display` 属性名的支持，改用 `afwd`

点击[这里](./CHANGELOG.md)查看全部更新日志。

## 主题特性

### 🪄 美感加持的高效

* ⚖️ 顶栏融合，实现顶栏与标签栏的无缝整合[^1]<sup>, </sup>[^2]
* 🧊 引入毛玻璃材质，带来富有层次感的视觉体验
* 👁️ 启用高可读性字形变体，适应笔记场景[^3] `#macOS` `#iOS` `#iPadOS`
* 🚏 支持文档级别的文字方向设定，满足多种语言的排版需求
* 🌓 支持亮色模式和暗色模式

[^1]: 顶栏空白区域均可用于拖动窗口（页签间隙除外）

[^2]: 如果顶栏图标或分割线显示异常，如错位、重叠等，可尝试调整编辑区或应用窗口的大小来恢复

[^3]: 如果使用自定义字体时发现字形错误，请在代码片段中添加以下 CSS 代码修复：
    ```CSS
    .layout-tab-container, .protyle-content, .b3-typography {
        font-feature-settings: normal !important;
    }
    ```

### 📐 灵活优雅的布局

  * 🧩 优化超级块内外部间距，轻松实现网格、瀑布流布局
  * 🦋 支持图片、视频、挂件、数据库、超级块等的全宽显示，提供多样化的排版效果
  * ➖ 精简分割线，打造一体化的版面风格，更为清爽整洁
  * 🔛 宽度自适应布局，充分利用屏幕空间
  * 🚥 调整窗口控制按钮的位置，优化版面节奏 `#macOS`

### 🧭 便捷清晰的导航

* 🗂️ 添加文档树、大纲缩进参考线
* 🔍 优化搜索列表、反链列表展示
* ↕️ 采用系统原生滚动条，可自动隐藏，减少视觉干扰 `#macOS`

### 👆 精致流畅的交互

* ⏱️ 优化动画响应时机，改善界面反馈频率，减少用户注意力分散
* ⚙️ 重新设计 iFrame、图片、嵌入块等的控件样式
* 💫 适当加入鲜活动效，丰富交互体验
* 🚀 保持较高的流畅度表现

## 开始使用

* **应用内下载更新（推荐）**  ：进入思源笔记应用，在 `设置 - 集市 - 主题` 中搜索下载「Asri」并应用
* GitHub 下载更新：下载 release 中的 `package.zip`，手动解压至思源笔记工作空间下的 `conf/appearance/themes`，重启思源，在应用 `设置 - 外观` 中选择 Asri 主题

## 自定义属性

### 全宽显示（Asri full-width display, `afwd`）

![full-width-display preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/custom-attributes-preview_v7.gif)

使应用了此属性的块撑满页面宽度显示，可用于强调特定内容或美化排版等。全宽显示的样式对段落块中的图片、数据库、 iframe 和水平布局的超级块生效。

| 属性名 | 属性值 | 说明 |
| --- | --- | --- |
| `afwd`　　 |- `all`（使文档中支持此属性的块全部全宽显示）<br />- `p`（使文档中所有图片全宽显示）<br />- `db`（使文档中所有数据库块全宽显示）<br />- `iframe`（使文档中所有 iframe 块全宽显示，包括视频、挂件和嵌入的网页）<br />- `sb`（使文档中所有**水平布局的**超级块全宽显示） | 应用于文档块。<br />除 `all` 以外的属性值均可以多个同时使用，用**空格**分隔 |
| `afwd`　　 |- `on`（单独启用块的全宽显示）<br />- `off`（单独关闭块的全宽显示） | 应用于段落块、数据库块、 iframe 块、超级块。|

#### 用法示例

应用于文档块：

| 属性名 | 属性值 |
| --- | --- |
| `afwd` | `all`         |
| `afwd` | `p sb iframe` |
| `afwd` | `db`          |
| `afwd` | ...       |

应用于支持的内容块：

| 属性名 | 属性值 |
| --- | --- |
| `afwd` | `on`   |
| `afwd` | `off`  |

除了通过 <kbd>shift + 点击块标</kbd> - <kbd>自定义</kbd> 添加自定义属性，也可以使用 `快速添加块属性` 插件快速为受支持的块添加此属性。以下是一个 `快速添加块属性` 插件的配置示例：

```json
{
    "@type/d": {
        "全宽显示所有受支持的块": {
            "afwd": "all"
        },
        "全宽显示所有数据库块和图片": {
            "afwd": "db p"
        }
    },
    "单独启用全宽显示": {
        "afwd": "on"
    },
    "单独关闭全宽显示": {
        "afwd": "off"
    }
}
```

上述配置分别为文档块和内容块添加了两个插件选项，用于快速启用和关闭相关内容的全宽显示属性。

要恢复块的默认状态，请在块属性中手动删除此自定义属性。

#### <em>注意事项</em>

* 全宽显示仅对文档中**第一层级**的块生效。如果一个块被嵌套在其他内容块中，对其应用此属性不会产生任何效果。例如，对引述块中的图片段落块应用此属性，该段落块不会有样式变化，除非将外部引述块取消。
* 全宽显示仅在主窗口和小窗编辑区有效，块引用预览窗、导出预览、反链面板和搜索结果预览等场景均不生效。
* 启用全宽显示可能导致编辑区大小改变后，自动返回光标所在位置时页面的跳动感增强。

### 文档文字方向（`tdir`）

仅应用于文档块，使文档内容统一从左至右或从右至左渲染。该属性不受全局设置影响，不会覆盖文档中块的单独布局设置。

| 属性名 | 属性值 | 说明 |
| -------- | -------- | --------- |
| `tdir`       | `ltr`       | 使文档内容从左至右渲染，适合中文、英文等从左至右书写的文本 |
| `tdir`       | `rtl`       | 使文档内容从右向左渲染，适合阿拉伯文等从右至左书写的文本 |

该属性在反链面板不生效。

## 鸣谢

主题制作过程中参考借鉴了以下主题的思路，在此对各位主题开发者表示感谢：

| 借鉴内容 | 来自主题 | 开发者 |
|--- | --- | --- |
| - 菜单背景模糊 | [Cliff-Dark](https://github.com/chenshinshi/Cliff-Dark) | [Crowds21](https://github.com/chenshinshi) |
| - 隐藏顶栏<br />- 侧栏面板列表项前圆点<br />- 大纲列表标题图标<br />- 状态栏<br />- 搜索列表<br />- 表格列宽<br />- `/` 菜单多栏布局 | [Savor](https://github.com/royc01/notion-theme) | [Roy](https://github.com/royc01) |
| - 顶栏页签栏合并<br />- 文档树缩进线<br />- DOM 变动观察相关函数 | [Rem Craft](https://github.com/svchord/Rem-Craft) | [Seven Chord](https://github.com/svchord) |

(以上排名不分先后)

## 反馈和建议
- [项目主页](https://github.com/mustakshif/Asri/)提交 issue 或 PR
- 发送邮件至 mustakshif@icloud.com

## 其他

* 设置菜单拖移区域仅保留左栏顶部区域
* 隐藏了对话框右上角的关闭按钮，可通过点击对话框外部区域关闭对话框

## 项目依赖

* [GitHub - siyuan-note/siyuan: A privacy-first, self-hosted, fully open source personal knowledge management software, written in typescript and golang.](https://github.com/siyuan-note/siyuan)
* [GitHub - sass/sass: Sass makes CSS fun!](https://github.com/sass/sass)

