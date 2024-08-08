const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // 添加处理.html文件的规则
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true, // 可选，用于压缩HTML
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'theme.js', // 输出文件名
    path: path.resolve(__dirname), // 输出目录
  },
  mode: 'production',
  // optimization: {
  //   minimize: false, // 禁用压缩，调试时使用
  // },
  externals: {
    '@electron/remote': 'commonjs @electron/remote', // 将 @electron/remote 模块作为外部依赖
  },
  // watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
    poll: 3000
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 删除所有console.*函数调用
            drop_debugger: true, // 删除所有debugger语句
            pure_funcs: ['console.log'], // 删除特定函数调用
          },
          mangle: {
            keep_classnames: false,  // 保留类名
            keep_fnames: false,      // 保留函数名
            toplevel: true,  // 混淆顶级作用域中的变量和函数名
            properties: {
              // 是否混淆对象属性名
              regex: /^(?!_)/, // 仅混淆不以下划线开头的属性名
              keep_quoted: true,  // 保留引号中的属性名
              reserved: ['getCurrentWindow', 'setWindowButtonPosition', 'isFullScreen', 'getAccentColor', 'systemPreferences'],  // 保留不混淆的属性名
            },
          },
          output: {
            // 输出选项
            comments: false, // 去除所有注释
          },
        },
        parallel: true, // 启用多进程并行运行以提高构建速度
      }),
    ],
  },
  // ...
};
