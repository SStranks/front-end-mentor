/** @type {import('stylelint').Config} */
import '@packages/stylelint-config';

import path from 'node:path';

export default {
  extends: '@packages/stylelint-config',
  overrides: [
    {
      // NOTE: Preserves early learning progress without refactoring
      // BUG: https://github.com/oxsecurity/megalinter/issues/8552
      // BUG: duplicate 'files' entries to parent-dir; for megalinter, which set --config-basedir to '/node-deps', sibling of /tmp/lint where our files our.
      files: [
        'apps/z_archive/**/*.css',
        'apps/z_archive/**/*.scss',
        path.resolve(import.meta.dirname, '../**', 'apps/z_archive', '**/*.css'),
        path.resolve(import.meta.dirname, '../**', 'apps/z_archive', '**/*.scss'),
        // '../tmp/lint/apps/z_archive/**/*.css',
        // '../tmp/lint/apps/z_archive/**/*.scss',
      ],
      rules: {
        'custom-property-pattern': null,
        'keyframes-name-pattern': null,
        'scss/dollar-variable-pattern': null,
        'selector-id-pattern': null,
      },
    },
  ],
};
