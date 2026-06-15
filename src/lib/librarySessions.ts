/**
 * librarySessions — the Library's agent-available (Ready) videos mapped to the
 * VideosContainer session shape. Shown in the Radiologist gallery (agent page
 * + home tab) when "Library" is selected as the console source.
 *
 * Prototype note: mirrors the Ready entries of VideoLibraryView's demo seed.
 * In production this would come from the same store the Library page reads.
 */

export const LIBRARY_SESSIONS = [
  {
    sessionId: 'Bermuda BR — onboarding flow walkthrough.mp4',
    date: '10 Jun 2026',
    duration: '4:12',
    description:
      'First-session new player path, captured on mid-tier device. Watch for the tutorial skip point.',
    tags: ['tutorial', 'onboarding'],
  },
  {
    sessionId: 'Boss fight — Tier 3 difficulty spike.mov',
    date: '11 Jun 2026',
    duration: '12:03',
    description:
      'Tier 3 boss encounter showing the difficulty spike — player wipes twice before clearing with full loadout.',
    tags: ['boss-fight', 'balance'],
  },
  {
    sessionId: 'Lobby matchmaking repro — long queue.webm',
    date: '11 Jun 2026',
    duration: '6:40',
    description:
      'Reproduction of the long-queue matchmaking issue — lobby idles past the expected match window.',
    tags: ['matchmaking'],
  },
]
