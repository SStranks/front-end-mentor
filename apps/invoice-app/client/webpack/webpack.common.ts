/* eslint-disable perfectionist/sort-objects */
import type { Configuration } from 'webpack';

import path from 'node:path';
import url from 'node:url';

const { WEBPACK_PREFIX } = process.env;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const prefix = 'import.meta.env';

export const envKeys = Object.keys(process.env).reduce<{ [key: string]: string }>((acc, key) => {
  if (WEBPACK_PREFIX && key.startsWith(WEBPACK_PREFIX)) {
    const keyWithoutPrefix = key.slice(WEBPACK_PREFIX.length);
    acc[`${prefix}.${keyWithoutPrefix}`] = JSON.stringify(process.env[key]);
  }
  return acc;
}, {});

const CommonConfig = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json'],
    // For use in CSS url() imports e.g url(~svg/desktop/a.svg)
    // Prefix with ~ to initiate module resolver
    modules: ['node_modules', path.resolve(__dirname, '../src/assets')],
    alias: {
      '@Shared': path.resolve(__dirname, '../../shared'),
      '@Img': path.resolve(__dirname, '../src/assets/img'),
      '@Sass': path.resolve(__dirname, '../src/assets/sass'),
      '@Svg': path.resolve(__dirname, '../src/assets/svg'),
      '@Components': path.resolve(__dirname, '../src/components'),
      '@Config': path.resolve(__dirname, '../src/config'),
      '@Context': path.resolve(__dirname, '../src/context'),
      '@Data': path.resolve(__dirname, '../src/data'),
      '@Features': path.resolve(__dirname, '../src/features'),
      '@Hooks': path.resolve(__dirname, '../src/hooks'),
      '@Layouts': path.resolve(__dirname, '../src/layouts'),
      '@Lib': path.resolve(__dirname, '../src/lib'),
      '@Pages': path.resolve(__dirname, '../src/pages'),
      '@Services': path.resolve(__dirname, '../src/services'),
      '@Types': path.resolve(__dirname, '../src/types'),
      '@Utils': path.resolve(__dirname, '../src/utils'),
    },
  },
  module: {
    rules: [
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
