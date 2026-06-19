/**
 * LibraryVideoSidePanel — Details flyout for a Library video. Mirrors the
 * Radiologist SessionSidePanel section-for-section once the video is ready:
 * video player, AI summary, AI/upload tags, detected events, session info,
 * gameplay stats, and user profile. While uploading/analyzing it shows an
 * analyzing state with the video still playable; failed videos show the error.
 *
 * Library videos don't carry full session data, so the richer sections
 * (events / stats / info / profile) are derived deterministically from the
 * video id — stable per video, like an analysis result.
 *
 * Code-first prototype — no Figma source yet.
 */
import { useCallback, useState } from 'react'
import { VideoPlayerThumbnail } from '../molecules/VideoPlayerThumbnail'
import { AITextSummary } from '../molecules/AITextSummary'
import { EventTimelineItem } from '../molecules/EventTimelineItem'
import { SessionInfoCard } from '../molecules/SessionInfoCard'
import { GameplayStatsCard } from '../molecules/GameplayStatsCard'
import { UserProfileCard } from '../molecules/UserProfileCard'
import { ProgressBar } from '../atoms/ProgressBar'
import Button from '../ui/Button'
import { EventTag } from '../atoms/EventTag'
import { AiTag } from '../atoms/AiTag'
import { CloseIcon } from '../icons/CloseIcon'
import { DetectedEventsIcon } from '../icons/section'
import { EVENT_ICON_MAP } from '../icons/events'
import type { SessionEvent, GameplayStats, UserProfile } from '../../lib/types/radiologist'
import type { LibraryVideo } from './VideoLibraryView'

interface LibraryVideoSidePanelProps {
  video: LibraryVideo
  onClose: () => void
  className?: string
}

const DEFAULT_VISIBLE_EVENTS = 2


function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`
  return `${Math.round(bytes / 1024 / 1024)} MB`
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── Derived analysis (deterministic per video id) ───────────────────────────
const REGIONS = ['NA-East', 'EU-West', 'SEA', 'SA-East', 'India']
const PLATFORMS = ['PC', 'Android', 'iOS', 'Cloud']
const MODES = ['Battle Royale', 'Ranked Squad', 'Clash Squad', 'Lone Wolf']
const USERNAMES = ['NovaStrike', 'GhostPing', 'BluByte', 'RiftRunner', 'AceOfClubs', 'PixelNomad']
const SPENDERS = ['Free', 'Minnow', 'Dolphin', 'Whale']
const EVENT_SEQUENCE: SessionEvent['type'][] = [
  'match-start', 'loot', 'kill', 'customization', 'death', 'loading-error', 'kill', 'winner',
]
const EVENT_DESC: Record<SessionEvent['type'], string[]> = {
  'match-start': ['Match started — player dropped hot at the dock', 'Match began — landed on the ridge'],
  loot: ['Looted a rare weapon crate', 'Picked up armor and meds'],
  kill: ['Eliminated an opponent at close range', 'Knocked an enemy across the ravine'],
  customization: ['Opened the loadout menu mid-match', 'Swapped attachments at the safe house'],
  death: ['Player eliminated by a third party', 'Downed during the final circle'],
  'loading-error': ['Brief loading hitch on asset stream', 'Texture pop-in stalled the frame'],
  winner: ['Match won — Booyah!', 'Last squad standing — victory'],
}

interface DerivedDetails {
  highlightedPhrases: string[]
  events: SessionEvent[]
  region: string
  platform: string
  gameMode: string
  stats: GameplayStats
  userProfile: UserProfile
}

function seedFrom(id: string): () => number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return () => {
    h = (h * 1103515245 + 12345) & 0x7fffffff
    return h / 0x7fffffff
  }
}

function parseSeconds(label?: string): number {
  if (!label) return 240
  const [m, s] = label.split(':').map((n) => parseInt(n, 10) || 0)
  return m * 60 + s
}

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function deriveDetails(video: LibraryVideo): DerivedDetails {
  const rng = seedFrom(video.id)
  const pick = <T,>(arr: T[]) => arr[Math.floor(rng() * arr.length)]
  const total = parseSeconds(video.durationLabel)

  const count = 4 + Math.floor(rng() * 3) // 4–6 events
  const events: SessionEvent[] = Array.from({ length: count }, (_, i) => {
    const type = i === 0 ? 'match-start' : EVENT_SEQUENCE[1 + Math.floor(rng() * (EVENT_SEQUENCE.length - 1))]
    const at = Math.round((total * (i + 1)) / (count + 1))
    return {
      id: `${video.id}-ev-${i}`,
      type,
      timestamp: fmtTime(at),
      description: pick(EVENT_DESC[type]),
    }
  })

  const summaryWords = (video.aiSummary ?? '').split(' ')
  const mid = Math.max(0, Math.floor(summaryWords.length / 2) - 1)
  const highlightedPhrases = summaryWords.length > 4 ? [summaryWords.slice(mid, mid + 2).join(' ')] : []

  const eliminations = Math.floor(rng() * 13)
  const deaths = Math.floor(rng() * 5)
  const placement = pick(['#1', '#2', '#3', 'Top 5', 'Top 10', 'Top 25'])

  const username = pick(USERNAMES)
  const userProfile: UserProfile = {
    username,
    playerId: `#${Math.floor(rng() * 90000 + 10000)}`,
    spenderTag: pick(SPENDERS),
    stats: [
      [
        { label: 'Level', value: `${Math.floor(rng() * 60 + 5)}` },
        { label: 'Matches', value: `${Math.floor(rng() * 4000 + 200).toLocaleString()}` },
      ],
      [
        { label: 'Win rate', value: `${Math.floor(rng() * 30 + 5)}%` },
        { label: 'K/D', value: `${(rng() * 3 + 0.5).toFixed(1)}` },
      ],
    ],
  }

  return {
    highlightedPhrases,
    events,
    region: pick(REGIONS),
    platform: pick(PLATFORMS),
    gameMode: pick(MODES),
    stats: { eliminations, deaths, placement },
    userProfile,
  }
}

