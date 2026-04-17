import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoPlayerThumbnail } from './VideoPlayerThumbnail'
import type { SessionEvent } from '../../lib/types/radiologist'

const mockEvents: SessionEvent[] = [
  { id: 'e1', type: 'kill', timestamp: '0:15', description: 'Early elimination with shotgun' },
  { id: 'e2', type: 'loot', timestamp: '0:22', description: 'Grabbed enemy loot' },
  { id: 'e3', type: 'death', timestamp: '0:28', description: 'Flanked by enemy squad' },
]

const meta = {
  title: 'Molecules/VideoPlayerThumbnail',
  component: VideoPlayerThumbnail,
  tags: ['autodocs'],
  argTypes: {
    duration: { control: 'text' },
    showControls: { control: 'boolean' },
  },
  args: {
    onPlayPause: () => {},
    onSeek: () => {},
    onEventSeek: () => {},
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
} satisfies Meta<typeof VideoPlayerThumbnail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    duration: '0:30',
    events: mockEvents,
  },
}

export const WithControls: Story = {
  args: {
    duration: '12:34',
    events: mockEvents,
    showControls: true,
    currentTime: 180,
    totalDuration: 754,
    isPlaying: true,
  },
}
