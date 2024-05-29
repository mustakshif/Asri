const path = require('path');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
  optimization: {
    minimize: false,
  },
};