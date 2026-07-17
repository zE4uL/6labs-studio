/**
 * librarySessions — the Library's agent-available (Ready) videos mapped to the
 * VideosContainer session shape. Shown in the Radiologist gallery (agent page
 * + home tab) when "Library" is selected as the console source.
 *
 * Each session carries upload `tags` (author-set) and `aiTags` (LLM-extracted),
 * mirroring the Library cards. The console's tag-scoping picker reads both.
 *
 * Prototype note: mirrors the Ready entries of VideoLibraryView's demo seed.
 * In production this would come from the same store the Library page reads.
 */

export interface LibrarySession {
  sessionId: string
  date: string
  duration: string
  description: string
  tags: string[]
  aiTags: string[]
}

export const LIBRARY_SESSIONS: LibrarySession[] = [
  {
    sessionId: 'Bermuda BR — onboarding flow walkthrough.mp4',
    date: '10 Jun 2026',
    duration: '4:12',
    description:
      'First-session new player path, captured on mid-tier device. Watch for the tutorial skip point.',
    tags: ['tutorial', 'onboarding'],
    aiTags: ['tutorial skip', 'menu hesitation', 'fast completion'],
  },
  {
    sessionId: 'Boss fight — Tier 3 difficulty spike.mov',
    date: '11 Jun 2026',
    duration: '12:03',
    description:
      'Tier 3 boss encounter showing the difficulty spike — player wipes twice before clearing with full loadout.',
    tags: ['boss-fight', 'balance'],
    aiTags: ['difficulty spike', 'repeated death', 'rage quit'],
  },
  {
    sessionId: 'Lobby matchmaking repro — long queue.webm',
    date: '11 Jun 2026',
    duration: '6:40',
    description:
      'Reproduction of the long-queue matchmaking issue — lobby idles past the expected match window.',
    tags: ['matchmaking'],
    aiTags: ['long queue', 'lobby idle', 'backfill'],
  },
]

export interface LibraryTagOption {
  label: string
  count: number
  group: 'upload' | 'ai'
}

/** Distinct library tags with per-tag video counts, grouped upload vs AI-extracted. */
export function getLibraryTagOptions(): LibraryTagOption[] {
  const tally = (pick: (s: LibrarySession) => string[], group: 'upload' | 'ai'): LibraryTagOption[] => {
    const counts = new Map<string, number>()
    for (const s of LIBRARY_SESSIONS) {
      for (const t of pick(s)) counts.set(t, (counts.get(t) ?? 0) + 1)
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([label, count]) => ({ label, count, group }))
  }
  return [...tally((s) => s.tags, 'upload'), ...tally((s) => s.aiTags, 'ai')]
}

/** Sessions matching ANY selected upload tag (OR). Empty = all. AI tags are
 *  display-only and are NOT used for scoping. */
export function filterLibraryByTags(selected: string[]): LibrarySession[] {
  if (selected.length === 0) return LIBRARY_SESSIONS
  const want = new Set(selected.map((t) => t.toLowerCase()))
  return LIBRARY_SESSIONS.filter((s) => s.tags.some((t) => want.has(t.toLowerCase())))
}
