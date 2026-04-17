import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoSeekBar } from './VideoSeekBar'
import type { SessionEvent } from '../../lib/types/radiologist'

const mockEvents: SessionEvent[] = [
  { id: 'e1', type: 'kill', timestamp: '1:12', description: 'Headshot elimination with M4A1' },
  { id: 'e2', type: 'match-start', timestamp: '0:05', description: 'Match started — Bermuda' },
  { id: 'e3', type: 'loot', timestamp: '3:45', description: 'Picked up airdrop crate' },
  { id: 'e4', type: 'death', timestamp: '6:20', description: 'Eliminated by zone damage' },
  { id: 'e5', type: 'winner', timestamp: '8:00', description: 'Booyah — last squad standing' },
]

const meta = {
  title: 'Molecules/VideoSeekBar',
  component: VideoSeekBar,
  tags: ['autodocs'],
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    totalDuration: { control: 'number' },
  },
  args: {
    onSeek: () => {},
    onEventClick: () => {},
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480, padding: '24px 0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VideoSeekBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    progress: 35,
    totalDuration: 510,
    events: mockEvents,
  },
}

export const WithEvents: Story = {
  args: {
    progress: 72,
    totalDuration: 510,
    events: mockEvents,
  },
}
