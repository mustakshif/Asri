![banner](https://cdn.jsdelivr.net/gh/mustakshif/Hadeeth@main/assets/banner_v10.png)

<br/>

[简体中文](https://github.com/mustakshif/Hadeeth-for-SiYuan/blob/main/README_zh_CN.md) | English

# Hadeeth - theme for SiYuan

An ultra-modern macOS-like theme for [SiYuan Note](https://github.com/siyuan-note/siyuan), provides an elegant and efficient note-taking experience with its lightweight and minimalistic style.

## Latest Updates

### v1.1.4

* Optimized the style of the selected item counter of database.
* Top bar in full-screen mode on macOS will now be automatically pinned.
* Fixed the issue where the edges of the database selected cells were clipped.
* Fixed the issue of color difference on the top of the sidebar panel.
* Fixed the issue of horizontal displacement of buttons when the dialog box first pops up.

### v1.1.3

* Adapted the style of database / atrribute view.
* Changed the customizable text background colors to solid colors instead of transparent ones.
* Fixed the display issue of floating panels when the status bar is hidden.
* Optimized the spacing between icons in the bottom bar.

Check all updates here 👉 [CHANGELOG](./CHANGELOG.md)

## Theme Features

* 📃 Top bar hidden, window drag area adjusted for maximum display space.
  * 📌 Quickly access the top bar by hovering over the area with icons on the left and right sides of the top of the window.
  * 📌 When top bar hidden, window drag area adjusted to **blank areas** of:
    * **Tab bar (not toolbar/top bar)**
    * **Breadcrumb**
    * **Sidebar panel title and above**
  * 📌 If you need the top bar pinned, please go to `Settings - Appearance - Code Snippet`, then add and enable this code line under `JS` tab: `document.body.classList.add("hadeeth-pin-toolbar");`. To hide the top bar again, you need to disable this snippet and reload the page or restart the app.
* ↕️ Applied system scrollbar on macOS, which can be hidden automatically and reduce visual interference.
  
  * 📌 If your system scroll bar setting is **not** set to `When scrolling` in: `System Settings - Appearance - Show scroll bars` on macOS, scroll bars in SiYuan’s dark mode will be displayed as in light mode, which still needs to be fixed.
* 🚥 Position of traffic lights on macOS adjusted, optimizing the layout rhythm.

  * 📌 You will need to restart the application after switching to another theme to restore the traffic light to its default position.
* ➖ Dividing lines simplified, creating a consistent and organized layout style.
* 🧩 Optimized the inner and outer spacing of super blocks, making it easy to achieve grid and masonry layouts and create an elegant doc page.
* 📐 Extra spacing between layout blocks removed, expanding overall display range.
* 🌓 Light and dark modes supported.
* 🗂️ File tree and outline indent guides added.
* 🔍 Search list and backlink list display optimized.
* ⚙️ Styles of iFrame, videos, images, and other controls redesigned.
* 🧊 Glassmorphism introduced, enhancing the visual hierarchy.
* 💫 Lively effects added appropriately, enriching the interaction experience.
* 🚀 High level of performance maintained.
* ...

## How to use

* **Download & update within SiYuan (recommended)**: Go to `Settings - Marketplace - Themes` in SiYuan and search for "Hadeeth" to download and apply.
* Download & update from GitHub: Download the `package.zip` from releases, extract it to `conf/appearance/themes` in your SiYuan workspace, and restart SiYuan. Then choose "Hadeeth" in your theme list in `Settings - Appearance`.

## Plans

* Adapt to mobile platform.
* Continuous performance improvement.
* Optimize database element styles.
* Optimize flashcards styles.

## Acknowledgements

The theme development process drew inspiration from the following themes, and I would like to express my gratitude to their developers 🙏:

| Reference Content                                                 | From Theme | Developer |
| ---------------------------------------------------------- | ---------- | ------ |
| Menu background blur                                             | [Cliff-Dark](https://github.com/chenshinshi/Cliff-Dark)         | [Crowds21](https://github.com/chenshinshi)     |
|Toolbar hiding<br />Dots before sidebar panel list items<br />Outline list item icons<br />Status bar<br />Seach list | [Savor](https://github.com/royc01/notion-theme)         | [Roy](https://github.com/royc01)     |
| File tree indent guides<br />MutationObserver releted functions                                     | [Rem Craft](https://github.com/svchord/Rem-Craft)         | [Seven Chord](https://github.com/svchord)     |

（The order in the list above does not imply any ranking）

Other reference materials:

* macOS Sonoma system applications
* [Apple's Human Interface Guidelines - Foundations - Color](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color/)

## Feedbacks & suggestions
- Create an issue at [my project page](https://github.com/mustakshif/Hadeeth-for-SiYuan/issues)
- Send an email to mustakshif@icloud.com

## Notes

* Setting menu's dragable area cut to the top area of the left column.
* The close button in the upper right corner of the dialog box is hidden. To close the dialog box, click anywhere outside the dialog box.

## Project Dependencies
* [GitHub - siyuan-note/siyuan: A privacy-first, self-hosted, fully open source personal knowledge management software, written in typescript and golang.](https://github.com/siyuan-note/siyuan)
* [GitHub - sass/sass: Sass makes CSS fun!](https://github.com/sass/sass)
