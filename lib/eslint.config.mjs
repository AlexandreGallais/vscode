// @ts-check
// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the root config).
import { defineConfig } from 'eslint/config';
import rootConfig from '../eslint.config.mjs';
import angular from 'angular-eslint';

export default defineConfig([
  ...rootConfig,
  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    plugins: {
      '@angular-eslint': angular.tsPlugin,
    },
    rules: {
      '@angular-eslint/component-class-suffix': ['error'],
      // Custom: no inline template, styles or animations; every component has its own .html and .scss files.
      '@angular-eslint/component-max-inline-declarations': ['error', { template: 0, styles: 0, animations: 0 }],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'dsc',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/computed-must-return': ['error'],
      '@angular-eslint/consistent-component-styles': ['error'],
      '@angular-eslint/contextual-decorator': ['error'],
      '@angular-eslint/contextual-lifecycle': ['error'],
      '@angular-eslint/directive-class-suffix': ['error'],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'dsc',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/inject-at-top': ['error'],
      '@angular-eslint/no-async-lifecycle-method': ['error'],
      '@angular-eslint/no-attribute-decorator': ['error'],
      // Custom: warn, developer-preview APIs may still change before they are stable.
      '@angular-eslint/no-developer-preview': ['warn'],
      '@angular-eslint/no-duplicates-in-metadata-arrays': ['error'],
      '@angular-eslint/no-empty-lifecycle-method': ['error'],
      '@angular-eslint/no-experimental': ['error'],
      '@angular-eslint/no-forward-ref': ['error'],
      '@angular-eslint/no-implicit-take-until-destroyed': ['error'],
      // Off: no input prefix to forbid (the rule does nothing without a list).
      '@angular-eslint/no-input-prefix': ['off'],
      '@angular-eslint/no-input-rename': ['error'],
      '@angular-eslint/no-inputs-metadata-property': ['error'],
      '@angular-eslint/no-lifecycle-call': ['error'],
      '@angular-eslint/no-output-native': ['error'],
      '@angular-eslint/no-output-on-prefix': ['error'],
      '@angular-eslint/no-output-rename': ['error'],
      '@angular-eslint/no-outputs-metadata-property': ['error'],
      '@angular-eslint/no-pipe-impure': ['error'],
      '@angular-eslint/no-queries-metadata-property': ['error'],
      '@angular-eslint/no-uncalled-signals': ['error'],
      // Off: everything is internal, pipe names cannot collide with another library.
      '@angular-eslint/pipe-prefix': ['off'],
      '@angular-eslint/prefer-host-metadata-property': ['error'],
      '@angular-eslint/prefer-inject': ['error'],
      // Custom: OnPush is the default since v22, writing it is noise.
      '@angular-eslint/prefer-on-push-component-change-detection': ['error', { allowExplicitOnPush: false }],
      '@angular-eslint/prefer-output-emitter-ref': ['error'],
      '@angular-eslint/prefer-output-readonly': ['error'],
      '@angular-eslint/prefer-service-decorator': ['error'],
      // Custom: more accurate with type information (typed linting is on in the root config).
      '@angular-eslint/prefer-signal-model': ['error', { useTypeChecking: true }],
      // Custom: more accurate with type information (typed linting is on in the root config).
      '@angular-eslint/prefer-signals': ['error', { useTypeChecking: true }],
      '@angular-eslint/prefer-standalone': ['error'],
      '@angular-eslint/reactive-context-must-read-signal': ['error', { checkResources: true }],
      '@angular-eslint/relative-url-prefix': ['error'],
      '@angular-eslint/require-lifecycle-on-prototype': ['error'],
      // Off: @angular/localize is not installed.
      '@angular-eslint/require-localize-metadata': ['off'],
      // Off: @angular/localize is not installed.
      '@angular-eslint/runtime-localize': ['off'],
      '@angular-eslint/sort-keys-in-type-decorator': ['error'],
      '@angular-eslint/sort-lifecycle-methods': ['error'],
      '@angular-eslint/use-component-selector': ['error'],
      '@angular-eslint/use-component-view-encapsulation': ['error'],
      // Off: root services use @Service (prefer-service-decorator); a bare @Injectable() is component-scoped.
      '@angular-eslint/use-injectable-provided-in': ['off'],
      '@angular-eslint/use-lifecycle-interface': ['error'],
      '@angular-eslint/use-pipe-transform-interface': ['error'],
    },
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angular.templatePlugin,
    },
    languageOptions: {
      parser: angular.templateParser,
    },
    rules: {
      // Off: accessibility is out of scope.
      '@angular-eslint/template/alt-text': ['off'],
      '@angular-eslint/template/attributes-order': ['error'],
      '@angular-eslint/template/banana-in-box': ['error'],
      '@angular-eslint/template/button-has-type': ['error'],
      // Off: accessibility is out of scope.
      '@angular-eslint/template/click-events-have-key-events': ['off'],
      '@angular-eslint/template/conditional-complexity': ['error'],
      // The count covers the whole template, not one expression: past 5 branches, split into child components.
      '@angular-eslint/template/cyclomatic-complexity': ['error'],
      // Off: accessibility is out of scope.
      '@angular-eslint/template/elements-content': ['off'],
      '@angular-eslint/template/eqeqeq': ['error'],
      // Off: @angular/localize is not installed.
      '@angular-eslint/template/i18n': ['off'],
      // Off: accessibility is out of scope.
      '@angular-eslint/template/interactive-supports-focus': ['off'],
      // Off: accessibility is out of scope.
      '@angular-eslint/template/label-has-associated-control': ['off'],
      // Off: accessibility is out of scope.
      '@angular-eslint/template/mouse-events-have-key-events': ['off'],
      '@angular-eslint/template/no-any': ['error'],
      // Off: accessibility is out of scope.
      '@angular-eslint/template/no-autofocus': ['off'],
      // Off: reading a signal is a call (`count()`); derived values belong in computed().
      '@angular-eslint/template/no-call-expression': ['off'],
      // Kept despite its accessibility tag: forbids the obsolete `<marquee>` and `<blink>`.
      '@angular-eslint/template/no-distracting-elements': ['error'],
      '@angular-eslint/template/no-duplicate-attributes': ['error'],
      '@angular-eslint/template/no-empty-control-flow': ['error'],
      // Custom: `[style.x]` only with a dynamic value (a constant belongs in a class); ngStyle is forbidden.
      '@angular-eslint/template/no-inline-styles': ['error', { allowBindToStyle: 'dynamic' }],
      '@angular-eslint/template/no-interpolation-in-attributes': ['error'],
      '@angular-eslint/template/no-negated-async': ['error'],
      '@angular-eslint/template/no-nested-tags': ['error'],
      '@angular-eslint/template/no-non-null-assertion': ['error'],
      '@angular-eslint/template/no-outerhtml': ['error'],
      // Off: accessibility is out of scope.
      '@angular-eslint/template/no-positive-tabindex': ['off'],
      '@angular-eslint/template/prefer-at-else': ['error'],
      '@angular-eslint/template/prefer-at-empty': ['error'],
      '@angular-eslint/template/prefer-built-in-pipes': ['error'],
      '@angular-eslint/template/prefer-class-binding': ['error'],
      '@angular-eslint/template/prefer-contextual-for-variables': ['error'],
      '@angular-eslint/template/prefer-control-flow': ['error'],
      '@angular-eslint/template/prefer-ngsrc': ['error'],
      '@angular-eslint/template/prefer-self-closing-tags': ['error'],
      '@angular-eslint/template/prefer-static-string-properties': ['error'],
      '@angular-eslint/template/prefer-style-binding': ['error'],
      '@angular-eslint/template/prefer-template-literal': ['error'],
      '@angular-eslint/template/require-switch-default': ['error'],
      // Off: accessibility is out of scope.
      '@angular-eslint/template/role-has-required-aria': ['off'],
      // Off: accessibility is out of scope.
      '@angular-eslint/template/table-scope': ['off'],
      // Off: `@for` requires `track`, and *ngFor is forbidden by prefer-control-flow.
      '@angular-eslint/template/use-track-by-function': ['off'],
      // Off: accessibility is out of scope.
      '@angular-eslint/template/valid-aria': ['off'],
    },
  },
]);
