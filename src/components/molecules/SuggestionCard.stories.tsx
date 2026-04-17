import type { Meta, StoryObj } from '@storybook/react-vite'
import { SuggestionCard } from './SuggestionCard'

const meta = {
  title: 'Molecules/SuggestionCard',
  component: SuggestionCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 350 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SuggestionCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { text: 'Show the top five most intense close-range fights.' },
}

export const Long: Story = {
  args: { text: 'Summarize the player\'s rotations: drop spot, key moves, final zone path.' },
}

/** 2x2 grid matching the Oracle page layout */
export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '72px 72px', gap: 12, maxWidth: 700 }}>
      <SuggestionCard text="Show the top five most intense close-range fights." />
      <SuggestionCard text="Summarize the player's rotations: drop spot, key moves, final zone path." />
      <SuggestionCard text="List all loot and upgrade moments and gloo wall usage." />
      <SuggestionCard text="Where did the player lose the most HP, and what caused it?" />
    </div>
  ),
}
