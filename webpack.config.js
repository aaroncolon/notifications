const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: {
    notifications: './src/index.js',
    notificationsRmp: './src/notificationsRmp.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
};

module.exports = config;
