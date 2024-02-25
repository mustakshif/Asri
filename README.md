English | [简体中文](https://github.com/mustakshif/Asri-for-SiYuan/blob/main/README_zh_CN.md)

<br/>

![banner](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/banner_v17.png)

# Asri, a theme for SiYuan

An ultra-modern theme for [SiYuan Note](https://github.com/siyuan-note/siyuan), provides an elegant and efficient note-taking experience with its lightweight and minimalistic style.

## Latest Updates

### v2.1.9

ℹ️ The attribute name for full-width display has been changed to `afwd`. Check theme documentation for details. The previous version's attribute name `asri-full-width-display` will be deprecated in future updates.

* Optimized the style of the network image badge.
* Unified the margin of the marketplace item cards container.
* Adjusted the inner padding of the database view tab.
* Changed the color of the checked state of the database checkbox attribute to the primary color.
* Fixed the issue where the outline tab overlapped with the top bar when the docks and side panels were hidden.
* Fixed the abnormal display of highlighted keywords in search results in some cases.
* Fixed the abnormal background color of the edit menu for keys in the database relation columns.

Check all updates [here](./CHANGELOG.md).

## Theme Features

### 🪄 Aesthetically Enhanced Efficiency

* ⚖️ Introducing Top-bar Fusion, seamlessly integrating the top bar and the tab bar[^1]<sup>, </sup>[^2]
* 🧊 Introduction of glassmorphism, enhancing the visual hierarchy
* 🌅 Removal of unnecessary spacing between app's layout blocks, expanding the display range
* 🌓 Support for light and dark modes

[^1]: The blank area of the top bar can be used to drag the window (except for the gap between tabs).

[^2]: If top bar icons or dividers appear misaligned or overlapped, resizing the edit area or app window may fix it.

### 📐 Flexible and Elegant Layout

* 🧩 Optimized internal and external spacing of superblocks, making it easy to achieve grid and masonry layouts
* 🦋 Support for full-width display of images, videos, widgets, databases, superblocks and more, providing diverse formatting layouts
* ➖ Simplified dividers, creating an integrated, refreshing and tidy layout style
* 🔛 Width-adaptive layout, making full use of screen space
* 🚥 Adjusted the position of macOS traffic lights, optimizing the layout rhythm

### 🧭 Convenient and Clear Navigation

* 🗂️ Added indent guides for file tree and outline
* 🔍 Optimized the display of search lists and backlink lists
* ↕️ Applied system scrollbar on macOS, which can be hidden automatically and reduce visual interference

### 👆 Delicate and Smooth Interaction

* ⏱️ Improved animation responding timing to optimize interface feedback frequency and reduce distraction
* ⚙️ Redesigned the styles of controls for iFrame, videos, images, etc.
* 💫 Appropriately added lively animations, enriching the interactive experience
* 🚀 Maintained a high level of smooth performance

## Getting Started

* **Download & update in SiYuan (recommended)**: Go to `Settings - Marketplace - Themes` in SiYuan and search for "Asri" to download and apply.
* Download & update from GitHub: Download the `package.zip` from releases, extract it to `conf/appearance/themes` in your SiYuan workspace, and restart SiYuan. Then choose "Asri" in your theme list in `Settings - Appearance`.

## Custom Attribute

### Asri full-width display (`afwd`)

![full-width-display preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/custom-attributes-preview_v7.gif)

This attribute allows blocks to be displayed in full page width, which can be used to emphasize specific content or beautify the layout. The full-width display style applies to images, databases, iframes, and horizontal-layout superblocks.

| Attribute | Value | Description |
| --- | --- | --- |
| `afwd`　　 | - `all` (Makes all blocks that support this attribute in the document display in full width)<br />- `p` (Makes all images in the document display in full width)<br />- `db` (Makes all database blocks in the document display in full width)<br />- `iframe` (Makes all iframe blocks in the document display in full width, including videos, widgets, and embedded web pages)<br />- `sb` (Makes all **horizontal-layout** superblocks in the document display in full width) | Applies to document blocks.<br />All attribute values except `all` can be used simultaneously, and should be separated by **spaces** |
| `afwd` | - `on` (Enable full-width display of the block individually)<br />- `off` (Disable full-width display of the block individually) | Applies to paragraph blocks, database blocks, iframe blocks, superblocks.|

#### Usage Examples

Applied to document blocks:

| Attribute | Value |
| --- | --- |
| `afwd` | `all`         |
| `afwd` | `p sb iframe` |
| `afwd` | `db`          |
| `afwd` | ...   |

Applied to supported content blocks:

| Attribute | Value |
| --- | --- |
| `afwd` | `on`   |
| `afwd` | `off`  |

In addition to adding custom attributes by <kbd>shift + click block icon</kbd> - <kbd>Custom</kbd>, you can also use the `Attribute Quick Add` plugin to quickly add this attribute to supported blocks. Here is a configuration example of the plugin:

```json
{
    "@type/d": {
        "Full-width display for all supported blocks": {
            "afwd": "all"
        },
        "Full-width display for all database blocks and images": {
            "afwd": "db p"
        }
    },
    "Enable full-width display individually": {
        "afwd": "on"
    },
    "Disable full-width display individually": {
        "afwd": "off"
    }
}
```

The above configuration adds two options for document blocks and content blocks in the plugin menu, respectively, for quickly enabling and disabling the full-width display attribute for related content.

To restore the default state of the block, manually delete this custom attribute in the block attribute.

#### <em>Precautions</em>

* Full-width display only applies to the **first-level** blocks in the document. If a block is nested in other content blocks, applying this attribute to it will not produce any effect. For example, applying this attribute to an image paragraph block in a quote block will not change the style of the paragraph block unless the external quote block is cancelled.
* Full-width display is only effective in the editing area of the main window and small windows, and does not work in block reference preview windows, export previews, backlink panel, search result previews, etc.
* Enabling full-width display may cause the page to feel more jumpy when the editing area's size changes and automatically returns to the cursor position.
* The previous version's attribute name `asri-full-width-display` will be deprecated in future updates.

## Acknowledgements

The theme development process drew inspiration from the following themes, and I would like to express my gratitude to their developers:

| Reference Content | From Theme | Developer |
| --- | --- | --- |
| - Menu background blur | [Cliff-Dark](https://github.com/chenshinshi/Cliff-Dark) | [Crowds21](https://github.com/chenshinshi) |
| - Toolbar hiding<br />- Dots before sidebar panel list items<br />- Outline list item icons<br />- Status bar<br />- Seach list<br />- Table column width<br />- Multi-column `/` menu | [Savor](https://github.com/royc01/notion-theme)         | [Roy](https://github.com/royc01)           |
| - Topbar-tabbar mergence<br />- File tree indent guides<br />- MutationObserver related functions | [Rem Craft](https://github.com/svchord/Rem-Craft) | [Seven Chord](https://github.com/svchord) |

（The order in the list above does not imply any ranking）

Other reference materials:

* macOS Sonoma system applications
* [Apple's Human Interface Guidelines - Foundations - Color](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color/)

## Feedbacks & suggestions
- Create an issue or PR at [the project page](https://github.com/mustakshif/Asri/)
- Send an email to mustakshif@icloud.com

## Notes

* Setting menu's dragable area is cut to the top area of the left column.
* The close button in the upper right corner of the dialog box is hidden. To close the dialog box, click anywhere outside the dialog box.

## Project Dependencies
* [GitHub - siyuan-note/siyuan: A privacy-first, self-hosted, fully open source personal knowledge management software, written in typescript and golang.](https://github.com/siyuan-note/siyuan)
* [GitHub - sass/sass: Sass makes CSS fun!](https://github.com/sass/sass)
