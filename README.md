[中文](https://github.com/siyuan-note/theme-sample/blob/main/README_zh_CN.md)

# SiYuan theme sample

## Get started

* Make a copy of this repo as a template with the <kbd>Use this template</kbd> button, please note that the repo name
  must be the same as the theme name, the default branch must be `main`
* Clone your repo to a local development folder. For convenience, you can place this folder in
  your `{workspace}/conf/appearance/themes/` folder

## Development

* theme.json
* icon.png (160*160)
* preview.png (1024*768)
* README*.md
* theme.css

Note: The theme.js is deprecated, it will be removed in the future,
see [this issue](https://github.com/siyuan-note/siyuan/issues/8178) for more details.

## theme.json

```json
{
  "name": "theme-sample",
  "author": "Vanessa",
  "url": "https://github.com/siyuan-note/theme-sample",
  "version": "0.0.3",
  "minAppVersion": "2.8.8",
  "displayName": {
    "default": "Theme Sample",
    "zh_CN": "主题示例"
  },
  "description": {
    "default": "This is a theme sample",
    "zh_CN": "这是一个主题示例"
  },
  "readme": {
    "default": "README.md",
    "zh_CN": "README_zh_CN.md"
  },
  "funding": {
    "openCollective": "",
    "patreon": "",
    "github": "",
    "custom": [
      "https://ld246.com/sponsor"
    ]
  },
  "modes": [
    "light"
  ],
  "keywords": [
    "sample", "示例"
  ]
}
```

* `name`: Theme name, must be the same as the repo name, and must be unique globally (no duplicate theme names in the
  marketplace)
* `author`: Theme author name
* `url`: Theme repo URL
* `version`: Theme version number, it is recommended to follow the [semver](https://semver.org/) specification
* `minAppVersion`: Minimum version number of SiYuan required to use this theme
* `displayName`: Widget display name, mainly used for display in the marketplace list, supports multiple languages
    * `default`: Default language, must exist
    * `zh_CN`, `en_US` and other languages: optional, it is recommended to provide at least Chinese and English
* `description`: Theme description, mainly used for display in the marketplace list, supports multiple languages
    * `default`: Default language, must exist
    * `zh_CN`, `en_US` and other languages: optional, it is recommended to provide at least Chinese and English
* `readme`: readme file name, mainly used to display in the marketplace details page, supports multiple languages
    * `default`: Default language, must exist
    * `zh_CN`, `en_US` and other languages: optional, it is recommended to provide at least Chinese and English
* `funding`: Theme sponsorship information
    * `openCollective`: Open Collective name
    * `patreon`: Patreon name
    * `github`: GitHub login name
    * `custom`: Custom sponsorship link list
* `modes`: Theme mode list, currently only supports `light` and `dark`
* `keywords`: Search keyword list, used for marketplace search function

## Package

No matter which method is used to compile and package, we finally need to generate a package.zip, which contains at
least the following files:

* icon.png
* preview.png
* README*.md
* theme.css
* theme.json

## List on the marketplace

* Generate the package.zip
* Create a new GitHub release using your new version number as the "Tag version". See here for an
  example: https://github.com/siyuan-note/theme-sample/releases
* Upload the file package.zip as binary attachments
* Publish the release

If it is the first release, please create a pull request to
the [Community Bazaar](https://github.com/siyuan-note/bazaar) repository and modify the themes.json file in it. This
file is the index of all community theme repositories, the format is:

```json
{
  "repos": [
    "username/reponame"
  ]
}
```

After the PR is merged, the bazaar will automatically update the index and deploy through GitHub Actions. When releasing
a new version of the theme in the future, you only need to follow the above steps to create a new release, and you
don't need to PR the community bazaar repo.

Under normal circumstances, the community bazaar repo will automatically update the index and deploy every hour,
and you can check the deployment status at https://github.com/siyuan-note/bazaar/actions.
