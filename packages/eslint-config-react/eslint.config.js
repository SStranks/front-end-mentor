import PluginReact from 'eslint-plugin-react';
import PluginReactHooks from 'eslint-plugin-react-hooks';
import PluginJSXA11Y from 'eslint-plugin-jsx-a11y';
import ConfigAirBnb from 'eslint-config-airbnb';

import globals from 'globals';

export const EslintConfigReact = {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.es2021,
    },
    parserOptions: {
      requireConfigFile: false,
      ecmaVersion: 2021,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    react: PluginReact,
    'react-hooks': PluginReactHooks,
    'jsx-a11y': PluginJSXA11Y,
  },
  rules: {
    ...ConfigAirBnb.rules,
    ...PluginReact.configs.recommended.rules,
    ...PluginReactHooks.configs.recommended.rules,
    ...PluginJSXA11Y.configs.recommended.rules,
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-uses-react': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': [
      1,
      {
        functions: 'defaultArguments',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

export default [EslintConfigReact];
