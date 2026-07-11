/* eslint-disable storybook/story-exports */
import type { Preview } from '@storybook/react-vite';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
} satisfies Preview;

export default preview;
