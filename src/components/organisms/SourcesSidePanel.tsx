/**
 * SourcesSidePanel — Right-side panel listing all Oracle response sources.
 * Opened when user clicks the sources arrow in an AI response.
 * Reuses PlaylistVideoCard in "sources" variant (no part label).
 *
 * @figmaComponent  Sources Side Panel
 * @figmaNode       6470:1506197
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6470-1506197
 */

import Button from '../ui/Button'
import { CloseIcon } from '../icons/CloseIcon'
import { PlaylistVideoCard } from '../molecules/PlaylistVideoCard'
import type { SessionData } from '../../lib/types/radiologist'

interface SourcesSidePanelProps {
  sources: SessionData[]
  onClose: () => void
  onSourceClick?: (session: SessionData) => void
  className?: string
}

export function SourcesSidePanel({
  sources,
  onClose,
  onSourceClick,
  className,
}: SourcesSidePanelProps) {
  return (
    <div
      className={[
        'flex flex-col w-[420px] h-full bg-bg-elements shrink-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ borderLeft: '1px solid var(--border-default)' }}
    >
      {/* Header — 56px */}
      <div
        className="flex items-center justify-between h-[56px] shrink-0"
        style={{
          padding: '20px 16px',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <span className="font-display text-s font-semibold leading-[1.5] text-base-700 truncate min-w-0 flex-1">
          Sources
        </span>
        <Button
          variant="translucent"
          size="md"
          iconOnly
          onClick={onClose}
          aria-label="Close sources panel"
        >
          <CloseIcon size={16} />
        </Button>
      </div>

      {/* Sources list */}
      <div className="flex-1 min-h-0 overflow-y-auto flyout-scrollbar">
        <div className="flex flex-col">
          {sources.map((session) => (
            <PlaylistVideoCard
              key={session.sessionId}
              session={session}
              variant="sources"
              onClick={() => onSourceClick?.(session)}
              className="px-s"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
