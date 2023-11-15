import CopyPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'node:path';
import url from 'node:url';

import { merge } from 'webpack-merge';
import CommonConfig from './webpack.common.js';

const CWD = process.env.INIT_CWD;

const ProdConfig = {
  mode: 'production',
  output: {
    path: path.resolve(CWD, url.fileURLToPath(import.meta.url), 'dist'),
    filename: 'main.[contenthash].js',
    assetModuleFilename: 'assets/[ext]/[name].[hash][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: {
                filter: (assetUrl) => {
                  if (assetUrl.startsWith('/public')) return false;
                  return true;
                },
              },
              modules: { localIdentName: '[local]-[hash:base64:5]' },
              importLoaders: 2, // => post-css and sass
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(CWD, './src/index-template.html'),
      favicon: path.resolve(CWD, './src/favicon-32x32.png'),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(CWD, url.fileURLToPath(import.meta.url), 'public'),
          to: path.join(CWD, url.fileURLToPath(import.meta.url), 'dist', 'public'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new Dotenv({ path: path.resolve(CWD, './.env.prod') }),
  ],
};

export default merge(CommonConfig, ProdConfig);
