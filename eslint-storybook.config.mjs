// @ts-check
// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the root config).
// Storybook, for any framework (Angular, HTML + Vite…): spread it after the project config.
//   export default defineConfig([...angularConfig('dsc'), ...storybookConfig]);
import storybookPlugin from 'eslint-plugin-storybook';

// The plugin is typed with typescript-eslint types, which ESLint's own types reject; it works at runtime.
const storybook = /** @type {import('eslint').ESLint.Plugin} */ (/** @type {unknown} */ (storybookPlugin));

const stories = ['**/*.stories.ts'];
const storybookFolder = ['**/.storybook/*.ts'];

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Stories (Component Story Format).
  {
    files: stories,
    plugins: {
      storybook,
    },
    rules: {
      'storybook/await-interactions': ['error'],
      'storybook/context-in-play-function': ['error'],
      'storybook/csf-component': ['error'],
      'storybook/default-exports': ['error'],
      'storybook/hierarchy-separator': ['error'],
      // Custom: meta is a plain object, readable by the docs and the indexer.
      'storybook/meta-inline-properties': ['error'],
      // `const meta = { … } satisfies Meta<ButtonComponent>` keeps the args typed.
      'storybook/meta-satisfies-type': ['error'],
      'storybook/no-redundant-story-name': ['error'],
      // Import the framework (`@storybook/angular-vite`, `@storybook/html-vite`), not its renderer.
      'storybook/no-renderer-packages': ['error'],
      'storybook/no-stories-of': ['error'],
      // The sidebar title comes from the file path.
      'storybook/no-title-property-in-meta': ['error'],
      'storybook/prefer-pascal-case': ['error'],
      'storybook/story-exports': ['error'],
      'storybook/use-storybook-expect': ['error'],
      'storybook/use-storybook-testing-library': ['error'],
    },
  },
  // Storybook configuration (main.ts, preview.ts).
  {
    files: storybookFolder,
    plugins: {
      storybook,
    },
    rules: {
      // Custom: addons are installed in the root package.json.
      'storybook/no-uninstalled-addons': ['error', { packageJsonLocation: `${import.meta.dirname}/package.json` }],
    },
  },
  // Storybook requires a default export (story meta, main.ts and preview.ts) and runs from the root devDependencies.
  {
    files: [...stories, ...storybookFolder],
    rules: {
      'import-x/no-default-export': ['off'],
      'import-x/no-extraneous-dependencies': ['error', { devDependencies: true, packageDir: import.meta.dirname }],
    },
  },
  // main.ts runs in Node; the folder name is imposed by Storybook.
  {
    files: storybookFolder,
    rules: {
      'check-file/folder-naming-convention': ['off'],
      'import-x/no-nodejs-modules': ['off'],
    },
  },
];
