import type { Meta, StoryObj } from '@storybook/react-vite'
import { SessionSidePanel } from './SessionSidePanel'
import type { SessionData } from '../../lib/types/radiologist'

const MOCK_SESSION: SessionData = {
  sessionId: 'Session #2847',
  date: '10/11/25',
  duration: '4:05',
  description:
    'Competitive ranked match with strategic gameplay. Player focused on objective-based play with moderate combat.',
  tags: ['items looted', 'game crashed', '+1'],
  thumbnailSrc: undefined,
  aiSummary:
    'The player demonstrated strong strategic awareness throughout this ranked match. Early game focused on efficient looting with minimal engagements. Mid-game rotations were well-timed, avoiding high-traffic areas. The player secured 4 eliminations in the final circle, finishing in 2nd place. Notable moments include a squad wipe at timestamp 2:15 and a clutch revive at 3:40.',
  highlightedPhrases: ['squad wipe', 'clutch revive', '4 eliminations'],
  events: [
    { id: 'e1', type: 'match-start', timestamp: '0:00', description: 'Match started — Battle Royale Ranked' },
    { id: 'e2', type: 'loot', timestamp: '0:45', description: 'Picked up M4A1 and Level 3 Vest' },
    { id: 'e3', type: 'kill', timestamp: '2:15', description: 'Squad wipe — 3 eliminations with M4A1' },
    { id: 'e4', type: 'death', timestamp: '3:55', description: 'Eliminated by headshot — AWM sniper' },
  ],
  region: 'Asia',
  platform: 'Mobile',
  gameMode: 'Battle Royale — Ranked',
  stats: {
    eliminations: 4,
    deaths: 1,
    placement: '#2',
  },
  userProfile: {
    username: 'ProGamer_2847',
    playerId: 'FF-9281-AXKW',
    spenderTag: 'Dolphin',
    stats: [
      [
        { label: 'Total Matches', value: '1,284' },
        { label: 'Win Rate', value: '32%' },
        { label: 'Avg Kills', value: '4.2' },
      ],
      [
        { label: 'K/D Ratio', value: '2.8' },
        { label: 'Headshot %', value: '41%' },
        { label: 'Playtime', value: '620h' },
      ],
    ],
  },
}

const meta = {
  title: 'Organisms/SessionSidePanel',
  component: SessionSidePanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 800, display: 'flex', justifyContent: 'flex-end', background: 'var(--bg-subtle, #f5f5f5)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SessionSidePanel>

export default meta
type Story = StoryObj<typeof meta>

/** Session side panel with full mock data. */
export const Default: Story = {
  args: {
    session: MOCK_SESSION,
    onClose: () => {},
    onViewDetail: () => {},
  },
}
