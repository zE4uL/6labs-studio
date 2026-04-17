/**
 * BaristaSuggestedCard — Auto-mode OFF card: Barista proposes a question, user approves / edits / tries another.
 * Includes "SUGGESTED NEXT QUESTION" label, question body (editable when editing), and
 * consumer-provided action slot (Send / Edit / Try another).
 *
 * @figmaComponent  Barista/ Suggested Card
 * @figmaNode       6126:65148
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6126-65148
 */

import { useState, useEffect } from 'react'
import Button from '../ui/Button'
import { BaristaIcon } from '../icons/BaristaIcon'

export interface BaristaSuggestedCardProps {
  question: string
  onSend?: (question: string) => void
  onEdit?: (question: string) => void
  onTryAnother?: () => void
  className?: string
}

export function BaristaSuggestedCard({
  question,
  onSend,
  onEdit,
  onTryAnother,
  className = '',
}: BaristaSuggestedCardProps) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(question)

  useEffect(() => {
    setValue(question)
  }, [question])

  return (
    <div
      className={`flex flex-col gap-[8px] items-center justify-center w-full px-[16px] py-[12px] ${className}`}
      style={{
        backgroundColor: 'var(--bg-elements)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-[4px] w-full">
        <span
          className="flex items-center justify-center shrink-0 w-[12px] h-[12px]"
          style={{ color: 'var(--purple)' }}
        >
          <BaristaIcon size={12} />
        </span>
        <p
          className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          Suggested next question
        </p>
      </div>
      <div
        className="flex w-full p-[12px] rounded-[6px] transition-colors"
        style={{
          backgroundColor: 'var(--bg-elements)',
          border: editing ? '1px solid var(--border-focus)' : '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setEditing(true)
          }}
          onFocus={() => setEditing(true)}
          onBlur={() => {
            setEditing(false)
            if (value !== question) onEdit?.(value)
          }}
          rows={4}
          className="flex-1 min-w-0 resize-none bg-transparent outline-none border-0 font-[Inter] text-[14px] leading-[1.5]"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Suggested question — edit inline"
        />
      </div>
      <p
        className="w-full font-[Inter] text-[11px] leading-[1.4] text-center"
        style={{ color: 'var(--purple)' }}
      >
        Waiting for your approval
      </p>
      <div className="flex items-stretch gap-[8px] w-full">
        <Button
          variant="blueish"
          size="md"
          className="flex-1"
          onClick={() => onSend?.(value)}
        >
          Send this question
        </Button>
        <Button variant="outline" size="md" onClick={onTryAnother}>
          Try another
        </Button>
      </div>
    </div>
  )
}
