![banner](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/banner_v16.png)

<br/>

[简体中文](https://github.com/mustakshif/Asri-for-SiYuan/blob/main/README_zh_CN.md) | English

# Asri - theme for SiYuan

An ultra-modern theme for [SiYuan Note](https://github.com/siyuan-note/siyuan), provides an elegant and efficient note-taking experience with its lightweight and minimalistic style.

## Latest Updates

### v2.1.2

* Optimized the display of item's readme in the marketplace on wide screens.
* Optimized the style of the flashcard review interface when opened in a tab, and fixed the issue of the bottom being covered by the status bar.
* Optimized the display of the random cover image list.
* [Fixed the problem where the `Background Cover` plugin's image cache was deleted when switching to other themes.](https://ld246.com/article/1707547966037)

Check all updates [here](./CHANGELOG.md).

## Theme Features

### 🪄 Aesthetically Enhanced Efficiency

* ⚖️ Introducing Top-bar Fusion, seamlessly integrating the top bar and the tab bar

  * 📌 The blank area of the top bar can be used to drag the window (except for the gap between tabs)
  * 📌 If top bar icons or dividers appear misaligned or overlapped, resizing the edit area or app window may fix it.
* 🧊 Introduction of glassmorphism, enhancing the visual hierarchy
* 🌅 Removal of unnecessary spacing between app's layout blocks, expanding the display range
* 🌓 Support for light and dark modes

### 📐 Flexible and Elegant Layout

* 🧩 Optimized internal and external spacing of superblocks, making it easy to achieve grid and masonry layouts
* ↔️ Support for full-width display of images, videos, widgets, databases, superblocks and more, providing diverse formatting layouts
* ➖ Simplified dividers, creating an integrated, refreshing and tidy layout style
* 🔛 Width-adaptive layout, making full use of screen space
* 🚥 Adjusted the position of macOS traffic lights, optimizing the layout rhythm

### 🧭 Convenient and Clear Navigation

* 🗂️ Added indent guides for file tree and outline
* 🔍 Optimized the display of search lists and backlink lists
* ↕️ Applied system scrollbar on macOS, which can be hidden automatically and reduce visual interference

### 👆 Delicate and Smooth Interaction

* ⚙️ Redesigned the styles of controls for iFrame, videos, images, etc.
* 💫 Appropriately added lively animations, enriching the interactive experience
* 🚀 Maintained a high level of smooth performance

## Custom Attributes

### `asri-full-width-display`

![full-width-display preview](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/custom-attributes-preview_v5.gif)

This attribute allows the block to which it is applied to span the full width of the page (full-width display). It can be used to emphasize specific content, beautify the layout, etc. It can be applied to document blocks and certain content blocks (paragraph blocks that contains images, database blocks, horizontal-layout superblocks, and iframe blocks).

#### Applied to Document Blocks

When applied to document blocks, the accepted attribute values are: `all`, `p`, `db`, `sb`, and `iframe`. Among them, `all` can only be used alone, while `p`, `db`, `sb`, and `iframe` can be used simultaneously, and the attribute values should be separated by **spaces**.

* `all`: Makes all blocks in the document that support this attribute display in full width.
* `p` (paragraph block): Makes all **image-containing** paragraph blocks in the document display in full width.
* `db` (database): Makes all database blocks in the document display in full width.
* `sb` (superblock): Makes all **horizontal-layout** superblocks in the document display in full width.
* `iframe`: Makes all iframe blocks in the document display in full width, including videos, widgets and embedded web pages.

#### Applied to Content Blocks

When applied to image paragraph blocks, database blocks, horizontal-layout superblocks, or iframe blocks, it only accepts the attribute values `on` and `off`, which are used to individually enable and disable the block’s full-width display.

#### Usage

In addition to adding custom attributes by <kbd>shift + click</kbd> on the block icon, you can also use the `Attribute Quick Add` plugin to quickly add this attribute to document blocks and supported content blocks. A possible `Attribute Quick Add` plugin configuration is as follows:

```json
{
    "@type/d": {
        "display all supported blocks in full width": {
            "asri-full-width-display": "all"
        },
        "display all database blocks and images in full width": {
            "asri-full-width-display": "db p"
        }
    },
    "Individually enable full-width display": {
        "asri-full-width-display": "on"
    },
    "Individually disable full-width display": {
        "asri-full-width-display": "off"
    }
}
```

The above configuration adds two options for document blocks and content blocks in the plugin menu, respectively, for quickly enabling and disabling the full-width display attribute for related content.

After changing the custom attributes of a block, you can view and change the added attributes:

![custom-attribute](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/custom-attribute_en_US_v2.png)

You can manually delete this attribute to restore the block to its default state.

#### <em>Precautions</em>

1. Full-width display only applies to the first-level blocks in the document. If a block is nested in other content blocks, applying this attribute to it will not produce any effect. For example, applying this attribute to an image paragraph block in a quote block will not change the style of the paragraph block unless the external quote block is cancelled.
2. Full-width display is temporarily only effective in the main window editing area, and does not work in block reference preview windows, small windows, export previews, etc.
3. Enabling full-width display may cause the page to feel more jumpy when the editing area's size changes and automatically returns to the cursor position.

## How to use Asri

* **Download & update within SiYuan (recommended)**: Go to `Settings - Marketplace - Themes` in SiYuan and search for "Asri" to download and apply.
* Download & update from GitHub: Download the `package.zip` from releases, extract it to `conf/appearance/themes` in your SiYuan workspace, and restart SiYuan. Then choose "Asri" in your theme list in `Settings - Appearance`.


> [!NOTE]
> Asri has not been fully adapted for mobile devices.

## Plans

* Adapt to mobile platform.
* Continuous performance improvement.
* Optimize database element styles.
* Optimize flashcards styles.
* Improve user experience of the top bar
* Optimize numbering of ordered lists

## Acknowledgements

The theme development process drew inspiration from the following themes, and I would like to express my gratitude to their developers 🙏:

| Reference Content                                                 | From Theme | Developer |
| ---------------------------------------------------------- | ---------- | ------ |
|- Menu background blur                                             | [Cliff-Dark](https://github.com/chenshinshi/Cliff-Dark)         | [Crowds21](https://github.com/chenshinshi)     |
|- Toolbar hiding<br />- Dots before sidebar panel list items<br />- Outline list item icons<br />- Status bar<br />- Seach list<br />- Table column width<br />- Multi-column `/` menu | [Savor](https://github.com/royc01/notion-theme)         | [Roy](https://github.com/royc01)     |
|- Topbar-tabbar mergence<br />- File tree indent guides<br />- MutationObserver related functions                                     | [Rem Craft](https://github.com/svchord/Rem-Craft)         | [Seven Chord](https://github.com/svchord)     |

（The order in the list above does not imply any ranking）

Other reference materials:

* macOS Sonoma system applications
* [Apple's Human Interface Guidelines - Foundations - Color](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color/)

## Feedbacks & suggestions
- Create an issue or PR at [the project page](https://github.com/mustakshif/Asri-for-SiYuan/issues)
- Send an email to mustakshif@icloud.com

## Notes

* Setting menu's dragable area is cut to the top area of the left column.
* The close button in the upper right corner of the dialog box is hidden. To close the dialog box, click anywhere outside the dialog box.

## Project Dependencies
* [GitHub - siyuan-note/siyuan: A privacy-first, self-hosted, fully open source personal knowledge management software, written in typescript and golang.](https://github.com/siyuan-note/siyuan)
* [GitHub - sass/sass: Sass makes CSS fun!](https://github.com/sass/sass)
