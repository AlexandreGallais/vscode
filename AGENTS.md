You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable and performant code following Angular and TypeScript best practices.

This repository is linted very strictly on purpose: most rules below are enforced by ESLint, Stylelint, Prettier or the TypeScript compiler, and lint warnings count as errors. Write code that passes them the first time; never loosen a rule to make code pass.

## Project

- Angular 22 workspace with two projects:
  - `shell`: the application. Selector prefix `shell` (`shell-header`, `[shellHighlight]`).
  - `lib`: an Angular library (package name `lib`, built by ng-packagr to `dist/lib`). Selector prefix `dsc`. Public API: `lib/src/public-api.ts`.
- State: `@ngrx/signals` (signal stores). `@ngrx/store`, effects and component-store are NOT installed.
- Tests: Vitest through `ng test` (jsdom, Vitest globals).
- Storybook 10 with `@storybook/angular-vite` for `lib`.
- Accessibility is out of scope (internal industrial software): the accessibility lint rules are off. Do not add ARIA attributes, focus management or contrast work unless asked.

## Package manager

- **pnpm only** (`packageManager` in package.json). Never run `npm install` / `npm i`: it would recreate `package-lock.json` and install binaries for one platform only.
- `pnpm install`, `pnpm add <pkg>`, `pnpm add -D <pkg>`. Pin exact versions (no `^`), like every existing dependency.
- `pnpm-workspace.yaml` installs native binaries for macOS, Windows and Linux (arm64 and x64) into one `node_modules`, shared by the host and the devcontainer. `allowBuilds` lists packages whose install scripts are skipped; pnpm fails on a new package with an install script until it is added there (set to `false`: the prebuilt binaries are enough).

## Commands

Run all of these before considering a change done:

```sh
pnpm ng lint shell
pnpm ng lint lib
pnpm exec stylelint "**/*.scss"
pnpm ng build lib
pnpm ng build shell
pnpm ng test --project=shell --watch=false
pnpm ng test --project=lib --watch=false
```

- `ng lint` must report no error and no warning (warnings count as errors, like `--max-warnings 0`).
- `pnpm exec eslint --fix <files>` and `pnpm exec stylelint --fix <files>` fix most formatting and ordering issues.
- Storybook: `pnpm ng run lib:storybook` (dev server, port 6006), `pnpm ng run lib:build-storybook`.
- The shell imports the library through its package name `lib`, which points to `dist/lib`: build `lib` before building or serving `shell`.
- Commit messages follow Conventional Commits (commitlint).

## Tooling configuration

- `eslint.config.mjs` (root): shared by every project (TypeScript, SonarJS, imports, file names, Vitest, ESLint comments). No Angular or NgRx rule in it.
- `eslint-angular.config.mjs`: `angularConfig(prefix)` = root config + Angular, Angular template and NgRx rules. Used by `shell/eslint.config.mjs` and `lib/eslint.config.mjs`.
- `eslint-storybook.config.mjs`: Storybook rules for any framework, spread last: `defineConfig([...angularConfig('dsc'), ...storybookConfig])`.
- `stylelint.config.mjs`: `stylelint-config-standard-scss` + `stylelint-config-recess-order` + Prettier, with stricter rules on top.
- `.prettierrc.json`: single quotes, Angular parser for HTML; `.editorconfig`: 2 spaces, LF, 120 columns.
- `tsconfig.json` (root) holds the compiler options and references every project tsconfig (`shell/tsconfig.app.json`, `shell/tsconfig.spec.json`, `lib/tsconfig.lib.json`, `lib/tsconfig.spec.json`, `lib/.storybook/tsconfig.json`). TypeScript 6 requires `rootDir` whenever `outDir` is set.
- Every lint rule is listed explicitly (no `extends` in ESLint configs). When adding a plugin, list all its rules, turn off the ones that duplicate an existing rule (SonarJS included), and comment every non-default choice with a one-line prefix: `Custom:` (project choice), `Off:` (disabled on purpose), `Deprecated:` (replaced).

## Disabling a rule

- Only `// eslint-disable-next-line <rule> -- <reason>`: one line, named rules, with a reason. File-wide disables, `eslint-disable-line`, `/* eslint … */` inline configs and `/* global */` are forbidden; unused disables are errors.
- Stylelint: same policy (`/* stylelint-disable-next-line <rule> -- <reason> */`).
- Do not disable a rule to get code through: fix the code.

## Files, folders and imports

- File and folder names are kebab-case; the Angular type is a middle extension: `user-card.component.ts`, `date.pipe.ts`, `auth.service.ts`, `user.store.ts`, `user-card.component.spec.ts`, `user-card.component.stories.ts`.
- Classes keep the type suffix: `UserCardComponent`, `HighlightDirective` (enforced by `component-class-suffix` / `directive-class-suffix`). Generate with `ng generate`, which follows these conventions.
- No `index.ts` barrels; `lib/src/public-api.ts` is the only entry point of the library.
- Named exports only. Default exports are allowed only where a tool requires them (config files, story meta, `.storybook/*.ts`).
- Import order: packages first, then relative files (`../`, then `./`); `import type` lines are separate and sorted with their origin.
- No import cycles. No package imported unless it is declared in the nearest `package.json`: a package used by `lib` source code must be in `lib/package.json` (`peerDependencies`). `devDependencies` are allowed only in specs, stories, `.storybook/` and tool configs.
- Inside `lib`, imports are relative only; never `import … from 'lib'`. `lib` never imports from `shell`; `shell` imports `lib` through its package name, never through a relative path.

