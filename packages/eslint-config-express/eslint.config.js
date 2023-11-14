import PluginImport from 'eslint-plugin-import';
import PluginNode from 'eslint-plugin-node';
import PluginSecurity from 'eslint-plugin-security';

import ConfigAirBnbBase from 'eslint-config-airbnb-base';

import globals from 'globals';

export const EslintConfigExpress = {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      ...globals.node,
      ...globals.es2021,
    },
    parserOptions: {
      requireConfigFile: false,
      ecmaVersion: 2021,
    },
  },
  plugins: {
    PluginImport,
    PluginNode,
    PluginSecurity,
  },
  rules: {
    ...ConfigAirBnbBase.rules,
    ...PluginSecurity.configs.recommended.rules,
    ...PluginNode.configs.recommended.rules,
    ...PluginSecurity.configs.recommended.rules,
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'no-console': 'off',
    'arrow-body-style': 'off',
  },
};

export default [EslintConfigExpress];
