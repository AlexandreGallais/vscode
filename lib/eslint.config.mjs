// @ts-check
import { defineConfig } from 'eslint/config';
import angularConfig from '../eslint-angular.config.mjs';
import storybookConfig from '../eslint-storybook.config.mjs';

export default defineConfig([
  ...angularConfig('dsc'),
  // Inside the library, imports are relative: the `lib` package name points to its build output (dist/lib).
  {
    files: ['**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [{ name: 'lib', message: 'Inside the library, use a relative import.' }],
          patterns: [{ group: ['lib/*'], message: 'Inside the library, use a relative import.' }],
        },
      ],
    },
  },
  // Specs may use the root devDependencies; lib/package.json only lists what the published library needs.
  {
    files: ['**/*.spec.ts'],
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        { devDependencies: true, packageDir: [`${import.meta.dirname}/..`, import.meta.dirname] },
      ],
    },
  },
  ...storybookConfig,
]);
