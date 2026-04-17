/**
 * BaristaProfileWidget — persona summary card shown inside the Barista panel after setup.
 * Default: PROFILE label + summary text. Variant2 (hover) reveals Edit / Delete actions.
 *
 * @figmaComponent  Barista/ Profile widget
 * @figmaNode       6076:95152
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6076-95152
 */

import { EditIcon } from '../icons/EditIcon'
import { TrashIcon } from '../icons/TrashIcon'

export interface BaristaProfileWidgetProps {
  summary: string
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

export function BaristaProfileWidget({
  summary,
  onEdit,
  onDelete,
  className = '',
}: BaristaProfileWidgetProps) {
  return (
    <div
      className={`barista-profile-widget group flex flex-col w-full rounded-[6px] px-[12px] py-[8px] ${className}`}
      style={{ backgroundColor: 'var(--bg-subtle)' }}
    >
      <div className="flex items-center gap-[4px] w-full">
        <p
          className="flex-1 min-w-0 font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
          style={{ color: 'var(--text-primary)' }}
        >
          Profile
        </p>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit persona"
            className="shrink-0 w-[24px] h-[24px] flex items-center justify-center rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-secondary)' }}
          >
            <EditIcon size={12} />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete persona"
            className="shrink-0 w-[24px] h-[24px] flex items-center justify-center rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-secondary)' }}
          >
            <TrashIcon size={12} />
          </button>
        )}
      </div>
      <p
        className="font-[Inter] text-[12px] leading-[1.5] w-full"
        style={{ color: 'var(--text-secondary)' }}
      >
        {summary}
      </p>
    </div>
  )
}
