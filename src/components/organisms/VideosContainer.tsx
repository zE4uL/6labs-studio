/**
 * VideosContainer — Session gallery with filter header and video grid/list views.
 * Contains: grid/list view toggle, filter button, VideoCard grid/list, "Show more" CTA,
 * and fallback empty state.
 *
 * Variants: Grid (3-col), Grid Small (2-col), List (horizontal rows), Fallback (empty state)
 *
 * @figmaComponent  Videos Container
 * @figmaNode       2737:30104
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=2737-30104
 *
 * Source: studio/src/components/organisms/VideosContainer.tsx
 * Synced: 2026-04-05
 */

import { useState } from 'react'
import Button from '../ui/Button'
import { GridIcon } from '../icons/GridIcon'
import { ListIcon } from '../icons/ListIcon'
import { FilterIcon } from '../icons/FilterIcon'
import { ChevronIcon } from '../icons/ChevronIcon'
import { VideoCard } from '../molecules/VideoCard'
import { VideoCardList } from '../molecules/VideoCardList'
import { VideosEmptyState } from '../molecules/VideosEmptyState'
import { FilterDialog } from './FilterDialog'

type ViewMode = 'grid' | 'grid-small' | 'list'

// Sample data matching Figma design
const SESSIONS = [
  {
    sessionId: 'Session #2847',
    date: '10/11/25',
    duration: '4:05',
    description:
      'Competitive ranked match with strategic gameplay. Player focused on objective-based play with moderate combat. Strong team coordination observed throughout the session.',
    tags: ['items looted', 'game crashed', '+1'],
  },
  {
    sessionId: 'Session #2846',
    date: '10/11/25',
    duration: '4:05',
    description:
      'Competitive ranked match with strategic gameplay. Player focused on objective-based play with moderate combat. Strong team coordination observed throughout the session.',
    tags: ['items looted', 'game crashed', '+1'],
  },
  {
    sessionId: 'Session #2845',
    date: '10/11/25',
    duration: '4:05',
    description:
      'Competitive ranked match with strategic gameplay. Player focused on objective-based play with moderate combat. Strong team coordination observed throughout the session.',
    tags: ['items looted', 'game crashed', '+1'],
  },
  {
    sessionId: 'Session #2844',
    date: '10/11/25',
    duration: '4:05',
    description:
      'Competitive ranked match with strategic gameplay. Player focused on objective-based play with moderate combat. Strong team coordination observed throughout the session.',
    tags: ['items looted', 'game crashed', '+1'],
  },
  {
    sessionId: 'Session #2843',
    date: '10/11/25',
    duration: '4:05',
    description:
      'Competitive ranked match with strategic gameplay. Player focused on objective-based play with moderate combat. Strong team coordination observed throughout the session.',
    tags: ['items looted', 'game crashed', '+1'],
  },
  {
    sessionId: 'Session #2842',
    date: '10/10/25',
    duration: '4:05',
    description:
      'Competitive ranked match with strategic gameplay. Player focused on objective-based play with moderate combat. Strong team coordination observed throughout the session.',
    tags: ['items looted', 'game crashed', '+1'],
  },
]

interface VideosContainerProps {
  /** Which sessions to display — pass empty array to trigger fallback */
  sessions?: typeof SESSIONS
  /** Number of columns for grid view (default: 3) */
  columns?: 2 | 3
  /** Called when a video card is clicked */
  onCardClick?: (session: typeof SESSIONS[number]) => void
  className?: string
}

export function VideosContainer({ sessions = SESSIONS, columns = 3, onCardClick, className }: VideosContainerProps) {
  const [view, setView] = useState<ViewMode>('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const isEmpty = sessions.length === 0

  if (isEmpty) {
    return (
      <div className={['flex flex-col w-full', className].filter(Boolean).join(' ')}>
        <VideosEmptyState />
      </div>
    )
  }

  return (
    <div className={['flex flex-col w-full', className].filter(Boolean).join(' ')}>
      <div className="flex flex-col border border-border-subtle rounded-3xl overflow-hidden bg-bg-elements w-full">

        {/* ── Header ── */}
        <div className="flex items-center justify-between p-l bg-bg-elements z-[2] w-full">

          {/* View mode toggle — paired tertiary icon-only buttons */}
          <div className="flex items-center -mr-[1px]">
            <Button
              variant="tertiary"
              size="md"
              iconOnly
              onClick={() => setView('grid')}
              className={[
                '!rounded-r-none',
                view === 'grid' || view === 'grid-small'
                  ? 'toggle-btn-active z-[1]'
                  : '',
              ].join(' ')}
              aria-label="Grid view"
            >
              <GridIcon size={20} />
            </Button>
            <Button
              variant="tertiary"
              size="md"
              iconOnly
              onClick={() => setView('list')}
              className={[
                '!rounded-l-none -ml-[1.5px]',
                view === 'list'
                  ? 'toggle-btn-active z-[1]'
                  : '',
              ].join(' ')}
              aria-label="List view"
            >
              <ListIcon size={20} />
            </Button>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Filter button — tertiary with left icon */}
          <Button
            variant="tertiary"
            size="md"
            leftIcon={<FilterIcon size={20} />}
            onClick={() => setFilterOpen(true)}
          >
            Filters
          </Button>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col gap-l items-start pb-l px-l z-[1] w-full">

          {/* Grid view (3-col) */}
          {view === 'grid' && (
            <div className={`grid ${columns === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-[12px] w-full`}>
              {sessions.map((session) => (
                <VideoCard key={session.sessionId} {...session} onClick={() => onCardClick?.(session)} />
              ))}
            </div>
          )}

          {/* Grid Small view (2-col) */}
          {view === 'grid-small' && (
            <div className="grid grid-cols-2 gap-[12px] w-full">
              {sessions.map((session) => (
                <VideoCard key={session.sessionId} {...session} onClick={() => onCardClick?.(session)} />
              ))}
            </div>
          )}

          {/* List view */}
          {view === 'list' && (
            <div className="flex flex-col gap-s w-full">
              {sessions.map((session) => (
                <VideoCardList key={session.sessionId} {...session} onClick={() => onCardClick?.(session)} />
              ))}
            </div>
          )}

          {/* Show more */}
          <Button
            variant="tertiary"
            size="md"
            pill
            rightIcon={<ChevronIcon direction="down" size={16} />}
            className="w-full"
          >
            Show more
          </Button>
        </div>

      </div>

      <FilterDialog
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(_filters) => {
          setFilterOpen(false)
          // TODO: apply filters to sessions
        }}
      />
    </div>
  )
}
