English | [简体中文](https://github.com/mustakshif/Asri-for-SiYuan/blob/main/README_zh_CN.md)

<!-- [![Releases](https://img.shields.io/github/downloads/mustakshif/Asri/total?label=Downloads&color=477BF9&style=flat)](https://github.com/mustakshif/Asri/releases/latest)
[![Stars](https://img.shields.io/github/stars/mustakshif/Asri?style=flat)](https://star-history.com/#mustakshif/Asri) -->

# Asri · When the Interface Fades, the Mind Emerges

Asri is a modern theme designed for [SiYuan Note](https://github.com/siyuan-note/siyuan), crafting a space where visual distractions disappear and your thinking takes center stage - immersive, focused, and intuitively guided.

## Changelog

To view the details of the latest release, please visit the [Releases Page](https://github.com/mustakshif/Asri/releases).

For the complete update history, refer to the [CHANGELOG.md](https://github.com/mustakshif/Asri/blob/main/CHANGELOG.md).

### Major Updates Overview

#### `Jul 1, 2025 - v3.5.0`

Theme colors now support "Follow cover image color", automatically extracting colors from document cover images or videos and switching theme colors in real-time.

![luminous frost glass](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/luminous-frost-glass_v3.jpg)

`v3.5.4` introduces HDR UI components, presenting a more futuristic and tech-inspired design in HDR-supported screens and browser environments (automatically enabled when the theme chroma is 0).

<p style="font-size: .5em"></p>
<details>
<summary style="opacity: .6; font-weight: 600; font-size: .8em">More Content</summary>

#### `Dec 21, 2025 - v3.6.0` (no longer supported in v3.7.0)

![vibrancy effect](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/vibrancy.webp)

The main interface now supports window transparency effects, compatible with macOS and Windows (11 22H2 and up, with Energy Saver off) desktop environments.

#### `May 12, 2025 - v3.4.0: Vision Unbound` (temporarily removed)

![tfp](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/tfp_v3.png)

"Topbar Fusion<span style="background-clip: text !important; background: radial-gradient(circle at left, #6FA1F9 27%, #6746CB 63%); color: #0000">**+**</span>": Introduced advanced material effects (luminous glass, progressive blur, acrylic), breaking the boundary between the top bar and the editor for an immersive reading and editing experience (experimental feature; enable with caution - see Footnote 3 for details).

#### `Apr 3, 2024 - v3.0.0`

![color customization](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/asri-config-menu_en_US_v2.png)

Refactored theme colors using a perceptual lightness-based color system, added supports for seamless adjustment of global color tones which can also follow system accent color (`#Windows` `#macOS`), providing a fully personalized note-taking experience.

#### `Feb 7, 2024 - v2.1.0`

"Asri Full-width Display": implementing full-page width display of images, videos, widgets, superblocks, and database blocks, etc

#### `Jan 24, 2024 - v2.0.0`

"Tabbar Fusion": introduced a new top bar design seamlessly integrated with the tab bar, balancing aesthetics and efficiency

#### `Dec 21, 2023 - v1.0.0`

Theme release

</details>

## Theme Features

<!-- ![banner](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/banner_v22.png) -->

### Sleek and Modern Design

- 👨‍🎨 continuously adjustable theme color customization, crafting a highly personalized note space for you[^1]
- 🎨 Color scheme based on human brightness perception for harmonious, non-intrusive visuals
- 🧊 Glassmorphism enhances the visual hierarchy
- 🌓 Support for light and dark modes and smooth transition between them
- ➖ Minimized dividers create an integrated, cohesive interface style

### Elegant and Efficient Layout

- 🔢 Tabular and database-friendly monospaced numerals improve reading efficiency
- 👁️ High readability glyph variants tailored for note-taking scenarios[^2] `#macOS` `#iOS` `#iPadOS`
- 🦋 Support for full-width display of images, videos, widgets, databases, superblocks and more, enhancing information display
- 📝 Enhanced the layout details in database and attribute view for improved clarity and organization
- 💬 Supports right-to-left layout, accommodating languages written from right to left, such as Arabic[^3]
- 🚏 Document-level typography direction settings cater to different language layout needs
- 🌐 Multi-language support, specially adapted for Chinese, English and Arabic
- 📐 Automatically add a quarter-width space between CJK and Western characters

### Clear and Convenient Navigation

- 🗂️ Well-structured document tree and indentation guide lines
- 🔍 Hierarchically organized search and backlink panels
- ↕️ Native system scrollbars[^4] `#macOS`

### Fluid and Lively Interactions

- 💫 Carefully tuned lively animations add warmth and rhythm to interactions
- ⏱️ Refined animation triggers and frequency enhance interface response rhythm and minimize attention drift

### Meticulous Visual Details

- 🌁 Global gradient fades soften element edges and reduce visual fragmentation
- 🌄 Parallax scrolling for header images
- 🛋️ Optimized font rendering strategies per light/dark mode to maintain consistent perceived weight `#macOS` `#iOS` `#iPadOS`
- 🚥 Subtle repositioning of window control buttons for enhanced native system alignment `#macOS`

[^1]: This new feature is only available on platforms that support `oklch()` and its relative color syntax. Some devices will still use color schemes in previous versions due to lower browser kernel versions.
[^2]: To disable this feature or address glyph errors when using custom fonts, you can use the following CSS code snippet to restore to standard glyphs:

    ```CSS
    .layout-tab-container, .protyle-content, .b3-typography {
        font-feature-settings: normal !important;
    }
    ```

[^3]: Due to the limited theming functionality, the UI layout direction of some interfaces cannot be fully modified.
[^4]: To automatically hide the scrollbars, go to macOS "System Settings - Appearance" and set "Show scroll bars" to "When scrolling".

## Getting Started

- **Download & update in SiYuan (recommended)**: Go to `Settings - Marketplace - Themes` in SiYuan and search for "Asri" to download and apply.
- Download & update from GitHub: Download the `package.zip` from releases, extract it to `conf/appearance/themes` in your SiYuan workspace, and restart SiYuan. Then choose "Asri" in your theme list in `Settings - Appearance`.

## Theme Configurations

### Customizing Theme Colors

![custom theme color preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri@main/doc/theme-config_en_US.gif)

Click on the `Appearance Mode` icon in the top right corner to open the Asri theme configuration menu and customize the theme colors:

- `Customize theme color`: Use a custom color as the base color for the theme and apply a corresponding color scheme directly based on it.
- `Follow system accent color`: Use the system's accent color as the base theme color. This option is available on `Windows` and `macOS` desktop platforms.
- `Follow cover image color`: Extract color from the cover image (image, video) of the current active document as the theme base color.
- `Chroma slider`: Adjust the chroma of backgrounds and regular texts, with a range of `0 - 5`, where `0` represents pure grayscale, and the default is `1`.

### Custom Attributes

#### 1. `afwd`: Asri full-width display

![full-width-display preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/doc/custom-attributes-preview_v7.gif)

This attribute allows blocks to be displayed in full page width, which can be used to emphasize specific content or beautify the layout. The full-width display style applies to images, databases, iframes, tables and horizontal-layout superblocks.

To enable full-width display, you can click on the block icons for **Document Block** and **the content block mentioned above**, then select `Full-width Display` in the popup menu to configure it accordingly.

##### <em>Precautions</em>

- Full-width display only applies to the **first-level** blocks in the document. If a block is nested in other content blocks, applying this attribute to it will not produce any effect. For example, applying this attribute to an image paragraph block in a blockquote will not change the style of the paragraph block unless the external blockquote is cancelled.
- Full-width display is only effective in the editing area of the main window and small windows, and does not work in block reference preview windows, export previews, backlink panel, search result previews, etc.
- Enabling full-width display may cause the page to feel more jumpy when the editing area's size changes and automatically returns to the cursor position.

<p style="font-size: .5em"></p>
<details>
<summary style="opacity: .6; font-weight: 600; font-size: .8em">More Details</summary>
This feature relies on the custom attributes of SiYuan, so you can also manually configure the block attributes. The attribute name and values are shown in the table below:

| Attribute  | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Description                                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `afwd`　　 | - `all` (Makes all blocks that support this attribute in the document display in full width)<br />- `p` (Makes all images in the document display in full width)<br />- `db` (Makes all database blocks in the document display in full width)<br />- `iframe` (Makes all iframe blocks in the document display in full width, including videos, widgets, and embedded web pages)<br />- `sb` (Makes all **horizontal-layout** superblocks in the document display in full width)<br />- `t` (Makes all table blocks in the document display in full width) | Applies to document blocks.<br />All attribute values except `all` can be used simultaneously, and should be separated by **spaces** |
| `afwd`　　 | - `on` (Enable full-width display of the block individually)<br />- `off` (Disable full-width display of the block individually)                                                                                                                                                                                                                                                                                                                                                                                                                            | Applies to paragraph blocks, database blocks, iframe blocks, superblocks and table blocks.                                           |

</details>

#### 2. `tdir`: Document text direction

Applies exclusively to document blocks, ensuring that content within the block is consistently rendered from left-to-right or right-to-left for ease of writing and reading. This property is independent of global settings and does not override individual layout settings of blocks within the document. This attribute does not take effect in backlink lists and export previews.

To apply this property to a document, you can click on the block icon for **Document Block**, then select `Doc layout direction` in the popup menu.

<p style="font-size: .5em"></p>
<details>
<summary style="opacity: .6; font-weight: 600; font-size: .8em">More Details</summary>

| Attribute | Value | Description                                                                                              |
| --------- | ----- | -------------------------------------------------------------------------------------------------------- |
| `tdir`    | `ltr` | Renders document content from left to right, ideal for left-to-right languages like Chinese and English. |
| `tdir`    | `rtl` | Renders document content from right to left, ideal for right-to-left languages like Arabic.              |

</details>

## Acknowledgements

The theme’s early development drew inspiration from the following sources, for which I would like to express my gratitude to their authors:

| Reference Content                                                                                                                                                                                                                      | Source                                                         | Author                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------ |
| - Menu background blur                                                                                                                                                                                                                 | Theme: [Cliff-Dark](https://github.com/chenshinshi/Cliff-Dark) | [Crowds21](https://github.com/chenshinshi) |
| - Dots before sidebar panel list items<br />- Outline list item icons<br />- Status bar<br />- Seach list<br />- Table column width<br />- Multi-column `/` menu<br />- Bottom dock & status bar mergence<br />- Multilevel list style | Theme: [Savor](https://github.com/royc01/notion-theme)         | [Roy](https://github.com/royc01)           |
| - Topbar-tabbar mergence<br />- File tree indent guides<br />- MutationObserver related functions                                                                                                                                      | Theme: [Rem Craft](https://github.com/svchord/Rem-Craft)       | [Seven Chord](https://github.com/svchord)  |

## Feedbacks & suggestions

- Create an issue or PR at [the project page](https://github.com/mustakshif/Asri/)
- Send an email to mustakshif@icloud.com

<!--## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mustakshif/Asri&type=Date)](https://star-history.com/#mustakshif/Asri&Date)-->
