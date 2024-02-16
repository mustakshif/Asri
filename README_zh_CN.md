![banner](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/banner_v17.png)

<br/>

简体中文 ｜ [English](https://github.com/mustakshif/Asri-for-SiYuan/blob/main/README.md)

# Asri - theme for SiYuan

Asri 是一款极富现代感的[思源笔记](https://github.com/siyuan-note/siyuan)主题，以轻量、极简的风格，带来优雅、高效的笔记体验。

## 最近更新

### v2.1.3

* `asri-full-width-display`（全宽显示）属性新增对小窗的支持
* 优化 `行内备注` 和 `块引用` 的动画触发时机，避免鼠标划过时闪烁
* 调整全宽显示 `超级块` 的外边距
* 修复 `页签栏` 滚动卡顿和 `行内备注` 鼠标悬浮动画卡顿的问题
* 修复中文主题说明里英文版说明的链接

点击[这里](./CHANGELOG.md)查看全部更新日志。

## 主题特性

### 🪄 美感加持的高效

* ⚖️ 顶栏融合，实现顶栏与标签栏的无缝整合

  * 📌 顶栏空白区域均可用于拖动窗口（页签间隙除外）
  * 📌 如果顶栏图标或分割线显示异常，如错位、重叠等，可尝试调整编辑区或应用窗口的大小来恢复
* 🧊 引入毛玻璃材质，带来富有层次感的视觉体验
* 🌅 取消页面区块间的多余间距，扩大展示范围
* 🌓 支持亮色模式和暗色模式

### 📐 灵活优雅的布局

  * 🧩 优化超级块内外部间距，轻松实现网格、瀑布流布局
  * ↔️ 支持图片、视频、挂件、数据库、超级块等的全宽显示，提供多样化的排版效果
  * ➖ 精简分割线，打造一体化的版面风格，更为清爽整洁
  * 🔛 宽度自适应布局，充分利用屏幕空间

### 🧭 便捷清晰的导航

* 🗂️ 添加文档树、大纲缩进参考线
* 🔍 优化搜索列表、反链列表展示
* ↕️ 修改 Mac 端滚动条为系统样式，可自动隐藏，减少视觉干扰

### 👆 精致流畅的交互

* ⏱️ 优化动画响应时机，改善界面反馈频率，减少用户注意力分散
* ⚙️ 重新设计 iFrame、图片、嵌入块等的控件样式
* 💫 适当加入鲜活动效，丰富交互体验
* 🚀 保持较高的流畅度表现

## 自定义属性

### `asri-full-width-display`（全宽显示）

![full-width-display preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/custom-attributes-preview_v5.gif)

使应用了此属性的块撑满页面宽度显示（全宽显示），可用于强调特定内容或美化排版等。支持应用于文档块和部分内容块（图片段落块、数据库块、水平布局的超级块和 iframe 块）。

#### 应用于文档块

应用于文档块时，接受的属性值有：`all`、`p`、`db`、`sb` 和 `iframe`。其中 `all` 只能单独使用，`p`、`db`、`sb` 和 `iframe` 可以多个同时使用，属性值之间用**空格**分隔。

* `all`：使文档中支持此属性的块全部全宽显示。
* `p`（paragraph）：使文档中所有**包含图片**的段落块全宽显示。
* `db`（database）：使文档中所有数据库块全宽显示。
* `sb`（superblock）：使文档中所有**水平布局**的超级块全宽显示。
* `iframe`：使文档中所有 iframe 块全宽显示，包括视频、挂件和嵌入的网页

示例：

| 属性名 | 属性值 |
| --- | --- |
| `asri-full-width-display` | `all` |
| `asri-full-width-display` | `p sb iframe` |
| `asri-full-width-display` | `db` |

#### 应用于内容块

应用于图片段落块、数据库块、水平布局的超级块、iframe 块时，仅接受属性值 `on` 和 `off`，分别用于单独启用和关闭块的全宽显示。

| 属性名 | 属性值 |
| --- | --- |
| `asri-full-width-display` | `on` |
| `asri-full-width-display` | `off` |

#### 使用方法

除了通过 <kbd>shift + 点击块标</kbd> - <kbd>自定义</kbd> 添加自定义属性，也可以使用 `快速添加块属性` 插件快速为受支持的块添加此属性。以下是一个 `快速添加块属性` 插件的配置示例：

```json
{
    "@type/d": {
        "全宽显示所有受支持的块": {
            "asri-full-width-display": "all"
        },
        "全宽显示所有一级数据库块和图片": {
            "asri-full-width-display": "db p"
        }
    },
    "单独启用全宽显示": {
        "asri-full-width-display": "on"
    },
    "单独关闭全宽显示": {
        "asri-full-width-display": "off"
    }
}
```

上述配置分别为文档块和内容块添加了两个插件选项，用于快速启用和关闭相关内容的全宽显示属性。

对块的自定义属性进行更改后，可以查看和更改已添加的属性：

![custom-attribute](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/custom-attribute_zh_CN_v2.png)

可手动删除此属性来恢复块的默认状态。

#### <em>注意事项</em>

1. 全宽显示仅对文档中**第一层级**的块生效。如果一个块被嵌套在其他内容块中，对其应用此属性不会产生任何效果。例如，对引用块中的图片段落块应用此属性，该段落块不会有样式变化，除非将外部引用块取消。
2. 全宽显示仅在主窗口和小窗编辑区有效，块引用预览窗、导出预览、反链面板和搜索结果预览等场景均不生效。
3. 启用全宽显示可能导致编辑区大小改变后，自动返回光标所在位置时页面的跳动感增强。

## 如何使用 Asri

* **应用内下载更新（推荐）**：进入思源笔记应用，在 `设置 - 集市 - 主题` 中搜索下载「Asri」并应用
* GitHub 下载更新：下载 release 中的 `package.zip`，手动解压至思源笔记工作空间下的 `conf/appearance/themes`，重启思源，在应用 `设置 - 外观` 中选择 Asri 主题


> [!NOTE]
> Asri 主题尚未完全适配移动端

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

