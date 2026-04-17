import type { Meta, StoryObj } from '@storybook/react-vite'
import { AITextSummary } from './AITextSummary'

const meta = {
  title: 'Molecules/AITextSummary',
  component: AITextSummary,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    text: { control: 'text' },
    highlightedPhrases: { control: 'object' },
  },
} satisfies Meta<typeof AITextSummary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'The player demonstrated aggressive early-game positioning with 4 eliminations in the first zone. Mid-game saw a shift to defensive play after losing shields, culminating in a clutch 1v1 victory in the final circle. Session lasted 22 minutes with above-average loot efficiency.',
  },
}

export const WithHighlights: Story = {
  args: {
    text: 'The player demonstrated aggressive early-game positioning with 4 eliminations in the first zone. Mid-game saw a shift to defensive play after losing shields, culminating in a clutch 1v1 victory in the final circle. Session lasted 22 minutes with above-average loot efficiency.',
    highlightedPhrases: [
      '4 eliminations',
      'defensive play',
      'clutch 1v1 victory',
      'above-average loot efficiency',
    ],
  },
}
