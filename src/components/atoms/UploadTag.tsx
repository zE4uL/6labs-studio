/**
 * UploadTag — Status badge for file upload state.
 * Two variants: "uploading" (brand blue tint bg + upload icon + brand text) and
 * "uploaded" (success green tint bg + check icon + success text).
 *
 * @figmaComponent  Context / Upload Tag
 * @figmaPath       Context / Game Intelligence - Uploading 1 / Section / Container / Uploaded files / Context/ File card / File Container / Context/ Upload Tag
 * @figmaNode       0:1466
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6419-74907
 */

import { UploadIcon } from '../icons/UploadIcon'
import { CheckIcon } from '../icons/CheckIcon'

type UploadTagStatus = 'uploading' | 'uploaded'

interface UploadTagProps {
  status: UploadTagStatus
  className?: string
}

const tagStyles: Record<UploadTagStatus, { bg: string; text: string; label: string }> = {
  uploading: {
    bg: 'var(--bg-tint)',
    text: 'var(--brand)',
    label: 'UPLOADING',
  },
  uploaded: {
    bg: 'var(--success-bg)',
    text: 'var(--success)',
    label: 'UPLOADED',
  },
}

export function UploadTag({ status, className }: UploadTagProps) {
  const s = tagStyles[status]

  return (
    <span
      className={[
        'inline-flex items-center gap-xxs px-xs py-xxxs rounded-xs font-display text-2xs font-semibold uppercase tracking-[0.15em] leading-[1.5] shrink-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {status === 'uploading' ? <UploadIcon size={12} /> : <CheckIcon size={12} />}
      {s.label}
    </span>
  )
}
