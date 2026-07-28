/** @type {import('stylelint').Config} */
import '@packages/stylelint-config';

export default {
  extends: '@packages/stylelint-config',
  overrides: [
    {
      // NOTE: Preserves early learning progress without refactoring
      files: 'apps/z_archive/**/*.{css,scss}',
      rules: {
        'custom-property-pattern': null,
        'keyframes-name-pattern': null,
        'scss/dollar-variable-pattern': null,
        'selector-id-pattern': null,
      },
    },
  ],
};
