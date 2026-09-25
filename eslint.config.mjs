// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { defineConfig } from 'eslint/config';
import angular from 'angular-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.html'],
    extends: [prettier],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleAttributePerLine: true,
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {},
  },
  {
    files: ['**/*.html'],
    rules: {},
  },
]);
