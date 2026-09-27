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
    // Inline templates can live in any .ts file (Angular 20+ naming drops the .component suffix).
    files: ['**/*.ts'],
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
