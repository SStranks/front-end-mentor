/* eslint-disable perfectionist/sort-objects */
import EslintConfigExpress from '@packages/eslint-config-express';
import { ConfigPrettier, EslintConfigGlobal } from '@packages/eslint-config-global';
import EslintConfigHTML from '@packages/eslint-config-html';
import EslintConfigJavascript from '@packages/eslint-config-javascript';
import { EslintConfigJSON, EslintConfigJSON5, EslintConfigJSONC } from '@packages/eslint-config-json';
import EslintConfigNode from '@packages/eslint-config-node';
import EslintConfigReact from '@packages/eslint-config-react';
import EslintConfigReactVitest from '@packages/eslint-config-react-vitest';
import EslintConfigStorybook from '@packages/eslint-config-storybook';
import EslintConfigTypescript, { createTypeScriptImportResolver, TSEslint } from '@packages/eslint-config-typescript';
import EslintConfigYAML, { PluginEslintYAML } from '@packages/eslint-config-yaml';
import { defineConfig } from 'eslint/config';

import path from 'node:path';

export default defineConfig([
  {
    name: 'Global Ignores',
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/build/',
      '**/logs/',
      '**/__snapshots__/',
      '**/mocks/',
      '**/coverage/',
      '**/.sassdoc/',
      '**/webpack/stats/',
      '**/*.gen.*',
      '**/graphql/generated/',
      '**/private.*',
      '**/private/*',
      '**/migrations/meta/',
      '**/routeTree.gen.ts',
      '!**/.storybook/',
      'pnpm-lock.yaml',
      'pnpm-lock.*.yaml',
      'pnpm-workspace.yaml',
      'package-lock.json',
    ],
  },
  {
    name: 'Global Configuration',
    languageOptions: { ...EslintConfigGlobal.languageOptions },
    plugins: { ...EslintConfigGlobal.plugins },
    rules: { ...EslintConfigGlobal.rules },
    settings: {
      ...EslintConfigGlobal.settings,
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: [
            'tsconfig.json',
            'apps/audiophile-ecommerce/client/tsconfig.json',
            'apps/designo-agency/client/tsconfig.json',
            'apps/invoice-app/client/tsconfig.json',
            'apps/kanban-task-app/client/tsconfig.json',
            'apps/project-feedback-app/client/tsconfig.json',
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
      ],
    },
  },
  {
    name: 'Javascript Configuration',
    files: ['**/*.js?(x)'],
    languageOptions: { ...EslintConfigJavascript.languageOptions },
    plugins: { ...EslintConfigJavascript.plugins },
    rules: { ...EslintConfigJavascript.rules },
    settings: { ...EslintConfigJavascript.settings },
  },
  {
    name: 'Typescript Configuration',
    files: ['**/*.ts?(x)'],
    extends: [TSEslint.configs.recommendedTypeChecked],
    languageOptions: { ...EslintConfigTypescript.languageOptions },
    plugins: { ...EslintConfigTypescript.plugins },
    rules: { ...EslintConfigTypescript.rules },
    settings: { ...EslintConfigTypescript.settings },
  },
  {
    name: 'React Configuration',
    files: ['**/*.[jt]sx'],
    languageOptions: { ...EslintConfigReact.languageOptions },
    plugins: { ...EslintConfigReact.plugins },
    rules: { ...EslintConfigReact.rules },
    settings: { ...EslintConfigReact.settings },
  },
  {
    name: 'Storybook Configuration',
    files: ['**/*.stories.*', '**/.storybook/**/*.{js,jsx,mjs,ts,tsx}'],
    plugins: { ...EslintConfigStorybook.plugins },
    rules: { ...EslintConfigStorybook.rules },
    settings: {
      ...EslintConfigStorybook.settings,
    },
  },
  {
    name: 'HTML Configuration',
    files: ['**/*.html'],
    ignores: ['**/*EmailTemplate.html'],
    languageOptions: { ...EslintConfigHTML.languageOptions },
    plugins: { ...EslintConfigHTML.plugins },
    rules: { ...EslintConfigHTML.rules },
  },
  {
    name: 'JSON Configuration',
    files: ['**/*.json'],
    ignores: ['**/tsconfig.json'],
    extends: [...EslintConfigJSON.extends],
    languageOptions: { ...EslintConfigJSON.languageOptions },
    plugins: { ...EslintConfigJSON.plugins },
  },
  {
    name: 'JSONC Configuration',
    files: ['**/*.jsonc', '**/tsconfig.json'],
    extends: [...EslintConfigJSONC.extends],
    languageOptions: { ...EslintConfigJSONC.languageOptions },
    plugins: { ...EslintConfigJSONC.plugins },
  },
  {
    name: 'JSON5 Configuration',
    files: ['**/*.json5'],
    extends: [...EslintConfigJSON5.extends],
    languageOptions: { ...EslintConfigJSON5.languageOptions },
    plugins: { ...EslintConfigJSON5.plugins },
  },
  {
    name: 'YAML Configuration',
    files: ['**/*.yaml', '**/*.yml'],
    extends: [PluginEslintYAML.configs.standard, PluginEslintYAML.configs.prettier],
    languageOptions: { ...EslintConfigYAML.languageOptions },
    plugins: { ...EslintConfigYAML.plugins },
    rules: { ...EslintConfigYAML.rules },
  },
  {
    name: 'Node Configuration',
    files: ['**/webpack*.[jt]s'],
    languageOptions: { ...EslintConfigNode.languageOptions },
    plugins: { ...EslintConfigNode.plugins },
    rules: { ...EslintConfigNode.rules },
  },
  // ====================================
  // ============= PACKAGES =============
  // ====================================
  {
    name: '@packages',
    files: ['./*.[jt]s', 'packages/**/*.[jt]s'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, './'),
      },
    },
  },
  // ====================================
  // =============== APPS ===============
  // ====================================
  // ------------------------------------
  // ------- audiophile-ecommerce -------
  // ------------------------------------
  {
    name: '@apps/audiophile-ecommerce/client',
    files: [
      'apps/audiophile-ecommerce/client/src/**/*',
      'apps/audiophile-ecommerce/client/webpack/**/*',
      'apps/audiophile-ecommerce/client/.storybook/**/*',
      'apps/audiophile-ecommerce/client/*',
    ],
    ignores: ['apps/audiophile-ecommerce/client/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/audiophile-ecommerce/client'),
      },
    },
  },
  {
    name: '@apps/audiophile-ecommerce/client: Testing; Vitest + RTL',
    files: ['apps/audiophile-ecommerce/client/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/audiophile-ecommerce/client'),
      },
    },
    plugins: { ...EslintConfigReactVitest.plugins },
    rules: { ...EslintConfigReactVitest.rules },
  },
  // ------------------------------------
  // ---------- designo-agency ----------
  // ------------------------------------
  {
    name: '@apps/designo-agency/client',
    files: [
      'apps/designo-agency/client/src/**/*',
      'apps/designo-agency/client/webpack/**/*',
      'apps/designo-agency/client/.storybook/**/*',
      'apps/designo-agency/client/*',
    ],
    ignores: ['apps/designo-agency/client/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/designo-agency/client'),
      },
    },
  },
  {
    name: '@apps/designo-agency/client: Testing; Vitest + RTL',
    files: ['apps/designo-agency/client/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/designo-agency/client'),
      },
    },
    plugins: { ...EslintConfigReactVitest.plugins },
    rules: { ...EslintConfigReactVitest.rules },
  },
  // ------------------------------------
  // ----------- invoice-app ------------
  // ------------------------------------
  {
    name: '@apps/invoice-app/client',
    files: [
      'apps/invoice-app/client/src/**/*',
      'apps/invoice-app/client/webpack/**/*',
      'apps/invoice-app/client/.storybook/**/*',
      'apps/invoice-app/client/*',
    ],
    ignores: ['apps/invoice-app/client/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/invoice-app/client'),
      },
    },
  },
  {
    name: '@apps/invoice-app/client: Testing; Vitest + RTL',
    files: ['apps/invoice-app/client/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/invoice-app/client'),
      },
    },
    plugins: { ...EslintConfigReactVitest.plugins },
    rules: { ...EslintConfigReactVitest.rules },
  },
  {
    name: '@apps/invoice-app/server: NodeJS Express + Testing (Node)',
    files: ['apps/invoice-app/server/src/**/*', 'apps/invoice-app/server/*'],
    languageOptions: {
      ...EslintConfigNode.languageOptions,
      ...EslintConfigExpress.languageOptions,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/invoice-app/server'),
      },
    },
    plugins: { ...EslintConfigNode.plugins, ...EslintConfigExpress.plugins },
    rules: { ...EslintConfigNode.rules, ...EslintConfigExpress.rules },
    settings: {
      ...EslintConfigExpress.settings,
    },
  },
  // ------------------------------------
  // --------- kanban-task=-app ---------
  // ------------------------------------
  {
    name: '@apps/kanban-task-app/client',
    files: [
      'apps/kanban-task-app/client/src/**/*',
      'apps/kanban-task-app/client/webpack/**/*',
      'apps/kanban-task-app/client/.storybook/**/*',
      'apps/kanban-task-app/client/*',
    ],
    ignores: ['apps/kanban-task-app/client/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/kanban-task-app/client'),
      },
    },
  },
  {
    name: '@apps/kanban-task-app/client: Testing; Vitest + RTL',
    files: ['apps/kanban-task-app/client/src/**/?(*.)+(spec|test).[jt]s?(x)'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/kanban-task-app/client'),
      },
    },
    plugins: { ...EslintConfigReactVitest.plugins },
    rules: { ...EslintConfigReactVitest.rules },
  },
  {
    name: '@apps/kanban-task-app/server: NodeJS Express + Testing (Node)',
    files: ['apps/kanban-task-app/server/src/**/*', 'apps/kanban-task-app/server/*'],
    languageOptions: {
      ...EslintConfigNode.languageOptions,
      ...EslintConfigExpress.languageOptions,
      parserOptions: {
        ...EslintConfigNode.languageOptions.parserOptions,
        ...EslintConfigExpress.languageOptions.parserOptions,
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/kanban-task-app/server'),
      },
    },
    plugins: { ...EslintConfigNode.plugins, ...EslintConfigExpress.plugins },
    rules: { ...EslintConfigNode.rules, ...EslintConfigExpress.rules },
    settings: {
      ...EslintConfigExpress.settings,
    },
  },
  // ------------------------------------
  // ------- project-feedback-app -------
  // ------------------------------------
  {
    name: '@apps/project-feedback-app/client',
    files: [
      'apps/project-feedback-app/client/src/**/*',
      'apps/project-feedback-app/client/webpack/**/*',
      'apps/project-feedback-app/client/.storybook/**/*',
      'apps/project-feedback-app/client/*',
    ],
    ignores: ['apps/project-feedback-app/client/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/project-feedback-app/client'),
      },
    },
  },
  {
    name: '@apps/project-feedback-app/client: Testing; Vitest + RTL',
    files: ['apps/project-feedback-app/client/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/project-feedback-app/client'),
      },
    },
    plugins: { ...EslintConfigReactVitest.plugins },
    rules: { ...EslintConfigReactVitest.rules },
  },
  {
    name: '@apps/project-feedback-app/server: NodeJS Express + Testing (Node)',
    files: ['apps/project-feedback-app/server/src/**/*', 'apps/project-feedback-app/server/*'],
    languageOptions: {
      ...EslintConfigNode.languageOptions,
      ...EslintConfigExpress.languageOptions,
      parserOptions: {
        ...EslintConfigNode.languageOptions.parserOptions,
        ...EslintConfigExpress.languageOptions.parserOptions,
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/project-feedback-app/server'),
      },
    },
    plugins: { ...EslintConfigNode.plugins, ...EslintConfigExpress.plugins },
    rules: { ...EslintConfigNode.rules, ...EslintConfigExpress.rules },
    settings: {
      ...EslintConfigExpress.settings,
    },
  },
  ConfigPrettier,
]);
