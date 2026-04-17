import type { SessionData, PlaylistSession } from '../types/radiologist'

const SHARED_PROFILE = {
  username: 'ProGamerX',
  playerId: 'PGX-42910',
  spenderTag: 'Whale',
  stats: [
    [
      { label: 'Region', value: 'USA', icon: 'location' },
      { label: 'Total Sessions', value: '127 Sessions', icon: 'radar' },
    ],
    [
      { label: 'Days Active', value: '45 Days', icon: 'clock' },
      { label: 'Playtime', value: '120 Minutes', icon: 'gamepad' },
    ],
    [
      { label: 'Spender Type', value: 'Whale', icon: 'leagues' },
      { label: 'Total Spends', value: '$ 500', icon: 'dollar', locked: true },
    ],
    [
      { label: 'Other games Played', value: 'PUBG Mobile, COD Mobile', icon: 'gamepad', locked: true },
      { label: 'Playstyle', value: 'Aggressive', icon: 'gamepad' },
    ],
  ],
}

const SHARED_EVENTS = [
  { id: 'e1', type: 'customization' as const, timestamp: '0:15', description: 'Player customized their loadout' },
  { id: 'e2', type: 'match-start' as const, timestamp: '0:15', description: 'Match Started' },
  { id: 'e3', type: 'loading-error' as const, timestamp: '0:15', description: 'Player stuck at loading screen' },
  { id: 'e4', type: 'kill' as const, timestamp: '0:30', description: 'Player eliminated opponent with headshot using AK47' },
  { id: 'e5', type: 'loot' as const, timestamp: '1:05', description: 'Player looted supply crate near warehouse' },
  { id: 'e6', type: 'winner' as const, timestamp: '3:45', description: 'Player got the Booyah' },
]

function makeSession(index: number): SessionData {
  return {
    sessionId: `Session #${2847 - index}`,
    date: '10/11/25',
    duration: '4:05',
    description:
      'Competitive ranked match with strategic gameplay. Player focused on objective-based play with moderate combat. Strong team coordination observed throughout the session.',
    tags: ['items looted', 'game crashed', '+1'],
    aiSummary:
      'High-intensity battle royale match ending in victory with 12 eliminations. Player showed aggressive playstyle with efficient looting. Shop was opened but no purchase made despite monetization prompts.',
    highlightedPhrases: ['aggressive playstyle with efficient looting'],
    events: SHARED_EVENTS,
    region: 'USA',
    platform: 'BlueStacks 5',
    gameMode: 'Battle Royale',
    stats: { eliminations: 10, deaths: 2, placement: 'Winner' },
    userProfile: SHARED_PROFILE,
  }
}

export const MOCK_SESSIONS: SessionData[] = Array.from({ length: 6 }, (_, i) => makeSession(i))

export const MOCK_PLAYLIST: PlaylistSession[] = [
  {
    dateLabel: 'Oct 11',
    durationLabel: '58 min',
    videos: MOCK_SESSIONS.slice(0, 4),
  },
  {
    dateLabel: 'Oct 11',
    durationLabel: '34 min',
    videos: MOCK_SESSIONS.slice(4, 6),
  },
  {
    dateLabel: 'Oct 12',
    durationLabel: '128 min',
    videos: MOCK_SESSIONS.slice(0, 3),
  },
]
