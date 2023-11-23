module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'declaration-empty-line-before': null,
    'selector-class-pattern': null,
  },
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
    },
  ],
};
