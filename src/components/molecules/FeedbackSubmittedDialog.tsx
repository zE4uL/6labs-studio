/**
 * FeedbackSubmittedDialog — Success confirmation after submitting Oracle feedback.
 * Shows a check icon with thank-you message. Auto-dismisses or closes on click.
 *
 * @figmaComponent  Feedback Submitted Popup
 * @figmaNode       6470:1506243
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6470-1506243
 */

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckIcon } from '../icons/CheckIcon'

interface FeedbackSubmittedDialogProps {
  isOpen: boolean
  onClose: () => void
  /** Auto-dismiss after N milliseconds. Default: 3000. Set 0 to disable. */
  autoDismissMs?: number
}

export function FeedbackSubmittedDialog({
  isOpen,
  onClose,
  autoDismissMs = 3000,
}: FeedbackSubmittedDialogProps) {
  useEffect(() => {
    if (!isOpen || !autoDismissMs) return
    const timer = setTimeout(onClose, autoDismissMs)
    return () => clearTimeout(timer)
  }, [isOpen, onClose, autoDismissMs])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-m"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative flex flex-col gap-m items-center bg-bg-elements rounded-m shadow-normal p-m w-[420px]">
        {/* Check icon — 48px, brand green */}
        <div className="flex items-center justify-center w-[48px] h-[48px] rounded-full bg-success-bg">
          <CheckIcon size={24} className="text-[var(--success)]" />
        </div>

        {/* Title + subtitle */}
        <div className="flex flex-col gap-xxs items-center text-center">
          <h3 className="font-display text-m font-bold leading-[1.5] text-text-primary">
            Thank you for your feedback
          </h3>
          <p className="font-body text-s font-normal leading-[1.5] text-text-secondary">
            Your feedback helps us improve Oracle responses.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
