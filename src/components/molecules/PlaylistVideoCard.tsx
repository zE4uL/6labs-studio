/**
 * PlaylistVideoCard — Small horizontal video card for the user's playlist sidebar.
 * States: Default, Hover (gray bg), Active (brand tint bg + blue thumbnail border + play icon).
 * Thumbnail pill shows part number (e.g. "1/4") with a color to distinguish session groups.
 *
 * @figmaComponent  List Small/Sessions
 * @figmaNode       887:30492
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=887-30492
 */

import { CalendarIcon } from '../icons/CalendarIcon'
import { ClockIcon } from '../icons/ClockIcon'
import { PlayIcon } from '../icons/PlayIcon'
import { EventTag } from '../atoms/EventTag'
import type { SessionData } from '../../lib/types/radiologist'

interface PlaylistVideoCardProps {
  session: SessionData
  /** Active/playing state — brand tint bg + blue thumbnail border + play icon */
  active?: boolean
  /** Part label shown as a pill on the thumbnail, e.g. "1/4" */
  partLabel?: string
  /** Color for the part pill — use to distinguish session groups */
  partColor?: string
  /** Sources variant — hides part label pill. Used in Oracle sources side panel. */
  variant?: 'default' | 'sources'
  onClick?: () => void
  className?: string
}

export function PlaylistVideoCard({
  session,
  active,
  partLabel,
  partColor = '#7B4CFF',
  variant = 'default',
  onClick,
  className,
}: PlaylistVideoCardProps) {
  const displayTags = session.tags.slice(0, 2)
  const extraCount = session.tags.length - displayTags.length

  return (
    <div
      className={[
        'playlist-video-card',
        'flex gap-s p-xxs rounded-[10px] cursor-pointer',
        active ? 'playlist-card-active' : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Thumbnail */}
      <div
        className={[
          'relative w-[150px] h-[84px] rounded-[8px] overflow-hidden shrink-0',
          active ? 'ring-2 ring-brand' : '',
        ].filter(Boolean).join(' ')}
      >
        {session.thumbnailSrc ? (
          <img
            src={session.thumbnailSrc}
            alt={session.sessionId}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-base-910 to-base-950" />
        )}
        <div className="absolute inset-0 bg-black/20" />

        {/* Top gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-[40px]"
          style={{ background: 'linear-gradient(-33deg, transparent 71%, rgba(0,0,0,0.8) 96%)' }}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-black/60 to-transparent" />

        {/* Duration badge — hidden when active (play icon takes priority) */}
        {!active && (
          <div className="absolute bottom-1 right-[6px] flex gap-[5px] items-center">
            <ClockIcon size={16} className="text-text-on-brand" />
            <span className="font-display text-xs font-semibold text-text-on-brand leading-[1.5]">
              {session.duration}
            </span>
          </div>
        )}

        {/* Part pill — top-right of thumbnail (hidden in sources variant) */}
        {variant !== 'sources' && partLabel && (
          <div
            className="absolute top-[6px] right-[6px] flex items-center justify-center px-[6px] py-[2px] rounded-[4px] font-display text-2xs font-semibold text-white leading-[1] z-[1]"
            style={{ backgroundColor: partColor }}
          >
            {partLabel}
          </div>
        )}

        {/* Active: play icon overlay */}
        {active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayIcon size={32} className="text-white drop-shadow-lg" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-xs min-w-0 w-[180px] shrink-0">
        <div className="flex flex-col gap-xs w-full">
          <span className="font-display text-s font-semibold text-text-primary leading-[1.5] truncate">
            {session.sessionId}
          </span>
          <div className="flex items-center gap-xxs">
            <CalendarIcon size={16} className="text-text-secondary shrink-0" />
            <span className="font-body text-xs text-text-secondary leading-[1.5]">{session.date}</span>
          </div>
        </div>
        <div className="flex gap-xxs items-center overflow-hidden">
          {displayTags.map((tag) => (
            <EventTag key={tag} label={tag} />
          ))}
          {extraCount > 0 && <EventTag label={`+${extraCount}`} />}
        </div>
      </div>
    </div>
  )
}
