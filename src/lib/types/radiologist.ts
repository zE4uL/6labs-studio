/** Types for the Radiologist agent flow */

export interface SessionEvent {
  id: string
  type: 'kill' | 'winner' | 'loading-error' | 'customization' | 'match-start' | 'death' | 'loot'
  timestamp: string
  description: string
}

export interface GameplayStats {
  eliminations: number
  deaths: number
  placement: string
}

export interface UserProfileStat {
  icon?: string
  label: string
  value: string
  locked?: boolean
}

export interface UserProfile {
  avatarSrc?: string
  username: string
  playerId?: string
  spenderTag?: string
  stats?: UserProfileStat[][]
}

export interface SessionData {
  sessionId: string
  date: string
  duration: string
  description: string
  tags: string[]
  thumbnailSrc?: string
  aiSummary: string
  highlightedPhrases?: string[]
  events: SessionEvent[]
  region: string
  platform: string
  gameMode: string
  stats: GameplayStats
  userProfile: UserProfile
}

export interface PlaylistSession {
  dateLabel: string
  durationLabel: string
  videos: SessionData[]
}
