/**
 * UserPlaylistSidebar — Right sidebar on the details page showing user's session playlist.
 * Groups sessions by date with dividers.
 *
 * @figmaComponent  Session Side Panel (Playlist variant)
 * @figmaNode       6453:1472327
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6453-1472327
 */

import { PlaylistVideoCard } from '../molecules/PlaylistVideoCard'
import type { PlaylistSession, SessionData } from '../../lib/types/radiologist'

interface UserPlaylistSidebarProps {
  sessions: PlaylistSession[]
  activeSessionId?: string
  onSessionClick: (session: SessionData) => void
  className?: string
}

function SessionDivider({ dateLabel, durationLabel }: { dateLabel: string; durationLabel: string }) {
  return (
    <div className="flex items-center gap-s px-xs py-xs">
      <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-subtle)' }} />
      <span className="font-display text-2xs font-semibold text-text-tertiary tracking-wider uppercase whitespace-nowrap">
        Session &middot; {dateLabel} &middot; {durationLabel}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-subtle)' }} />
    </div>
  )
}

export function UserPlaylistSidebar({
  sessions,
  activeSessionId,
  onSessionClick,
  className,
}: UserPlaylistSidebarProps) {
  return (
    <div
      className={[
        'flex flex-col w-[380px] h-full bg-bg-elements shrink-0 overflow-y-auto flyout-scrollbar',
        className,
      ].filter(Boolean).join(' ')}
      style={{ borderLeft: '1px solid var(--border-subtle)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-xs px-m pt-m pb-s shrink-0">
        <span className="text-text-tertiary text-s">&#127909;</span>
        <h3 className="font-display text-s font-semibold text-text-primary">User's Playlist</h3>
      </div>

      {/* Session groups */}
      <div className="flex flex-col px-xs pb-m">
        {sessions.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col">
            <SessionDivider dateLabel={group.dateLabel} durationLabel={group.durationLabel} />
            <div className="flex flex-col gap-xxs">
              {group.videos.map((video) => (
                <PlaylistVideoCard
                  key={`${groupIdx}-${video.sessionId}`}
                  session={video}
                  active={video.sessionId === activeSessionId}
                  onClick={() => onSessionClick(video)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
