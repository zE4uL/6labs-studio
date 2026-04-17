/**
 * DescriptionBox — Textarea for adding file context + Skip/Save action row.
 * Matches Figma: Description input → action buttons row (Skip outline, Save primary).
 *
 * @figmaComponent  Context / Description
 * @figmaPath       Context / Game Intelligence - Uploading 1 / Section / Container / Uploaded files / Context/ File card / Input Container / Description box
 * @figmaNode       0:1484
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6419-74907
 */

import { useState } from 'react'
import Button from '../ui/Button'
import { CheckIcon } from '../icons/CheckIcon'

interface DescriptionBoxProps {
  onSkip?: () => void
  onSave?: (description: string) => void
  className?: string
}

export function DescriptionBox({ onSkip, onSave, className }: DescriptionBoxProps) {
  const [value, setValue] = useState('')

  return (
    <div
      className={['flex flex-col gap-s', className].filter(Boolean).join(' ')}
    >
      {/* Textarea */}
      <textarea
        className="w-full h-[96px] px-m py-s rounded-m font-body text-s resize-none focus:outline-none"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          color: 'var(--text-primary)',
        }}
        placeholder="What should agents know about this file? Purpose, key topics, anything useful..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Action buttons — right-aligned */}
      <div className="flex items-center justify-end gap-s">
        <Button variant="outline" size="md" onClick={onSkip}>
          Skip
        </Button>
        <Button
          variant="primary"
          size="md"
          leftIcon={<CheckIcon size={16} />}
          onClick={() => onSave?.(value)}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
