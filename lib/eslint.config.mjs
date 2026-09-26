// @ts-check
import { defineConfig } from 'eslint/config';
import rootConfig from '../eslint.config.mjs';
import angular from 'angular-eslint';

export default defineConfig([
  ...rootConfig,
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angular.tsPlugin,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'dsc',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'dsc',
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
    plugins: {
      '@angular-eslint/template': angular.templatePlugin,
    },
    languageOptions: {
      parser: angular.templateParser,
    },
    rules: {},
  },
]);
