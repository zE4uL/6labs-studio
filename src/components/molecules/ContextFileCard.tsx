/**
 * ContextFileCard — File row with full lifecycle states:
 *   1. uploading:  progress bar + UPLOADING tag
 *   2. uploaded:   UPLOADED tag + description textarea + Skip/Save
 *   3. saved (no desc): "Describe File" outline button, no tag
 *   4. saved (with desc): read-only description row + edit icon, no tag
 *
 * Figma: border-bottom divider between file row and description area.
 * Icon bg varies: purple-tint-light (image), pink-tint-light (doc).
 *
 * @figmaComponent  Context / File card
 * @figmaPath       Context / Game Intelligence - Indexed - Files / Section / Container / Uploaded files / Context/ File card
 * @figmaNode       6419:75342
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6419-75342
 */

import { useState } from 'react'
import { ProgressBar } from '../atoms/ProgressBar'
import { UploadTag } from '../atoms/UploadTag'
import { DescriptionBox } from '../atoms/DescriptionBox'
import { FileImageIcon } from '../icons/FileImageIcon'
import { FileDocIcon } from '../icons/FileDocIcon'
import { TrashIcon } from '../icons/TrashIcon'
import { CheckIcon } from '../icons/CheckIcon'
import { EditIcon } from '../icons/EditIcon'
import Button from '../ui/Button'

export type UploadStatus = 'uploading' | 'uploaded'

interface ContextFileCardProps {
  fileName: string
  fileSize: string
  fileDate: string
  fileType: 'image' | 'document'
  progress: number
  status: UploadStatus
  saved?: boolean
  savedDescription?: string
  onDelete?: () => void
  onSkip?: () => void
  onSave?: (description: string) => void
  className?: string
}

/** Figma icon bg tints per file type */
const ICON_BG: Record<string, string> = {
  image: 'rgba(123,76,255,0.07)',   // complimentary/purple/tint-light
  document: 'rgba(194,5,104,0.07)', // complimentary/pink/tint-light
}
const ICON_COLOR: Record<string, string> = {
  image: '#7B4CFF',
  document: '#C20568',
}

export function ContextFileCard({
  fileName,
  fileSize,
  fileDate,
  fileType,
  progress,
  status,
  saved = false,
  savedDescription,
  onDelete,
  onSkip,
  onSave,
  className,
}: ContextFileCardProps) {
  const [description, setDescription] = useState('')
  const [editing, setEditing] = useState(false)
  const FileIcon = fileType === 'image' ? FileImageIcon : FileDocIcon

  const isUploading = status === 'uploading'
  const isJustUploaded = status === 'uploaded' && !saved
  const isSavedUndescribed = saved && !savedDescription && !editing
  const isSavedDescribed = saved && !!savedDescription && !editing
  const isDescribing = isJustUploaded || editing
  const hasBottom = isDescribing || isSavedDescribed

  const handleSave = () => {
    onSave?.(description)
    setEditing(false)
  }
  const handleSkip = () => {
    onSkip?.()
    setEditing(false)
  }
  const handleDescribeClick = () => setEditing(true)
  const handleEditClick = () => {
    setDescription(savedDescription ?? '')
    setEditing(true)
  }

  return (
    <div
      className={['flex flex-col rounded-xl context-file-card', className]
        .filter(Boolean)
        .join(' ')}
    >
      {/* ── File Container row ── */}
      <div
        className="flex items-center gap-m p-m min-w-0"
        style={hasBottom ? { borderBottom: '1px solid var(--border-subtle)' } : undefined}
      >
        {/* Icon — 48px container (p-[12px] → 24px icon), rounded-m */}
        <div
          className="shrink-0 size-[48px] rounded-m flex items-center justify-center"
          style={{ backgroundColor: ICON_BG[fileType] }}
        >
          <span style={{ color: ICON_COLOR[fileType] }}>
            <FileIcon size={24} />
          </span>
        </div>

        {/* File Info */}
        <div className="flex flex-col flex-1 min-w-0 gap-xxs">
          <span className="font-display text-s font-semibold truncate" style={{ color: 'var(--text-secondary)' }}>
            {fileName}
          </span>
          <span className="font-body text-xs" style={{ color: 'var(--text-placeholder)' }}>
            {fileSize} &middot; {fileDate}
          </span>
          {isUploading && <ProgressBar value={progress} />}
        </div>

        {/* Right actions — tag, describe btn, or nothing */}
        {isUploading && <UploadTag status="uploading" />}
        {isJustUploaded && !editing && <UploadTag status="uploaded" />}
        {isSavedUndescribed && (
          <Button variant="outline" size="md" onClick={handleDescribeClick}>
            Describe File
          </Button>
        )}

        {/* Trash — 32px button, same visual weight as edit */}
        <Button
          variant="transparent"
          size="md"
          iconOnly
          onClick={onDelete}
          aria-label="Delete file"
        >
          <TrashIcon size={20} />
        </Button>
      </div>

      {/* ── Description area — when just uploaded or editing ── */}
      {isDescribing && (
        <div className="flex flex-col gap-m px-m py-m">
          <DescriptionBox
            className="h-[78px]"
            placeholder="What should agents know about this file? Purpose, key topics, anything useful..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex items-center justify-end gap-xs">
            <Button variant="outline" size="md" onClick={handleSkip}>
              Skip
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={<CheckIcon size={16} />}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      )}

      {/* ── Saved description row — read-only text + edit button ── */}
      {isSavedDescribed && (
        <div className="flex items-center gap-m px-m py-m">
          <div className="flex-1 min-w-0 p-s rounded-[6px] font-body text-s leading-[1.5] description-box description-box-disabled">
            {savedDescription}
          </div>
          <Button
            variant="transparent"
            size="md"
            iconOnly
            onClick={handleEditClick}
            aria-label="Edit description"
          >
            <EditIcon size={20} />
          </Button>
        </div>
      )}
    </div>
  )
}
