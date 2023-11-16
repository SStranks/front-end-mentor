import { EslintConfig, ConfigPrettier } from '@packages/eslint-config';
import { EslintConfigReact } from '@packages/eslint-config-react';

export default [
  ConfigPrettier,
  {
    ignores: ['**/node_modules', '**/dist', '**/build', '**/__snapshots__', '**/mocks'],
  },
  {
    files: ['frontend/**/*.ts', 'frontend/**/*.tsx', 'frontend/**/*.jsx', 'frontend/**/*.js'],
    languageOptions: { ...EslintConfig.languageOptions, ...EslintConfigReact.languageOptions },
    plugins: { ...EslintConfig.plugins, ...EslintConfigReact.plugins },
    rules: { ...EslintConfig.rules, ...EslintConfigReact.rules },
    settings: { ...EslintConfig.settings, ...EslintConfigReact.settings },
  },
];
