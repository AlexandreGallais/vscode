// Learn more about Vitest configuration options at https://vitest.dev/config/

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['shell/src/**/*.ts'],
      exclude: ['shell/src/**/*.spec.ts', 'shell/src/**/*.d.ts', 'shell/src/main.ts', 'shell/src/environments/**'],
      reporter: ['lcovonly'],
      reportsDirectory: './coverage/shell',
      thresholds: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },
    },
  },
});
