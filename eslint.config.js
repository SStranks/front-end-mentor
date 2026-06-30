import { EslintConfig, ConfigPrettier } from '@packages/eslint-config';

export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/build', '**/__snapshots__', '**/mocks', '**/coverage', '**/.sassdoc'],
  },
  ConfigPrettier,
];
