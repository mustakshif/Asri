English | [简体中文](https://github.com/mustakshif/Asri-for-SiYuan/blob/main/README_zh_CN.md)

<!-- [![Releases](https://img.shields.io/github/downloads/mustakshif/Asri/total?label=Downloads&color=477BF9&style=flat)](https://github.com/mustakshif/Asri/releases/latest)
[![Stars](https://img.shields.io/github/stars/mustakshif/Asri?style=flat)](https://star-history.com/#mustakshif/Asri) -->

<br/>

![banner](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/banner_v20.png)

# Asri, theme for SiYuan

An ultra-modern theme for [SiYuan Note](https://github.com/siyuan-note/siyuan), delivers an elegant, efficient, and personalized note-taking experience through its clean, intuitive design.

## Latest Updates

### v3.1.15

* Enhanced block highlighting state styles and transition animations
* Improved delete button styling
* Added underline style support for inline formulas

### v3.1.14

* Adapted style changes for SiYuan v3.1.11
* Optimized the size and shape of PDF annotation highlights
* Fixed high CPU usage on mobile devices caused by theme styling
* Fixed persistent display of database entry checkboxes in non-full-width-display mode

### ...

### v3.0.0

![custom theme color preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri@main/doc/theme-config_en_US.gif)

🎨 Refactored theme colors using a perceptual lightness-based color system, added supports for seamless adjustment of global color tones which can also follow system accent color (`#Windows` `#macOS`), providing a fully personalized note-taking experience. (Check *Theme Configurations* below for configuration options information)

Check all updates [here](./CHANGELOG.md).

## Theme Features

### 🪄 Sleek and Modern Design

 * 👨‍🎨 Unlimited theme color options allow for a fully personalized note-taking experience[^1]
* ⚖️ Top-bar Fusion seamlessly integrates the top bar and the tab bar[^2]
* 🧊 Glassmorphism enhances the visual hierarchy
* 🌓 Support for light and dark modes and smooth transition between them
* ➖ Minimized dividers create an integrated, cohesive interface style
* ⚙️ Modernized designs for multiple kinds of components

### 📐 Elegant and Efficient Layout

* 🔢 Tabular and database-friendly monospaced numerals improve reading efficiency
* 👁️ High readability glyph variants tailored for note-taking scenarios[^3] `#macOS` `#iOS` `#iPadOS`
* 🛋️ Different font smoothing for light and dark modes to maintain visual consistency in font weight `#macOS` `#iOS` `#iPadOS`
* 🦋 Support for full-width display of images, videos, widgets, databases, superblocks and more, providing diverse layout options
* 🚏 Document-level text direction settings cater to different language layout needs
 * 🧩 Streamlined superblock margins for simplified creation of grid and masonry layouts

### 🧭 Convenient and Clear Navigation

* 🗂️ Indent guides for file tree and outline
* 🔍 Clear presentation of search results and backlinks lists
* ↕️ Enabled native scrollbar, which can auto-hide to minimize visual clutter[^4] `#macOS`

### 👆 Nimble and Smooth Interaction

* ⏱️ Optimized timing of animations for better interface feedback, reducing user distraction
* 💫 Appropriate and lively animations enrich the interactive experience
* 🚀 A high level of smooth performance maintained

[^1]: This new feature is only available on platforms that support `oklch()` and its relative color syntax. Some devices will still use color schemes in previous versions due to lower browser kernel versions.

[^2]: The blank area of the top bar can be used to drag the window (except for the gap between tabs).

[^3]: To disable this feature or address glyph errors when using custom fonts, you can use the following CSS code snippet to restore to standard glyphs:
    ```CSS
    .layout-tab-container, .protyle-content, .b3-typography {
        font-feature-settings: normal !important;
    }
    ```

[^4]: To automatically hide the scrollbars, go to "System Settings - Appearance" and set "Show scroll bars" to "When scrolling".

## Getting Started

* **Download & update in SiYuan (recommended)**: Go to `Settings - Marketplace - Themes` in SiYuan and search for "Asri" to download and apply.
* Download & update from GitHub: Download the `package.zip` from releases, extract it to `conf/appearance/themes` in your SiYuan workspace, and restart SiYuan. Then choose "Asri" in your theme list in `Settings - Appearance`.

## Theme Configurations

### 🌈 Customizing Theme Colors
![asri config menu](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/asri-config-menu_en_US_v2.png)

Click on the `Appearance Mode` icon in the top right corner to open the Asri theme configuration menu and customize the theme colors:

* `Customize theme color`: Use a custom color as the base color for the theme and apply a corresponding color scheme directly based on it.
* `Follow system accent color`: Use the system's accent color as the base theme color. This option is available on `Windows` and `macOS` desktop platforms.
* `Chroma slider`: Adjust the chroma of backgrounds and regular texts, with a range of `0 - 5`, where `0` represents pure grayscale, and the default is `1`.

### 📐 Custom Attributes

#### 1. `afwd`: Asri full-width display

![full-width-display preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/custom-attributes-preview_v7.gif)

This attribute allows blocks to be displayed in full page width, which can be used to emphasize specific content or beautify the layout. The full-width display style applies to images, databases, iframes, tables and horizontal-layout superblocks.

To enable full-width display, you can click on the block icons for **Document Block** and **the content block mentioned above**, then select `Full-width Display` in the popup menu to configure it accordingly.

This feature relies on the custom attributes of SiYuan, so you can also manually configure the block attributes. The attribute name and values are shown in the table below:

| Attribute | Value | Description |
| --- | --- | --- |
| `afwd`　　 | - `all` (Makes all blocks that support this attribute in the document display in full width)<br />- `p` (Makes all images in the document display in full width)<br />- `db` (Makes all database blocks in the document display in full width)<br />- `iframe` (Makes all iframe blocks in the document display in full width, including videos, widgets, and embedded web pages)<br />- `sb` (Makes all **horizontal-layout** superblocks in the document display in full width)<br />- `t` (Makes all table blocks in the document display in full width) | Applies to document blocks.<br />All attribute values except `all` can be used simultaneously, and should be separated by **spaces** |
| `afwd`　　 |- `on` (Enable full-width display of the block individually)<br />- `off` (Disable full-width display of the block individually) | Applies to paragraph blocks, database blocks, iframe blocks, superblocks and table blocks.|

##### <em>Precautions</em>

* Full-width display only applies to the **first-level** blocks in the document. If a block is nested in other content blocks, applying this attribute to it will not produce any effect. For example, applying this attribute to an image paragraph block in a blockquote will not change the style of the paragraph block unless the external blockquote is cancelled.
* Full-width display is only effective in the editing area of the main window and small windows, and does not work in block reference preview windows, export previews, backlink panel, search result previews, etc.
* Enabling full-width display may cause the page to feel more jumpy when the editing area's size changes and automatically returns to the cursor position.

#### 2. `tdir`: Document text direction

Applies exclusively to document blocks, ensuring that content within the block is consistently rendered from left-to-right or right-to-left for ease of writing and reading. This property is independent of global settings and does not override individual layout settings of blocks within the document.

| Attribute | Value | Description |
| ------ | ------ | ------ |
| `tdir`               | `ltr`                | Renders document content from left to right, ideal for left-to-right languages like Chinese and English. |
| `tdir`               | `rtl`                | Renders document content from right to left, ideal for right-to-left languages like Arabic.        |

This attribute does not take effect in backlink lists and export previews.

## Acknowledgements

The theme development process drew inspiration from the following sources, and I would like to express my gratitude to their authors:

| Reference Content | Source | Author |
| --- | --- | --- |
| - Menu background blur | Theme: [Cliff-Dark](https://github.com/chenshinshi/Cliff-Dark) | [Crowds21](https://github.com/chenshinshi) |
| - Dots before sidebar panel list items<br />- Outline list item icons<br />- Status bar<br />- Seach list<br />- Table column width<br />- Multi-column `/` menu<br />- Bottom dock & status bar mergence<br />- Multilevel list style | Theme: [Savor](https://github.com/royc01/notion-theme)         | [Roy](https://github.com/royc01)           |
| - Topbar-tabbar mergence<br />- File tree indent guides<br />- MutationObserver related functions | Theme: [Rem Craft](https://github.com/svchord/Rem-Craft) | [Seven Chord](https://github.com/svchord) |
| - File tree indent guides | [Liandi post](https://ld246.com/article/1724305128590#comments) | [wilsons](https://ld246.com/member/wilsons) |

（The order in the list above does not imply any ranking）

## Feedbacks & suggestions
- Create an issue or PR at [the project page](https://github.com/mustakshif/Asri/)
- Send an email to mustakshif@icloud.com

## Notes

* Settings window's dragable area is cut to the top area of the left column.
* The close button in the upper right corner of the dialog box is hidden. To close the dialog box, click anywhere outside the dialog box.

<!--## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mustakshif/Asri&type=Date)](https://star-history.com/#mustakshif/Asri&Date)-->