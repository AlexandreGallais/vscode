// @ts-check
import { defineConfig } from 'eslint/config';
import rootConfig from '../eslint.config.mjs';
import angular from 'angular-eslint';

export default defineConfig([
  ...rootConfig,
  {
    files: ['**/*.ts'],
    extends: [angular.configs.tsRecommended],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.component.ts'],
    processor: angular.processInlineTemplates,
    rules: {},
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angular.templateParser,
    },
    rules: {},
  },
]);
