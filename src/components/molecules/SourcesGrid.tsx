/**
 * SourcesGrid — Collapsible grid of source video thumbnails in Oracle AI responses.
 * Shows "N Sources" header with expand arrow. Clicking the arrow opens the sources side panel.
 * Displays up to 3 thumbnails in a horizontal row.
 *
 * @figmaComponent  Sources
 * @figmaNode       6470:1506026
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6470-1506026
 */

import { ChevronIcon } from '../icons/ChevronIcon'

export interface SourceItem {
  id: string
  thumbnailSrc?: string
  duration: string
  title?: string
}

interface SourcesGridProps {
  sources: SourceItem[]
  onExpandSources: () => void
  className?: string
}

export function SourcesGrid({ sources, onExpandSources, className }: SourcesGridProps) {
  const displaySources = sources.slice(0, 3)

  return (
    <div
      className={['flex flex-col gap-s items-start w-full', className]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Title row — clickable to open sources side panel */}
      <button
        type="button"
        onClick={onExpandSources}
        className="oracle-sources-title flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-xxs">
          <span className="font-display text-m font-semibold leading-[1.5] text-text-primary">
            {sources.length} Sources
          </span>
          <ChevronIcon size={16} direction="right" className="text-text-primary" />
        </div>
      </button>

      {/* Thumbnail grid — 3 columns */}
      <div className="flex gap-s items-start w-full">
        {displaySources.map((source) => (
          <div
            key={source.id}
            className="flex-1 min-w-0 rounded-m overflow-hidden bg-black"
            style={{ aspectRatio: '355 / 200' }}
          >
            {source.thumbnailSrc ? (
              <div className="relative w-full h-full">
                <img
                  src={source.thumbnailSrc}
                  alt={source.title || source.id}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-black/60 to-transparent" />
                {/* Duration badge */}
                <div className="absolute bottom-[12px] right-[12px] flex gap-[5px] items-center">
                  <span className="font-display text-xs font-semibold text-white leading-[1.5]">
                    {source.duration}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-base-910 to-base-950" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
