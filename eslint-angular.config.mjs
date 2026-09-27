// @ts-check
// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the root config).
// Angular projects: the root config, then Angular, Angular template and NgRx rules.
import { defineConfig } from 'eslint/config';
import angular from 'angular-eslint';
import ngrx from '@ngrx/eslint-plugin';
import rootConfig, { namingConventionSelectors } from './eslint.config.mjs';

/**
 * @param {string} prefix Component and directive selector prefix of the project (`shell`, `dsc`…).
 */
export default function angularConfig(prefix) {
  return defineConfig([
    ...rootConfig,
    // TypeScript rules that Angular code needs differently.
    {
      files: ['**/*.ts'],
      rules: {
        // Off: Angular fields initialise in order (`inject()` first), conflicting with its default order.
        '@typescript-eslint/member-ordering': ['off'],
        // Custom: root naming, plus PascalCase readonly properties (enum exposed to a template).
        '@typescript-eslint/naming-convention': [
          'error',
          ...namingConventionSelectors,
          {
            selector: 'classProperty',
            modifiers: ['readonly'],
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
        ],
        // Angular classes are decorated (`@Component`, `@Injectable`…).
        '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      },
    },
    // Angular: components, directives, pipes and services.
    {
      files: ['**/*.ts'],
      processor: angular.processInlineTemplates,
      plugins: {
        '@angular-eslint': angular.tsPlugin,
      },
      rules: {
        '@angular-eslint/component-class-suffix': ['error'],
        // Small components may stay inline (AGENTS.md); past 3 lines, template and styles go to their own files.
        '@angular-eslint/component-max-inline-declarations': ['error'],
        '@angular-eslint/component-selector': ['error', { type: 'element', prefix, style: 'kebab-case' }],
        '@angular-eslint/computed-must-return': ['error'],
        '@angular-eslint/consistent-component-styles': ['error'],
        '@angular-eslint/contextual-decorator': ['error'],
        '@angular-eslint/contextual-lifecycle': ['error'],
        '@angular-eslint/directive-class-suffix': ['error'],
        '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix, style: 'camelCase' }],
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
    // Angular templates (.html files and inline templates).
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
    // Angular requires this name for the application page.
    {
      files: ['**/src/index.html'],
      rules: {
        'check-file/no-index': ['off'],
      },
    },
    // NgRx: only @ngrx/signals is installed.
    {
      files: ['**/*.ts'],
      plugins: {
        '@ngrx': ngrx,
      },
      rules: {
        // Off: @ngrx/component-store is not installed.
        '@ngrx/avoid-combining-component-store-selectors': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/avoid-combining-selectors': ['off'],
        // Off: @ngrx/effects is not installed.
        '@ngrx/avoid-cyclic-effects': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/avoid-dispatching-multiple-actions-sequentially': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/avoid-duplicate-actions-in-reducer': ['off'],
        // Off: @ngrx/component-store is not installed.
        '@ngrx/avoid-mapping-component-store-selectors': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/avoid-mapping-selectors': ['off'],
        '@ngrx/enforce-type-call': ['error'],
        // Off: @ngrx/store is not installed.
        '@ngrx/good-action-hygiene': ['off'],
        // Off: @ngrx/effects is not installed.
        '@ngrx/no-dispatch-in-effects': ['off'],
        // Off: @ngrx/effects is not installed.
        '@ngrx/no-effects-in-providers': ['off'],
        // Off: @ngrx/effects is not installed.
        '@ngrx/no-multiple-actions-in-effects': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/no-multiple-global-stores': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/no-reducer-in-key-names': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/no-store-subscription': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/no-typed-global-store': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/on-function-explicit-return-type': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/prefer-action-creator': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/prefer-action-creator-in-dispatch': ['off'],
        // Off: @ngrx/effects is not installed.
        '@ngrx/prefer-action-creator-in-of-type': ['off'],
        // Off: @ngrx/operators is not installed.
        '@ngrx/prefer-concat-latest-from': ['off'],
        // Off: @ngrx/effects is not installed.
        '@ngrx/prefer-effect-callback-in-block-statement': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/prefer-inline-action-props': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/prefer-one-generic-in-create-for-feature-selector': ['off'],
        '@ngrx/prefer-protected-state': ['error'],
        // Off: @ngrx/store is not installed.
        '@ngrx/prefer-selector-in-select': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/prefix-selectors-with-select': ['off'],
        // Off: @ngrx/component-store is not installed.
        '@ngrx/require-super-ondestroy': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/select-style': ['off'],
        '@ngrx/signal-state-no-arrays-at-root-level': ['error'],
        '@ngrx/signal-store-feature-should-use-generic-type': ['error'],
        // Off: @ngrx/component-store is not installed.
        '@ngrx/updater-explicit-return-type': ['off'],
        // Off: @ngrx/store is not installed.
        '@ngrx/use-consistent-global-store-name': ['off'],
        // Off: @ngrx/effects is not installed.
        '@ngrx/use-effects-lifecycle-interface': ['off'],
        '@ngrx/with-state-no-arrays-at-root-level': ['error'],
      },
    },
    // NgRx features: the type returned by `signalStoreFeature()` is too complex to write by hand.
    {
      files: ['**/*store*/**/with*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['off'],
      },
    },
    // Specs: Angular types `fixture.nativeElement` and `debugElement` as `any`.
    {
      files: ['**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        '@typescript-eslint/no-unsafe-call': ['off'],
        '@typescript-eslint/no-unsafe-member-access': ['off'],
        '@typescript-eslint/no-unsafe-type-assertion': ['off'],
      },
    },
  ]);
}
