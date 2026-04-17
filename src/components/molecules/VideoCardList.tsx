/**
 * VideoCardList — Horizontal row card for list view of session recordings.
 * Contains: thumbnail (203px left), session info + description + tags (right).
 *
 * @figmaComponent  Video Card List
 * @figmaNode       3300:99686
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=3300-99686
 */

import { useState, useRef, useCallback } from 'react'
import { CalendarIcon } from '../icons/CalendarIcon'
import { ClockIcon } from '../icons/ClockIcon'
import { EventTag } from '../atoms/EventTag'

interface VideoCardListProps {
  sessionId: string
  date: string
  duration: string
  description: string
  tags: string[]
  thumbnailSrc?: string
  /** Video URL — on hover, plays muted preview. Falls back to static thumbnail if omitted. */
  videoSrc?: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function VideoCardList({
  sessionId,
  date,
  duration,
  description,
  tags,
  thumbnailSrc,
  videoSrc,
  selected = false,
  onClick,
  className,
}: VideoCardListProps) {
  const displayTags = tags.slice(0, 2)
  const extraCount = tags.length - displayTags.length
  const [hovering, setHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = useCallback(() => {
    setHovering(true)
    videoRef.current?.play().catch(() => {})
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovering(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [])

  return (
    <div
      className={[
        'video-card flex h-[114px] overflow-hidden rounded-xl',
        'bg-white cursor-pointer group',
        selected ? 'video-card-selected' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail / Video preview */}
      <div className="relative shrink-0 w-[203px] h-[114px] bg-black rounded-l-[8px] overflow-hidden">
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="none"
            poster={thumbnailSrc}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovering ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={`Session ${sessionId} recording`}
            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-all duration-300 ${videoSrc && hovering ? 'opacity-0' : 'opacity-100'}`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-base-910 to-base-950" />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Top gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-[40px]"
          style={{ background: 'linear-gradient(-15deg, transparent 71%, rgba(0,0,0,0.8) 94%)' }}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-black/60 to-transparent" />

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 flex gap-[5px] items-center">
          <ClockIcon size={16} className="text-text-on-brand" />
          <span className="font-display text-xs font-semibold text-text-on-brand leading-[1.5]">
            {duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 gap-s p-m">
        <div className="flex flex-col gap-xs w-full min-w-0">
          {/* Title row */}
          <div className="flex items-center justify-between w-full">
            <span className="font-display text-s font-semibold text-base-900 leading-[1.5] whitespace-nowrap">
              {sessionId}
            </span>
            <div className="flex gap-xs items-center">
              <CalendarIcon size={16} className="text-base-600" />
              <span className="font-body text-xs text-base-600 leading-[1.5] whitespace-nowrap">
                {date}
              </span>
            </div>
          </div>

          {/* Description — single line truncated in list view */}
          <p className="font-body text-xs text-base-600 leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-xxs items-center">
            {displayTags.map((tag) => (
              <EventTag key={tag} label={tag} />
            ))}
            {extraCount > 0 && (
              <EventTag label={`+${extraCount}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
