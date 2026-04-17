/**
 * SessionDetailsPage — Full session detail view with video player, events, and playlist sidebar.
 *
 * @figmaComponent  Details Page
 * @figmaNode       6453:1472220
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6453-1472220
 */

import { PageTopbar } from '../molecules/PageTopbar'
import { VideoPlayerThumbnail } from '../molecules/VideoPlayerThumbnail'
import { AITextSummary } from '../molecules/AITextSummary'
import { EventTimelineItem } from '../molecules/EventTimelineItem'
import { SessionInfoCard } from '../molecules/SessionInfoCard'
import { GameplayStatsCard } from '../molecules/GameplayStatsCard'
import { UserProfileCard } from '../molecules/UserProfileCard'
import { UserPlaylistSidebar } from './UserPlaylistSidebar'
import { MOCK_PLAYLIST } from '../../lib/mocks/radiologist-sessions'
import type { SessionData } from '../../lib/types/radiologist'

interface SessionDetailsPageProps {
  session: SessionData
  onBack: () => void
  className?: string
}

export function SessionDetailsPage({ session, onBack, className }: SessionDetailsPageProps) {
  return (
    <div
      className={['flex flex-col w-full h-full', className].filter(Boolean).join(' ')}
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      {/* ── Top bar ── */}
      <PageTopbar title={session.sessionId} onBack={onBack} />

      {/* ── Content: left details + right playlist ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: session details (scrollable) */}
        <div className="flex-1 min-w-0 overflow-y-auto flyout-scrollbar">
          <div className="flex gap-xxl px-l pt-l pb-xxl3">
            {/* Left column: video + events */}
            <div className="flex-1 min-w-0 flex flex-col gap-xl">
              {/* Video player */}
              <VideoPlayerThumbnail
                thumbnailSrc={session.thumbnailSrc}
                duration={session.duration}
              />

              {/* Detected Events */}
              <div className="flex flex-col gap-xs">
                <div className="flex items-center gap-xs">
                  <span className="font-body text-xs text-text-tertiary">&#9734;</span>
                  <h3 className="font-display text-s font-semibold text-text-primary">Detected Events</h3>
                </div>
                <div className="flex flex-col">
                  {session.events.map((event) => (
                    <EventTimelineItem
                      key={event.id}
                      type={event.type}
                      timestamp={event.timestamp}
                      description={event.description}
                      showChevron
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: AI summary, info, stats, profile */}
            <div className="w-[380px] shrink-0 flex flex-col gap-xl">
              <AITextSummary
                text={session.aiSummary}
                highlightedPhrases={session.highlightedPhrases}
              />

              <SessionInfoCard
                duration={session.duration}
                region={session.region}
                platform={session.platform}
                gameMode={session.gameMode}
              />

              <GameplayStatsCard stats={session.stats} />

              <UserProfileCard profile={session.userProfile} />
            </div>
          </div>
        </div>

        {/* Right: User's Playlist sidebar */}
        <UserPlaylistSidebar
          sessions={MOCK_PLAYLIST}
          activeSessionId={session.sessionId}
          onSessionClick={() => {}}
        />
      </div>
    </div>
  )
}
