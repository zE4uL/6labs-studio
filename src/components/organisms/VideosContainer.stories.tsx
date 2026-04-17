import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideosContainer } from './VideosContainer'

const MOCK_SESSIONS = [
  {
    sessionId: 'Session #2847',
    date: '10/11/25',
    duration: '4:05',
    description:
      'Competitive ranked match with strategic gameplay. Player focused on objective-based play with moderate combat.',
    tags: ['items looted', 'game crashed', '+1'],
  },
  {
    sessionId: 'Session #2846',
    date: '10/11/25',
    duration: '3:22',
    description:
      'Quick casual match. Player explored the map and focused on looting before engaging in late-game combat.',
    tags: ['exploration', 'late-game fight'],
  },
  {
    sessionId: 'Session #2845',
    date: '10/10/25',
    duration: '5:10',
    description:
      'Extended session with heavy combat throughout. Multiple squad wipes recorded with high elimination count.',
    tags: ['squad wipe', 'high kills', '+2'],
  },
  {
    sessionId: 'Session #2844',
    date: '10/10/25',
    duration: '2:45',
    description:
      'Short match ending in early elimination. Player landed in a hot zone and was eliminated within the first two minutes.',
    tags: ['hot drop', 'early death'],
  },
  {
    sessionId: 'Session #2843',
    date: '10/09/25',
    duration: '4:55',
    description:
      'Balanced session with solid rotations and moderate combat. Finished in top 5 with consistent performance.',
    tags: ['top 5', 'good rotation'],
  },
  {
    sessionId: 'Session #2842',
    date: '10/09/25',
    duration: '3:48',
    description:
      'Team-focused match with multiple revives. Strong coordination and communication throughout the session.',
    tags: ['team play', 'revives'],
  },
]

const meta = {
  title: 'Organisms/VideosContainer',
  component: VideosContainer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VideosContainer>

export default meta
type Story = StoryObj<typeof meta>

/** 3-column grid view with 6 sessions. */
export const GridView: Story = {
  args: {
    sessions: MOCK_SESSIONS,
    columns: 3,
  },
}

/** List view (user toggles inside the component). Starts with 2-column grid. */
export const ListView: Story = {
  args: {
    sessions: MOCK_SESSIONS,
    columns: 2,
  },
}

/** Empty state fallback when no sessions are available. */
export const Empty: Story = {
  args: {
    sessions: [],
  },
}
