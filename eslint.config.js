/* eslint-disable perfectionist/sort-objects */
import EslintConfigExpress from '@packages/eslint-config-express';
import { ConfigPrettier, EslintConfigGlobal } from '@packages/eslint-config-global';
import EslintConfigHTML from '@packages/eslint-config-html';
import EslintConfigJavascript from '@packages/eslint-config-javascript';
import { EslintConfigJSON, EslintConfigJSON5, EslintConfigJSONC } from '@packages/eslint-config-json';
import EslintConfigNode from '@packages/eslint-config-node';
import EslintConfigReact from '@packages/eslint-config-react';
import EslintConfigReactVitest from '@packages/eslint-config-react-vitest';
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
    name: 'React Configuration',
    files: ['**/*.[jt]sx'],
    languageOptions: { ...EslintConfigReact.languageOptions },
    plugins: { ...EslintConfigReact.plugins },
    rules: { ...EslintConfigReact.rules },
    settings: { ...EslintConfigReact.settings },
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
    name: '@apps/audiophile-ecommerce/frontend',
    files: [
      'apps/audiophile-ecommerce/frontend/src/**/*',
      'apps/audiophile-ecommerce/frontend/webpack/**/*',
      'apps/audiophile-ecommerce/frontend/.storybook/**/*',
      'apps/audiophile-ecommerce/frontend/*',
    ],
    ignores: ['apps/audiophile-ecommerce/frontend/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/audiophile-ecommerce/frontend'),
      },
    },
  },
  {
    name: '@apps/audiophile-ecommerce/frontend: Testing; Vitest + RTL',
    files: ['apps/audiophile-ecommerce/frontend/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/audiophile-ecommerce/frontend'),
      },
    },
    plugins: { ...EslintConfigReactVitest.plugins },
    rules: { ...EslintConfigReactVitest.rules },
  },
  // ------------------------------------
  // ---------- designo-agency ----------
  // ------------------------------------
  {
    name: '@apps/designo-agency/frontend',
    files: [
      'apps/designo-agency/frontend/src/**/*',
      'apps/designo-agency/frontend/webpack/**/*',
      'apps/designo-agency/frontend/.storybook/**/*',
      'apps/designo-agency/frontend/*',
    ],
    ignores: ['apps/designo-agency/frontend/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/designo-agency/frontend'),
      },
    },
  },
  {
    name: '@apps/designo-agenc/frontend: Testing; Vitest + RTL',
    files: ['apps/designo-agency/frontend/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/designo-agency/frontend'),
      },
    },
    plugins: { ...EslintConfigReactVitest.plugins },
    rules: { ...EslintConfigReactVitest.rules },
  },
  // ------------------------------------
  // ----------- invoice-app ------------
  // ------------------------------------
  {
    name: '@apps/invoice-app/frontend',
    files: [
      'apps/invoice-app/frontend/src/**/*',
      'apps/invoice-app/frontend/webpack/**/*',
      'apps/invoice-app/frontend/.storybook/**/*',
      'apps/invoice-app/frontend/*',
    ],
    ignores: ['apps/invoice-app/frontend/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/invoice-app/frontend'),
      },
    },
  },
  {
    name: '@apps/invoice-app/frontend: Testing; Vitest + RTL',
    files: ['apps/invoice-app/frontend/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/invoice-app/frontend'),
      },
    },
    plugins: { ...EslintConfigReactVitest.plugins },
    rules: { ...EslintConfigReactVitest.rules },
  },
  {
    name: '@apps/invoice-app/backend: NodeJS Express + Testing (Node)',
    files: ['apps/invoice-app/backend/server/**/*', 'apps/invoice-app/backend/*'],
    languageOptions: {
      ...EslintConfigNode.languageOptions,
      ...EslintConfigExpress.languageOptions,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/invoice-app/backend'),
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
    name: '@apps/kanban-task-app/frontend',
    files: [
      'apps/kanban-task-app/frontend/src/**/*',
      'apps/kanban-task-app/frontend/webpack/**/*',
      'apps/kanban-task-app/frontend/.storybook/**/*',
      'apps/kanban-task-app/frontend/*',
    ],
    ignores: ['apps/kanban-task-app/frontend/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/kanban-task-app/frontend'),
      },
    },
  },
  {
    name: '@apps/kanban-task-app/frontend: Testing; Vitest + RTL',
    files: ['apps/kanban-task-app/frontend/src/**/?(*.)+(spec|test).[jt]s?(x)'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/kanban-task-app/frontend'),
      },
    },
    plugins: { ...EslintConfigReactVitest.plugins },
    rules: { ...EslintConfigReactVitest.rules },
  },
  {
    name: '@apps/kanban-task-app/backend: NodeJS Express + Testing (Node)',
    files: ['apps/kanban-task-app/backend/server/**/*', 'apps/kanban-task-app/backend/*'],
    languageOptions: {
      ...EslintConfigNode.languageOptions,
      ...EslintConfigExpress.languageOptions,
      parserOptions: {
        ...EslintConfigNode.languageOptions.parserOptions,
        ...EslintConfigExpress.languageOptions.parserOptions,
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/kanban-task-app/backend'),
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
    name: '@apps/project-feedback-app/frontend',
    files: [
      'apps/project-feedback-app/frontend/src/**/*',
      'apps/project-feedback-app/frontend/webpack/**/*',
      'apps/project-feedback-app/frontend/.storybook/**/*',
      'apps/project-feedback-app/frontend/*',
    ],
    ignores: ['apps/project-feedback-app/frontend/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/project-feedback-app/frontend'),
      },
    },
  },
  {
    name: '@apps/project-feedback-app/frontend: Testing; Vitest + RTL',
    files: ['apps/project-feedback-app/frontend/src/**/?(*.)+(spec|test).*'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/project-feedback-app/frontend'),
      },
    },
    plugins: { ...EslintConfigReactVitest.plugins },
    rules: { ...EslintConfigReactVitest.rules },
  },
  {
    name: '@apps/project-feedback-app/backend: NodeJS Express + Testing (Node)',
    files: ['apps/project-feedback-app/backend/server/**/*', 'apps/project-feedback-app/backend/*'],
    languageOptions: {
      ...EslintConfigNode.languageOptions,
      ...EslintConfigExpress.languageOptions,
      parserOptions: {
        ...EslintConfigNode.languageOptions.parserOptions,
        ...EslintConfigExpress.languageOptions.parserOptions,
        projectService: true,
        tsconfigRootDir: path.join(import.meta.dirname, 'apps/project-feedback-app/backend'),
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
