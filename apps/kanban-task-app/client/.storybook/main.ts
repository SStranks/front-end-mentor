/* eslint-disable storybook/story-exports */
/* eslint-disable perfectionist/sort-objects */
import type { StorybookConfig } from '@storybook/react-vite';

import { mergeConfig } from 'vite';

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/stories/*.mdx', '../src/stories/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-vitest',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  staticDirs: fs.existsSync(publicDir) ? ['../public'] : [],
  core: {
    disableTelemetry: true,
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        // BUG: 'vite-tsconfig-paths' does not work here; upstream bug in Vite Sass preprocessor
        alias: {
          '#Shared': path.resolve(__dirname, '../../shared'),
          '#Img': path.resolve(__dirname, '../src/assets/img'),
          '@Sass': path.resolve(__dirname, '../src/assets/sass'),
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
    });
  },
};

export default config;
