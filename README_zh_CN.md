![banner](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/banner_v16.png)

<br/>

简体中文 ｜ [English](https://github.com/mustakshif/Asri-for-SiYuan/blob/main/README_en_US.md)

# Asri - theme for SiYuan

Asri 是一款极富现代感的[思源笔记](https://github.com/siyuan-note/siyuan)主题，以轻量、极简的风格，带来优雅、高效的笔记体验。

## 最近更新

### v2.1.0

* 新增自定义属性 `asri-full-width-display`，实现正文图片、iframe、超级块、数据库块撑满页宽显示，详情请查看「自定义属性」一节👇
* 优化集市项目面板标题栏样式
* 在苹果端的主题默认字体下， `数据库` 块内启用等宽数字特性
* 修复苹果端主题默认字体下中文破折号断开等问题
* 修复 PDF 搜索菜单和标注菜单背景显示异常的问题
* 修复关闭 PDF 搜索菜单时菜单项目滞留的问题

点击[这里](./CHANGELOG.md)查看全部更新日志。

## 主题特性

* ⚖️ 顶栏融合，实现顶栏与标签栏的无缝整合，平衡美感与效率。

  * 📌 顶栏空白区域均可用于拖动窗口（页签间隙除外）
  * 📌 如果顶栏图标或分割线显示异常，如错位、重叠等，可尝试调整编辑区或应用窗口的大小来恢复
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

## 自定义属性

### `asri-full-width-display`

![full-width-display preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/custom-attributes-preview_v3.gif)

使应用了此属性的块撑满页面宽度显示（全宽显示），可用于强调特定内容或美化排版等。支持应用于文档块和部分内容块（图片段落块、数据库块、超级块和 iframe 块）。

#### 应用于文档块

应用于文档块时，接受的属性值有：`all`、`p`、`db`、`sb` 和 `iframe`。其中 `all` 只能单独使用，`p`、`db`、`sb` 和 `iframe` 可以多个同时使用，属性值之间用**空格**分割。

* `all`：使文档中支持此属性的块全部全宽显示。
* `p`（paragraph）：使文档中所有**包含图片**的段落块全宽显示。
* `db`（database）：使文档中所有数据库块全宽显示。
* `sb`（super block）：使文档中所有超级块全宽显示。
* `iframe`：使文档中所有 iframe 块全宽显示，包括视频、嵌入的网页

#### 应用于内容块

应用于图片段落块、数据库块、超级块或 iframe 块时，仅接受属性值 `on` 和 `off`，分别用于单独启用和关闭块的全宽显示。

#### 使用方法

除了通过 <kbd>shift + 点击</kbd> 块标添加自定义属性，也可以使用 `快速添加块属性` 插件快速为文档块和受支持的块添加此属性。一个可能的 `快速添加块属性` 插件配置如下：

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

![custom-attribute](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/custom-attribute_zh_CN_v1.png)

可以通过手动删除此属性恢复块的默认状态。

#### 注意事项

1. 全宽显示仅对文档中第一层级的块生效。如果一个块被嵌套在其他内容块中，对其应用此属性不会产生任何效果。例如，对引用块中的图片段落块应用此属性，该段落块不会有样式变化，除非将外部引用块取消。
2. 全宽显示暂时仅在主窗口编辑区有效，块引用预览窗、小窗、导出预览等场景均不生效。
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

