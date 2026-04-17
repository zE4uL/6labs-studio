/**
 * ContextUploaderMini — Compact "Add more files" bar shown after initial upload.
 * Figma: gap-[12px], p-[16px], rounded-xl, dashed border, white-40 bg.
 * Layout: Icon(gradient bg) + "Add more Files" left, content center with types + MAX right.
 *
 * @figmaComponent  Context / Uploader Mini
 * @figmaPath       Context / Game Intelligence - Uploading 1 / Section / Container / Top Content / Context/ Uploader Mini
 * @figmaNode       6419:74895
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6419-74895
 */

import { useRef, type ChangeEvent } from 'react'
import { PlusIcon } from '../icons/PlusIcon'

interface ContextUploaderMiniProps {
  onFilesSelected: (files: File[]) => void
  className?: string
}

export function ContextUploaderMini({ onFilesSelected, className }: ContextUploaderMiniProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files))
      e.target.value = ''
    }
  }

  return (
    <div
      className={[
        'flex items-center gap-s p-m rounded-xl cursor-pointer mini-uploader-hover transition-colors duration-150',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Add more files"
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleChange}
        accept=".pdf,.doc,.docx,.csv,.png,.jpg,.jpeg,.gif,.txt"
      />

      {/* Icon — gradient bg container with + icon */}
      <div
        className="shrink-0 size-[48px] rounded-xl flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(23,112,239,0.07) 0%, rgba(23,112,239,0.07) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)',
        }}
      >
        <PlusIcon size={24} className="text-brand" />
      </div>

      {/* Content — title + subtitle stacked */}
      <div className="flex flex-col flex-1 min-w-0 items-start justify-center gap-xxs">
        <span className="font-display text-s font-semibold" style={{ color: 'var(--text-primary)' }}>
          Add more Files
        </span>
        <span className="font-body text-xs" style={{ color: 'var(--text-placeholder)' }}>
          PDF,DOC,CSV, TXT and Images
        </span>
      </div>

      {/* MAX label — right */}
      <span
        className="shrink-0 font-display text-2xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: 'var(--text-tertiary)' }}
      >
        MAX 30MB
      </span>
    </div>
  )
}
