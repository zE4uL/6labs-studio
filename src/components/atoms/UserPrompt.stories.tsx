import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserPrompt } from './UserPrompt'

const meta = {
  title: 'Atoms/UserPrompt',
  component: UserPrompt,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 800, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserPrompt>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { text: 'Where are players getting stuck or confused in the tutorial?' },
}

export const Short: Story = {
  args: { text: 'Summarize this session.' },
}

export const Long: Story = {
  args: {
    text: 'Can you analyze the player behavior patterns across all sessions from the last week and identify the most common friction points in the onboarding tutorial flow?',
  },
}
