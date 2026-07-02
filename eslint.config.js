/* eslint-disable perfectionist/sort-objects */
import { ConfigPrettier, EslintConfigGlobal } from '@packages/eslint-config-global';
import EslintConfigHTML from '@packages/eslint-config-html';
import EslintConfigJavascript from '@packages/eslint-config-javascript';
import { EslintConfigJSON, EslintConfigJSON5, EslintConfigJSONC } from '@packages/eslint-config-json';
import EslintConfigNode from '@packages/eslint-config-node';
import EslintConfigReact from '@packages/eslint-config-react';
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
            'apps/audiophile-ecommerce/frontend/tsconfig.json',
            'apps/designo-agency/frontend/tsconfig.json',
            'apps/invoice-app/frontend/tsconfig.json',
            'apps/kanban-task-app/frontend/tsconfig.json',
            'apps/project-feedback-app/frontend/tsconfig.json',
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
  // ------- audiophile-ecommerce -------
  {
    name: '@apps/audiophile-ecommerce/frontend: React + TypeScript',
    files: [
      'apps/audiophile-ecommerce/frontend/src/**/*.[jt]s?(x)',
      'apps/audiophile-ecommerce/frontend/webpack/**/*.[jt]s?(x)',
      'apps/audiophile-ecommerce/frontend/.storybook/**/*.[jt]s?(x)',
      'apps/audiophile-ecommerce/frontend/*.ts',
    ],
    ignores: ['apps/audiophile-ecommerce/frontend/src/**/?(*.)+(spec|test).[jt]s?(x)'],
    languageOptions: {
      ...EslintConfigReact.languageOptions,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/audiophile-ecommerce/frontend'),
      },
    },
    plugins: { ...EslintConfigReact.plugins },
    rules: { ...EslintConfigReact.rules },
    settings: {
      ...EslintConfigReact.settings,
    },
  },
  {
    name: '@apps/designo-agency/frontend: React + TypeScript',
    files: [
      'apps/designo-agency/frontend/src/**/*.[jt]s?(x)',
      'apps/designo-agency/frontend/webpack/**/*.[jt]s?(x)',
      'apps/designo-agency/frontend/.storybook/**/*.[jt]s?(x)',
      'apps/designo-agency/frontend/*.ts',
    ],
    ignores: ['apps/designo-agency/frontend/src/**/?(*.)+(spec|test).[jt]s?(x)'],
    languageOptions: {
      ...EslintConfigReact.languageOptions,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/designo-agency/frontend'),
      },
    },
    plugins: { ...EslintConfigReact.plugins },
    rules: { ...EslintConfigReact.rules },
    settings: {
      ...EslintConfigReact.settings,
    },
  },
  {
    name: '@apps/invoice-app/frontend: React + TypeScript',
    files: [
      'apps/invoice-app/frontend/src/**/*.[jt]s?(x)',
      'apps/invoice-app/frontend/webpack/**/*.[jt]s?(x)',
      'apps/invoice-app/frontend/.storybook/**/*.[jt]s?(x)',
      'apps/invoice-app/frontend/*.ts',
    ],
    ignores: ['apps/invoice-app/frontend/src/**/?(*.)+(spec|test).[jt]s?(x)'],
    languageOptions: {
      ...EslintConfigReact.languageOptions,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/invoice-app/frontend'),
      },
    },
    plugins: { ...EslintConfigReact.plugins },
    rules: { ...EslintConfigReact.rules },
    settings: {
      ...EslintConfigReact.settings,
    },
  },
  {
    name: '@apps/kanban-task-app/frontend: React + TypeScript',
    files: [
      'apps/kanban-task-app/frontend/src/**/*.[jt]s?(x)',
      'apps/kanban-task-app/frontend/webpack/**/*.[jt]s?(x)',
      'apps/kanban-task-app/frontend/.storybook/**/*.[jt]s?(x)',
      'apps/kanban-task-app/frontend/*.ts',
    ],
    ignores: ['apps/kanban-task-app/frontend/src/**/?(*.)+(spec|test).[jt]s?(x)'],
    languageOptions: {
      ...EslintConfigReact.languageOptions,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/kanban-task-app/frontend'),
      },
    },
    plugins: { ...EslintConfigReact.plugins },
    rules: { ...EslintConfigReact.rules },
    settings: {
      ...EslintConfigReact.settings,
    },
  },
  {
    name: '@apps/project-feedback-app/frontend: React + TypeScript',
    files: [
      'apps/project-feedback-app/frontend/src/**/*.[jt]s?(x)',
      'apps/project-feedback-app/frontend/webpack/**/*.[jt]s?(x)',
      'apps/project-feedback-app/frontend/.storybook/**/*.[jt]s?(x)',
      'apps/project-feedback-app/frontend/*.ts',
    ],
    ignores: ['apps/project-feedback-app/frontend/src/**/?(*.)+(spec|test).[jt]s?(x)'],
    languageOptions: {
      ...EslintConfigReact.languageOptions,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/project-feedback-app/frontend'),
      },
    },
    plugins: { ...EslintConfigReact.plugins },
    rules: { ...EslintConfigReact.rules },
    settings: {
      ...EslintConfigReact.settings,
    },
  },
  // ===== OLD CONFIG STARTS HERE =====
  // ===== OLD CONFIG STARTS HERE =====
  // ===== OLD CONFIG STARTS HERE =====
  // ===== OLD CONFIG STARTS HERE =====
  // ===== OLD CONFIG STARTS HERE =====

  // {
  //   // API - NodeJS Express + Testing (Jest)
  //   files: ['apps/*/backend/**/*.ts', 'apps/*/backend/**/*.js'],
  //   languageOptions: {
  //     ...EslintConfig.languageOptions,
  //     ...EslintConfigExpress.languageOptions,
  //   },
  //   plugins: { ...EslintConfig.plugins, ...EslintConfigExpress.plugins },
  //   rules: { ...EslintConfig.rules, ...EslintConfigExpress.rules },
  //   settings: { ...EslintConfig.settings, ...EslintConfigExpress.settings },
  // },
  // {
  //   // Client - Testing (Jest + RTL)
  //   files: ['apps/*/frontend/**/?(*.)+(spec|test).[jt]s?(x)'],
  //   languageOptions: {
  //     ...EslintConfig.languageOptions,
  //     ...EslintConfigReact.languageOptions,
  //   },
  //   plugins: {
  //     ...EslintConfig.plugins,
  //     ...EslintConfigReact.plugins,
  //     ...EslintConfigReactTest.plugins,
  //   },
  //   rules: {
  //     ...EslintConfig.rules,
  //     ...EslintConfigReact.rules,
  //     ...EslintConfigReactTest.rules,
  //   },
  //   settings: { ...EslintConfig.settings, ...EslintConfigReact.settings },
  // },
  ConfigPrettier,
]);
