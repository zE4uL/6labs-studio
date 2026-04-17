import type { Preview } from '@storybook/react-vite'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'Page (Light)', value: '#F1F1F1' },
        { name: 'Card (Light)', value: '#FFFFFF' },
        { name: 'Page (Dark)', value: '#080D1A' },
        { name: 'Card (Dark)', value: '#111827' },
      ],
      default: 'Page (Light)',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;