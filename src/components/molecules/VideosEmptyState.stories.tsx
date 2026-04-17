import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideosEmptyState } from './VideosEmptyState'

const meta = {
  title: 'Molecules/VideosEmptyState',
  component: VideosEmptyState,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
} satisfies Meta<typeof VideosEmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomMessage: Story = {
  args: {
    message: 'No sessions found for "headshot kills in ranked mode". Try broadening your search or adjusting the date range.',
  },
}
