// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint configs).

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  // Same policy as ESLint: a disable comment targets named rules, gives a reason and must still be needed.
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  reportUnscopedDisables: true,
  rules: {
    'prettier/prettier': true,

    // ---- Checked by SonarQube, off in the presets ----
    'no-descending-specificity': true,
    'no-duplicate-selectors': true,

    // ---- Invalid or unknown code ----
    'annotation-no-unknown': true,
    'at-rule-descriptor-no-unknown': true,
    'at-rule-descriptor-value-no-unknown': true,
    'at-rule-prelude-no-invalid': true,
    'media-feature-name-value-no-unknown': true,
    'media-query-no-invalid': true,
    'no-unknown-animations': true,
    'no-unknown-custom-media': true,
    'selector-no-deprecated': true,
    'selector-no-invalid': true,
    'selector-no-unmatchable': true,
    // SCSS-aware versions of the core rules (the core ones do not understand `$variables` or Sass functions).
    'scss/declaration-property-value-no-unknown': true,
    'scss/function-no-unknown': true,

    // ---- SCSS: dead or risky code ----
    'scss/at-mixin-no-risky-nesting-selector': true,
    'scss/at-root-no-redundant': true,
    'scss/at-use-no-redundant-alias': true,
    // `@use 'x' as x` is explicit; `as *` would hide where a variable comes from.
    'scss/at-use-no-unnamespaced': true,
    'scss/block-no-redundant-nesting': true,
    'scss/dimension-no-non-numeric-values': true,
    'scss/function-calculation-no-interpolation': true,
    'scss/no-duplicate-dollar-variables': true,
    'scss/no-duplicate-load-rules': true,
    'scss/no-unused-private-members': true,
    'scss/selector-no-redundant-nesting-selector': true,

    // ---- Strictness: no specificity war ----
    // Custom: `@use` / `@forward` only (Sass removes `@import`).
    'at-rule-disallowed-list': ['import'],
    // Custom: `!important` hides a specificity problem.
    'declaration-no-important': true,
    // Custom: 3 levels, then split the component.
    'max-nesting-depth': 3,
    // Custom: 3 levels, then split the component.
    'selector-max-compound-selectors': 3,
    // Custom: classes only, no `#id`.
    'selector-max-id': 0,
    'selector-no-qualifying-type': true,

    // ---- Consistency ----
    // Custom: colors through variables or hex, never `red`.
    'color-named': 'never',
    'font-weight-notation': 'numeric',

    // Off: custom properties come from the global stylesheet or the design system, unknown to each file.
    'no-unknown-custom-properties': null,
  },
};
