import type { Meta, StoryObj } from '@storybook/react-vite'
import { CreditsBadge } from './CreditsBadge'

const meta = {
  title: 'Atoms/CreditsBadge',
  component: CreditsBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof CreditsBadge>

export default meta
type Story = StoryObj<typeof meta>

export const CreditsUsed: Story = {
  args: { text: '20 Credits Used' },
}

export const CreditsRemaining: Story = {
  args: { text: '3 Credits remaining' },
}
