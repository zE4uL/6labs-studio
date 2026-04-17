import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlaylistVideoCard } from './PlaylistVideoCard'
import type { SessionData } from '../../lib/types/radiologist'

const mockSession: SessionData = {
  sessionId: 'Session #2847',
  date: '10/11/25',
  duration: '4:05',
  description: 'Competitive ranked match with strategic gameplay.',
  tags: ['3 kills', 'Shop', 'Zone'],
  thumbnailSrc: '',
  aiSummary: 'Aggressive early positioning with 4 eliminations.',
  highlightedPhrases: ['4 eliminations'],
  events: [],
  region: 'NA',
  platform: 'PC',
  gameMode: 'Battle Royale',
  stats: { eliminations: 4, deaths: 1, placement: '#2' },
  userProfile: { username: 'Player1' },
}

const meta = {
  title: 'Molecules/PlaylistVideoCard',
  component: PlaylistVideoCard,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    active: { control: 'boolean' },
    partLabel: { control: 'text' },
    partColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PlaylistVideoCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    session: mockSession,
    partLabel: '1/4',
    partColor: '#7B4CFF',
  },
}

export const Hover: Story = {
  name: 'Hover',
  args: {
    session: mockSession,
    partLabel: '2/4',
    partColor: '#7B4CFF',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const Active: Story = {
  args: {
    session: mockSession,
    active: true,
    partLabel: '3/4',
    partColor: '#7B4CFF',
  },
}

/** All 3 states stacked */
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {([
        { state: 'Default', active: false, label: '1/4' },
        { state: 'Hover', active: false, label: '2/4' },
        { state: 'Active', active: true, label: '3/4' },
      ] as const).map(({ state, active, label }) => (
        <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 10, color: '#64748b', paddingLeft: 4 }}>{state}</span>
          <PlaylistVideoCard
            session={mockSession}
            active={active}
            partLabel={label}
            partColor="#7B4CFF"
            className={state === 'Hover' ? 'playlist-force-hover' : undefined}
          />
        </div>
      ))}
      <style>{`
        .playlist-force-hover { background-color: #F7F7F7 !important; }
      `}</style>
    </div>
  ),
}

/** Multiple sessions with different part colors */
export const SessionGroup: Story = {
  name: 'Session Group (colored pills)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, padding: '0 4px' }}>SESSION OCT 11 · 58 MIN</span>
      <PlaylistVideoCard session={mockSession} partLabel="1/4" partColor="#7B4CFF" />
      <PlaylistVideoCard session={mockSession} partLabel="2/4" partColor="#7B4CFF" />
      <PlaylistVideoCard session={mockSession} active partLabel="3/4" partColor="#7B4CFF" />
      <PlaylistVideoCard session={mockSession} partLabel="4/4" partColor="#7B4CFF" />

      <div style={{ height: 8 }} />
      <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, padding: '0 4px' }}>SESSION OCT 11 · 34 MIN</span>
      <PlaylistVideoCard session={mockSession} partLabel="1/3" partColor="#0EA4C5" />
      <PlaylistVideoCard session={mockSession} partLabel="2/3" partColor="#0EA4C5" />
      <PlaylistVideoCard session={mockSession} partLabel="3/3" partColor="#0EA4C5" />
    </div>
  ),
}
