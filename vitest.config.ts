import { defineConfig } from '@packages/vitest-config';

export default defineConfig({
  test: {
    projects: [
      // ------------------------------------
      // ------ audiophile-ecommerce --------
      // ------------------------------------
      {
        test: {
          environment: 'jsdom',
          include: ['apps/audiophile-ecommerce/client/src/**/?(*.)+(spec|test).[jt]s?(x)'],
          name: 'audiophile-ecommerce-client',
        },
      },
      // ------------------------------------
      // ---------- designo-agency ----------
      // ------------------------------------
      {
        test: {
          environment: 'jsdom',
          include: ['apps/designo-agency/client/src/**/?(*.)+(spec|test).[jt]s?(x)'],
          name: 'designo-agency-client',
        },
      },
      // ------------------------------------
      // ----------- invoice-app ------------
      // ------------------------------------
      {
        test: {
          environment: 'jsdom',
          include: ['apps/invoice-app/client/src/**/?(*.)+(spec|test).[jt]s?(x)'],
          name: 'invoice-app-client',
        },
      },
      {
        test: {
          environment: 'node',
          include: ['apps/invoice-app/server/src/**/?(*.)+(spec|test).[jt]s'],
          name: 'invoice-app-server',
        },
      },
      // ------------------------------------
      // --------- kanban-task=-app ---------
      // ------------------------------------
      {
        test: {
          environment: 'jsdom',
          include: ['apps/kanban-task-app/client/src/**/?(*.)+(spec|test).[jt]s?(x)'],
          name: 'kanban-task-app-client',
        },
      },
      {
        test: {
          environment: 'node',
          include: ['apps/kanban-task-app/server/src/**/?(*.)+(spec|test).[jt]s'],
          name: 'kanban-task-app-server',
        },
      },
      // ------------------------------------
      // ------- project-feedback-app -------
      // ------------------------------------
      {
        test: {
          environment: 'jsdom',
          include: ['apps/project-feedback-app/client/src/**/?(*.)+(spec|test).[jt]s?(x)'],
          name: 'project-feedback-app-client',
        },
      },
      {
        test: {
          environment: 'node',
          include: ['apps/project-feedback-app/server/src/**/?(*.)+(spec|test).[jt]s'],
          name: 'project-feedback-app-server',
        },
      },
    ],
  },
});
