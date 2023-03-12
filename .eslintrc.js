/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  root: true,
  overrides: [],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'no-console': 'off',
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'off',
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
  },
};
