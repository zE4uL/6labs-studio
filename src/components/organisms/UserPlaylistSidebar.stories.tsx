import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserPlaylistSidebar } from './UserPlaylistSidebar'
import type { PlaylistSession, SessionData } from '../../lib/types/radiologist'

function makeSession(overrides: Partial<SessionData> & { sessionId: string }): SessionData {
  return {
    date: '10/11/25',
    duration: '4:05',
    description: 'Competitive ranked match with strategic gameplay.',
    tags: ['items looted', 'game crashed'],
    aiSummary: 'Strong strategic play throughout the match.',
    events: [
      { id: 'e1', type: 'match-start', timestamp: '0:00', description: 'Match started' },
      { id: 'e2', type: 'kill', timestamp: '2:15', description: 'Elimination with M4A1' },
    ],
    region: 'Asia',
    platform: 'Mobile',
    gameMode: 'Battle Royale',
    stats: { eliminations: 4, deaths: 1, placement: '#2' },
    userProfile: {
      username: 'ProGamer_99',
      playerId: 'FF-9281-AXKW',
      stats: [
        [
          { label: 'Total Matches', value: '1,284' },
          { label: 'Win Rate', value: '32%' },
        ],
      ],
    },
    ...overrides,
  }
}

const MOCK_PLAYLIST: PlaylistSession[] = [
  {
    dateLabel: 'Oct 11, 2025',
    durationLabel: '45 min',
    videos: [
      makeSession({ sessionId: 'Session #2847', duration: '4:05' }),
      makeSession({ sessionId: 'Session #2846', duration: '3:22' }),
      makeSession({ sessionId: 'Session #2845', duration: '5:10' }),
    ],
  },
  {
    dateLabel: 'Oct 10, 2025',
    durationLabel: '32 min',
    videos: [
      makeSession({ sessionId: 'Session #2844', duration: '2:45', date: '10/10/25' }),
      makeSession({ sessionId: 'Session #2843', duration: '4:55', date: '10/10/25' }),
    ],
  },
]

const meta = {
  title: 'Organisms/UserPlaylistSidebar',
  component: UserPlaylistSidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 700, display: 'flex', justifyContent: 'flex-end', background: 'var(--bg-subtle, #f5f5f5)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserPlaylistSidebar>

export default meta
type Story = StoryObj<typeof meta>

/** Playlist sidebar with two session groups and an active session highlighted. */
export const Default: Story = {
  args: {
    sessions: MOCK_PLAYLIST,
    activeSessionId: 'Session #2846',
    onSessionClick: () => {},
  },
}
