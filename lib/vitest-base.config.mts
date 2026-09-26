// Learn more about Vitest configuration options at https://vitest.dev/config/

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['lib/src/**/*.ts'],
      exclude: ['lib/src/**/*.spec.ts', 'lib/src/**/*.d.ts', 'lib/src/main.ts', 'lib/src/environments/**'],
      reporter: ['lcovonly'],
      reportsDirectory: './coverage/lib',
      thresholds: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },
    },
  },
});
