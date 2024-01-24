![banner](https://cdn.jsdelivr.net/gh/mustakshif/Asri-for-SiYuan@main/assets/banner_v13.png)

<br/>

[简体中文](https://github.com/mustakshif/Asri-for-SiYuan/blob/main/README_zh_CN.md) | English

# Asri - theme for SiYuan

An ultra-modern macOS-like theme for [SiYuan Note](https://github.com/siyuan-note/siyuan), provides an elegant and efficient note-taking experience with its lightweight and minimalistic style.

## Latest Updates

### v2.0.0

* 🎉 Introduced a brand new top bar design that combines the tab bar, balancing aesthetics and efficiency.
* Renamed the theme to Asri, giving it a more modern touch.
* [Fixed the issue where custom font CSS code was not working](https://github.com/mustakshif/Asri-for-SiYuan/issues/11).
* Other minor optimizations and improvements.

Check all updates here 👉 [CHANGELOG](./CHANGELOG.md)

## Theme Features

* 📃 Introducing top-bar fusion, balancing aesthetics and efficiency

    * 📌 All blank areas of the top bar can be used to drag the window (except for the gap between tabs)
    * 📌 The code for pinning the top bar in previous versions is no longer effective and can be manually deleted.
* 🚥 Position of traffic lights on macOS adjusted, optimizing the layout rhythm.

  * 📌 You will need to restart the application after switching to another theme to restore the traffic light to its default position.
* ↕️ Applied system scrollbar on macOS, which can be hidden automatically and reduce visual interference.
* ➖ Dividing lines simplified, creating a consistent and organized layout style.
* 🧩 Optimized the inner and outer spacing of super blocks, making it easy to achieve grid and masonry layouts and create an elegant doc page.
* 📐 Extra spacing between layout blocks removed, expanding overall display range.
* 🔛 Adaptive layout implemented, maximizing screen space utilization.
* 🌓 Light and dark modes supported.
* 🗂️ File tree and outline indent guides added.
* 🔍 Search list and backlink list display optimized.
* ⚙️ Styles of iFrame, videos, images, and other controls redesigned.
* 🧊 Glassmorphism introduced, enhancing the visual hierarchy.
* 💫 Lively effects added appropriately, enriching the interaction experience.
* 🚀 High level of performance maintained.
* ...

## How to use

* **Download & update within SiYuan (recommended)**: Go to `Settings - Marketplace - Themes` in SiYuan and search for "Asri" to download and apply.
* Download & update from GitHub: Download the `package.zip` from releases, extract it to `conf/appearance/themes` in your SiYuan workspace, and restart SiYuan. Then choose "Asri" in your theme list in `Settings - Appearance`.

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