export function LibraryVideoSidePanel({ video, onClose, className }: LibraryVideoSidePanelProps) {
  const isReady = video.status === 'ready'
  const isUploading = video.status === 'uploading'
  const isFailed = video.status === 'failed'

  const [showAllEvents, setShowAllEvents] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  const getEventIcon = useCallback((type: string) => {
    const IconComp = EVENT_ICON_MAP[type] ?? EVENT_ICON_MAP['generic']
    return IconComp ? <IconComp size={24} className="text-text-secondary" /> : null
  }, [])

  const details = isReady ? deriveDetails(video) : null

  return (
    <div
      className={['flex flex-col w-[420px] h-full bg-bg-elements shrink-0 isolate', className]
        .filter(Boolean)
        .join(' ')}
      style={{ borderLeft: '1px solid var(--border-default)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between h-[56px] shrink-0 px-l gap-s"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <span
            className="font-display text-s font-semibold leading-[1.4] truncate min-w-0"
            style={{ color: 'var(--text-primary)' }}
          >
            {video.title}
          </span>
        </div>
        <Button variant="translucent" size="md" iconOnly onClick={onClose} aria-label="Close panel">
          <CloseIcon size={20} />
        </Button>
      </div>

      {/* Video player — always present & playable; analyzing badge when not ready */}
      <div className="shrink-0 px-l pt-l" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div className="relative">
          <VideoPlayerThumbnail
            thumbnailSrc={video.thumbnailSrc}
            duration={video.durationLabel ?? '0:00'}
            events={details?.events}
            showControls
          />
        </div>
        <div className="flex items-center gap-xs pt-s pb-m font-body text-xs" style={{ color: 'var(--text-tertiary)' }}>
          {formatSize(video.sizeBytes)} &middot; {formatDate(video.addedAt)}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 overflow-y-auto flyout-scrollbar overflow-x-hidden">
        {isReady && details ? (
          <div className="flex flex-col">
            {/* AI summary */}
            <div className="px-l pt-l">
              <AITextSummary text={video.aiSummary ?? ''} highlightedPhrases={details.highlightedPhrases} />
            </div>

            {/* Tags */}
            {(video.aiTags?.length || video.tags.length) ? (
              <div className="flex flex-col gap-s px-l pt-m">
                {video.aiTags && video.aiTags.length > 0 && (
                  <div className="flex flex-wrap gap-xxs">
                    {video.aiTags.map((t) => (
                      <AiTag key={t} label={t} className="!rounded-[6px]" />
                    ))}
                  </div>
                )}
                {video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-xxs">
                    {video.tags.map((t) => (
                      <EventTag key={t} label={t} className="!rounded-[6px]" />
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            <div className="mt-l" style={{ borderBottom: '1px solid var(--border-default)' }} />

            {/* Detected events */}
            <div className="flex flex-col gap-s pl-l pr-l pt-l">
              <div className="flex items-center gap-xs">
                <DetectedEventsIcon size={16} className="shrink-0" />
                <span className="font-display text-m font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Detected Events
                </span>
              </div>
              <div className="flex flex-col gap-[11px]">
                {(showAllEvents ? details.events : details.events.slice(0, DEFAULT_VISIBLE_EVENTS)).map((event) => (
                  <EventTimelineItem
                    key={event.id}
                    type={event.type}
                    timestamp={event.timestamp}
                    description={event.description}
                    icon={getEventIcon(event.type)}
                    showChevron
                    selected={event.id === selectedEventId}
                    onClick={() => setSelectedEventId(event.id)}
                  />
                ))}
              </div>
              {details.events.length > DEFAULT_VISIBLE_EVENTS && (
                <Button variant="tertiary" size="md" className="w-full" onClick={() => setShowAllEvents(!showAllEvents)}>
                  {showAllEvents ? 'Show Less' : `Show All Events (${details.events.length})`}
                </Button>
              )}
            </div>

            {/* Session info + gameplay stats + user profile */}
            <div className="flex flex-col gap-l p-l">
              <SessionInfoCard
                duration={video.durationLabel ?? '0:00'}
                region={details.region}
                platform={details.platform}
                gameMode={details.gameMode}
              />
              <GameplayStatsCard stats={details.stats} />
              <UserProfileCard profile={details.userProfile} />
            </div>
          </div>
        ) : isFailed ? (
          <div className="flex flex-col gap-s px-l py-l">
            <span className="font-display text-2xs font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--text-tertiary)' }}>
              Analysis failed
            </span>
            <p className="font-body text-s leading-[1.6]" style={{ color: 'var(--error)' }}>
              {video.error ?? 'Analysis failed — re-analyze to make this video usable.'}
            </p>
          </div>
        ) : (
          /* Analyzing / uploading — video above is still playable */
          <div className="flex flex-col gap-m px-l py-l">
            <div
              className="flex flex-col gap-s p-l rounded-xl"
              style={{ backgroundColor: 'var(--bg-tint-light)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-xs">
                <span className="video-lib-spinner shrink-0" aria-hidden />
                <span className="font-display text-s font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {isUploading ? 'Uploading video…' : 'Analyzing video…'}
                </span>
              </div>
              {isUploading && <ProgressBar value={video.progress} />}
              <p className="font-body text-xs leading-[1.5]" style={{ color: 'var(--text-secondary)' }}>
                You can watch the video now. Your agents will be able to use it, and the AI summary,
                detected events and stats will appear here, once analysis completes.
              </p>
            </div>

            {video.tags.length > 0 && (
              <div className="flex flex-col gap-s">
                <span className="font-display text-2xs font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--text-tertiary)' }}>
                  Tags
                </span>
                <div className="flex flex-wrap gap-xxs">
                  {video.tags.map((t) => (
                    <EventTag key={t} label={t} className="!rounded-[6px]" />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-xs" aria-hidden>
              <span className="video-lib-skeleton w-full" />
              <span className="video-lib-skeleton w-[80%]" />
              <span className="video-lib-skeleton w-[60%]" />
            </div>
          </div>
        )}
      </div>

      {/* Footer — availability */}
      {isReady && (
        <div
          className="flex items-center justify-center gap-xs h-[40px] shrink-0"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <span className="video-lib-dot shrink-0" style={{ backgroundColor: 'var(--success)' }} aria-hidden />
          <span className="font-display text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Available to all agents
          </span>
        </div>
      )}
    </div>
  )
}
