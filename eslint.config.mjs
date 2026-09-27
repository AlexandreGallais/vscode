// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.

import { defineConfig, globalIgnores } from 'eslint/config';
import tsEslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';

export default defineConfig([
  // Build outputs, caches and dependencies (same folders as .gitignore).
  globalIgnores([
    '**/node_modules/',
    'dist/',
    'tmp/',
    'out-tsc/',
    'bazel-out/',
    '.angular/',
    'coverage/',
    '**/public/',
    '**/assets/',
  ]),
  // Formatting is Prettier's job; its recommended config turns off the conflicting rules.
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.mts', '**/*.html'],
    extends: [prettier],
    rules: {
      'prettier/prettier': ['error'],
    },
  },
  // SonarJS: recommended preset as is (same rules as SonarQube); only duplicates of explicit rules are off.
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.mts'],
    extends: [sonarjs.configs.recommended],
    rules: {
      // Size limits: off in the preset, enabled with SonarQube default thresholds.
      'sonarjs/max-lines': ['error'],
      'sonarjs/max-lines-per-function': ['error'],
      'sonarjs/nested-control-flow': ['error'],
      // Off: duplicate of array-callback-return.
      'sonarjs/array-callback-without-return': ['off'],
      // Off: duplicate of block-scoped-var.
      'sonarjs/block-scoped-var': ['off'],
      // Off: duplicate of @typescript-eslint/naming-convention.
      'sonarjs/class-name': ['off'],
      // Off: duplicate of no-eval, no-new-func and no-implied-eval.
      'sonarjs/code-eval': ['off'],
      // Off: duplicate of no-new.
      'sonarjs/constructor-for-side-effects': ['off'],
      // Off: duplicate of @typescript-eslint/no-deprecated.
      'sonarjs/deprecation': ['off'],
      // Off: duplicate of no-warning-comments.
      'sonarjs/fixme-tag': ['off'],
      // Off: duplicate of no-loop-func.
      'sonarjs/function-inside-loop': ['off'],
      // Off: duplicate of require-yield.
      'sonarjs/generator-without-yield': ['off'],
      // Off: duplicate of no-labels.
      'sonarjs/label-position': ['off'],
      // Off: duplicate of @typescript-eslint/require-array-sort-compare.
      'sonarjs/no-alphabetical-sort': ['off'],
      // Off: duplicate of @typescript-eslint/no-array-delete.
      'sonarjs/no-array-delete': ['off'],
      // Off: duplicate of no-labels.
      'sonarjs/no-case-label-in-switch': ['off'],
      // Off: duplicate of no-control-regex.
      'sonarjs/no-control-regex': ['off'],
      // Off: duplicate of no-useless-assignment.
      'sonarjs/no-dead-store': ['off'],
      // Off: duplicate of no-delete-var.
      'sonarjs/no-delete-var': ['off'],
      // Off: duplicate of @typescript-eslint/no-duplicate-type-constituents.
      'sonarjs/no-duplicate-in-composite': ['off'],
      // Off: duplicate of no-empty-character-class.
      'sonarjs/no-empty-character-class': ['off'],
      // Off: already a TypeScript compiler error.
      'sonarjs/no-extra-arguments': ['off'],
      // Off: duplicate of no-fallthrough.
      'sonarjs/no-fallthrough': ['off'],
      // Off: duplicate of no-shadow-restricted-names.
      'sonarjs/no-globals-shadowing': ['off'],
      // Off: duplicate of @typescript-eslint/no-unnecessary-condition.
      'sonarjs/no-gratuitous-expressions': ['off'],
      // Off: duplicate of no-dupe-else-if and no-duplicate-case.
      'sonarjs/no-identical-conditions': ['off'],
      // Off: duplicate of no-undef (and a TypeScript compiler error).
      'sonarjs/no-implicit-global': ['off'],
      // Off: duplicate of no-invalid-regexp.
      'sonarjs/no-invalid-regexp': ['off'],
      // Off: duplicate of no-labels.
      'sonarjs/no-labels': ['off'],
      // Off: duplicate of no-misleading-character-class.
      'sonarjs/no-misleading-character-class': ['off'],
      // Off: duplicate of no-nested-ternary.
      'sonarjs/no-nested-conditional': ['off'],
      // Off: duplicate of no-param-reassign.
      'sonarjs/no-parameter-reassignment': ['off'],
      // Off: duplicate of no-new-wrappers and @typescript-eslint/no-wrapper-object-types.
      'sonarjs/no-primitive-wrappers': ['off'],
      // Off: duplicate of @typescript-eslint/no-unnecessary-boolean-literal-compare.
      'sonarjs/no-redundant-boolean': ['off'],
      // Off: duplicate of no-regex-spaces.
      'sonarjs/no-regex-spaces': ['off'],
      // Off: duplicate of curly.
      'sonarjs/no-unenclosed-multiline-block': ['off'],
      // Off: duplicate of no-new (which reports any `new` used for side effects).
      'sonarjs/no-unthrown-error': ['off'],
      // Off: duplicate of @typescript-eslint/no-unused-vars (which honours the `_` prefix).
      'sonarjs/no-unused-vars': ['off'],
      // Off: same check as no-confusing-void-expression, off by choice (`prop = this.listen(…)`).
      'sonarjs/no-use-of-empty-return-value': ['off'],
      // Off: duplicate of no-useless-catch.
      'sonarjs/no-useless-catch': ['off'],
      // Off: duplicate of @typescript-eslint/prefer-regexp-exec.
      'sonarjs/prefer-regexp-exec': ['off'],
      // Off: duplicate of no-warning-comments.
      'sonarjs/todo-tag': ['off'],
      // Off: duplicate of @typescript-eslint/no-unused-vars.
      'sonarjs/unused-import': ['off'],
      // Off: duplicate of no-const-assign.
      'sonarjs/updated-const-var': ['off'],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.mts'],
    // JS files are Node tooling configs (browser globals are in the TS block).
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2027,
      },
    },
    rules: {
      // ---- Possible problems ----
      // Custom: a bare `return;` is allowed; `forEach` callbacks must not return a value.
      'array-callback-return': ['error', { allowImplicit: true, checkForEach: true }],
      'constructor-super': ['error'],
      'for-direction': ['error'],
      'getter-return': ['error'],
      'no-async-promise-executor': ['error'],
      'no-await-in-loop': ['warn'],
      'no-class-assign': ['error'],
      'no-compare-neg-zero': ['error'],
      'no-cond-assign': ['error'],
      'no-const-assign': ['error'],
      'no-constant-binary-expression': ['error'],
      'no-constant-condition': ['error'],
      'no-constructor-return': ['warn'],
      'no-control-regex': ['error'],
      'no-debugger': ['error'],
      'no-dupe-args': ['error'],
      'no-dupe-class-members': ['error'],
      'no-dupe-else-if': ['error'],
      'no-dupe-keys': ['error'],
      'no-duplicate-case': ['error'],
      // Off: `import type` lines are kept separate (consistent-type-imports).
      'no-duplicate-imports': ['off'],
      'no-empty-character-class': ['error'],
      'no-empty-pattern': ['error'],
      'no-ex-assign': ['error'],
      'no-fallthrough': ['error'],
      'no-func-assign': ['error'],
      'no-import-assign': ['error'],
      'no-inner-declarations': ['error'],
      'no-invalid-regexp': ['error'],
      'no-irregular-whitespace': ['error'],
      'no-loss-of-precision': ['error'],
      'no-misleading-character-class': ['error'],
      'no-new-native-nonconstructor': ['error'],
      'no-obj-calls': ['error'],
      'no-promise-executor-return': ['error'],
      'no-prototype-builtins': ['error'],
      'no-self-assign': ['error'],
      'no-self-compare': ['error'],
      'no-setter-return': ['error'],
      'no-sparse-arrays': ['error'],
      'no-template-curly-in-string': ['error'],
      'no-this-before-super': ['error'],
      'no-unassigned-vars': ['error'],
      'no-undef': ['error'],
      'no-unexpected-multiline': ['error'],
      'no-unmodified-loop-condition': ['warn'],
      'no-unreachable': ['error'],
      'no-unreachable-loop': ['error'],
      'no-unsafe-finally': ['error'],
      'no-unsafe-negation': ['error'],
      'no-unsafe-optional-chaining': ['error'],
      'no-unused-private-class-members': ['error'],
      'no-unused-vars': ['error'],
      'no-use-before-define': ['error'],
      'no-useless-assignment': ['error'],
      'no-useless-backreference': ['error'],
      // Off: false positives with async/await (removed from eslint:recommended).
      'require-atomic-updates': ['off'],
      'use-isnan': ['error'],
      'valid-typeof': ['error'],

      // ---- Suggestions ----
      'accessor-pairs': ['error'],
      // Off: breaks the prettier/prettier autofix (eslint-plugin-prettier docs).
      'arrow-body-style': ['off'],
      'block-scoped-var': ['error'],
      // Off: replaced by @typescript-eslint/naming-convention.
      camelcase: ['off'],
      'capitalized-comments': ['off'],
      'class-methods-use-this': ['warn'],
      // Off: replaced by sonarjs/cognitive-complexity (15), like SonarQube.
      complexity: ['off'],
      // Off: TypeScript `noImplicitReturns` covers it.
      'consistent-return': ['off'],
      'consistent-this': ['error'],
      // Braces on every block: smaller diffs, the only option safe with Prettier.
      curly: ['error', 'all'],
      // Off: @typescript-eslint/switch-exhaustiveness-check covers it.
      'default-case': ['off'],
      'default-case-last': ['off'],
      'default-param-last': ['error'],
      'dot-notation': ['error'],
      eqeqeq: ['error'],
      'func-name-matching': ['error'],
      // Off: callbacks are arrow functions by convention.
      'func-names': ['off'],
      // Custom: named functions use `function foo()`, not `const foo = () =>`.
      'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
      'grouped-accessor-pairs': ['error'],
      'guard-for-in': ['error'],
      'id-denylist': ['off'],
      'id-length': ['off'],
      'id-match': ['off'],
      // Off: non-standard, forbids `let x: T;` assigned later.
      'init-declarations': ['off'],
      'logical-assignment-operators': ['error'],
      'max-classes-per-file': ['error'],
      // Off: replaced by sonarjs/nested-control-flow (3), like SonarQube.
      'max-depth': ['off'],
      // Off: replaced by sonarjs/max-lines (1000), like SonarQube.
      'max-lines': ['off'],
      // Off: replaced by sonarjs/max-lines-per-function (200), like SonarQube.
      'max-lines-per-function': ['off'],
      // Off: replaced by sonarjs/no-nested-functions (5), like SonarQube.
      'max-nested-callbacks': ['off'],
      // 7 = SonarQube default (S107).
      'max-params': ['error', { max: 7, countThis: 'never' }],
      // Off: no SonarQube equivalent.
      'max-statements': ['off'],
      // Custom: `Capitalized()` calls allowed (decorators, branded-type factories), `new ns.x()` not checked.
      'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: false }],
      'no-alert': ['error'],
      'no-array-constructor': ['error'],
      // Off: the SVG library needs bitwise math (colours).
      'no-bitwise': ['off'],
      'no-caller': ['error'],
      'no-case-declarations': ['error'],
      'no-console': ['warn'],
      'no-continue': ['off'],
      'no-delete-var': ['error'],
      'no-div-regex': ['error'],
      'no-else-return': ['error'],
      'no-empty': ['error'],
      'no-empty-function': ['error'],
      'no-empty-static-block': ['error'],
      // Off: eqeqeq already forbids `== null`.
      'no-eq-null': ['off'],
      'no-eval': ['error'],
      'no-extend-native': ['error'],
      'no-extra-bind': ['error'],
      'no-extra-boolean-cast': ['error'],
      // Off: labels are forbidden by no-labels.
      'no-extra-label': ['off'],
      'no-global-assign': ['error'],
      'no-implicit-coercion': ['error'],
      'no-implicit-globals': ['error'],
      'no-implied-eval': ['error'],
      // Off: non-standard, end-of-line comments are fine.
      'no-inline-comments': ['off'],
      'no-invalid-this': ['error'],
      'no-iterator': ['error'],
      // Off: labels are forbidden by no-labels.
      'no-label-var': ['off'],
      'no-labels': ['error'],
      'no-lone-blocks': ['error'],
      'no-lonely-if': ['error'],
      'no-loop-func': ['error'],
      // Off: too noisy (indexes, SVG coordinates).
      'no-magic-numbers': ['off'],
      // `a = b = 0` is allowed, `const a = (b = 0)` is not.
      'no-multi-assign': ['error', { ignoreNonDeclaration: true }],
      'no-multi-str': ['error'],
      'no-negated-condition': ['off'],
      'no-nested-ternary': ['error'],
      'no-new': ['error'],
      'no-new-func': ['error'],
      'no-new-wrappers': ['error'],
      'no-nonoctal-decimal-escape': ['error'],
      'no-object-constructor': ['error'],
      'no-octal': ['error'],
      'no-octal-escape': ['error'],
      // Custom: parameters' properties cannot be mutated either; libraries must expose methods instead.
      'no-param-reassign': ['error', { props: true }],
      // `i++` only in `for` loops, `+= 1` elsewhere.
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-proto': ['error'],
      'no-redeclare': ['error'],
      'no-regex-spaces': ['error'],
      'no-restricted-exports': ['off'],
      'no-restricted-globals': ['off'],
      'no-restricted-imports': ['off'],
      'no-restricted-properties': ['off'],
      'no-restricted-syntax': ['off'],
      // No assignment in `return`, even in parentheses.
      'no-return-assign': ['error', 'always'],
      'no-script-url': ['error'],
      'no-sequences': ['error'],
      'no-shadow': ['error'],
      'no-shadow-restricted-names': ['error'],
      'no-ternary': ['off'],
      'no-throw-literal': ['error'],
      'no-undef-init': ['off'],
      'no-undefined': ['off'],
      // Off: `_` prefix is allowed (NgRx private members, unused params).
      'no-underscore-dangle': ['off'],
      'no-unneeded-ternary': ['error'],
      'no-unused-expressions': ['error'],
      'no-unused-labels': ['error'],
      'no-useless-call': ['error'],
      'no-useless-catch': ['error'],
      'no-useless-computed-key': ['error'],
      'no-useless-concat': ['error'],
      'no-useless-constructor': ['error'],
      'no-useless-escape': ['error'],
      'no-useless-rename': ['error'],
      // Off: covered by sonarjs/no-redundant-jump, which also reports useless `continue`.
      'no-useless-return': ['off'],
      'no-var': ['error'],
      // `void promise;` marks a promise as intentionally not awaited.
      'no-void': ['error', { allowAsStatement: true }],
      'no-warning-comments': ['warn'],
      'no-with': ['error'],
      'object-shorthand': ['error'],
      // One declaration per statement (cleaner diffs).
      'one-var': ['error', 'never'],
      'operator-assignment': ['error'],
      // Off: breaks the prettier/prettier autofix (eslint-plugin-prettier docs).
      'prefer-arrow-callback': ['off'],
      // Destructuring is reported only when every variable could be const.
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-destructuring': ['error'],
      'prefer-exponentiation-operator': ['error'],
      'prefer-named-capture-group': ['off'],
      'prefer-numeric-literals': ['error'],
      'prefer-object-has-own': ['error'],
      'prefer-object-spread': ['error'],
      'prefer-promise-reject-errors': ['error'],
      'prefer-regex-literals': ['off'],
      'prefer-rest-params': ['error'],
      'prefer-spread': ['error'],
      'prefer-template': ['error'],
      'preserve-caught-error': ['error'],
      radix: ['error'],
      'require-await': ['error'],
      'require-unicode-regexp': ['error'],
      'require-yield': ['error'],
      'sort-imports': ['off'],
      'sort-keys': ['off'],
      'sort-vars': ['off'],
      strict: ['error'],
      'symbol-description': ['error'],
      // Off: `var` is forbidden (no-var).
      'vars-on-top': ['off'],
      yoda: ['error'],

      // ---- Layout & formatting ----
      // Off: formatting is Prettier's job.
      'unicode-bom': ['off'],
    },
  },
  {
    files: ['**/*.ts', '**/*.mts'],
    languageOptions: {
      // TS files are Angular code running in the browser.
      globals: {
        ...globals.browser,
        ...globals.es2027,
      },
      parser: tsEslint.parser,
      parserOptions: {
        // Vitest configs are outside every tsconfig: without a default project they are not linted.
        projectService: { allowDefaultProject: ['lib/*.mts', 'shell/*.mts'] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
    },
    rules: {
      // ---- Core rules already checked by the TypeScript compiler (typescript-eslint eslintRecommended) ----
      'constructor-super': ['off'],
      'getter-return': ['off'],
      'no-class-assign': ['off'],
      'no-const-assign': ['off'],
      'no-dupe-args': ['off'],
      'no-dupe-keys': ['off'],
      'no-func-assign': ['off'],
      'no-import-assign': ['off'],
      'no-new-native-nonconstructor': ['off'],
      'no-obj-calls': ['off'],
      'no-setter-return': ['off'],
      'no-this-before-super': ['off'],
      'no-undef': ['off'],
      'no-unsafe-negation': ['off'],
      'no-with': ['off'],
      // Kept: TypeScript only greys out dead code, `allowUnreachableCode: false` would also block `ng serve`.
      'no-unreachable': ['error'],

      // ---- Core rules useless in ES modules (always strict) ----
      'no-delete-var': ['off'],
      'no-implicit-globals': ['off'],
      'no-octal': ['off'],
      'no-octal-escape': ['off'],

      // ---- TypeScript rules ----
      '@typescript-eslint/adjacent-overload-signatures': ['error'],
      '@typescript-eslint/array-type': ['error'],
      '@typescript-eslint/await-thenable': ['error'],
      '@typescript-eslint/ban-ts-comment': ['error'],
      '@typescript-eslint/ban-tslint-comment': ['error'],
      '@typescript-eslint/class-literal-property-style': ['error'],
      // Replaced by the TS version.
      'class-methods-use-this': ['off'],
      // Custom: Angular hooks and pipes are skipped (class implements OnInit, PipeTransform…).
      '@typescript-eslint/class-methods-use-this': [
        'warn',
        { ignoreClassesThatImplementAnInterface: 'public-fields', ignoreOverrideMethods: true },
      ],
      '@typescript-eslint/consistent-generic-constructors': ['error'],
      '@typescript-eslint/consistent-indexed-object-style': ['error'],
      // Off: TypeScript `noImplicitReturns` covers it.
      '@typescript-eslint/consistent-return': ['off'],
      '@typescript-eslint/consistent-type-assertions': ['error'],
      '@typescript-eslint/consistent-type-definitions': ['error'],
      '@typescript-eslint/consistent-type-exports': ['error'],
      '@typescript-eslint/consistent-type-imports': ['error'],
      // Replaced by the TS version.
      'default-param-last': ['off'],
      '@typescript-eslint/default-param-last': ['error'],
      // Replaced by the TS version.
      'dot-notation': ['off'],
      '@typescript-eslint/dot-notation': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['error'],
      '@typescript-eslint/explicit-member-accessibility': ['error'],
      // Off: duplicate of explicit-function-return-type.
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      // Off: see core rule. If enabled, write `['error', 'always']` (ESLint 10 passes no default mode).
      '@typescript-eslint/init-declarations': ['off'],
      // Replaced by the TS version.
      'max-params': ['off'],
      // 7 = SonarQube default (S107).
      '@typescript-eslint/max-params': ['error', { max: 7 }],
      // Off: Angular fields initialise in order (`inject()` first), conflicting with its default order.
      '@typescript-eslint/member-ordering': ['off'],
      // Custom: `foo(): void` style; pass members as callbacks through `() => api.foo()`.
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      // Custom: Angular + NgRx + RxJS naming; the most specific selector wins.
      '@typescript-eslint/naming-convention': [
        'error',
        // camelCase; `_` prefix = unused param or NgRx private member.
        { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
        // PascalCase: NgRx stores, branded-type factories; UPPER_CASE: InjectionToken.
        { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'], leadingUnderscore: 'allow' },
        // Names come from external APIs.
        { selector: 'variable', modifiers: ['destructured'], format: null },
        // PascalCase: branded-type factories (`DataId()`).
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        // PascalCase: enum exposed to a template.
        {
          selector: 'classProperty',
          modifiers: ['readonly'],
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        { selector: 'typeLike', format: ['PascalCase'] },
        // No `I` prefix (Angular / TypeScript convention).
        { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false } },
        { selector: 'enumMember', format: ['PascalCase'] },
        // Quoted keys: Angular host bindings, HTTP headers.
        {
          selector: [
            'classProperty',
            'objectLiteralProperty',
            'typeProperty',
            'classMethod',
            'objectLiteralMethod',
            'typeMethod',
            'accessor',
            'enumMember',
          ],
          modifiers: ['requiresQuotes'],
          format: null,
        },
      ],
      // Replaced by the TS version.
      'no-array-constructor': ['off'],
      '@typescript-eslint/no-array-constructor': ['error'],
      '@typescript-eslint/no-array-delete': ['error'],
      '@typescript-eslint/no-base-to-string': ['error'],
      // Off: no-non-null-assertion forbids every `!`.
      '@typescript-eslint/no-confusing-non-null-assertion': ['off'],
      // Off: reports `prop = this.listen(…)` when `listen` returns void.
      '@typescript-eslint/no-confusing-void-expression': ['off'],
      '@typescript-eslint/no-deprecated': ['error'],
      // Replaced by the TS version.
      'no-dupe-class-members': ['off'],
      '@typescript-eslint/no-dupe-class-members': ['error'],
      '@typescript-eslint/no-duplicate-enum-values': ['error'],
      '@typescript-eslint/no-duplicate-type-constituents': ['error'],
      '@typescript-eslint/no-dynamic-delete': ['error'],
      // Replaced by the TS version.
      'no-empty-function': ['off'],
      '@typescript-eslint/no-empty-function': ['error'],
      // Deprecated: replaced by no-empty-object-type.
      '@typescript-eslint/no-empty-interface': ['off'],
      '@typescript-eslint/no-empty-object-type': ['error'],
      '@typescript-eslint/no-explicit-any': ['error'],
      // Off: no-non-null-assertion forbids every `!`.
      '@typescript-eslint/no-extra-non-null-assertion': ['off'],
      // Angular classes are decorated (`@Component`, `@Injectable`…).
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      '@typescript-eslint/no-floating-promises': ['error'],
      '@typescript-eslint/no-for-in-array': ['error'],
      '@typescript-eslint/no-generated-empty-object-type': ['error'],
      // Replaced by the TS version.
      'no-implied-eval': ['off'],
      '@typescript-eslint/no-implied-eval': ['error'],
      '@typescript-eslint/no-import-type-side-effects': ['error'],
      '@typescript-eslint/no-inferrable-types': ['error'],
      // Off: the core rule misreads `this:` parameters; the TS version is off by choice.
      'no-invalid-this': ['off'],
      '@typescript-eslint/no-invalid-this': ['off'],
      '@typescript-eslint/no-invalid-void-type': ['error'],
      // Deprecated: the core rule supports TypeScript.
      '@typescript-eslint/no-loop-func': ['off'],
      // Deprecated: the core rule supports TypeScript.
      '@typescript-eslint/no-loss-of-precision': ['off'],
      // Off: see core rule.
      '@typescript-eslint/no-magic-numbers': ['off'],
      // Off: covered by sonarjs/void-use, which only allows `void` on promises.
      '@typescript-eslint/no-meaningless-void-operator': ['off'],
      '@typescript-eslint/no-misused-new': ['error'],
      '@typescript-eslint/no-misused-promises': ['error'],
      '@typescript-eslint/no-misused-spread': ['error'],
      '@typescript-eslint/no-mixed-enums': ['error'],
      '@typescript-eslint/no-namespace': ['error'],
      // Off: no-non-null-assertion forbids every `!`.
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['off'],
      '@typescript-eslint/no-non-null-asserted-optional-chain': ['off'],
      '@typescript-eslint/no-non-null-assertion': ['error'],
      // Off: TypeScript checks redeclarations and allows branded types (`type DataId` + `function DataId`).
      'no-redeclare': ['off'],
      '@typescript-eslint/no-redeclare': ['off'],
      '@typescript-eslint/no-redundant-type-constituents': ['error'],
      '@typescript-eslint/no-require-imports': ['error'],
      // Deprecated: use the core no-restricted-imports if needed.
      '@typescript-eslint/no-restricted-imports': ['off'],
      '@typescript-eslint/no-restricted-types': ['error'],
      // Replaced by the TS version.
      'no-shadow': ['off'],
      '@typescript-eslint/no-shadow': ['error'],
      // Off: no-this-alias forbids aliasing `this` at all.
      'consistent-this': ['off'],
      '@typescript-eslint/no-this-alias': ['error'],
      // Deprecated: replaced by consistent-type-definitions.
      '@typescript-eslint/no-type-alias': ['off'],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
      // `while (true)` is allowed.
      '@typescript-eslint/no-unnecessary-condition': ['error', { allowConstantLoopConditions: true }],
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': ['error'],
      '@typescript-eslint/no-unnecessary-qualifier': ['error'],
      '@typescript-eslint/no-unnecessary-template-expression': ['error'],
      '@typescript-eslint/no-unnecessary-type-arguments': ['error'],
      '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
      '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
      '@typescript-eslint/no-unnecessary-type-conversion': ['error'],
      '@typescript-eslint/no-unnecessary-type-parameters': ['error'],
      '@typescript-eslint/no-unsafe-argument': ['error'],
      '@typescript-eslint/no-unsafe-assignment': ['error'],
      '@typescript-eslint/no-unsafe-call': ['error'],
      '@typescript-eslint/no-unsafe-declaration-merging': ['error'],
      '@typescript-eslint/no-unsafe-enum-comparison': ['error'],
      '@typescript-eslint/no-unsafe-function-type': ['error'],
      '@typescript-eslint/no-unsafe-member-access': ['error'],
      '@typescript-eslint/no-unsafe-return': ['error'],
      '@typescript-eslint/no-unsafe-type-assertion': ['error'],
      '@typescript-eslint/no-unsafe-unary-minus': ['error'],
      // Replaced by the TS version.
      'no-unused-expressions': ['off'],
      '@typescript-eslint/no-unused-expressions': ['error'],
      // Replaced by the TS version.
      'no-unused-private-class-members': ['off'],
      '@typescript-eslint/no-unused-private-class-members': ['error'],
      // Replaced by the TS version.
      'no-unused-vars': ['off'],
      // `_` prefix = intentionally unused.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      // Replaced by the TS version.
      'no-use-before-define': ['off'],
      // Hoisted function declarations may be used before their definition.
      '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
      // Replaced by the TS version.
      'no-useless-constructor': ['off'],
      '@typescript-eslint/no-useless-constructor': ['error'],
      '@typescript-eslint/no-useless-default-assignment': ['error'],
      '@typescript-eslint/no-useless-empty-export': ['error'],
      // Deprecated: replaced by no-require-imports.
      '@typescript-eslint/no-var-requires': ['off'],
      '@typescript-eslint/no-wrapper-object-types': ['error'],
      // Off: asks for `x!`, forbidden by no-non-null-assertion.
      '@typescript-eslint/non-nullable-type-assertion-style': ['off'],
      // Replaced by the TS version.
      'no-throw-literal': ['off'],
      '@typescript-eslint/only-throw-error': ['error'],
      '@typescript-eslint/parameter-properties': ['error'],
      '@typescript-eslint/prefer-as-const': ['error'],
      // Replaced by the TS version.
      'prefer-destructuring': ['off'],
      '@typescript-eslint/prefer-destructuring': ['error'],
      '@typescript-eslint/prefer-enum-initializers': ['error'],
      '@typescript-eslint/prefer-find': ['error'],
      '@typescript-eslint/prefer-for-of': ['error'],
      '@typescript-eslint/prefer-function-type': ['error'],
      '@typescript-eslint/prefer-includes': ['error'],
      '@typescript-eslint/prefer-literal-enum-member': ['error'],
      '@typescript-eslint/prefer-namespace-keyword': ['error'],
      // Custom: `str || 'default'` stays allowed to also replace empty strings.
      '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: { string: true } }],
      '@typescript-eslint/prefer-optional-chain': ['error'],
      // Replaced by the TS version.
      'prefer-promise-reject-errors': ['off'],
      '@typescript-eslint/prefer-promise-reject-errors': ['error'],
      '@typescript-eslint/prefer-readonly': ['error'],
      // Off: would need an allow-list of every Angular / RxJS / DOM type.
      '@typescript-eslint/prefer-readonly-parameter-types': ['off'],
      '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
      '@typescript-eslint/prefer-regexp-exec': ['error'],
      '@typescript-eslint/prefer-return-this-type': ['error'],
      '@typescript-eslint/prefer-string-starts-ends-with': ['error'],
      // Deprecated: replaced by ban-ts-comment.
      '@typescript-eslint/prefer-ts-expect-error': ['off'],
      '@typescript-eslint/promise-function-async': ['error'],
      '@typescript-eslint/related-getter-setter-pairs': ['error'],
      '@typescript-eslint/require-array-sort-compare': ['error'],
      // Replaced by the TS version.
      'require-await': ['off'],
      '@typescript-eslint/require-await': ['error'],
      '@typescript-eslint/restrict-plus-operands': ['error'],
      '@typescript-eslint/restrict-template-expressions': ['error'],
      '@typescript-eslint/return-await': ['error'],
      // Deprecated: replaced by eslint-plugin-perfectionist.
      '@typescript-eslint/sort-type-constituents': ['off'],
      // Custom: only numbers must be compared explicitly (`count > 0`).
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        { allowNumber: false, allowNullableBoolean: true, allowNullableString: true },
      ],
      '@typescript-eslint/strict-void-return': ['error'],
      // Custom: a `default` case covers the remaining members.
      '@typescript-eslint/switch-exhaustiveness-check': ['error', { considerDefaultExhaustiveForUnions: true }],
      '@typescript-eslint/triple-slash-reference': ['error'],
      // Deprecated: no replacement.
      '@typescript-eslint/typedef': ['off'],
      '@typescript-eslint/unbound-method': ['error'],
      '@typescript-eslint/unified-signatures': ['error'],
      '@typescript-eslint/use-unknown-in-catch-callback-variable': ['error'],
    },
  },
  // NgRx features: the type returned by `signalStoreFeature()` is too complex to write by hand.
  {
    files: ['**/*store*/**/with*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': ['off'],
    },
  },
  // Specs: Vitest globals.
  {
    files: ['**/*.spec.ts', '**/*.spec.mts'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
    rules: {
      // Off: Angular types `fixture.nativeElement` as `any`.
      '@typescript-eslint/no-unsafe-assignment': ['off'],
      '@typescript-eslint/no-unsafe-call': ['off'],
      '@typescript-eslint/no-unsafe-member-access': ['off'],
      '@typescript-eslint/no-unsafe-type-assertion': ['off'],
      // Off: a `describe` callback holds a whole suite.
      'sonarjs/max-lines-per-function': ['off'],
    },
  },
  // ESLint configs list every rule explicitly.
  {
    files: ['**/eslint*.mjs'],
    rules: {
      'sonarjs/max-lines': ['off'],
    },
  },
]);