## TypeScript Best Practices

- Strict compiler options on top of `strict`: `noUncheckedIndexedAccess` (`array[i]` is `T | undefined`: check it, do not use `!`), `exactOptionalPropertyTypes`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noFallthroughCasesInSwitch`.
- Unused variables and unreachable code do not break the build but fail the lint.
- Avoid the `any` type; use `unknown` when the type is uncertain. No non-null assertion `!`.
- Explicit return types on functions and methods, explicit accessibility (`public` / `protected` / `private`) on class members.
- `import type { X }` for type-only imports, on its own line.
- Named functions use `function foo(): T {}`, not `const foo = () => {}`; callbacks stay arrow functions.
- Conditions: numbers are compared explicitly (`count > 0`, not `if (count)`).
- `_` prefix only for intentionally unused parameters and private members.
- Prefer type inference when the type is obvious (except function return types).

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+ (writing it is a lint error).
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings and listeners (including `window:` and `document:` events) inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` (`ngSrc`) for all static images.
  - `NgOptimizedImage` does not work for inline base64 images (`data:` URLs keep `src`).
- Keys of `@Component`, `@Directive`, `@Injectable`, `@Pipe` decorators follow the Angular order (autofixed by ESLint): `selector`, `imports`, `templateUrl`/`template`, `styleUrl`/`styles`, `providers`, …
- `inject()` calls come first in the class, before any other member. Lifecycle hooks implement their interface (`implements OnInit`) and are declared in execution order.
- Developer-preview APIs produce a warning, experimental APIs are forbidden.
- `@angular/localize` is not installed: no i18n attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators; `viewChild()` / `contentChild()` instead of `@ViewChild()` / `@ContentChild()`
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Inline `template` / `styles` are allowed for small components only (3 lines at most); otherwise use `templateUrl` and `styleUrl` (single `styleUrl`, not `styleUrls`)
- A component without styles has no `.scss` file and no `styleUrl` (empty style files fail Stylelint)
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead; `[style.x]` only with a dynamic value (a constant belongs in a class)
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file (`./`).
- `ViewEncapsulation.None` is forbidden.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- `computed()`, `linkedSignal()` and `effect()` must read at least one signal; `computed()` must return a value
- NgRx signal stores: keep the state protected (default `protectedState`), no array at the root of `withState()` / `signalState()` (wrap it in an object), a custom feature that takes an input (`with-*.ts` in a store folder) declares a generic type

## Templates

- Keep templates simple and avoid complex logic: at most 5 branches (`@if`, `@for`, `@switch` cases) per template, then split into child components
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
  - `@else` instead of a second `@if` with the opposite condition, `@empty` instead of an `@if` on the list length, `@default` in every `@switch`, `@for` contextual variables (`$index`, `$first`…) instead of aliases
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- `===` / `!==` only; no `$any()`, no `!` non-null assertion, no negated async pipe
- Bindings over interpolation in attributes (`[id]="name"`, not `id="{{ name }}"`); static strings as plain attributes (`title="x"`, not `[title]="'x'"`)
- Self-closing tags for elements without content (`<shell-header />`); `<button>` always has a `type`
- Attributes in order: structural directives, template references, attributes, inputs, two-way bindings, outputs (autofixed)
- Built-in pipes instead of methods (`| lowercase`, not `.toLowerCase()`)

## Services

- Design services around a single responsibility
- Use the `@Service()` decorator for singleton services (Angular v22+), not `@Injectable({ providedIn: 'root' })`; a bare `@Injectable()` is for services provided by a component
- Use the `inject()` function instead of constructor injection

## Styles (SCSS)

- Classes only: no `#id` selectors, no element-qualified selectors (`div.card`), no `!important`, no `::ng-deep`
- At most 3 levels of nesting and 3 compound selectors
- `@use 'x' as x` (namespaced) instead of `@import`
- No named colors (`red`); numeric `font-weight` (`700`, not `bold`)
- Property order follows recess order (autofixed)

## Tests (Vitest)

- Specs are `*.spec.ts` next to the tested file; `it`, never `test`
- Vitest globals are enabled: do NOT import `describe`, `it`, `expect`, `vi` from `vitest`
- `describe` title: the class (`describe(UserService, …)`) or its name as a string; `it` titles in lowercase
- Setup in `beforeEach`, hooks before the tests; at most 5 `expect` per test; no conditional expects or tests; no `.only`, `.skip` or commented-out tests
- Matchers: `toStrictEqual` over `toEqual`, `toHaveLength`, `toHaveBeenCalledOnce()`, `toBeTruthy()` / `toBeInstanceOf()` for objects (never `toBe(true)` on an object)
- Mocks are typed: `vi.fn<(id: string) => User>()`, `vi.spyOn` over reassigning methods, `vi.mocked()` over casts
- `fixture.nativeElement` is `any` in Angular specs; the `no-unsafe-*` rules are relaxed in specs for that reason only

## Storybook

- Stories live next to their component: `button.component.stories.ts`; they are excluded from the library build
- Component Story Format 3:

  ```ts
  import type { Meta, StoryObj } from '@storybook/angular-vite';
  import { ButtonComponent } from './button.component';

  const meta = {
    component: ButtonComponent,
  } satisfies Meta<ButtonComponent>;

  export default meta;

  type Story = StoryObj<typeof meta>;

  export const Default: Story = {};
  ```

- No `title` in meta (the sidebar path comes from the file path), story exports in PascalCase, no redundant `name`
- Import from the framework package `@storybook/angular-vite`, never from a renderer package
