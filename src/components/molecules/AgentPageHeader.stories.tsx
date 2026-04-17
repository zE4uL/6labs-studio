import type { Meta, StoryObj } from '@storybook/react-vite'
import { AgentPageHeader } from './AgentPageHeader'

const meta = {
  title: 'Molecules/AgentPageHeader',
  component: AgentPageHeader,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    iconGradient: { control: 'text' },
  },
} satisfies Meta<typeof AgentPageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Oracle',
    description: 'AI-powered game analytics and session intelligence agent',
    iconGradient: 'linear-gradient(135deg, #7B4CFF 0%, #1770EF 100%)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 6L34 14V26L20 34L6 26V14L20 6Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="20" r="5" fill="white" />
      </svg>
    ),
  },
}
