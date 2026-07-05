import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '#App': path.resolve(__dirname, 'server/app'),
        '#Config': path.resolve(__dirname, 'server/config'),
        '#Controllers': path.resolve(__dirname, 'server/controllers'),
        '#Data': path.resolve(__dirname, 'server/data'),
        '#Graphql': path.resolve(__dirname, 'server/graphql'),
        '#Helpers': path.resolve(__dirname, 'server/helpers'),
        '#Lib': path.resolve(__dirname, 'server/lib'),
        '#Log': path.resolve(__dirname, 'server/log'),
        '#Mappers': path.resolve(__dirname, 'server/mappers'),
        '#Middleware': path.resolve(__dirname, 'server/middleware'),
        '#Models': path.resolve(__dirname, 'server/models'),
        '#Routes': path.resolve(__dirname, 'server/routes'),
        '#Services': path.resolve(__dirname, 'server/services'),
        '#Tests': path.resolve(__dirname, 'server/tests'),
        '#Types': path.resolve(__dirname, 'server/types'),
        '#Utils': path.resolve(__dirname, 'server/utils'),
        '#Views': path.resolve(__dirname, 'server/views'),
      },
    },
    test: {
      coverage: {
        include: ['server/**.{js,ts}'],
      },
      env: loadEnv(`${mode}.server`, process.cwd(), ''),
      environment: 'node',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/__snapshots__/**',
        '**/private/**',
        '**/private*',
        '**/public/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      ],
      globals: true,
      include: ['server/**/*.{test,spec}.?(c|m)[jt]s'],
      setupFiles: ['./vitest.setup.ts'],
    },
  };
});
