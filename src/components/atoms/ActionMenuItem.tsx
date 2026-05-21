/**
 * ActionMenuItem — Single row inside ChatActionMenuFlyout and its submenus.
 *
 * Slots: leadingIcon · label · secondary (optional small caption on the right) ·
 * trailing (one of: chevron · checkmark · toggle · none).
 *
 * States: default · hover · disabled · active.
 */

import type { ReactNode } from 'react'
import { ChevronRightIcon } from '../icons/ChevronRightIcon'
import { CheckIcon } from '../icons/CheckIcon'
import Toggle from '../ui/Toggle'

export type ActionMenuItemTrailing = 'chevron' | 'checkmark' | 'toggle' | 'none'

export interface ActionMenuItemProps {
  leadingIcon?: ReactNode
  label: string
  /** Optional secondary caption shown after the label (e.g. "sixlabs-qa") */
  secondary?: string
  trailing?: ActionMenuItemTrailing
  /** Active = the item is currently selected / its submenu is open */
  active?: boolean
  disabled?: boolean
  /** When trailing="toggle", controls the toggle state */
  checked?: boolean
  onToggleChange?: (next: boolean) => void
  onClick?: () => void
  className?: string
}

export function ActionMenuItem({
  leadingIcon,
  label,
  secondary,
  trailing = 'none',
  active = false,
  disabled = false,
  checked = false,
  onToggleChange,
  onClick,
  className = '',
}: ActionMenuItemProps) {
  const handleClick = () => {
    if (disabled) return
    onClick?.()
  }

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      data-active={active || undefined}
      onClick={handleClick}
      className={[
        'action-menu-item w-full flex items-center gap-s px-s py-xs rounded-s text-left',
        'transition-colors duration-150',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: 'var(--text-primary)',
      }}
    >
      {leadingIcon != null && (
        <span
          className="shrink-0 inline-flex items-center justify-center w-[20px] h-[20px]"
          style={{ color: 'var(--text-secondary)' }}
          aria-hidden
        >
          {leadingIcon}
        </span>
      )}

      <span className="flex-1 min-w-0 inline-flex items-center gap-xs">
        <span className="font-body text-s font-medium truncate">{label}</span>
        {secondary && (
          <span
            className="font-body text-xs truncate"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {secondary}
          </span>
        )}
      </span>

      <span className="shrink-0 inline-flex items-center" aria-hidden>
        {trailing === 'chevron' && (
          <ChevronRightIcon size={16} className="action-menu-item-trailing-chevron" />
        )}
        {trailing === 'checkmark' && (
          <CheckIcon size={16} aria-label="selected" />
        )}
        {trailing === 'toggle' && (
          <span onClick={handleToggleClick}>
            <Toggle
              checked={checked}
              onChange={(e) => onToggleChange?.(e.target.checked)}
              disabled={disabled}
            />
          </span>
        )}
      </span>
    </button>
  )
}
