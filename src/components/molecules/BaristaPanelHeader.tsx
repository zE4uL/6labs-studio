/**
 * BaristaPanelHeader — top of the Barista side panel.
 * Shows Barista mark + subtitle (contextual copy per state) + close button.
 *
 * Subtitle copy (per PRD):
 *  - idle/profile-ready  → "Personal Assistant"
 *  - generating (Assist) → "brewing your brief..."
 *  - tasks tab active    → "managing your tasks" (Phase 2)
 *
 * @figmaComponent  Barista/ Panel Header
 * @figmaNode       5974:81727
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=5974-81727
 */

import { BaristaColoredIcon } from '../icons/BaristaColoredIcon'
import { CloseIcon } from '../icons/CloseIcon'
import { SettingsIcon } from '../icons/SettingsIcon'

export type BaristaPanelHeaderSubtitle =
  | 'Personal Assistant'
  | 'brewing your brief...'
  | 'managing your tasks'

export interface BaristaPanelHeaderProps {
  subtitle?: BaristaPanelHeaderSubtitle
  /** Show a purple "TURN N" pill next to the title while a turn is active. */
  turnNumber?: number
  onSettings?: () => void
  onClose?: () => void
  className?: string
}

export function BaristaPanelHeader({
  subtitle = 'Personal Assistant',
  turnNumber,
  onSettings,
  onClose,
  className = '',
}: BaristaPanelHeaderProps) {
  return (
    <div
      className={`flex items-center gap-[12px] w-full px-[16px] py-[12px] ${className}`}
      style={{
        backgroundColor: 'var(--bg-elements)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <BaristaColoredIcon size={32} />
      <div className="flex flex-col gap-[2px] flex-1 min-w-0">
        <p
          className="font-[Bricolage_Grotesque] font-semibold text-[14px] leading-[1.2]"
          style={{ color: 'var(--text-primary)' }}
        >
          Barista
        </p>
        <p
          className="font-[Inter] text-[10px] leading-[1.2] uppercase tracking-[1.5px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {subtitle}
        </p>
      </div>
      {typeof turnNumber === 'number' && (
        <span
          className="inline-flex items-center shrink-0 px-[10px] py-[3px] rounded-full font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
          style={{
            backgroundColor: 'var(--purple-tint-light)',
            color: 'var(--purple)',
            border: '1px solid var(--purple-tint-dark)',
          }}
        >
          Turn {turnNumber}
        </span>
      )}
      {(onSettings || onClose) && (
        <div className="flex items-center gap-[4px] shrink-0">
          {onSettings && (
            <button
              type="button"
              onClick={onSettings}
              aria-label="Edit Barista persona"
              className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px] transition-colors hover:bg-[rgba(0,0,0,0.04)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              <SettingsIcon size={16} />
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Barista panel"
              className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px] transition-colors hover:bg-[rgba(0,0,0,0.04)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              <CloseIcon size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
