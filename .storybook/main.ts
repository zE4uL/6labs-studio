import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    {
      name: '@storybook/addon-mcp',
      options: {
        toolsets: {
          dev: true,
          test: true,
          docs: true
        }
      }
    }
  ],
  "framework": "@storybook/react-vite"
};
export default config;