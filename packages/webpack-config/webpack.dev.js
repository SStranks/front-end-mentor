import Dotenv from 'dotenv-webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'node:path';
import url from 'node:url';

import { merge } from 'webpack-merge';
import CommonConfig from './webpack.common.js';

const CWD = process.env.INIT_CWD;

const DevConfig = {
  mode: 'development',
  output: {
    path: path.resolve(CWD, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    static: ['./public'],
    historyApiFallback: true,
    // NOTE:  Can't set 'open' to true; like Create-React-App, there is a bug with accessing the browser/ports from WSL2
    open: false,
    hot: true,
    liveReload: true,
  },
  stats: {
    loggingDebug: ['sass-loader'],
    errorDetails: true,
  },
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
        test: /\.scss$/,
        exclude: /\.module.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(CWD, './src/index-template.html'),
      favicon: path.resolve(CWD, './src/favicon-32x32.png'),
    }),
    new Dotenv({ path: path.resolve(CWD, './.env.dev') }),
  ],
};

export default merge(CommonConfig, DevConfig);
