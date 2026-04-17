/**
 * ContextUploader — Full-size drag-and-drop file uploader for the Context empty state.
 * Anatomy: dashed border container → "Drop files here or click to upload" + subtitle,
 * file type pills row (PDF, DOC, CSV, Images, TXT), MAX 30MB label.
 *
 * @figmaComponent  Context / Uploader
 * @figmaPath       Context / Game Intelligence / Section / Context/ Uploader
 * @figmaNode       6419:74756
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6418-103500
 */

import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'

const FILE_TYPES = [
  { emoji: '\uD83D\uDCC4', label: 'PDF' },
  { emoji: '\uD83D\uDCDD', label: 'DOC' },
  { emoji: '\uD83D\uDCCA', label: 'CSV' },
  { emoji: '\uD83D\uDDBC\uFE0F', label: 'Images' },
  { emoji: '\uD83D\uDCC3', label: 'TXT' },
]

interface ContextUploaderProps {
  onFilesSelected: (files: File[]) => void
  className?: string
}

export function ContextUploader({ onFilesSelected, className }: ContextUploaderProps) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }
  const handleDragLeave = () => setDragOver(false)
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files))
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files))
      e.target.value = ''
    }
  }

  return (
    <div
      className={[
        'flex flex-col items-center gap-xl p-xxl rounded-3xl cursor-pointer transition-colors duration-150',
        dragOver ? 'context-uploader-dragover' : 'context-uploader',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Upload files"
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleChange}
        accept=".pdf,.doc,.docx,.csv,.png,.jpg,.jpeg,.gif,.txt"
      />

      {/* Text */}
      <div className="flex flex-col items-center gap-xxs">
        <p className="font-display text-m font-semibold" style={{ color: 'var(--text-primary)' }}>
          Drop files here or click to upload
        </p>
        <p className="font-body text-s" style={{ color: 'var(--text-secondary)' }}>
          Any format our agents can learn from
        </p>
      </div>

      {/* File type pills */}
      <div className="flex items-center gap-xs flex-wrap justify-center">
        {FILE_TYPES.map((ft) => (
          <span
            key={ft.label}
            className="inline-flex items-center gap-xxs px-s py-xxs rounded-round font-body text-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span>{ft.emoji}</span>
            {ft.label}
          </span>
        ))}
      </div>

      {/* Max size label */}
      <span
        className="font-display text-2xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: 'var(--text-tertiary)' }}
      >
        MAX 30MB
      </span>
    </div>
  )
}
