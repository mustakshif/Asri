### v3.6.5

- 修复文档树拖拽指示残留的问题

<br />

- Fixed the issue of residual drag indicators in the document tree.

---

### v3.6.4

- [提高编辑区非思源protyle时页签栏边距的兼容性](https://github.com/mustakshif/Asri/issues/217)
- 调整表格块全宽显示样式，现改为始终撑满编辑区宽度（会使固定表头失效）
- 编辑焦点在表格块中时不再显示块聚焦标识
- 提高「鎏金」配色兼容性

<br />

- [Improved compatibility of tab bar margins in non-SiYuan Protyle editing areas](https://github.com/mustakshif/Asri/issues/217)
- Adjusted the full-width display style of table blocks, now set to always expand to fill the width of the editing area (this will disable fixed headers).
- Removed the block focus indicator when editing focus is within a table block
- Enhanced compatibility for the "Auriflow" color scheme

---

### v3.6.3

- 新增预设配色「远岫」
- 浮动状态栏改为纯CSS实现
- 部分组件采用平滑圆角（仅支持桌面app端）
- 优化底部停靠栏的窗口透明效果
- [全宽显示采用原生边距计算，优化响应](https://github.com/mustakshif/Asri/issues/201)
- [修复Safari浏览器中文档属性显示错位的问题](https://github.com/mustakshif/Asri/issues/215)

<br/>

- Added preset color scheme "Vael"
- Implemented floating status bar using pure CSS
- Applied smooth rounded corners to certain components (desktop app only)
- Optimized window transparency effect for the bottom dock
- [Utilized native margin calculation for full-width display to enhance responsiveness](https://github.com/mustakshif/Asri/issues/201)
- [Fixed misaligned document property display in Safari browser](https://github.com/mustakshif/Asri/issues/215)

---

### v3.6.2

- 修复移动端菜单圆角缺失的问题
- 修复Windows 10窗体颜色问题

<br />

- Fixed the issue of missing rounded corners on the mobile menu
- Fixed the window color issue on Windows 10

---

### v3.6.1

- [取消Mac端全屏状态下窗体透明特效](https://github.com/mustakshif/Asri/issues/212)
- 优化超级块中的Callout块边距

<br />

- [Removed the transparent window effect in full-screen mode on Mac](https://github.com/mustakshif/Asri/issues/212)
- Optimized the margin of Callout blocks in Superblocks

---

### v3.6.0

![vibrancy effect](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/vibrancy.webp)

- 新增左侧栏支持窗体透明效果（可能需要重启思源生效） `macOS` `Windows 11 22H2及以上`
- 优化文档标题换行风格

<br/>

- Added support for window transparency effect in the left sidebar (may require restarting SiYuan to take effect) `macOS` `Windows 11 22H2 and up`
- Optimized the line break style for document titles

---

### v3.5.23

- 适配Callout块样式
- 聚焦块标识颜色调整为跟随块文本颜色
- 调整进度条样式

<br/>

- Adapted the Callout block styling
- Adjusted the focus block indicator color to follow the block text color
- Modified the progress bar styling

---

### v3.5.22

- 修复全宽显示iframe的显示问题
- 调整Windows端滚动条边距
- [微调代码块工具条样式](https://github.com/mustakshif/Asri/issues/209)

<br/>

- Fixed display issues with full-width iframes
- Adjusted scrollbar margins on the Windows version
- [Fine-tuned the styling of the code block toolbar](https://github.com/mustakshif/Asri/issues/209)

---

### v3.5.21

- [提高引述块新设计兼容性](https://github.com/mustakshif/Asri/issues/208)

<br/>

- [Improved compatibility with new design of blockquotes](https://github.com/mustakshif/Asri/issues/208)

---

### v3.5.20

- 引述块采用折角设计，增加辨识度
- 降低全局模糊效果强度

<br />

- Applied a folded corner design to blockquotes for enhanced visual distinction
- Reduced the intensity of the global blur effect

---

### v3.5.19

- 主要UI组件采用超椭圆平滑圆角（思源v3.4.0桌面端）
- 支持CJK字符和西文字符之间自动渲染间距（思源v3.4.0桌面端）
- 适配看板视图UI

<br />

- Adopted superellipse rounded corners for major UI components (SiYuan v3.4.0 Desktop)
- Enabled automatic spacing between CJK and Western characters (SiYuan v3.4.0 Desktop)
- Adapted UI for kanban view

---

### v3.5.18

- [重新设计单选按钮](https://github.com/mustakshif/Asri/issues/207)
- [修复连续点击块标时全宽显示菜单项消失的问题](https://github.com/mustakshif/Asri/pull/204)
- [减少主题包体积](https://github.com/mustakshif/Asri/issues/205)
- [修复导出图片时列表序号错乱的问题](https://ld246.com/article/1763139003515)

<br />

- [Redesigned radio buttons](https://github.com/mustakshif/Asri/issues/207)
- [Fixed disappearing full-width menu items when continuously clicking block icons](https://github.com/mustakshif/Asri/pull/204)
- [Reduced theme package size](https://github.com/mustakshif/Asri/issues/205)
- [Fixed list numbering disorder when exporting images](https://ld246.com/article/1763139003515)

---

### v3.5.17

- 新增 `<details>` 元素展开/收起动画
- 微调代码片段对话框布局
- [修复「顶栏融合+」模式下数据库表头无法固定在编辑器可视区域内的问题](https://github.com/mustakshif/Asri/issues/200)
- [修复代码片段搜索输入框边框高亮显示不全的问题](https://github.com/mustakshif/Asri/issues/197)
- [修复属性视图输入框内边距不一致的问题](https://github.com/mustakshif/Asri/issues/198)
- 修复文档的备注属性换行显示的问题

<br/>

- Added expand/collapse animations for the `<details>` element
- Adjusted the layout of the code snippet dialog
- [Fixed an issue where database headers could not remain fixed within the editor&apos;s viewport in "Topbar Fusion+" mode](https://github.com/mustakshif/Asri/issues/200)
- [Fixed incomplete border highlighting in the code snippet search input box](https://github.com/mustakshif/Asri/issues/197)
- [Fixed inconsistent padding in the attribute view input fields](https://github.com/mustakshif/Asri/issues/198)
- Fixed an issue with line breaks in the document's memo attribute display

---

### v3.5.16

- [提高对彩色图标包的兼容性](https://github.com/mustakshif/Asri/issues/195)

<br/>

- [Improved compatibility with colorful icon packs](https://github.com/mustakshif/Asri/issues/195)

---

### v3.5.15

- 修复数据库关联列菜单高亮输入框显示问题

<br />

- Fixed the display issue of the highlighted input box in the database relation column menu

---

### v3.5.14

- 提高浅色模式的「鎏金」配色下对话框标题的可读性
- 降低数据库标签饱和度

<br />

- Improved readability of dialog titles in the "Auriflow" color scheme for light mode
- Reduced saturation of database tags

---

### v3.5.13

- HDR 相关特性改为仅在亮色模式生效

<br />

- HDR-related features are now only enabled in light mode

---

### v3.5.12

- 隐藏集市包卡片标题旁的包名
- [修复列表中公式块行号计数问题](https://github.com/mustakshif/Asri/issues/192)

<br />

- Hid the repo name next to the card title in the Marketplace
- [Fixed line number counting issue in formula blocks within lists](https://github.com/mustakshif/Asri/issues/192)

---

### v3.5.11

- 移除 Chromium v138 颜色计算修复，更新主题说明

<br />

- Removed the Chromium v138 color calculation fix and updated the theme documentation

---

### v3.5.10

- 适配思源 v3.3.0

<br />

- Adapted to SiYuan v3.3.0

---

### v3.5.9

- [修复 Katex 计数器重置问题](https://github.com/mustakshif/Asri/issues/188)

<br />

- [Fixed Katex counter reset issue](https://github.com/mustakshif/Asri/issues/188)

---

### v3.5.8

- 新增停靠栏和停靠栏面板展开/收起时的动画过渡
- [优化自定义颜色取色流畅度](https://github.com/mustakshif/Asri/issues/184#issuecomment-3132161742)
- [优化有序列表序号对齐方式，优化字体兼容性](https://github.com/mustakshif/Asri/issues/185)
- 调整「顶栏融合+」渐进模糊强度
- 微调题头图视差滚动效果
- 微调部分组件动效
- 修复启用「顶栏融合+」时载入文档过程中页签栏短暂消失的问题

<br />

- Added animation transitions for docking bar and docking bar panel expansion/collapse
- [Optimized the smoothness of custom color picking](https://github.com/mustakshif/Asri/issues/184#issuecomment-3132161742)
- [Improved the alignment of ordered list numbers and enhanced font compatibility](https://github.com/mustakshif/Asri/issues/185)
- Adjusted the progressive blur intensity for "Topbar Fusion+"
- Fine-tuned the parallax scrolling effect of header images
- Tweaked animations for certain components
- Fixed an issue where the tab bar briefly disappeared during document loading when "Topbar Fusion+" was enabled

---

### v3.5.7

- [提高「鎏金」配色标题文字和文本插入光标可读性](https://github.com/mustakshif/Asri/issues/183)
- 文档 `tdir` 属性设置为 `rtl` 时，支持列表的从右至左显示
- 文档 `tdir` 属性设置为 `rtl` 时，数据库始终保持从左至右显示，避免功能问题
- 应用语言为日语时，文档标题和标题元素支持语义换行
- CJK 标点位于行首时显示为半宽，提升排版美观度
- 调整「顶栏融合+」渐进模糊颜色混合模式，移除题头图底部渐变遮罩，增强沉浸感

<br />

- [Improved readability of titles, headings and text insertion cursor in the "Auriflow" color scheme](https://github.com/mustakshif/Asri/issues/183).
- Supported right-to-left display for lists when the document `tdir` attribute was set to `rtl`.
- Maintained left-to-right display for databases when the document `tdir` attribute was set to `rtl` to prevent functional issues.
- Added semantic line break support for document titles and heading elements when the application language was set to Japanese.
- Displayed CJK punctuation at line starts as half-width to improve typographic aesthetics.
- Adjusted the progressive blur color blending mode for "Topbar Fusion+" and removed the gradient mask at the bottom of cover images to enhance immersion.

---

### v3.5.6

- 微调文字外观颜色和数据库标签颜色
- [「/菜单」改为根据视口宽度调整排列样式](https://github.com/mustakshif/Asri/issues/182)
- 适配思源 v3.2.1 样式变动

<br />

- Adjusted text appearance customizable colors and database label colors
- [Changed "/ menu" to adapt layout styles based on viewport width](https://github.com/mustakshif/Asri/issues/182)
- Adapted to style changes in SiYuan v3.2.1

---

### v3.5.5

- 优化 HDR 组件呈现效果
- 画廊主键字段不换行时出框部分添加省略号
- 调整开关样式，优化动效
- 调整滑动块样式
- 移除了主题包中的非必要文件
- 修复色度滑块在 RTL 布局下的样式
- 修复题头图取色为灰度色时切换至自定义主题色模式，色度不跟随用户配置的问题
- 修复亮暗色模式切换后偶现跟随题头图取色失效的问题

<br />

- Optimized the rendering effect of the HDR component
- Added ellipsis for out-of-bound content in non-wrapping gallery primary key fields
- Adjusted the toggle switch style and improved animation effects
- Modified the slider component style
- Removed unnecessary files from the theme package
- Fixed the chroma slider style in RTL layouts
- Fixed an issue where the chroma didn't follow user settings when switching to custom theme color mode with grayscale header image colors
- Resolved occasional failures in header image color following after light/dark mode switching

---

### v3.5.4

![hdr ui component](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/hdr_ui_v3.jpg)

- 菜单、工具条等 UI 组件引入 HDR（主题色色度为 0 时自动启用，需要显示设备和应用环境支持）
- 优化主题色配置菜单交互逻辑
- 降低菜单项颜色亮度反转阈值，提高可读性
- 调整编辑器文字工具条样式
- 调整通知样式
- 调整对话框阴影样式

<br />

- Added HDR support for UI components such as menus and toolbars (automatically enabled when theme chroma is 0, requires compatible display devices and application environment)
- Optimized the interaction logic of theme color configuration menu
- Lowered the brightness inversion threshold for menu items to improve readability
- Adjusted the styling of editor text toolbars
- Modified notification appearance
- Updated dialog box shadow styling

---

### v3.5.3

- 优化画廊 UI 细节
- 调整全局菜单样式
- 调整全局模糊效果半径
- 提高预设配色可读性
- 修复跟随题头图取色时部分情况下菜单文字对比度问题

<br />

- Optimized gallery UI details
- Adjusted global menu styles
- Modified the radius of global blur effects
- Improved readability of preset color schemes
- Fixed menu text contrast issues in certain scenarios when following header image color

---

### v3.5.2

- 优化数据库画廊视图 UI、提供全宽显示支持
- 移除移动端顶栏分割线
- 修复跟随题头图取色时部分情况下菜单文字对比度问题
- 修复跟随题头图取色时将色度调为 0 时色彩偏移的问题
- ~~临时修复 Chromium 138 内核相对颜色计算错误导致的界面颜色偏差问题~~[[#179](https://github.com/mustakshif/Asri/issues/179#issue)]

<br/>

- Optimized the database gallery view UI and added full-width display support
- Removed the top bar divider on mobile devices
- Fixed menu text contrast issues in certain scenarios when following the header image color scheme
- Fixed color shifting when adjusting chroma to 0 while following the header image color scheme
- ~~Temporarily resolved interface color deviations caused by relative color calculation errors in Chromium 138 kernel~~[[#179](https://github.com/mustakshif/Asri/issues/179#issue)]

---

### v3.5.0

- 新增：主题色跟随题头图，支持图片、视频和默认题头图取色
- 支持使用预设配色方案时直接切换至自定义配色
- 「顶栏融合+」适配更多插件
- 优化对话框标题的垂直方向对齐
- 优化提示工具条圆角和内边距
- [修复首次加载文档时或刷新后偶现滚动失败的问题](https://github.com/mustakshif/Asri/issues/173)
- 修复集市包信息页面标题换行会与下方内容重叠的问题
- 修复阿拉伯语界面「极地」配色下边框线位置
- 修复跟随系统强调色失效的问题

<br />

- Added: Theme color now adapts to cover images, supporting color extraction from images, videos, and default headers.
- Supported switching directly to custom color schemes when using preset color palettes.
- Enhanced compatibility of "Topbar Fusion+" with more plugins.
- Improved vertical alignment of dialog titles.
- Optimized corner radius and padding of tooltips.
- [Fixed an issue where scrolling occasionally failed after initial document load or refresh](https://github.com/mustakshif/Asri/issues/173).
- Fixed overlapping between wrapped titles and content on marketplace package info pages.
- Corrected border line positioning in the "Polar" color scheme for Arabic UI.
- Fixed the ineffectiveness of system accent color following.

---

### v3.4.8

- [修复 Windows 端窗口控制按钮无法点击的问题](https://github.com/mustakshif/Asri/issues/175)

<br />

- [Fixed an issue where window control buttons were unclickable on Windows](https://github.com/mustakshif/Asri/issues/175)

---

### v3.4.7

- 移除底栏避让相关 JS 代码
- 修复 PDF 阅读器滚动时闪烁的问题
- [修复折叠块指示在部分设备上的兼容性问题](https://github.com/mustakshif/Asri/issues/172)

<br />

- Removed the bottom bar avoidance-related JS code
- Fixed flickering issues when scrolling in the PDF viewer
- [Fixed compatibility issues with fold block indicators on certain devices](https://github.com/mustakshif/Asri/issues/172)

---

### v3.4.6

- 「顶栏融合+」新增「光感玻璃」材质，动态反映编辑器光源
- 改进「顶栏融合+」亚克力材质质感效果
- [提升页签切换流畅度](https://github.com/mustakshif/Asri/issues/171)
- [「顶栏融合+」适配「文档流」插件](https://github.com/mustakshif/Asri/issues/168#issuecomment-2961126706)
- [修复代码块无法横向滚动的问题](https://github.com/mustakshif/Asri/issues/170)

<br/>

- Added "Luminous Glass" material to "Topbar Fusion+", dynamically reflecting editor light sources
- Improved the "Acrylic" effect's texture in "Topbar Fusion+"
- [Enhanced tab switching smoothness](https://github.com/mustakshif/Asri/issues/171)
- [Adapted "Topbar Fusion+" for the "Document Flow" plugin](https://github.com/mustakshif/Asri/issues/168#issuecomment-2961126706)
- [Fixed the issue where code blocks couldn&apos;t scroll horizontally](https://github.com/mustakshif/Asri/issues/170)

---

### v3.4.5

- 新增预设主题配色「极地」
- [「顶栏融合+」适配 「Keemap」、「反链过滤面板」插件](https://github.com/mustakshif/Asri/issues/168)
- 「顶栏融合+」适配导出预览模式
- 修复部分按钮文字颜色

<br />

- Added new preset theme color "Polar"
- [Adapted "Topbar Fusion+" for "Keemap" and "Backlink Panel" plugins](https://github.com/mustakshif/Asri/issues/168)
- Adapted "Topbar Fusion+" for export preview mode
- Fixed text color for some buttons

---

### v3.4.4

- 「顶栏融合+」适配更多插件
- 优化集市包侧栏信息展示效果
- 优化嵌入块中代码块语言标识位置
- 导出 PDF 界面适配主题色
- 改善编辑器部分元素的渲染性能
- 调整「星漪」暗色模式强调色
- 适配思源 v3.1.32 样式改动
- 修复部分按钮文字颜色异常问题

<br />

- Adapted "Top Bar Fusion+" for more plugins
- Optimized the display effect of package information in the marketplace sidebar
- Improved the position of code block language identifiers in embedded blocks
- Adjusted the PDF export interface to match the theme color
- Enhanced rendering performance for certain elements in the editor
- Modified the accent color in "Stellula" dark mode
- Adapted to style changes in SiYuan v3.1.32
- Fixed abnormal text color issues for some buttons

---

### v3.4.3

- 新增预设主题配色「星漪」
- 优化滚动条颜色
- 修复移动端部分子菜单无法滚动的问题
- 修复部分面板上下间距问题
- 修复打开搜索窗口时内容向上移位的问题

<br />

- Added new preset theme color "Stellula"
- Optimized the scrollbar color
- Fixed scrolling issue for some submenus on mobile devices
- Adjusted vertical spacing for certain panels
- Fixed content shift issue when opening the search window

---

### v3.4.2

- 「顶栏融合+」适配更多插件
- [新增表格显示样式随编辑器宽度动态调整](https://github.com/mustakshif/Asri/issues/166)
- 斜杠菜单显示样式改为随编辑器动态调整
- 优化列表项中引述块的右边距
- [修复主题配置损坏时无法储存配置的问题](https://github.com/mustakshif/Asri/issues/165)

<br />

- Adapted "Topbar Fusion+" for more plugins
- [Added dynamic adjustment of table display style based on editor width](https://github.com/mustakshif/Asri/issues/166)
- Changed the slash menu display style to dynamically adjust with the editor
- Optimized the right margin of blockquotes in list items
- [Fixed an issue where configurations couldn&apos;t be saved when theme settings were corrupted](https://github.com/mustakshif/Asri/issues/165)

---

### v3.4.1

- [「顶栏融合+」渐进模糊遮罩现支持动态变化，提高顶栏可读性](https://github.com/mustakshif/Asri/issues/163)
- 「顶栏融合+」菜单「实验性功能」图标添加文本提示
- 适配思源 v3.1.29 样式改动
- 调整表情符号面板符号间距
- 修复表情符号颜色异常的问题
- 修复Safari浏览器「空屿」配色背景色异常的问题

<br />

- [Added dynamic progressive blur mask of "Topbar Fusion+" to improve top bar readability](https://github.com/mustakshif/Asri/issues/163)
- Added text tooltips to experimental feature icons in the "Topbar Fusion+" menu
- Adapted styling changes for SiYuan v3.1.29
- Adjusted symbol spacing in the emoji panel
- Fixed abnormal color display of emojis
- Fixed background color anomaly in Safari browser with the "Aerisland" color scheme

---

### v3.4.0：视界无界｜Vision Unbound

* 新增「顶栏融合+」，突破顶栏与编辑区界限，带来沉浸式的阅读与编辑体验。（*此为实验性功能，请参阅主题说明*）
* 调整预设配色方案「岁禧」的配色
* 去除移动端菜单的多余边框
* [修复移动端块属性遮挡内容的问题](https://github.com/mustakshif/Asri/issues/162)
* [修复主题导致的「侧栏备注」插件无法显示的问题](https://ld246.com/article/1746662147426/comment/1746667474590?r=Mustakshif#comments)

<br />

* Added "Topbar Fusion+", breaking the boundary between the topbar and the editor to deliver an immersive reading and editing experience. (*This is an experimental feature — please refer to the theme documentation*)
* Adjusted the color scheme of the preset theme "EverBliss"
* Removed redundant borders in the mobile menu
* [Fixed an issue where block attributes obscured content on mobile](https://github.com/mustakshif/Asri/issues/162)
* [Fixed a theme-related issue preventing the "Sidebar Memo" plugin from displaying](https://ld246.com/article/1746662147426/comment/1746667474590?r=Mustakshif#comments)

---

### v3.3.13

* 新增预设主题配色「空屿」
* 优化数据库关联列启用换行时的展示效果
* 优化数据库关联列菜单主键文字颜色
* 优化数据库勾选框定位
* 优化属性视图空白条目边距
* 增强题头图视差滚动效果
* 降低数据库标签颜色饱和度
* 取消未编辑页签图标的斜体样式
* 去除暗色模式下个人账号页面刷新按钮多余边框

<br />

* Added new preset theme color scheme "Aerisland"
* Optimized the display effect when enabling line wrap in database relation columns
* Improved the text color of primary keys in the database relation column menu
* Enhanced the positioning of database checkboxes
* Adjusted the paddings of blank entries in the property view
* Strengthened the parallax scrolling effect of header images
* Reduced the saturation of database tag colors
* Removed the italic style of unedited tab icons
* Eliminated the redundant border of the refresh button on the personal account page in dark mode

---

### v3.3.12

* 新增预设主题配色「零域」
* 文档排版方向（原 `tdir` 自定义属性）现可通过文档块菜单快速设置
* Asri 配置菜单项新增阿拉伯语支持
* 修复「鎏金」配色下标题块中行内键盘样式文字颜色问题
* 修复全屏模式下题头图上方出现空隙的问题
* 修复暗色模式下部分面板边框线颜色异常问题
* 修复用户主题配置无法加载/储存的问题

<br />

* Added a new preset theme color scheme "Zerith"
* Document layout direction (previously the `tdir` custom attribute) can now be quickly set via the document block menu
* Added Arabic language support to Asri configuration menu items
* Fixed the text color issue of inline keyboard-style text in heading blocks under the "Auriflow" color scheme
* Fixed the gap appearing above cover images in full-screen mode
* Fixed abnormal border line colors of some panels in dark mode
* Fixed the issue where user theme configurations failed to load/save

---

### v3.3.11

* 优化集市包侧栏信息展示
* 优化文档树条目拖动高亮效果
* 修复对话框关闭时布局抖动的问题

<br />

* Optimized the display of sidebar information for marketplace packages
* Improved the highlighting effect when dragging document tree entries
* Fixed layout jitter when closing dialog boxes

---

### v3.3.10

* 优化块的数据库属性图标和文字的鼠标悬停效果
* 统一全局 `kbd` 内容的样式效果
* 修复界面语言为中英文以外的其他语言时，主题信息显示为中文的问题

<br />

* Optimized the hover effects for database property icons and text in blocks
* Unified the styling of global `kbd` content
* Fixed an issue where theme information displayed in Chinese when the interface language was set to non-English/Chinese languages

---

### v3.3.9

* 优化对话框和菜单频繁重绘的问题
* 添加浅色模式下底部状态栏的边框，增加区分度
* 微调暗色模式下菜单和文字编辑工具条的质感效果
* [提高行内 ](https://github.com/mustakshif/Asri/issues/157)[`kbd`](https://github.com/mustakshif/Asri/issues/157)[ 样式文字对比度](https://github.com/mustakshif/Asri/issues/157)
* 修复 PDF 搜索工具栏宽度问题
* 修复 PDF 搜索工具结果信息字体颜色问题
* 修复移动端文档标题属性显示不全的问题
* 修复移动端滚动至顶部时题头图跳动的问题
* [修复与列表子弹线插件的样式冲突](https://github.com/mustakshif/Asri/issues/156)

<br />

* Optimized the issue of frequent redrawing of dialogs and menus.
* Added a border to the bottom status bar in light mode to enhance differentiation.
* Fine-tuned the texture effects of menus and text editing toolbars in dark mode.
* [Increased the contrast of inline ](https://github.com/mustakshif/Asri/issues/157)[`kbd`](https://github.com/mustakshif/Asri/issues/157)[ style text](https://github.com/mustakshif/Asri/issues/157).
* Fixed the issue with the width of the PDF search toolbar.
* Fixed the font color issue in the PDF search tool results information.
* Fixed the issue of incomplete display of document title attributes on mobile devices.
* Fixed the issue of header image jumping when scrolling to the top on mobile devices.
* [Fixed the style conflict with the bullet threading plugin](https://github.com/mustakshif/Asri/blob/main/theme.css).

---

### v3.3.8

* 对其数据库表头图标和内容与主键列图标和内容
* 补全数据库 14 种标签颜色

<br />

* Aligned the database table header icons and content with the primary key column icons and content.
* Completed the 14 tag colors in the database.

---

### v3.3.7

* 微调行内标签样式
* 微调行内键盘样式
* [修复预设配色主题中，标题块制作闪卡后颜色失效的问题](https://github.com/mustakshif/Asri/issues/155)

<br />

* Fine-tuned the inline label styles.
* Fine-tuned the inline keyboard styles.
* [Fixed the issue where the color of title blocks in preset color themes would fail after creating flashcards](https://github.com/mustakshif/Asri/issues/155).

---

### v3.3.6

* [调整块引用+删除线样式时的文本透明度](https://github.com/mustakshif/Asri/issues/152)
* [修复插件导致的任务列表复选框颜色异常问题](https://github.com/mustakshif/Asri/issues/154)
* [修复 Emoji 被裁切的问题](https://github.com/mustakshif/Asri/issues/153)
* 修复 iOS 端暗色模式下系统 UI 背景色问题

<br />

* [Adjusted text opacity for blockquote + strikethrough styles](https://github.com/mustakshif/Asri/issues/152)
* [Fixed abnormal checkbox color in task lists caused by plugins](https://github.com/mustakshif/Asri/issues/154)
* [Fixed issue where Emojis were being clipped](https://github.com/mustakshif/Asri/issues/153)
* Fixed system UI background color issue in dark mode on iOS

---

### v3.3.5

* 调整行内代码背景色
* 微调文档树笔记本条目字重
* 微调文字工具条动画时长
* 修复思源 v3.1.22 滑动块样式异常的问题
* [修复 Linux 端右侧停靠栏边框线超出顶栏的问题](https://github.com/mustakshif/Asri/issues/149)
* [修复反链面板块标不显示的问题](https://github.com/mustakshif/Asri/issues/150)

<br />

* Adjusted the background color of inline code.
* Fine-tuned the font weight of notebook entries in the document tree.
* Fine-tuned the animation duration of the text toolbar.
* Fixed the abnormal style of the slider block in SiYuan v3.1.22.
* [Fixed the issue where the border line of the right dock exceeded the top bar on Linux](https://github.com/mustakshif/Asri/issues/149).
* [Fixed the issue where the block reference in the backlink panel was not displayed](https://github.com/mustakshif/Asri/issues/150).

---

### v3.3.4

* 修复思源 v3.1.21 列表项前圆点、块属性错位的问题
* 修复待更新集市卡片中的按钮对其方式不统一的问题

<br />

* Fixed the misalignment of bullet points and block attributes in list items in SiYuan v3.1.21.
* Fixed the inconsistent alignment of buttons in the pending update marketplace cards.

---

### v3.3.3

* [修复代码块工具条不显示的问题](https://github.com/mustakshif/Asri/blob/main/theme.css)
* 修复嵌入块工具条透明度问题

<br />

* [Fixed the issue where the code block toolbar was not displaying](https://github.com/mustakshif/Asri/blob/main/theme.css)
* Fixed the transparency issue with the embedded block toolbar

---

### v3.3.2

* [新增：展示非笔记文档页面时底部状态栏自动收缩](https://github.com/mustakshif/Asri/issues/107)
* 调整文档标题文字色至强调色

<br />

* [Added: Bottom status bar automatically collapses when displaying non-note document pages](https://github.com/mustakshif/Asri/issues/107)
* Adjusted the document title text color to the accent color

---

### v3.3.1

* 为「岁禧」添加标题元素强调色
* 修复数据库列固定时的内容显示问题，以及复选框定位问题
* 修复数据库主键复制按钮不显示的问题
* 修复 Windows 端部分 emoji 无法正确显示的问题

<br />

* Added heading element highlight color for "Everbliss".
* Fixed content display issues when database columns were fixed, as well as checkbox positioning issues.
* Fixed the issue where the database primary key copy button was not displayed.
* Fixed the issue where some emojis could not be displayed correctly on Windows.

---

### v3.3.0

* 新增春节主题配色方案：岁禧、鎏金
* 支持亮暗色模式分设不同主题色配置
* 修改文档属性样式显示，现置于文档标题下方
* [调整行内备注样式](https://github.com/mustakshif/Asri/issues/141)
* 修复部分类型的页签失焦时图标不向中位移的问题

<br />

* Added Spring Festival theme color schemes: Everbliss, Auriflow
* Supported separate theme color configurations for light and dark modes
* Modified the display of document property styles, now placed below the document title
* [Adjusted inline memo styles](https://github.com/mustakshif/Asri/issues/141)
* Fixed the issue where icons did not center when certain types of tabs lost focus

---

### v3.2.3

* 优化亮暗色模式切换流畅度，切换时不再闪现默认配色
* 优化上下标文字字重，视觉上更匹配普通文本字重
* 优化设置窗口较宽时设置项的显示效果
* 微调滑动条样式
* 修复高亮块的边框线偶尔被遮挡的问题
* 修复 v3.2.2 主题卸载不完全的问题
* 修复文字编辑时鼠标点击失效的问题[[issue 139](https://github.com/mustakshif/Asri/issues/139)][[issue 140](https://github.com/mustakshif/Asri/issues/140)]

<br />

* Improved the smoothness of light/dark mode switching, eliminated default color flashing during transitions
* Optimized the font weight of superscript and subscript text to better match regular text weight visually
* Enhanced the display of settings items when the settings dialog is wide
* Refined slider styles
* Fixed an issue where highlight block borders were occasionally obscured
* Fixed incomplete theme uninstallation issues from v3.2.2
* Fixed mouse click failures during text editing [[issue 139](https://github.com/mustakshif/Asri/issues/139)][[issue 140](https://github.com/mustakshif/Asri/issues/140)]

---

### v3.2.2

* [新增“/”菜单弹出动画](https://github.com/mustakshif/Asri/issues/128)
* [添加低版本 Webview 中题头图的回退样式](https://github.com/mustakshif/Asri/issues/132)
* [优化亮暗色模式切换流畅度](https://github.com/mustakshif/Asri/issues/134)
* [优化集市包下载进度条样式](https://github.com/mustakshif/Asri/issues/127)
* 优化通知按钮样式
* 调整更多组件的动画曲线
* [调整 Emoji 面板布局](https://github.com/mustakshif/Asri/issues/129)
* 取消设置面板按钮宽度限制，优化多语言显示
* 侧栏面板适配从右至左布局模式
* 修复 Mac 端全屏后顶栏左间距缺失的问题
* [修复「打字机模式」插件启用后聚焦块指示条闪现的问题](https://github.com/mustakshif/Asri/issues/133#issuecomment-2579964200)
* [修复滚动条被容器圆角裁切的问题](https://github.com/mustakshif/Asri/issues/131)

<br />

* [Added animation for &quot;/&quot; menu popup](https://github.com/mustakshif/Asri/issues/128)
* [Added fallback styles for header images in older Webview versions](https://github.com/mustakshif/Asri/issues/132)
* [Optimized light/dark mode transition smoothness](https://github.com/mustakshif/Asri/issues/134)
* [Improved marketplace package download progress bar styles](https://github.com/mustakshif/Asri/issues/127)
* Optimized notification button styles
* Adjusted animation curves for more components
* [Adjusted Emoji panel layout](https://github.com/mustakshif/Asri/issues/129)
* Removed width restriction for settings panel buttons and optimized multilingual display
* Adapted side panels for right-to-left layout mode
* Fixed missing left margin in Mac fullscreen top bar
* [Fixed focus block indicator flash issue when &quot;Typewriter Mode&quot; plugin is enabled](https://github.com/mustakshif/Asri/issues/133#issuecomment-2579964200)
* [Fixed scrollbar clipping issues with container rounded corners](https://github.com/mustakshif/Asri/issues/131)

---

### v3.2.1

* 大幅提升亮暗色模式间平滑切换流畅度
* 更新题头图样式，新增视差滚动效果
* 全宽显示图片新增视差滚动效果
* 新增文字编辑工具条动画
* 优化文档树条目展开动画卡顿的问题
* 从右至左 UI 布局模式适配更多对话框
* 优化块标出现时的动画曲线
* 优化按钮点击动画
* 未激活页签内容改为居中显示
* 调整引述块样式
* 微调设置面板样式
* 移动端禁用侧栏面板空间自动隐藏
* 修复 emoji 边缘裁切的问题
* 修复「打字机模式」插件样式适配问题
* 修复侧栏面板控件动画闪烁的问题
* 修复反链面板筛选输入框显示不全的问题
* 修复打开代码片段对话框时渲染进程崩溃的问题

<br />

* Significantly improved the smoothness of transitions between light and dark modes
* Updated header image style, added parallax scrolling effect
* Added parallax scrolling effect for full-width displayed images
* Added animations for text editing toolbar
* Optimized laggy document tree item expansion animations
* Adapted more dialogs for right-to-left UI layout mode
* Optimized animation curves for block icon appearances
* Optimized button click animations
* Changed inactive tab content to center alignment
* Adjusted blockquote styles
* Fine-tuned settings panel styles
* Disabled auto-hide functionality for sidebar panel space on mobile devices
* Fixed emoji edge clipping issues
* Fixed style compatibility issues with the "Typewriter Mode" plugin
* Fixed flickering animations in sidebar panel controls
* Fixed incomplete display of filter input box in backlink panel
* Fixed render process crashes when opening code snippet dialog

---

### v3.2.0

* 新增从右至左 UI 布局模式，应用语言为阿拉伯语等从右至左语言时自动适配
* 新增聚焦块视觉标识
* 新增页签切换过渡动画
* 新增侧栏面板控件自动隐藏
* 优化代码片段对话框元素布局
* 优化提示条动画曲线
* 优化通知样式和动画曲线
* 适配「打字机模式」插件
* 调整账号页面简介文字色
* 调整数据库部分菜单顶部边距
* 调整暗色模式下对话框边框颜色
* 取消停靠栏和侧边面板隐藏时的页面左右边距 `#macOS`
* 修正停靠栏和侧边面板隐藏时的状态栏定位 `#macOS`

<br />

* Added right-to-left UI layout mode, which automatically adapts when the application language is set to Arabic or other right-to-left languages
* Added visual indicators for focused blocks
* Added transition animations for tab switching
* Added auto-hide functionality for sidebar panel controls
* Optimized the layout of code snippet dialog elements
* Optimized tooltip animation curves
* Optimized notification styles and animation curves
* Added compatibility with the "Typewriter Mode" plugin
* Adjusted the text color of descriptions on the account page
* Adjusted the top margin of certain database menus
* Adjusted the dialog border color in dark mode
* Removed page left and right margins when the docks and side panels are hidden `#macOS`
* Fixed status bar positioning when docks and side panels are hidden `#macOS`

---

### v3.1.23

* 适配思源 v3.1.16 样式改动

<br />

* Updated styles to be compatible with SiYuan v3.1.16

---

### v3.1.22

* 增强亮色模式下菜单外框质感
* 视觉平衡菜单列表首尾项的边距
* 视觉平衡代码块内边距
* 调整代码块语言显示样式

<br />

* Enhanced menu border texture in light mode
* Balanced visual margins for the first and last items in menu lists
* Balanced internal padding of code blocks
* Adjusted the display style of code block language indicators

---

### v3.1.21

* 文档属性面板新增溢出渐隐
* 适配思源 v3.1.15 样式改动

<br />

* Updated styles to be compatible with SiYuan v3.1.15
* Added overflow fadeout effect in Doc Attribute panel

---

### v3.1.20

* 适配思源 v3.1.14 样式改动
* [修复文档树条目展开动画卡顿的问题](https://github.com/mustakshif/Asri/issues/118)
* 修复 PDF 文档属性面板按钮样式

<br />

* Updated styles to be compatible with SiYuan v3.1.14
* [Fixed laggy animation when expanding document tree items](https://github.com/mustakshif/Asri/issues/118)
* Fixed button styles in PDF document properties panel

---

### v3.1.19

* 微调亮色模式下数据库标签背景色
* 修复移动端数据库表头背景色差异的问题
* [修复打开新页面时顶栏元素重叠的问题](https://github.com/mustakshif/Asri/issues/117)

<br />

* Adjusted database tag background color in light mode
* Fixed inconsistent database header background color on mobile devices
* [Fixed overlapping header elements when opening new pages](https://github.com/mustakshif/Asri/issues/117)

---

### v3.1.18

* 适配「反链过滤面板」插件底部间距
* 调整勾选列表中已勾选项目颜色变化逻辑
* 修复文档头部有标签时「添加标签」按钮位置异常的问题
* 修复列表块中引用块的上下外边距异常的问题
* 修复全宽显示下数据库勾选框列一直可见的问题

<br />

* Set bottom margin for "Backlink Panel" plugin
* Adjusted the color change logic for checked items in checklists
* Fixed the positioning issue of the "Add Tag" button when document headers contain tags
* Fixed abnormal top and bottom margin issues of quote blocks within list blocks
* Fixed the issue where database checkbox columns remained visible in full-width display

---

### v3.1.17

* 适配思源 v3.1.12 的样式改动

<br />

* Adapted style changes for SiYuan v3.1.12

---

### v3.1.16

* 调整块标在鼠标悬停时的颜色
* 统一「状态异常」对话框按钮样式
* [修复任务列表中的代码块操作按钮丢失的问题](https://github.com/mustakshif/Asri/issues/112)
* [修复任务列表勾选框不可见的问题](https://github.com/mustakshif/Asri/issues/113)
* 修复多列斜杠菜单布局错位
* 修复文档设置对话框「复制ID」按钮不可见的问题

<br />

* Adjusted block icon hover color
* Unified button styles in "Status Error" dialog
* [Fixed missing code block operation buttons in task list](https://github.com/mustakshif/Asri/issues/112)
* [Fixed invisible task list checkboxes](https://github.com/mustakshif/Asri/issues/113)
* Fixed misaligned multi-column slash menu layout
* Fixed invisible "Copy ID" button in document settings dialog

---

### v3.1.15

* 优化块高亮状态的样式和过渡动画
* 优化删除按钮样式
* 行内公式支持应用下划线样式

<br />

* Enhanced block highlighting state styles and transition animations
* Improved delete button styling
* Added underline style support for inline formulas

---

### v3.1.14

* 适配思源 v3.1.11 的样式改动
* 优化 PDF 标注色块大小和形状
* 修复主题样式造成的移动端 CPU 占用过高的问题
* 修复非全宽显示数据库条目勾选框持续显示的问题

<br />

* Adapted style changes for SiYuan v3.1.11
* Optimized the size and shape of PDF annotation highlights
* Fixed high CPU usage on mobile devices caused by theme styling
* Fixed persistent display of database entry checkboxes in non-full-width-display mode

---

### v3.1.13

* [新增块标出现动画](https://github.com/mustakshif/Asri/issues/109)
* [优化任务列表勾选框图标和动画](https://github.com/mustakshif/Asri/issues/111)
* 优化数据库勾选框图标和动画
* 优化数据库单选列、多选列、资源列内边距
* 优化数据库属性面板中资源列内容的样式
* 调整数据库主键有引用时的下划线样式
* 调整部分菜单圆角
* 修复了应用窗口失焦时导致的 CPU 过度占用问题

<br />

* [Added block icons animation](https://github.com/mustakshif/Asri/issues/109)
* [Improved task list checkbox icons and animations](https://github.com/mustakshif/Asri/issues/111)
* Improved database checkbox icons and animations
* Optimized padding for database single-select, multi-select, and resource columns
* Enhanced styling for resource column content in database property panel
* Adjusted underline style for database primary keys with references
* Modified border radius for some menus
* Fixed excessive CPU usage occurring when the application window loses focus

---

### v3.1.12

* 优化通知样式
* 优化字体样式菜单底部边距
* 改进反链面板显示
* [修复特定缩放比例下数据库标签显示不全的问题](https://github.com/mustakshif/Asri/issues/104)
* [修复无法导出为图片的问题](https://github.com/mustakshif/Asri/issues/106)

<br />

* Optimized notification styles
* Enhanced bottom margin of font style menu
* Improved backlink panel display
* [Fixed an issue where database tags were partially hidden at certain zoom levels](https://github.com/mustakshif/Asri/issues/104)
* [Fixed an issue where exporting to images was not working](https://github.com/mustakshif/Asri/issues/106)

---

### v3.1.11

* 适配思源 v3.1.10 的样式更新
* 统一数据库标签圆角

<br />

* Updated styles to be compatible with SiYuan v3.1.10
* Standardized database tag border radius

---

### v3.1.10

* 适配「数据库属性面板」插件
* 增大对话框圆角半径
* 调整集市包介绍页简介样式
* 主题色默认不启用跟随系统强调色

<br />

* Adapted the "Database Properties Panel" plugin
* Increased the border radius of dialog boxes
* Adjusted the style of package introductions on the marketplace page
* Disabled the default setting for theme color to follow system accent color

---

### v3.1.9

* iOS 端支持自定义主题色功能
* [优化文档树、大纲缩进样式，扩大可点击区域](https://github.com/mustakshif/Asri/issues/92)
* [优化数据库主键有引用时的下划线样式](https://github.com/mustakshif/Asri/issues/96)
* 优化「导出 PDF」窗口按钮边距
* 优化行内代码下划线偏移
* 优化删除按钮样式
* 调整主题色度为 0 时状态栏的颜色混合模式
* 微调已激活页签的背景色
* 微调全局下划线粗细

<br />

* Added support for custom theme colors on iOS
* [Optimized the indentation style of the document tree and outline, expanding the clickable area](https://github.com/mustakshif/Asri/issues/92)
* [Improved the underline style for database primary keys with references](https://github.com/mustakshif/Asri/issues/96)
* Adjusted the button margins in the "Export PDF" window
* Refined the offset of underlines of inline code
* Enhanced the delete button style
* Modified the color blending mode for the status bar when the theme color chroma is 0
* Fine-tuned the background color of active tabs
* Slightly adjusted the thickness of global underlines

---

### v3.1.8

* 微调面板色饱和度
* 调整暗色模式下对话框背景遮罩滤镜饱和度
* 修复全宽显示的图片手动调整高度后显示异常的问题
* 修复 PDF 阅读器在亮色模式下使用暗色背景或相反时的背景色问题

<br />

* Adjusted the saturation of the panel colors.
* Modified the saturation of the dialog background mask filter in dark mode.
* Fixed the issue where images displayed abnormally after manually adjusting the height in full-width view.
* Resolved the background color issue in the PDF reader when using a dark background in light mode or vice versa.

---

### v3.1.7

* [删除线文本调整降低透明度](https://github.com/mustakshif/Asri/issues/94)
* 调整对话框样式
* 调整全局按钮样式
* 调整数据历史条目变动类型标识配色
* 修复内容块菜单不显示全宽显示选项的问题

<br />

* [Adjusted the transparency of strikethrough text.](https://github.com/mustakshif/Asri/issues/94)
* Modified the dialog box style.
* Altered the global button style.
* Changed the color scheme for data history entry change type indicators.
* Fixed the issue where the content block menu did not display the full-width display option.

---

### v3.1.6

* 调整代码块背景色
* 调整亮色模式下的文字颜色
* 调整暗色模式的主题背景色
* 调整设置面板大按钮的颜色
* 激活页签背景色改为跟随色度调整
* 调整数据库单选和多选列标签颜色和边框样式
* 区分编辑器活动和非活动状态下的激活页签样式
* 修复「保存查询条件」对话框的文本框错位问题
* 修复部分情况下色度滑块提示条和全宽显示菜单条目显示为「undefined」的问题

<br />

* Adjusted the background color of code blocks.
* Modified the text color in light mode.
* Changed the theme background color in dark mode.
* Altered the color of large buttons in the settings panel.
* Updated the activated tab background color to follow hue adjustments.
* Adjusted the color and border style of labels for single and multi-select columns in the database.
* Distinguished the styles of activated tabs in both active and inactive states of the editor.
* Fixed the misalignment issue of text boxes in the "Save Query Conditions" dialog.
* Resolved the issue where the hue slider tooltip and full-width display menu entries displayed as "undefined" in certain cases.

---

### v3.1.5

* 修复移动端全宽显示菜单显示异常的问题
* 修复侧边停靠栏堆放层叠变动导致的显示异常问题
* 修复主题色为灰度色是部分分割线颜色偏红的问题
* 尝试修复 iOS 端全宽显示菜单入口不显示的问题

<br />

* Fixed the issue of the full-width display menu showing abnormally on mobile devices.
* Resolved the display anomaly caused by the stacking layout changes in the side docks.
* Corrected the problem of the separator lines appearing reddish when the theme color was set to grayscale.
* Attempted to fix the issue of the full-width display menu entry not showing on iOS.

---

### v3.1.4

* ✨ 全宽显示支持从文档块和已适配内容块的块菜单中配置
* 移除已禁用菜单项目的鼠标悬停效果

<br />

* ✨ Full-width display support configured from the block menu of document blocks and compatible content blocks.
* Removed the hover effect for disabled menu items.

---

### v3.1.3

* 微调代码块背景色

<br />

* Adjusted the background color of code blocks.

---

### v3.1.2

* 适配思源 v3.1.4 代码块样式

<br />

* Adapted code block style of Siyuan v3.1.4

---

### v3.1.1

* PDF 阅读器背景色适配主题色
* 调整账号页面背景图样式
* 修复不同平台色彩差异的问题
* 修复非客户端上初次加载时高亮度底色上文字色不反转的问题

<br />

* Adapted the background color of the PDF reader to match the theme color.
* Adjusted the background image style on the account page.
* Fixed the color discrepancy issue across different platforms.
* Resolved the issue where text color did not invert on light backgrounds during the initial load on non-client platforms.

---

### v3.1.0

* ✨ 解除自定义主题色的明度限制，带来更丰富的色彩表现
* 重构主题 js
* 优化 Mac 端启用跟随系统强调色时对系统强调色变化的响应
* 调整菜单条目快捷键提示透明度
* 移除双击事件监听
* [修复将小窗页签以分屏形式拖回主界面时顶栏图标布局重叠的问题](https://github.com/mustakshif/Asri/issues/25)
* 修复文档树缩进线偶现刷新不及时的问题
* 修复打开或新建文档时偶现题头图区域元素重叠的问题

<br />

* ✨ Removed the lightness limitation for custom theme colors, resulting in richer color representation.
* Refactored the theme JavaScript.
* Optimized the response to system accent color changes when enabling the follow system accent color option on Mac.
* Adjusted the transparency of the menu item shortcut key hints.
* Removed the double-click event listener.
* [Fixed the issue of overlapping layout for top bar icons when dragging mini window tabs back to the main interface in split-screen mode](https://github.com/mustakshif/Asri/issues/25).
* Fixed the occasional delay in refreshing the indentation lines of the document tree.
* Fixed the occasional overlap of header image area elements when opening or creating documents.

---

### v3.0.22

* 优化浮动面板展开和收起时的动画曲线
* 调整暗色模式下选项卡背景色
* [修复窗口宽度较小时顶栏图标与侧栏顶部重叠的问题](https://github.com/mustakshif/Asri/issues/84)

<br />

* Optimized the animation curve for expanding and collapsing the floating panel.
* Adjusted the tab background color in dark mode.
* [Fixed the issue of overlapping between the top bar icons and the sidebar top when the window width is small](https://github.com/mustakshif/Asri/issues/84).

---

### v3.0.21

* 优化对话框文本内容的行间距
* 优化边框色随色度变化的效果
* 适配「（伪）文档面包屑」插件
* 修复色度为 0 时按文档分组的搜索结果中高亮条目背景色区分度不够的问题
* 移除数据库单选和多选列筛选菜单标签前多余空白

<br />

* Optimized the line height of dialog box text content.
* Improved the effect of border color changing with chroma.
* Adapted the "fake doc breadcrumb" plugin.
* Fixed the issue where the highlight entry background color in search results grouped by documents was insufficiently distinguishable when chroma was 0.
* Removed the extra whitespace before the labels of single and multi-select column filters in the database.

---

### v3.0.20

* 优化关系图节点和线条配色
* 修复搜索和替换筛选对话框布局问题

<br />

* Optimized the color scheme of relationship graph nodes and lines
* Fixed layout issues in the search and replace filter dialog box

---

### v3.0.19

* 适配 `自定义块样式` 插件列表转表格的样式
* 移除发布页面底部状态栏右侧多余空白
* 修复发布设置页面聚焦状态输入框边框裁切问题

<br />

* Adapted the style of the `Custom Block` plugin list-to-table format
* Removed the extra whitespace on the right side of the status bar at the bottom of the publication page
* Fixed the issue of focus state input box border cutting on the publish settings page

---

### v3.0.18

* 优化移动端默认字体样式
* 区分块引用动态和静态锚文本样式
* 数据库表头字体和图标的颜色跟随块外观样式
* [修复水平布局的超级块中标题块顶部边距不对齐的问题](https://github.com/mustakshif/Asri/issues/79)
* [修复无法导出为图片的问题](https://github.com/mustakshif/Asri/issues/80)
* 回滚移动端设置主菜单样式

<br />

* Optimized default font style for mobile devices.
* Differentiated dynamic and static anchor text styles in block quotes.
* Changed database table header font and icon colors to follow block appearance style.
* [Fixed top margin misalignment issue for heading blocks in horizontal layout of super blocks](https://github.com/mustakshif/Asri/issues/79).
* [Fixed issue where export to image was not possible](https://github.com/mustakshif/Asri/issues/80).
* Rolled back setting menu style for mobile devices.

---

### v3.0.17

* 优化移动端设置主菜单样式
* 更新全宽显示属性的文档示例
* 还原编辑区动态滚动条触发显示的范围
* [移动端编辑区动态滚动条改为常显](https://github.com/mustakshif/Asri/issues/78)
* 加粗对话框标题
* 减少数据库标题字重

<br />

* Optimized the main settings menu for mobile platform
* Updated documentation examples for full-width display properties
* Reverted the range for triggering the dynamic scrollbar display in the editing area
* [Changed the editing area dynamic scrollbar to always visible on mobile](https://github.com/mustakshif/Asri/issues/78)
* Bolded the dialog box titles
* Reduced the font weight of database titles

---

### v3.0.16

* 内置题头图对话框添加溢出渐隐
* 优化溢出渐隐的渐变流畅性
* 平衡数据库视图页签左右边距
* 数据库视图页签栏圆角适应正文字号

<br />

* Incorporated overflow fadeout for the built-in header images dialog.
* Optimized the gradient smoothness of the overflow fadeout.
* Balanced the left and right paddings of the database view tabs.
* Adjusted the rounded corners of the database view tabs to match the main text size.

---

### v3.0.15

* 适配代码块行号高亮背景色
* 修复数据库菜单中开关把手错位问题
* [更新设备平台检测相关的 body 元素类名](https://github.com/mustakshif/Asri/issues/75)

<br />

* Adapted code block line number highlighting background color
* Fixed the misalignment issue of the toggle handle in some database menus
* [Updated the device platform detection related body element class names](https://github.com/mustakshif/Asri/issues/75)

---

### v3.0.14

* 优化部分对话框侧栏导航样式
* 为更多对话框引入溢出渐隐
* 微调滑块样式

<br />

* Optimized the sidebar navigation style of some dialogs
* Introduced overflow fadeout for more dialogs
* Refined the slider style

---

### v3.0.13

* 优化只读模式下 HTML 块工具条样式
* 采用思源自带的 emojis 对话框属性作为选择器
* 移除部分多余 js 功能
* 修复文档顶部 `添加标签` 按钮错位问题

<br />

* Optimized the toolbar style of HTML blocks in read-only mode.
* Adopted SiYuan's built-in emojis dialog properties as selectors.
* Removed some redundant JavaScript functionalities.
* Fixed the misalignment issue of the "Add Tag" button at the top of the document.

---

### v3.0.12

* 统一对话框和页签中资源文件搜索列表样式
* 对话框标题改为居中
* 优化 `设置 - 搜索` 页面布局
* 去除对话框标题下的分割线
* [调整宽视口下 `/` 菜单宽度和栏数](https://github.com/mustakshif/Asri/issues/68)
* [修复标题为空时大纲层级标识位置偏移的问题](https://github.com/mustakshif/Asri/issues/69)
* 修复提示条内容为长文本时无法滚动的问题
* 修复在部分缩放比例下开关把手不居中的问题

<br />

* Standardized the resource file search list style in dialogs and tabs.
* Centered dialog titles.
* Optimized the layout of the `Settings - Search` page.
* Removed the separator line below dialog titles.
* [Adjusted the `/` menu width and column count under wide viewports](https://github.com/mustakshif/Asri/issues/68).
* [Fixed the issue with outline level indicators being misaligned when titles were empty](https://github.com/mustakshif/Asri/issues/69).
* Fixed the issue where long text in tooltips could not be scrolled.
* Fixed the issue where the toggle handle was not centered under certain scaling ratios.

---

### v3.0.11

* 修复 pdf 导出结果的字体色和背景色问题

<br/>

* Fixed font color and background color issues with PDF exports.

---

### v3.0.10

* 添加 PDF 阅读器侧边导航列表的溢出渐隐效果
* [提高文档树条目对字号和行高调整的适应性](https://github.com/mustakshif/Asri/issues/65)
* 优化设置面板设置项字重
* 优化侧栏面板分割线颜色
* 优化提示条中次要文本颜色
* 移除窗口失焦时停用模糊效果的特性
* 恢复顶栏图标鼠标悬停效果

<br />

* Added a overflow fade-out of the side navigation of the PDF reader.
* [Improved adaptability of document tree item to font size and line height adjustments](https://github.com/mustakshif/Asri/issues/65).
* Optimized font weight for settings panel items.
* Optimized color of divider in the sidebar panel.
* Optimized color of secondary text in tooltips.
* Removed the feature to disable the blur effect when the window loses focus.
* Restored mouse hover effect for icons in the top bar.

---

### v3.0.9

* 优化日语界面字体
* 恢复编辑区动态滚动条样式
* 微调数据库视图页签样式
* 修复数据库模版编辑文本框显示问题
* 修复数据库换行开关不居中的问题
* 解决部分插件样式冲突

<br />

* Optimized Japanese interface font.
* Restored dynamic scrollbar style in the editing area.
* Fine-tuned database view tabs' style.
* Fixed the issue of input box display in the database template editing menu.
* Fixed the problem of misalignment in the database line break switch.
* Resolved some plugin style conflicts.

---

### v3.0.8

* [移动端支持全宽显示](https://github.com/mustakshif/Asri/issues/63)
* [优化不同视口宽度下的表格显示](https://github.com/mustakshif/Asri/issues/62)
* 优化集市卡片渲染性能
* 优化命令面板样式
* 优化布局菜单中高亮条目时间部分的颜色
* 优化账号页面头衔标识的显示
* 搜索列表文字颜色适配新色彩系统
* [修复移动端闪卡复习界面按钮间距过大的问题](https://github.com/mustakshif/Asri/issues/61)

<br />

* [Support full-width display on mobile devices](https://github.com/mustakshif/Asri/issues/63)
* [Optimized table display in different viewport widths](https://github.com/mustakshif/Asri/issues/62)
* Optimized rendering performance of marketplace cards
* Improved styling of the command panel
* Enhanced the color of the date & time for highlighted items in the `Layout` menu
* Improved the display of title badges in the account page
* Adapted the text color in the search list to the new color system
* [Fixed the issue of excessive button spacing in the flashcard review interface on mobile devices](https://github.com/mustakshif/Asri/issues/61)

---

### v3.0.7

* 采用 Notion 多级列表序号样式
* `背景颜色1` 改为无色 + 边框
* 添加文档标签背景色，增加与题头图的区分度
* 优化题头图位置调整提示条的定位
* 集市包侧栏信息数据部分加粗
* 优化引述块中数据库表头的颜色
* 数据库视图页签区域适配编辑器字号
* [修复删除线样式无法叠加其他行内样式的问题](https://github.com/mustakshif/Asri/issues/59)

<br />

* Implemented the Notion multi-level list numbering style.
* Set `background color 1` to transparent with a border.
* Added background color to document tags for better differentiation from cover images.
* Improved the positioning of the prompt bar for adjusting the header image position.
* Made the sidebar information data in the marketplace package bold.
* Optimized the background color of the database header in the quote block.
* Adapted the size of the database view tab area to the editor font size.
* [Fixed the issue where the strikethrough style couldn&apos;t be combined with other inline styles](https://github.com/mustakshif/Asri/issues/59).

---

### v3.0.6

* 适配思源 v3.0.12 文档标题区域新布局
* 优化文档标签、查询条件标签的样式
* 填充数据库菜单高亮项目中文本框的背景色
* [微调集市卡片动态宽度](https://github.com/mustakshif/Asri/issues/57)
* 修复数据库视图页签图标不居中的问题
* 修复搜索类型脚注显示不全的问题
* 修复集市包详情页面表格无法横向滚动的问题

<br />

* Adapted the layout of the document title area in SiYuan v3.0.12.
* Optimized the styles of document tags and saved query criteria condition tags.
* Filled the background color of the input box in the database menu highlight item.
* [Fine-tuned dynamic width of marketplace item cards](https://github.com/mustakshif/Asri/issues/57).
* Fixed the issue where the icon of the database view tab was not centered.
* Fixed the issue where the footnote for search type was not fully displayed.
* Fixed the issue where the table on the market package details page could not be scrolled horizontally.

---

### v3.0.5

* 新增侧栏面板、面包屑、代码片段滚动区域的溢出渐隐
* 外观样式颜色、PDF 高亮色选项添加边框
* 减少块高亮时和嵌入块中的数据库表头与块背景色的色差
* 文本框提示文字、文本格式工具条图标、表格斑马条纹背景颜色适配新色彩系统
* PDF 标注颜色跟随 PDF 阅读器亮暗色模式
* 调整行内标签元素颜色
* 调整消息框中的按钮样式
* 修复 Safari 上色彩系统兼容性问题
* [修复无法导出文档为图片的问题](https://github.com/mustakshif/Asri/issues/47)
* [移除代码块语言类型区域背景模糊](https://github.com/mustakshif/Asri/issues/52)
* [移除闪卡界面面包屑固定高度](https://github.com/mustakshif/Asri/issues/53)
* [修复 Safari 上集市包信息页面渲染错误的问题](https://github.com/mustakshif/Asri/issues/55)

<br />

* Added overflow fade-out to side panels, breadcrumbs, and code snippet dialog.
* Added border for appearance colors and PDF highlighting colors.
* Reduced color difference between database headers and block backgrounds when highlighted.
* Adapted placeholder text, text format toolbar icons, and table zebra stripe background color to the new color system.
* PDF annotation colors now follow the light/dark mode of the PDF reader.
* Adjusted color of inline tags.
* Adjusted button style in message boxes.
* Fixed compatibility issue with color system on Safari browser.
* [Fixed issue where document cannot be exported as an image](https://github.com/mustakshif/Asri/issues/47).
* [Removed background blur in code block language section](https://github.com/mustakshif/Asri/issues/52).
* [Removed fixed height of breadcrumb in flashcard interface](https://github.com/mustakshif/Asri/issues/53).
* [Fixed rendering error on marketplace package information page in Safari browser](https://github.com/mustakshif/Asri/issues/55).

---

### v3.0.4

* 新增色度调节，替换 `启用纯灰度中性色` 选项，用于自定义背景和普通文本色彩浓度
* 优化 PDF 高亮标注颜色
* 优化数据库资源列中超链接和资源链接的样式
* 开关按钮、文档计数器颜色适配新色彩系统
* 缩小数据库标签和图标尺寸
* 恢复数据库视图 emoji 图标的垂直居中
* [保持文档块标垂直居中于文档标题](https://github.com/mustakshif/Asri/issues/45)
* 修复数据库关联列单元格编辑菜单布局问题

<br />

* Added `Chroma slider` to replace the `Use grayscale neutral colors` option for customizing the background and text color intensity
* Optimized PDF highlight annotation colors
* Optimized the style of hyperlinks and resource links in the database assets columns
* Adapted the switch button and document counter colors to the new color system
* Reduced the size of database tags and icons
* Restored vertically centered emoji icons in the database view
* [Keep document block icons vertically aligned with document titles](https://github.com/mustakshif/Asri/issues/45)
* Fixed layout issue with the cell edit menu in the database relation column

---

### v3.0.3

* [重新设计底栏，合并底栏和状态栏](https://github.com/mustakshif/Asri/issues/37)
* [重新设计数据库标签配色和外观颜色组合，保持感知亮度一致](https://github.com/mustakshif/Asri/issues/44)
* 调整标签包裹块引用行内元素的样式
* 微调纯灰度模式下聚焦列表项的背景色
* 优化搜索结果为空时高亮文字的显示
* 统一各处数据库标签的圆角样式
* [修复使用`替换图片背景` 插件时 pdf 等区域背景颜色异常](https://github.com/mustakshif/Asri/issues/37)
* [修复关系图搜索框不遮盖其余图标的问题](https://github.com/mustakshif/Asri/issues/41)

<br />

* [Redesigned the bottom bar, merging it with the status bar](https://github.com/mustakshif/Asri/issues/37)
* [Redesigned the database tag color and appearance color combinations, maintaining consistent perceived lightness](https://github.com/mustakshif/Asri/issues/44)
* Adjusted the style of block reference elements wrapped in the tag span element
* Fine-tuned the background color of focused list items in pure grayscale mode
* Optimized the display of highlighted text when search results are empty
* Unified the border radius of database tags gloabally
* [Fixed the background color missing in areas like PDF when using the `Background Cover` plugin](https://github.com/mustakshif/Asri/issues/37)
* [Fixed the issue of the relation graph search bar not covering other icons](https://github.com/mustakshif/Asri/issues/41)

---

### v3.0.2

* 优化数据库搜索框样式
* 优化数据库列操作、页签大纲等处图标的间距
* [视觉平衡引述块、嵌入块内边距](https://github.com/mustakshif/Asri/issues/38)
* 去除移动端页面右侧空白区域
* 减弱网络图片角标的视觉效果，减少多图时的页面卡顿
* 修复某些情况下搜索窗口和文件历史窗口跳动、闪烁的问题
* 修复切换至其他主题时残留部分 Asri 主题样式属性的问题
* 修复主题 js 造成的 iOS 和 iPadOS 应用闪退的问题
* [适配 `Knote` 插件工具栏的布局](https://github.com/mustakshif/Asri/issues/36)
* [修复底部停靠栏背景色异常](https://github.com/mustakshif/Asri/issues/37)
* [修复移动端亮色模式下应用界面状态栏颜色异常](https://github.com/mustakshif/Asri/issues/39)

<br />

* Optimized the style of the database search box.
* Optimized the spacing between icons in database, tab outlines, etc.
* [Improved the visual balance of block quotes and embedded block padding](https://github.com/mustakshif/Asri/issues/38).
* Removed the blank area on the right side of the mobile page.
* Reduced the visual effect of network image badges and decreased page lag when multiple images are present.
* Fixed the issue of the search window and file history window‘s jumping and flickering in certain situations.
* Fixed the problem where Asri theme style properties remained when switching to other themes.
* Fixed the issue of application crashes caused by the theme JavaScript on iOS and iPadOS.
* [Adapted the layout of the `Knote` plugin toolbar](https://github.com/mustakshif/Asri/issues/36).
* [Fixed the abnormal background color of the bottom dock](https://github.com/mustakshif/Asri/issues/37).
* [Fixed the abnormal status bar color in the light mode on mobile.](https://github.com/mustakshif/Asri/issues/39).

---

### v3.0.1

* 优化 Asri 配置菜单 `自定义主题色` 点击响应逻辑
* 优化数据库链接的鼠标悬停效果
* 调大文档树和菜单项中的 emoji 图标
* 垂直居中对齐在页签中的自定义 emoji `#macOS`
* 调整激活状态页签、列表选中条目、侧栏面板标题等元素的颜色
* 调整数据库多选项目菜单右侧图标颜色
* 恢复集市包侧栏信息上下居中
* [集市加载页面和空列表提示语居中显示](https://github.com/mustakshif/Asri/issues/35)
* 修复主题新色彩空间造成的兼容性问题 [[issue #34](https://github.com/mustakshif/Asri/issues/34)][[社区帖子](https://ld246.com/article/1712109653766)]
* 修复首次应用主题时新版配色不立即生效的问题

<br />

* Optimized the response logic of the `Custom Theme Color` in Asri configuration menu.
* Improved the mouse hover effect for links in database.
* Enlarged the emoji icons in the document tree and menu items.
* Vertically aligned the custom emoji in tab headers. `#macOS`
* Adjusted the colors of active tabs, selected list items, and sidebar panel titles.
* Changed the color of icons on the right side of the database multi-selection menu.
* Centered the information in the sidebar of marketplace packages.
* [Centered the loading page and empty list prompt in the marketplace](https://github.com/mustakshif/Asri/issues/35).
* Fixed compatibility issues caused by the new color space introduced in the theme [[issue #34](https://github.com/mustakshif/Asri/issues/34)][[community post](https://ld246.com/article/1712109653766)].
* Fixed the issue where the new color scheme for themes was not immediately applied.

---

### v3.0.0

* 🎨 采用基于感知亮度的色彩系统重构主题配色，全局色调支持无级调节，也可跟随系统强调色（`#Windows` `#macOS`），带来完全个性化的笔记体验

<br />

* 🎨 Refactored theme colors using a perceptual lightness-based color system, added supports for seamless adjustment of global color tones which can also follow system accent color (`#Windows` `#macOS`), providing a fully personalized note-taking experience.

---

### v2.1.16

* 优化集市「全部更新」板块样式
* 修改面包屑路径指示为斜线样式
* 微调 emoji 鼠标悬停动效
* [修复收集箱返回按钮丢失的问题](https://github.com/mustakshif/Asri/issues/31)
* [修复宽屏下表情菜单过窄的问题](https://github.com/mustakshif/Asri/issues/30)

<br />

* Optimized style for the "All Updates" section in the marketplace.
* Changed breadcrumb path indicator to use slash style.
* Adjusted mouse hover animation for emojis.
* [Fixed the issue of missing return button in the Inbox panel](https://github.com/mustakshif/Asri/issues/31).
* [Fixed the issue of narrow emoji menu in wide screens](https://github.com/mustakshif/Asri/issues/30).

---

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

<br />

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
* Fixed an issue where the capital letter "M" would change to the "MIUI" glyph on Xiaomi mobile devices with the default font.

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
