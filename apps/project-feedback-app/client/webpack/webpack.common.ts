/* eslint-disable perfectionist/sort-objects */
import type { Configuration } from 'webpack';

import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const CommonConfig = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json'],
    // For use in CSS url() imports e.g url(~svg/desktop/a.svg)
    // Prefix with ~ to initiate module resolver
    modules: ['node_modules', path.resolve(__dirname, '../src/assets')],
    alias: {
      '#Shared': path.resolve(__dirname, '../../shared'),
      '#Img': path.resolve(__dirname, '../src/assets/img'),
      '#Sass': path.resolve(__dirname, '../src/assets/sass'),
      '#Svg': path.resolve(__dirname, '../src/assets/svg'),
      '#Components': path.resolve(__dirname, '../src/components'),
      '#Context': path.resolve(__dirname, '../src/context'),
      '#Data': path.resolve(__dirname, '../src/data'),
      '#Features': path.resolve(__dirname, '../src/features'),
      '#Hooks': path.resolve(__dirname, '../src/hooks'),
      '#Layouts': path.resolve(__dirname, '../src/layouts'),
      '#Lib': path.resolve(__dirname, '../src/lib'),
      '#Pages': path.resolve(__dirname, '../src/pages'),
      '#Services': path.resolve(__dirname, '../src/services'),
      '#Types': path.resolve(__dirname, '../src/types'),
      '#Utils': path.resolve(__dirname, '../src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        exclude: [/node_modules/],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [],
} satisfies Configuration;

export default CommonConfig;
