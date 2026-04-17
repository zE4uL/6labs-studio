import type { Meta, StoryObj } from '@storybook/react-vite'
import { SessionInfoCard } from './SessionInfoCard'

const meta = {
  title: 'Molecules/SessionInfoCard',
  component: SessionInfoCard,
  tags: ['autodocs'],
  argTypes: {
    duration: { control: 'text' },
    region: { control: 'text' },
    platform: { control: 'text' },
    gameMode: { control: 'text' },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SessionInfoCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    duration: '12:34',
    region: 'SEA',
    platform: 'Android',
    gameMode: 'Battle Royale',
  },
}
