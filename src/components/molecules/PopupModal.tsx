/**
 * PopupModal — Controlled modal dialog with backdrop overlay.
 * Renders via React portal to document.body.
 *
 * Supports the full variation set from the Figma component:
 *   - Simple confirm (title + body + actions)
 *   - With content slot (filter tags, form fields, notes, etc.)
 *   - md (420px) and lg (520px) widths
 *   - Swappable primary button variant (primary / danger / etc.)
 *
 * @figmaComponent  Popup/ Modal
 * @figmaPath       Studio / Popup/ Modal - Variations / Popup/ Modal
 * @figmaNode       4943:43433
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=4943-43433
 */

import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Button, { type ButtonVariant } from '../ui/Button'
import { CloseIcon } from '../icons/CloseIcon'

interface PopupModalProps {
  /** Controls visibility */
  isOpen: boolean
  /** Called when the close (×) button or backdrop is clicked */
  onClose: () => void
  /** Header title — bold display type */
  title: string
  /** Optional subtitle below the header */
  body?: string
  /** Optional content slot — form fields, notes, filter chips, etc. */
  children?: ReactNode
  /** Primary action label. Default: "Submit" */
  primaryLabel?: string
  /** Cancel/secondary label. Default: "Cancel" */
  secondaryLabel?: string
  /** Called on primary button click */
  onConfirm?: () => void
  /** Called on cancel click; falls back to onClose if omitted */
  onCancel?: () => void
  /** Panel width — md = 420px (default), lg = 520px */
  size?: 'md' | 'lg'
  /** Apparatus Button variant for the primary action */
  primaryVariant?: ButtonVariant
}

export function PopupModal({
  isOpen,
  onClose,
  title,
  body,
  children,
  primaryLabel = 'Submit',
  secondaryLabel = 'Cancel',
  onConfirm,
  onCancel,
  size = 'md',
  primaryVariant = 'primary',
}: PopupModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleCancel = () => {
    if (onCancel) onCancel()
    else onClose()
  }

  const panelWidth = size === 'lg' ? 'w-[520px]' : 'w-[420px]'
  const btnSize   = size === 'lg' ? 'lg' : 'md'

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-m"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={[
          'relative flex flex-col gap-m',
          'bg-bg-elements rounded-m shadow-normal p-m',
          panelWidth,
          'max-h-[90vh] overflow-y-auto',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-start gap-s w-full shrink-0">
          <div className="flex-1 flex items-center gap-xs min-w-0">
            <h2
              id="popup-modal-title"
              className="font-display text-m font-bold leading-[1.5] text-text-primary"
            >
              {title}
            </h2>
          </div>
          <button
            className="shrink-0 flex items-center justify-center w-4 h-4 text-text-secondary hover:text-text-primary transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Optional body text */}
        {body && (
          <p className="font-body text-s font-normal leading-[1.5] text-text-secondary w-full shrink-0">
            {body}
          </p>
        )}

        {/* Content slot */}
        {children && (
          <div className="w-full shrink-0">
            {children}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-m w-full shrink-0">
          <Button
            variant="secondary"
            size={btnSize}
            className="flex-1"
            onClick={handleCancel}
          >
            {secondaryLabel}
          </Button>
          <Button
            variant={primaryVariant}
            size={btnSize}
            className="flex-1"
            onClick={onConfirm}
          >
            {primaryLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}
