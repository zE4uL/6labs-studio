/**
 * BaristaSelectionPill — selectable pill used in Barista Setup for Department / Roles / Focus Areas.
 *
 * Variants:
 * - default          : unselected preset option (hoverable)
 * - custom           : "+ Custom" starter pill (hoverable)
 * - custom-selected  : tapped "+ Custom" before typing
 * - custom-input     : editable pill with blinking cursor + placeholder or value
 * - added            : confirmed selection, shows tick + brand border/tint
 *
 * @figmaComponent  Barista/ Selection Pill
 * @figmaNode       6042:11
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6042-11
 */

import { useEffect, useRef } from 'react'
import { PlusIcon } from '../icons/PlusIcon'
import { CheckIcon } from '../icons/CheckIcon'
import { CloseIcon } from '../icons/CloseIcon'

export type BaristaSelectionPillVariant =
  | 'default'
  | 'custom'
  | 'custom-selected'
  | 'custom-input'
  | 'added'

export interface BaristaSelectionPillProps {
  variant?: BaristaSelectionPillVariant
  label?: string
  value?: string
  placeholder?: string
  autoFocus?: boolean
  onChange?: (value: string) => void
  onCommit?: (value: string) => void
  onClose?: () => void
  onClick?: () => void
  className?: string
}

export function BaristaSelectionPill({
  variant = 'default',
  label = 'Pill Label',
  value = '',
  placeholder = 'Type here',
  autoFocus = false,
  onChange,
  onCommit,
  onClose,
  onClick,
  className = '',
}: BaristaSelectionPillProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (variant === 'custom-input' && autoFocus) {
      inputRef.current?.focus()
    }
  }, [variant, autoFocus])

  const base =
    'barista-pill inline-flex items-center justify-center rounded-full py-[6px] text-[12px] leading-[1.5] transition-colors'

  if (variant === 'added') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} gap-[8px] px-[12px] font-[Bricolage_Grotesque] font-semibold ${className}`}
        style={{
          border: '1px solid var(--border-focus)',
          backgroundColor: 'var(--bg-tint-light)',
          color: 'var(--text-brand)',
        }}
        data-variant="added"
      >
        <span>{label}</span>
        <CheckIcon size={16} />
      </button>
    )
  }

  if (variant === 'custom-selected') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} gap-[4px] px-[12px] font-[Inter] ${className}`}
        style={{
          border: '1px solid var(--brand)',
          backgroundColor: 'var(--bg-tint-light)',
          color: 'var(--brand)',
        }}
        data-variant="custom-selected"
      >
        <PlusIcon size={12} />
        <span>Custom</span>
      </button>
    )
  }

  if (variant === 'custom-input') {
    return (
      <span
        className={`${base} gap-[8px] pl-[12px] pr-[6px] font-[Inter] ${className}`}
        style={{
          border: '1px solid var(--border-focus)',
          backgroundColor: 'var(--bg-tint-light)',
          color: 'var(--text-primary)',
        }}
        data-variant="custom-input"
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) onCommit?.(value.trim())
            if (e.key === 'Escape') onClose?.()
          }}
          placeholder={placeholder}
          className="min-w-0 w-[96px] bg-transparent outline-none border-0 text-[12px] leading-[1.5]"
          style={{ color: 'var(--text-primary)' }}
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Cancel custom entry"
          className="shrink-0 rounded-full flex items-center justify-center w-[18px] h-[18px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <CloseIcon size={12} />
        </button>
      </span>
    )
  }

  if (variant === 'custom') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} gap-[4px] px-[12px] font-[Inter] ${className}`}
        style={{
          border: '1px solid var(--border-default)',
          backgroundColor: 'rgba(255,255,255,0.4)',
          color: 'var(--brand)',
        }}
        data-variant="custom"
      >
        <PlusIcon size={12} />
        <span>Custom</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} px-[12px] font-[Inter] ${className}`}
      style={{
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-elements)',
        color: 'var(--text-primary)',
      }}
      data-variant="default"
    >
      {label}
    </button>
  )
}
