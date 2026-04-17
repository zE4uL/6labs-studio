import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoControlsBar } from './VideoControlsBar'
import type { SessionEvent } from '../../lib/types/radiologist'

const mockEvents: SessionEvent[] = [
  { id: 'e1', type: 'kill', timestamp: '1:12', description: 'Headshot elimination with M4A1' },
  { id: 'e2', type: 'loot', timestamp: '3:45', description: 'Picked up airdrop crate' },
  { id: 'e3', type: 'death', timestamp: '6:20', description: 'Eliminated by zone damage' },
  { id: 'e4', type: 'winner', timestamp: '8:00', description: 'Booyah — last squad standing' },
]

const meta = {
  title: 'Molecules/VideoControlsBar',
  component: VideoControlsBar,
  tags: ['autodocs'],
  argTypes: {
    currentTime: { control: { type: 'range', min: 0, max: 510, step: 1 } },
    totalDuration: { control: 'number' },
    isPlaying: { control: 'boolean' },
  },
  args: {
    onPlayPause: () => {},
    onSeek: () => {},
    onEventClick: () => {},
    onFullscreen: () => {},
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VideoControlsBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentTime: 72,
    totalDuration: 510,
    isPlaying: false,
    events: mockEvents,
  },
}

export const Playing: Story = {
  args: {
    currentTime: 225,
    totalDuration: 510,
    isPlaying: true,
    events: mockEvents,
  },
}
