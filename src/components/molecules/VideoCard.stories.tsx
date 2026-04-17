import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoCard } from './VideoCard'

const meta = {
  title: 'Molecules/VideoCard',
  component: VideoCard,
  tags: ['autodocs'],
  argTypes: {
    sessionId: { control: 'text' },
    date: { control: 'text' },
    duration: { control: 'text' },
    description: { control: 'text' },
    tags: { control: 'object' },
    selected: { control: 'boolean' },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 355 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VideoCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sessionId: 'Session #4821',
    date: '24 Mar 2026',
    duration: '12:34',
    description: 'Battle Royale match on Bermuda — player secured 6 eliminations before final circle.',
    tags: ['Kill', 'Booyah'],
  },
}

export const WithTags: Story = {
  args: {
    sessionId: 'Session #7390',
    date: '02 Apr 2026',
    duration: '8:17',
    description: 'Clash Squad round with aggressive push strategy. Multiple headshot kills and zone rotations observed.',
    tags: ['Kill', 'Death', 'Loot', 'Zone Rotation'],
  },
}

export const Selected: Story = {
  args: {
    sessionId: 'Session #4821',
    date: '24 Mar 2026',
    duration: '12:34',
    description: 'Battle Royale match on Bermuda — player secured 6 eliminations before final circle.',
    tags: ['Kill', 'Booyah'],
    selected: true,
  },
}

/** All 3 states side by side */
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'start' }}>
      {(['default', 'hover', 'selected'] as const).map((state) => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 280 }}>
          <VideoCard
            sessionId="Session #2847"
            date="10/11/25"
            duration="4:05"
            description="Competitive ranked match with strategic gameplay."
            tags={['items looted', 'game crashed']}
            selected={state === 'selected'}
            className={state === 'hover' ? 'video-card-force-hover' : undefined}
          />
          <span style={{ fontSize: 10, color: '#64748b', textAlign: 'center' }}>{state}</span>
        </div>
      ))}
      <style>{`
        .video-card-force-hover {
          border-color: #F7F7F7 !important;
          box-shadow: 0px 4px 16px rgba(0,0,0,0.08) !important;
        }
      `}</style>
    </div>
  ),
}
