/* eslint-disable n/no-unpublished-require */
const Dotenv = require('dotenv-webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const path = require('node:path');

const common = require('./webpack.common');

module.exports = merge(common, {
  devServer: {
    historyApiFallback: true,
    /** "hot"
     * enabling and disabling HMR. takes "true", "false" and "only".
     * "only" is used if enable Hot Module Replacement without page
     * refresh as a fallback in case of build failures
     */
    hot: true,
    /** "liveReload"
     * disable live reload on the browser. "hot" must be set to false for this to work
     */
    liveReload: true,
    /** "open"
     * opens the browser after server is successfully started
     */
    // NOTE:  Can't set 'open' to true; like Create-React-App, there is a bug with accessing the browser/ports from WSL2
    open: false,
    port: 3000,
    static: ['./public'],
    // historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: { localIdentName: '[local]-[hash:base64:5]' },
            },
          },
          'sass-loader',
        ],
      },
      {
        exclude: /\.module.scss$/,
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    // assetModuleFilename: 'images/[name][ext]',
  },
  plugins: [
    new HTMLWebpackPlugin({
      favicon: './src/favicon-32x32.png',
      template: './src/index-template.html',
    }),
    new Dotenv({ path: './.env.dev' }),
  ],
});
