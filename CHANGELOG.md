### v2.1.15

* 新增支持 `表格块` 全宽显示
* 新增 Asri 亮暗主题间切换时的过渡
* 新增部分容器顶部溢出时显示渐隐效果或分割线
* 优化部分 js 功能执行频率
* 统一自定义表情和常规表情的样式
* 统一编辑区和块属性窗口中数据库资源列图像内容圆角
* 调整全宽显示下的 iframe 块和表格块角标位置，避免重叠
* 调整文档设置窗口和搜索列表条目的断字规则
* 去除开关元素不必要的过渡属性
* [修复账号页面文字显示不全的问题](https://github.com/mustakshif/Asri/issues/29)
* 修复某些情况下切换至其他主题时页签栏仍残留上边距的问题

* Added full-width display support for `table blocks`.
* Added transitions when switching between Asri light and dark themes.
* Added fading effect or separation lines when the top of certain containers overflows.
* Optimized the frequency of executing certain JavaScript functions.
* Unified the style of custom emojis and regular emojis.
* Unified the rounded corners of database assets column images in the editing area and block attribute dialog.
* Adjusted the position of badges of iframe block and table block in full width display to avoid overlapping.
* Adjusted the word break rules for the document settings dialog and search list items.
* Removed unnecessary transition properties for switchs.
* [Fixed the issue of incomplete text display on the account page](https://github.com/mustakshif/Asri/issues/29).
* Fixed the problem of remaining top padding in the tab bar when switching to other themes in certain situations.

---

### v2.1.14

* 重新设计账号页面
* 统一超链接元素过渡动画
* 缩小数据库资源列图像内容圆角
* 修改数据库角标鼠标悬停时的颜色
* 修改数据库关联列编辑菜单高亮条目的引用文字颜色和样式
* 修复数据库有选中条目时导致整体横向位移的问题
* [修复文档无图标有题头图时文档属性被题头图控件遮挡的问题](https://github.com/mustakshif/Asri/issues/26)
* 修复对话框边缘难以触发大小调节的问题

<br />

* Redesigned the account page
* Unified the transition animation of hyperlinks
* Shrunk the rounded corners of the image content in the database assets column
* Modified the color of the database badge's style when hovered on
* Modified the color and style of the reference text in the highlighted item of the database relation column editing menu
* Fixed the issue where selecting an item in the database caused overall horizontal displacement
* [Fixed the problem where the document properties were covered by the header image controls when there was no icon and only a header image](https://github.com/mustakshif/Asri/issues/26)
* Fixed the issue where it was difficult to trigger resizing at the edges of the dialogs

---

### v2.1.13

* 新增顶栏钉住图标数量变化时自动更新布局
* 优化部分 js 功能的执行频率，减少性能消耗
* 新增页面宽度变化时全宽显示块的过渡动画
* 调整外观样式中黄色的文字颜色，增强可读性
* 调整标题块的行高，提高多行文本可读性
* [修复行内备注内容较多时鼠标无法移入并滚动的问题](https://ld246.com/article/1709825939240)
* 修复表格圆角处背景超出的问题
* 修复状态栏被数据库表头遮挡的问题
* 修复搜索预览中高亮文本遮挡左右普通文本的问题

<br />

* Added automatic layout update for the top bar when the number of icons change
* Optimized the execution frequency of certain JavaScript functions to reduce performance consumption
* Added transition animation for full-width display blocks when the page width changes
* Adjusted the text color of yellow in the appearance style to enhance readability
* Adjusted the line height of the heading blocks to improve readability of multi-line text
* [Fixed the issue where the mouse could not enter and scroll when there is a lot of inline memo content](https://ld246.com/article/1709825939240)
* Fixed the issue of background exceeding the rounded corners in tables
* Fixed the issue of the status bar being covered by the database header
* Fixed the issue where highlighted text in search preview would cover normal text on the left and right

---

### v2.1.12

* 统一集市已下载和其他页面的布局样式
* 统一块引用搜索列表高亮文字样式
* 统一 `列出引用失效的块` 界面和搜索界面样式
* 统一 `列出引用失效的块` 界面中引用搜索菜单和外部同类菜单的样式
* 优化小视口宽度下集市搜索框和和已下载项目说明内容的显示
* 微调菜单项目右侧可操作图标的鼠标悬停样式
* 修改 `移动` 窗口标题下的路径为不换行、横向滚动
* 修复数据库菜单高亮选项中图标的颜色

<br />

* Unified the layout style of the downloaded page and other pages in Marketplace.
* Unified the highlighted text style for blockquote search lists.
* Unified the interface style for the `List Blocks with Invalid References` interface and the search interface.
* Unified the style of the reference search menu and external menu in the `List Blocks with Invalid References` interface.
* Optimized the display of the marketplace search bar and project descriptions on small viewport widths.
* Fine-tuned the mouse hover style of the operational icons in menu items.
* Modified the path under the title of the `Move` window to be displayed without line breaks and with horizontal scrolling.
* Fixed the color of the icon in the highlighted option from the database menu.

---

### v2.1.11

*  新增自定义属性 `tdir`，用于整体控制文档内容的文字方向，详见主题说明
* 增加图片标题的上边距和全宽显示下的左右边距
* 优化极窄宽度下页签栏的显示
* 优化 `移动` 窗口搜索结果的行高
* 提高状态栏消息部分悬停展示的宽度上限
* 修复小米移动端默认字体下大写 M 变为 MIUI 字样的问题

<br />

* Added custom attribute `tdir` to control the overall text direction of the document content. Please refer to the theme instructions for details.
* Increased the top spacing of image titles, and the left and right spacings when displayed in full width.
* Optimized the display of the tab bar under extremely narrow widths.
* Optimized the line height of search results in the `Move` window.
* Increased the maximum width limit of of the status bar messages on hovering.
* Fixed an issue where the capital letter "M" would change to the "MIUI" font on Xiaomi mobile devices with the default font.

---

### v2.1.10

* 新增数据库已关联块的主键的鼠标悬停样式
* 调整文本框提示文字颜色
* 修复全宽显示的数据库选中条目勾选框的位置偏移
* 修复暗色模式下数据库关联列中主键的编辑菜单边框差异
* 修复全宽显示的数据库中固定列左侧的空隙
* 移除全宽显示数据库的横向滚动条
* 移除对 `asri-full-width-display` 属性名的支持，改用 `afwd`

<br />

* Added mouse hover style for the primary key that referred to a block in the database.
* Adjusted the placeholder text color.
* Fixed the position offset of the checkbox for the selected entries in the database when displayed in full width.
* Fixed the border difference of the edit menu for the primary key in the database relation column in dark mode.
* Fixed the gap on the left side of the frozen columns in the database when displayed in full width.
* Removed the horizontal scrollbar for database in full-width display.
* Removed support for the property name `asri-full-width-display` and replaced it with `afwd`.

---

### v2.1.9

* 优化网络图片角标样式
* 统一集市卡片容器外边距
* 调整数据库视图页签内边距
* 调整数据库勾选框属性已勾选状态颜色为强调色
* 修复隐藏停靠栏和侧栏面板时打开的大纲页签与顶栏重叠的问题
* 修复部分情况下搜索结果高亮关键词显示异常
* 修复数据库关联列中主键的编辑菜单背景色异常

<br />

* Optimized the style of the network image badge.
* Unified the margin of the marketplace item cards container.
* Adjusted the inner padding of the database view tab.
* Changed the color of the checked state of the database checkbox attribute to the primary color.
* Fixed the issue where the outline tab overlapped with the top bar when the docks and side panels were hidden.
* Fixed the abnormal display of highlighted keywords in search results in some cases.
* Fixed the abnormal background color of the edit menu for keys in the database relation columns.

---

### v2.1.8

ℹ️ 全宽显示的属性名已更改为 `afwd`，详见主题说明。旧版本的 `asri-full-width-display` 属性名将在后续更新中失效

* 调整全宽显示的数据库块内边距，消除切换全宽显示时的抖动
* 优化文本输入框和文本提示条换行规则
* 修复全宽显示的数据库添加和拖移按钮消失而无法进行对应操作的问题
* [修复数据库第一个视图页签左侧被裁切的问题](https://github.com/mustakshif/Asri/issues/22)
* [修复激活状态的图标颜色区分度不够的问题](https://github.com/mustakshif/Asri/issues/22)

<br />

ℹ️ The attribute name for full-width display has been changed to `afwd`. Check theme documentation for details. The previous version's attribute name `asri-full-width-display` will be deprecated in future updates.

* Adjusted the inner padding of the database blocks in full-width display to eliminate jitter when toggling full-width display.
* Optimized line wrapping rules for text input fields and tooltips.
* Fixed the issue where the add and drag buttons of database items disappeared when displayed in full width, preventing corresponding operations.
* [Fixed the issue where the first tab of the database view tabs was being clipped on the left side.](https://github.com/mustakshif/Asri/issues/22)
* [Fixed the problem where the color differentiation of activated icons was insufficient.](https://github.com/mustakshif/Asri/issues/22)

---

### v2.1.7

* 更新全宽显示的属性名为 `afwd`，更新主题说明。**旧版本的 `asri-full-width-display` 属性名将在后续更新中失效**
* 新增标签嵌套引用时的样式
* 调整数据库视图标签和标签编辑菜单中的图标大小（macOS）和间距
* 统一全局图标元素的鼠标悬停样式
* 统一全局面包屑文档操作图标间距

<br />

* Updated the property name for full-width display to `afwd` and updated the theme description. **The previous version's attribute name `asri-full-width-display` will be deprecated in future updates.**
* Added the style for nested tag references.
* Adjusted the icon size (macOS) and spacing in the database view tabs and tab editing menu.
* Unified the hover style for all icon elements.
* Unified the spacing between document operation icons in breadcrumb bar.

---

### v2.1.6

* 适配切换主题不重载
* 优化 `虚拟引用` 元素样式
* 调整 `pdf 阅读器` 侧栏和顶部工具栏样式
* 调整 `文件历史` 面板侧栏上下内边距，修复侧栏宽度频繁变动的问题
* 修复 Mac 端带图标的 `页签` 上下被裁切的问题
* 适配 `思源笔记增强` 插件，避免被状态栏遮挡

<br />

* Adapted switch-theme-without-reloading feature.
* Optimized the style of the `virtual reference` element.
* Adjusted the side panel and top toolbar styles of the `PDF reader`.
* Adjusted the top and bottom padding of the sidebar in the `document history` panel, and fixed the issue of frequent changes in sidebar width.
* Fixed the issue where `tabs` with icon were cropped on the top and bottom on Mac.
* Adapted the `sy-plugin-enhance` plugin to avoid being obscured by the status bar.

---

### v2.1.5

* 去除 `数据库` 表头和选择框右边框
* 扩大全宽显示 iframe 的大小调节控件响应区域
* 垂直方向上对齐 Mac 端 `页签` 图标和文本
* 修复极窄宽度下 `顶栏` 图标错位的问题
* 页签栏适配 `替换图片背景` 插件

<br />

* Removed the right border of the `database` header and selection box
* Enlarged the responsive area for the resizing control of iframes in full-width display
* Vertically aligned the icon and text of the `tab` on Mac
* Fixed the issue of icon misalignment in the `top bar` in extremely narrow width
* Adapted the tab bar for the `Background Cover` plugin

---

### v2.1.4

* 优化提示文本的出现时机，改善界面元素反馈频率，减少注意力分散
* 优化侧栏面板宽度调整的流畅度
* 提高 `asri-full-width-display` 属性样式响应效率
* 修复 Mac 端部分情况下切换全屏幕后 `顶栏` 左侧图标错位的问题
* 修复 `emoji 面板` 行间距不一致的问题

<br />

* Improved the timing of tooltips appearance to optimize interface feedback frequency and reduce distraction.
* Optimized the smoothness of adjusting the sidebar panel width.
* Improved the responsiveness of `asri-full-width-display` attribute style.
* Fixed the issue of icon misalignments in the left `top bar` on some situations when switching from/to full screen on Mac.
* Fixed the inconsistent row spacing issue in the `emoji panel`.

---

### v2.1.3

* `asri-full-width-display`（全宽显示）属性新增对小窗的支持
* 优化 `行内备注` 和 `块引用` 的动画触发时机，避免鼠标划过时闪烁
* 调整全宽显示 `超级块` 的外边距
* 修复 `页签栏` 滚动卡顿和 `行内备注` 鼠标悬浮动画卡顿的问题
* 修复中文主题说明里英文版说明的链接

<br />

* Added `asri-full-width-display` attribute's support for small windows.
* Optimized the animation trigger timing for `inline memos` and `block quotes` to avoid flickering when the mouse hovers over them.
* Adjusted the margin of the full-width displayed `superblocks`.
* Fixed the scrolling lag in the `tab bar` and the animation lag when hovering over `inline memeos`.
* Fixed the link to the English version of the theme instructions in the Chinese version.

---

### v2.1.2

* 优化宽屏下集市项目说明信息的显示
* 优化在页签中打开的 `闪卡` 复习界面样式，修复底部被状态栏遮挡的问题
* 优化随机题头图列表展示
* [修复 `替换图片背景` 插件图片缓存被删除的问题](https://ld246.com/article/1707547966037)

<br />

* Optimized the display of item's readme in the marketplace on wide screens.
* Optimized the style of the flashcard review interface when opened in a tab, and fixed the issue of the bottom being covered by the status bar.
* Optimized the display of the random cover image list.
* [Fixed the problem where the `Background Cover` plugin's image cache was deleted when switching to other themes.](https://ld246.com/article/1707547966037)

---

### v2.1.1

* 优化 `asri-full-width-display`（全宽显示）属性实现算法
* 恢复全宽显示的 iframe 块（包括视频、挂件、嵌入的网页等）的尺寸调整功能，重新设计尺寸调整控件样式
* 优化全宽显示的 iframe 块的上下间距，修复块标落入内容之中的问题
* 将块滚动条的触发显示区域缩小至可见元素的区域，减少对全宽显示挂件的干扰
* 修复行内备注的鼠标悬浮动画异常的问题

<br />

* Optimized the algorithm for the `asri-full-width-display` property.
* Restored the resizability of iframe blocks (including videos, widgets, embedded webpages, etc.) in full-width display, and redesigned the style of the resize control element.
* Optimized the top and bottom spacing of iframe blocks in full-width display, and fixed the issue of block icons falling into the content.
* Reduced the hover-to-display area of block slider to visible elements' box only, minimizing interference with widgets in full-width display.
* Fixed the issue of abnormal mouse hover animation for inline memos.

---

### v2.1.0

* 新增自定义属性 `asri-full-width-display`，实现正文图片、视频、挂件、超级块、数据库块等撑满页宽显示，详情请查看「自定义属性」一节👇
* 优化集市项目面板标题栏样式
* 在苹果端的主题默认字体下， `数据库` 块内启用等宽数字特性
* 修复苹果端主题默认字体下中文破折号断开等问题
* 修复 PDF 搜索菜单和标注菜单背景显示异常的问题
* 修复关闭 PDF 搜索菜单时菜单项目滞留的问题

<br />

* Added a custom attribute `asri-full-width-display` to implement full-page width display of images, videos, widgets, superblocks, and database blocks, etc. For details, please check *Custom Attributes* below👇
* Optimized the style of the marketplace panel title bar
* Enabled tabular number feature in `database` blocks under the theme's default font on Apple devices
* Fixed issues such as Chinese dashes breaking off under the theme's default font on Apple devices
* Fixed issues with abnormal background display of PDF search menu and annotation menu
* Fixed issues with menu items lingering when closing the PDF search menu

---

### v2.0.6

* 浅色模式下增加 `块引用悬浮窗` 和 `emoji对话框` 边框
* 优化极窄宽度下顶栏页签避让逻辑
* 优化 `块引用悬浮窗` 样式
* 优化 `文档设置` 对话框按钮样式
* 优化标题块和列表块折叠后的样式
* 微调 `对话框` 阴影样式
* 微调图片元素点击选中时的样式

<br />

* Added borders to `block quote preview window` and `emoji dialog`  in light mode
* Optimized the tab spacing algorithm in the top bar under extremely narrow widths
* Optimized the style of the `block quote preview window`
* Optimized the button style of the `document settings` dialog box
* Optimized the style of folded heading blocks and list blocks
* Fine-tuned the shadow style of `dialog boxes`
* Fine-tuned the style when image elements are selected by clicking

---

### v2.0.5

* 优化 `反链面板` 文档条目样式
* 调整 `搜索列表` 按文档分组时的文档名和 `反链面板` 文档名的字重
* 为苹果设备上笔记相关的主题默认字体启用高可读性字形变体（如区分 I/l、0/O 等）、`表格` 的主题默认字体启用等宽数字特性
* 尝试修复 iPad 端顶栏右侧图标与右停靠栏图标重合的问题

<br />

* Optimized the document entry style of the `Backlink Panel`.
* Adjusted the font weight of the document name in the `Search List` when grouped by document and the document name in the `Backlink Panel`.
* Enabled high readability font variants (such as distinguishing I/l, 0/O, etc.) for note-related contents and enabled tabular number features for `tables` under Asri's default fonts on Apple devices.
* Attempted to fix the issue on iPad, where icons in the top bar and icons in the right dock overlapped.

---

### v2.0.4

* 为嵌入块、html 块、公式块、备注等的编辑器添加毛玻璃效果
* 优化 `数据历史`、`最近文档` 对话框 UI
* 尝试修复 iPad 端顶栏右侧图标与右停靠栏图标重合的问题
* 修复 `对话框` 窗口主体的多余圆角
* 修复部分 `对话框` 窗口滚动条抖动的问题

<br />

* Added glassmorphism for editors of embedded blocks, HTML blocks, formula blocks, and inline memos etc.
* Optimized the UI of the `Data History` and `Recent Documents` dialogs.
* Attempted to fix the issue on iPad, where icons in the top bar and icons in the right dock overlapped.
* Fixed the redundant rounded corners of some `Dialog` bodies.
* Fixed the problem of the scrollbar flickering in some `Dialog` windows.

---

### v2.0.3

* 优化文本编辑工具条和 `数据库` 标签的内边距
* 取消 `数据库` 视图切换区域多余边距
* 取消 Mac 端全屏幕状态和浏览器中全屏视图下面包屑等元素的多余左边距
* [修复右侧停靠栏无图标时状态栏仍保留右侧间距的问题](https://github.com/mustakshif/Asri-for-SiYuan/issues/16)
* 修复 Mac 端右侧浮动面板上方偶现多余间距的问题

<br />

* Optimized the inner padding of the text editing toolbar and the `Database` tab.
* Removed the extra margin in the `Database` views area.
* Removed the extra left margin of elements such as breadcrumbs in full-screen view in the browser and in Mac's full-screen mode
* [Fixed the issue where the status bar retains the right margin even when there were no icons in the right dock](https://github.com/mustakshif/Asri-for-SiYuan/issues/16).
* Fixed the occasional extra spacing issue above the right floating panel on Mac.

---

### v2.0.2

* 调整 Windows 端顶栏左侧的可调间距位置到「前进」按钮后，更加充分利用顶栏空间
* 调整侧栏面板标题左边距
* 调整 `工作空间` 按钮边框粗细和文字字重
* 修复 `工作空间` 按钮文字中字母降部被裁切的问题
* 修复在浏览器中使用时顶栏右侧图标和侧栏图标重叠的问题

<br />

* Adjusted the flexible spacing element on the left side of the top bar on Windows to be after the "Forward" button, making better use of the top bar space.
* Adjusted the left margin of the sidebar panel title.
* Adjusted the border thickness and text font weight of the `Workspace` button.
* Fixed an issue where the letter descenders in the `Workspace` button was being clipped.
* Fixed the issue of overlapping icons on the right side of the top bar and the icons in the sidebar when using in a browser.

---

### v2.0.1

* 提升顶栏融合的适应性，确保页签在极小宽度下的展示
* [优化提示条样式，提示条文本不自动换行](https://github.com/mustakshif/Asri-for-SiYuan/pull/14)
* 修复 Mac 端切换全屏后顶栏图标错位的问题
* [适配 `自定义块样式` 插件导图视图中连接线段的颜色](https://github.com/mustakshif/Asri-for-SiYuan/issues/13)

<br />

* Improved the adaptability of the top bar fusion to ensure the display of tabs at extremely small widths.
* [Optimized the style of tooltips, no wrap for the tooltip text](https://github.com/mustakshif/Asri-for-SiYuan/pull/14).
* Fixed the issue of misalignment of top bar icons after switching from / to full screen on Mac.
* [Adapted the color of the connecting lines in the mind map view of the `Custom Block Style` plugin](https://github.com/mustakshif/Asri-for-SiYuan/issues/13).

---

### v2.0.0

* 🎉 全新顶栏设计，与标签栏无缝融合，兼顾美感与效率
* 主题更名为 Asri，简洁凝练，更具现代气息
* [修复自定义字体 CSS 代码失效的问题](https://github.com/mustakshif/Asri-for-SiYuan/issues/11)
* 其他细节优化

<br />

* 🎉 Introduced a new top bar design seamlessly integrated with the tab bar, balancing aesthetics and efficiency.
* Renamed the theme to Asri, giving it a more modern touch.
* [Fixed the issue where custom font CSS code was not working](https://github.com/mustakshif/Asri-for-SiYuan/issues/11).
* Other minor optimizations and improvements.

---

### v1.1.19

* 优化暗色模式下 `对话框`、`菜单`、`工具条`、`状态栏`、`提示条` 等元素的边框，增强可访问性
* 优化 `导出 PDF 窗口` 布局
* 增强与 Safari 浏览器的兼容性
* 修复 `表格` 固定表头时的显示问题

<br />

* Optimized the borders of elements such as `dialogs`, `menus`, `toolbars`, `status bars`, and `tooltips` in dark mode, enhancing accessibility.
* Optimized the layout of the `Export PDF window`.
* Improved compatibility with Safari browser.
* Fixed display issues when using fixed headers in `tables`.

---

### v1.1.18

* [添加 Linux 端窗口边框，增强可访问性](https://github.com/mustakshif/Hadeeth-for-SiYuan/pull/10)
* 修复暗色模式下部分挂件颜色异常的问题
* 修复在浏览器中使用时主题 js 无法正常运行的问题

<br />

* [Added window borders on Linux, improving accessibility.](https://github.com/mustakshif/Hadeeth-for-SiYuan/pull/10)
* Fixed an issue where some widget colors were abnormal in dark mode.
* Fixed the problem where the theme JavaScript did not run properly when used in  browser.

---

### v1.1.17

* 优化 Windows 端滚动条样式
* 微调浅色模式下面板背景色
* 微调引用块、代码块、嵌入块背景色
* 修复 Mac 端暗色模式下仍显示亮色模式滚动条的问题

<br />

* Optimized the scroll bar style on Windows.
* Fine-tuned the background color of side panels in the light mode.
* Adjusted the background color of quote blocks, code blocks, and embed blocks.
* Fixed an issue on macOS where the scroll bar in dark mode was displayed as in light mode.

---

### v1.1.16

* 优化 `搜索 - 替换类型` 对话框内容布局
* 统一各种排版页面下引用块圆角
* 侧栏面板背景色适配插件
* 修复 Mac 端窗口控制按钮位置调整失败的问题

<br />

* Optimized the layout of the `Search - Replace Type` dialog content.
* Unified the rounding of the block quotes in various typesetting pages.
* Adapted the background color of the sidebar panel for plugins.
* Fixed the issue where the position adjustment of the window control buttons on Mac failed.

---

### v1.1.15

* 统一编辑页面、预览页面、导出页面等的排版元素样式
* 优化 `图片查看器` 背景模糊逻辑，窗口失焦时不再保持模糊
* 去除 `标签` 元素的鼠标悬浮动画，减少视觉干扰

<br />

* Unified the typography elements' styles of the editing page, preview page, and export page, etc.
* Changed the blurring of the `image viewer` to no blurring when the window loses focus.
* Removed the mouse hover animation from the `tag` element to reduce visual distractions.

---

### v1.1.14

* 统一 `数据库` 表格边框线颜色
* 视觉居中 `数据库` 菜单的标题
* 修复当通过 `块属性 - 数据库` 呼出 emoji 面板时的背景遮罩滤镜问题

<br />

* Unified the border color of the tables in `Database`.
* Visually centered titles of menus in `Database`.
* Fixed the issue with the background mask filter when invoking the emoji panel from `Block Properties - Database`.

---

### v1.1.13

* 统一 `块属性 - 数据库` 中标签圆角
* 修复 Windows 端全屏视图下窗口控制图标和文档控制图标重叠的问题 [[Issue #9](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues/9)]
* 修复 `反链面板` 面包屑仅有一个路径条目时需要鼠标悬浮才会显示的问题

<br />

* Updated the tag's corner radius in `Block Properties - Database`.
* Fixed an issue where the window control icon and document control icon overlapped in the full-screen view on Windows. [[Issue #9](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues/9)]
* Fixed an issue where the breadcrumb in the `Backlink Panel` would only be displayed when hovering over it when there was only one path entry.

---

### v1.1.12

* 优化 `资源面板` 样式
* 优化菜单中开关项目的上下对齐
* 优化 `数据库` 菜单中聚焦文本框背景色
* 统一 `数据库` 按钮和标签的圆角
* 简化 `数据库` 选中单元格样式
* 修复 `数据库` 部分菜单背景模糊失效的问题

<br />

* Optimized the style of the `Assets Panel`.
* Aligned toggle items in menu for better vertical align.
* Optimized the background color of the focused text box in `Database` menus.
* Unified the rounding of buttons and labels of `Database`.
* Simplified the style of selected cells of `Database`.
* Fixed the issue where the background blur effect was not working properly in some menus of `Database`.

---

### v1.1.11

* 优化 `命令面板` UI
* 对齐 `代码块` 语言标识
* 视觉对齐 `反链面板` 计数器
* 修复部分情况下侧栏面板背景模糊失效的问题
* 修复文字编辑工具条高亮图标的颜色

<br />

* Optimized the `command panel` UI.
* Aligned `code block` language identifiers.
* Visually aligned the counter in the `backlink` panel.
* Fixed the issue where the background blur on the sidebar panel was not working in certain cases.
* Fixed the color of the highlighted icon in the text editing toolbar.

---

### v1.1.10

* 优化图片查看器 UI
* 优化文字编辑工具条、状态栏等部件的色彩效果
* 对齐已下载插件总开关按钮位置
* 修复图片操作菜单图标一直显示的问题

<br />

* Optimized UI of image viewer.
* Optimized color effects of the text editing toolbar, status bar etc.
* Aligned the position of the overall switch button for downloaded plugins.
* Fixed the issue where the image operation menu icon was always displayed.

---

### v1.1.9

* 新增 `集市` 已下载项目宽度自适应显示
* 简化反链面板面包屑条目数量，仅显示有关块及其父级块
* 修复 Mac 端切换是否钉住顶栏时红绿灯不移动的问题

<br />

* Added adaptive display for downloaded items in `Marketplace`.
* Simplified the breadcrumb entries in the backlink panel, displaying only relevant blocks and their parent blocks.
* Fixed the issue on Mac where the traffic light would not move when toggling whether to pin the top bar.

---

### v1.1.8

* 新增顶栏弹出教程动画，首次应用主题时播放
* 固定已下载插件总开关按钮位置
* 固定 `代码片段` 对话框添加和总开关按钮位置
* 调整 `最近文档` 对话框搜索框位置
* 统一文本框提示文本颜色

<br />

* Added a top bar pop-up tutorial animation that plays when the theme is applied for the first time.
* Updated the position of the overall switch button for downloaded plugins.
* Updated the position of the add button and the overall switch button for the `Code Snippet` dialog and unified it.
* Adjusted the position of the search bar in the `Recent documents` dialog.
* Unified the prompt text color of text fields.

---

### v1.1.7

* 修复文本编辑菜单图标背景圆角样式
* 简化对话框阴影效果和部分特效，优化流畅度
* 优化 `设置` 窗口侧栏导航自适应宽度样式

<br />

* Fixed the rounded corner style of the icon background in the text editing toolbar.
* Simplified the dialog shadow and some effects to improve performance.
* Optimized the adaptive width style of the sidebar navigation in `Settings`.

---

### v1.1.6

* 调整表格为自动宽度，超过页宽时自动换行 [[Issue #7](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues/7)]
* 优化宽屏下的 `/` 菜单布局 [[Issue #6](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues/6)]

<br />

* Adjusted the table to have automatic width and wrap text when exceeding the page width. [[Issue #7](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues/7)]
* Updated the layout of the `/` menu to adapt to wider windows. [[Issue #6](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues/6)]

---

### v1.1.5

* 调整表格背景色为透明色
* 调整正文中的标签样式
* 优化数据库部分菜单中的表单元素背景色

<br />

* Adjusted the table background color to transparent.
* Adjusted the style of tags in the body text.
* Optimized the background color of form elements in menus of database.

---

### v1.1.4

* 优化数据库选中条目计数器样式
* Mac 端应用全屏状态下自动钉住顶栏  [[Issue #5](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues/5)]
* 修复数据库选中单元格边缘被裁切的问题
* 修复侧栏面板顶部色差问题
* 修复对话框刚弹出时按钮横向位移的问题

<br />

* Optimized the style of the selected item counter of database.
* Top bar in full-screen mode on macOS will be automatically pinned.  [[Issue #5](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues/5)]
* Fixed the issue where the edges of the database selected cells were clipped.
* Fixed the issue of color difference on the top of the sidebar panel.
* Fixed the issue of horizontal displacement of buttons when the dialog box first pops up.

---

### v1.1.3

* 适配数据库/属性视图样式
* 自定义背景色改为不透明色
* 修复隐藏状态栏时浮动面板的显示问题
* 优化底栏图标间距

<br />

* Adapted the style of database / atrribute view.
* Changed the customizable text background colors to solid colors instead of transparent ones.
* Fixed the display issue of floating panels when the status bar is hidden.
* Optimized the spacing between icons in the bottom bar.

---

### v1.1.2

* 适配底栏和底栏面板
* 微调 `/` 菜单中样式列表的图标
* 加快顶栏弹出动画速率

<br />

* Adapted the bottom dock and bottom panel.
* Fine-tuned the icons of the text style list in the `/` menu.
* Accelerated top bar's pop-up animation.

---

### v1.1.1

* 改进搜索列表水平布局时的关键字上下文和文档路径的分布
* 修复暗色模式下，Mac 端系统滚动条设置为自动隐藏时，部分页面元素滚动条仍显示浅色模式滚动条的问题
* 将页签栏空白处的鼠标指针改为默认指针
* 更新主题说明，将可能影响体验的改动提前

<br />

* Improved the distribution of keyword context and document paths in the horizontal layout of the search list.
* Fixed an issue on Mac where, in dark mode with system scroll bar set to auto-hide, certain page elements would still display the light mode scroll bar.
* Modified the pointer to default in the blank space of the tab bar.
* Updated the theme instructions to highlight changes that might affect the user experience.

---

### v1.1.0

* **引入常驻顶栏，现可通过代码片段取消隐藏顶栏** [[Issue #3](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues/3)]
* 修复部分情况下浮动反链面板背景模糊失效的问题

<br />

* **Introduced pinned top bar, and now it is possible to pin the top bar using code snippets.** [[Issue #3](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues/3)]
* Fixed an issue where the background blur of the floating backlink panel was not working properly in certain cases.

---

### v1.0.9

* 优化搜索列表按文档分组时被选中条目的样式
* 优化 emoji 选单底部导航的图标显示
* 微调正文字体颜色，页面呈现更柔和
* 修复暗色模式下 Windows 端选单背景颜色异常的问题

<br />

* Optimized the style of selected items in the search list when grouped by documents.
* Improved the display of icons in the bottom navigation of the emoji menu.
* Fine-tuned the font color of the body text for a softer page rendering.
* Fixed an issue where the background color of select menus were abnormal in dark mode on Windows.

---

### v1.0.8

* 优化搜索列表按文档分组显示
* 修复主题简介无法找到的问题

<br />

* Improved the display of grouped search results.
* Fixed the issue where the theme README.md could not be found.

---

### v1.0.7

* 重新设计文档标签，改为单色样式，与题头图更好地融合
* 重新设计搜索列表和搜索结果高亮，优化按文档分组显示
* 去除设置菜单设置项之间的分割线

<br />

* Redesigned document tags by using a monocolor style, improving their integration with the header image.
* Redesigned the search list and search results highlight, and enhanced the display of grouped search list.
* Removed dividing lines between the options in settings.

---

### v1.0.6

* 优化代码块字体列表，代码块中文字体同正文字体
* 优化集市项目详情页设计
* 修复移动端顶栏、状态栏显示异常的问题
* 修复小窗页签栏右边距失效的问题

<br />

* Optimized the font list of code blocks, making Chinese characters in code blocks consistent with the regular text.
* Redesigned the marketplace project detail page.
* Fixed the issue where the top bar and status bar were displaying abnormally on mobile devices.
* Fixed the issue of the right margin not working for the tab bar in mini windows.

---

### v1.0.5

* 优化 `闪卡 - 间隔复习` 窗口样式
* 优化关系图配置面板样式
* 调整列表项折叠时序号样式

<br/>

* Optimized the style of `Flashcard - Spaced Repetition` dialog.
* Optimized the style of graph configuration panel.
* Adjusted the list style when folded.

---

### v1.0.4

* 扩大顶栏「主菜单」图标的响应区域，呼出顶栏后无需再次移动鼠标就可点击
* 调整对话框的错误按钮样式

<br />

* Expanded the responsive area of the “main menu” button in the toolbar (top bar), allowing users to click it without extra mouse movements after the toolbar appears.
* Modified the error button in dialogs.

---

### v1.0.3

* 修复全屏视图下无法呼出顶栏的问题
* 修复滑块元素被裁切的问题
* 修复题头图图标提示条图层显示错误
* 调整关系图钉住时背景色，与其他侧栏面板背景色保持一致
* 调整文档块进度滑动条位置，使其上下居中
* 调整代码块字体列表，`JetBrainsMono-Regular` 有更高优先级
* 调整 Windows 端固定页签图标内边距
* 调整 Windows 端窗口关闭按钮样式

<br />

* Fixed the problem of not being able to bring up the toolbar in full-screen views.
* Fixed the problem of slider elements being clipped.
* Fixed the issue of incorrect display of the icon tooltip layer of the header image.
* Adjusted the background color of pinned graph views to be consistent with other side panels.
* Adjusted the position of the document block slider to align it vertically.
* Adjusted the font list for code blocks, with `JetBrainsMono-Regular` having higher priority.
* Adjusted the icon padding inside the pinned tab on the Windows platform.
* Adjusted the style of the window close button on the Windows platform.

---

### v1.0.2

* 修复部分情况下 js 代码不生效的问题
* 调整全屏视图下面包屑、侧栏面板标题栏的高度
* README 中新增反馈和建议

<br />

* Adjusted the height of breadcrumbs, side panel title bar under fullscreen view.
* Fixed an issue where JavaScript was not effective in certain situations.
* Added feedback & suggestions section to README.

---

### v1.0.1

* 修复 README 中的图片地址

<br />

* Fixed image url in README
