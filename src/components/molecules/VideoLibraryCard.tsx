/**
 * VideoLibraryCard — media card for a single uploaded gameplay video in the
 * Library. Carries the full analysis lifecycle so game devs can see, at a
 * glance, which videos Radiologist & Oracle can already reference.
 *
 * Status model: 'uploading' → 'processing' → 'ready' | 'failed'
 *   - uploading:  progress bar + % (transfer in flight)
 *   - processing: indeterminate "Analyzing" — LLM indexing, NOT yet referenceable
 *   - ready:      green badge + "Available to agents", clickable
 *   - failed:     error message + Retry (re-runs analysis, no re-upload)
 *
 * Non-ready cards are dimmed and non-interactive (agents only use Ready videos).
 *
 * Code-first prototype — no Figma source yet.
 */
import { useState } from 'react'
import { ProgressBar } from '../atoms/ProgressBar'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import { TrashIcon } from '../icons/TrashIcon'
import { EditIcon } from '../icons/EditIcon'
import { CheckIcon } from '../icons/CheckIcon'
import { RadiologistIcon } from '../icons/RadiologistIcon'
import { OracleIcon } from '../icons/OracleIcon'
import { EventTag } from '../atoms/EventTag'
import { AiTag } from '../atoms/AiTag'
import { ClampTags } from './ClampTags'

export type VideoStatus = 'uploading' | 'processing' | 'ready' | 'failed'

export interface VideoLibraryCardProps {
  /** grid = vertical media card; list = horizontal row for dense scanning */
  layout?: 'grid' | 'list'
  title: string
  sizeLabel: string
  dateLabel: string
  durationLabel?: string
  thumbnailSrc?: string
  /** Background gradient for the thumbnail fallback — varied per card for rhythm */
  gradient?: string
  status: VideoStatus
  progress: number
  /** User-added tags (entered at upload) — neutral pills */
  tags?: string[]
  /** AI-extracted tags (from the LLM) — sparkle pills, shown only once ready */
  aiTags?: string[]
  /** AI-generated summary (from the LLM) — shown on the card once ready */
  aiSummary?: string
  description?: string
  errorMessage?: string
  /** Selection (bulk actions) */
  selected?: boolean
  /** Force the select checkbox to stay visible (selection mode active) */
  selectionVisible?: boolean
  onToggleSelect?: () => void
  onDelete?: () => void
  onRetry?: () => void
  onSaveMeta?: (next: { title: string; description: string; tags: string[] }) => void
  /** Opens the details side panel (fires for any status) */
  onOpen?: () => void
  className?: string
}

const DEFAULT_GRADIENT = 'linear-gradient(135deg, #1770EF 0%, #7B4CFF 100%)'

const STATUS_META: Record<VideoStatus, { color: string; label: string }> = {
  uploading: { color: 'var(--brand)', label: 'UPLOADING' },
  processing: { color: 'var(--warning)', label: 'ANALYZING' },
  ready: { color: 'var(--success)', label: 'READY' },
  failed: { color: 'var(--error)', label: 'FAILED' },
}

function StatusBadge({ status }: { status: VideoStatus }) {
  const s = STATUS_META[status]
  return (
    <span
      className="video-lib-badge inline-flex items-center gap-xxs px-xs py-xxxs rounded-round font-display text-2xs font-semibold uppercase tracking-[0.12em] leading-[1.5] shrink-0"
      style={{ color: s.color }}
    >
      {status === 'processing' ? (
        <span className="video-lib-spinner" aria-hidden />
      ) : (
        <span className="video-lib-dot" style={{ backgroundColor: s.color }} aria-hidden />
      )}
      {s.label}
    </span>
  )
}

const PlayGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path d="M7.5 5.5L14 10L7.5 14.5V5.5Z" fill="currentColor" />
  </svg>
)

/** Ready-state indicator: an overlapping stack of the agent icons that can use this video */
const AgentAvailability = () => (
  <span
    className="inline-flex items-center shrink-0"
    aria-label="Available to Radiologist and Oracle"
  >
    <span className="video-lib-agent-chip" style={{ color: 'var(--brand)' }}>
      <RadiologistIcon size={16} />
      <span className="video-lib-tip">Radiologist</span>
    </span>
    <span className="video-lib-agent-chip -ml-[8px]" style={{ color: '#7B4CFF' }}>
      <OracleIcon size={16} />
      <span className="video-lib-tip">Oracle</span>
    </span>
  </span>
)

export function VideoLibraryCard({
  layout = 'grid',
  title,
  sizeLabel,
  dateLabel,
  durationLabel,
  thumbnailSrc,
  gradient = DEFAULT_GRADIENT,
  status,
  progress,
  tags = [],
  aiTags = [],
  aiSummary,
  description,
  errorMessage,
  selected = false,
  selectionVisible = false,
  onToggleSelect,
  onDelete,
  onRetry,
  onSaveMeta,
  onOpen,
  className,
}: VideoLibraryCardProps) {
  const [editing, setEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(title)
  const [draftTags, setDraftTags] = useState(tags.join(', '))

  const isReady = status === 'ready'
  const isFailed = status === 'failed'
  const isUploading = status === 'uploading'
  const isProcessing = status === 'processing'

  const startEdit = () => {
    setDraftTitle(title)
    setDraftTags(tags.join(', '))
    setEditing(true)
  }
  const saveEdit = () => {
    onSaveMeta?.({
      title: draftTitle.trim() || title,
      description: description ?? '',
      tags: draftTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
    setEditing(false)
  }

  // ── List layout — dense horizontal row for large libraries ──
  if (layout === 'list') {
    return (
      <div
        className={['video-lib-card group/lib flex rounded-xl overflow-hidden', className]
          .filter(Boolean)
          .join(' ')}
        data-selected={String(selected)}
      >
        {/* Thumbnail — fixed 168px, full row height */}
        <div
          className="relative shrink-0 w-[168px] self-stretch min-h-[94px] overflow-hidden cursor-pointer"
          onClick={onOpen}
          title={isReady ? undefined : 'Available to agents once analysis completes'}
        >
          {thumbnailSrc ? (
            <img src={thumbnailSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: gradient }} />
          )}
          <div className="absolute inset-0 video-lib-thumb-texture" aria-hidden />
          {!isReady && <div className="absolute inset-0 video-lib-dim" aria-hidden />}

          {isReady && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="video-lib-play video-lib-play-sm text-white">
                <PlayGlyph />
              </span>
            </div>
          )}

          {/* analyzing treatment — scan line + compact frosted spinner chip */}
          {isProcessing && (
            <>
              <div className="video-lib-scanline" aria-hidden />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="video-lib-analyzing-chip !gap-0 !px-xs !py-xs">
                  <span className="video-lib-spinner-light" aria-hidden />
                </span>
              </div>
            </>
          )}

          {/* select checkbox */}
          <div
            className={[
              'absolute top-xs left-xs transition-opacity duration-150',
              selected || selectionVisible ? 'opacity-100' : 'opacity-0 group-hover/lib:opacity-100',
            ].join(' ')}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="video-lib-check-bg">
              <Checkbox checked={selected} onChange={() => onToggleSelect?.()} aria-label={`Select ${title}`} />
            </span>
          </div>

          {isReady && durationLabel && (
            <span className="video-lib-duration absolute bottom-xs right-xs px-xs py-xxxs rounded-xs font-display text-2xs font-semibold text-white">
              {durationLabel}
            </span>
          )}

          {isUploading && (
            <div className="absolute inset-x-xs bottom-xs">
              <ProgressBar value={progress} />
            </div>
          )}
        </div>

        {/* Content */}
        {editing ? (
          <div className="flex flex-col flex-1 min-w-0 gap-s p-m">
            <div className="flex flex-col gap-xxs">
              <label className="font-display text-2xs font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--text-tertiary)' }}>
                Title
              </label>
              <Input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="Video title"
                aria-label="Video title"
              />
            </div>
            <div className="flex flex-col gap-xxs">
              <label className="font-display text-2xs font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--text-tertiary)' }}>
                Tags
              </label>
              <Input
                value={draftTags}
                onChange={(e) => setDraftTags(e.target.value)}
                placeholder="Tags, comma separated"
                aria-label="Tags"
              />
            </div>
            <div className="flex items-center justify-end gap-xs">
              <Button variant="outline" size="md" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" leftIcon={<CheckIcon size={16} />} onClick={saveEdit}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center flex-1 min-w-0 gap-m p-m">
            {/* Title + meta + status */}
            <div className="flex flex-col flex-1 min-w-0 gap-xxs">
              <div className="flex items-center gap-s min-w-0">
                <span
                  className="font-display text-s font-semibold truncate min-w-0"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {title}
                </span>
                <StatusBadge status={status} />
              </div>
              <span className="font-body text-xs" style={{ color: 'var(--text-placeholder)' }}>
                {sizeLabel} &middot; {dateLabel}
              </span>
              <span
                className="inline-flex items-center gap-xxs font-body text-2xs truncate"
                style={{ color: isFailed ? 'var(--error)' : 'var(--text-tertiary)' }}
              >
                {isReady && <AgentAvailability />}
                {isProcessing && (
                <>
                  <span className="video-lib-spinner shrink-0" aria-hidden />
                  Analyzing — agents will use this once ready
                </>
              )}
                {isUploading && 'Uploading…'}
                {isFailed && (errorMessage ?? 'Re-analyze to use')}
              </span>
            </div>

            {/* Tags — AI-extracted (sparkle, ready only) then upload (neutral). Hidden on narrow widths. */}
            {((isReady && aiTags.length > 0) || tags.length > 0) && (
              <div className="hidden lg:flex items-center gap-xxs shrink-0 max-w-[260px] flex-wrap justify-end">
                {isReady && aiTags.slice(0, 2).map((t) => <AiTag key={`ai-${t}`} label={t} />)}
                {tags.slice(0, 2).map((t) => <EventTag key={`up-${t}`} label={t} />)}
                {(() => {
                  const extra =
                    (isReady ? aiTags.length - Math.min(2, aiTags.length) : 0) +
                    (tags.length - Math.min(2, tags.length))
                  return extra > 0 ? (
                    <span className="font-body text-2xs" style={{ color: 'var(--text-tertiary)' }}>
                      +{extra}
                    </span>
                  ) : null
                })()}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-xs shrink-0">
              {isFailed && (
                <Button variant="outline" size="md" onClick={onRetry}>
                  Retry
                </Button>
              )}
              {isReady && (
                <Button variant="transparent" size="md" iconOnly onClick={startEdit} aria-label="Edit details">
                  <EditIcon size={16} />
                </Button>
              )}
              {!isUploading && (
                <Button variant="transparent" size="md" iconOnly onClick={onDelete} aria-label="Delete video">
                  <TrashIcon size={16} />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={['video-lib-card group/lib flex flex-col rounded-xl overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      data-selected={String(selected)}
    >
      {/* ── Media ── */}
      <div
        className="relative aspect-video w-full shrink-0 overflow-hidden cursor-pointer"
        onClick={onOpen}
        title={isReady ? 'Open details' : 'Open details — analysis in progress'}
      >
        {/* base layer */}
        {thumbnailSrc ? (
          <img src={thumbnailSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: gradient }} />
        )}
        {/* dot texture for depth */}
        <div className="absolute inset-0 video-lib-thumb-texture" aria-hidden />
        {/* dim scrim for non-ready so it reads as "not yet usable" */}
        {!isReady && <div className="absolute inset-0 video-lib-dim" aria-hidden />}
        {/* bottom gradient for badge/duration legibility */}
        <div className="absolute inset-x-0 bottom-0 h-16 video-lib-scrim pointer-events-none" aria-hidden />

        {/* center play affordance — ready only */}
        {isReady && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="video-lib-play text-white">
              <PlayGlyph />
            </span>
          </div>
        )}

        {/* analyzing treatment — sweeping scan line + frosted chip */}
        {isProcessing && (
          <>
            <div className="video-lib-scanline" aria-hidden />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="video-lib-analyzing-chip">
                <span className="video-lib-spinner-light" aria-hidden />
                <span className="font-display text-2xs font-semibold uppercase tracking-[0.12em] text-white">
                  Analyzing video…
                </span>
              </span>
            </div>
          </>
        )}

        {/* select checkbox — top-left, on hover or when selection active */}
        <div
          className={[
            'absolute top-s left-s transition-opacity duration-150',
            selected || selectionVisible ? 'opacity-100' : 'opacity-0 group-hover/lib:opacity-100',
          ].join(' ')}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="video-lib-check-bg">
            <Checkbox checked={selected} onChange={() => onToggleSelect?.()} aria-label={`Select ${title}`} />
          </span>
        </div>

        {/* status badge — top-right (hidden while analyzing: the center chip already says it) */}
        {!isProcessing && (
          <div className="absolute top-s right-s">
            <StatusBadge status={status} />
          </div>
        )}

        {/* duration — bottom-right, only meaningful when ready */}
        {isReady && durationLabel && (
          <span className="video-lib-duration absolute bottom-s right-s px-xs py-xxxs rounded-xs font-display text-2xs font-semibold text-white">
            {durationLabel}
          </span>
        )}

        {/* uploading progress overlay */}
        {isUploading && (
          <div className="absolute inset-x-m bottom-s flex items-center gap-s">
            <div className="flex-1">
              <ProgressBar value={progress} />
            </div>
            <span className="font-display text-2xs font-semibold text-white tabular-nums">{progress}%</span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      {editing ? (
        <div className="flex flex-col gap-s p-m">
          <div className="flex flex-col gap-xxs">
            <label className="font-display text-2xs font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--text-tertiary)' }}>
              Title
            </label>
            <Input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder="Video title"
              aria-label="Video title"
            />
          </div>
          <div className="flex flex-col gap-xxs">
            <label className="font-display text-2xs font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--text-tertiary)' }}>
              Tags
            </label>
            <Input
              value={draftTags}
              onChange={(e) => setDraftTags(e.target.value)}
              placeholder="Tags, comma separated"
              aria-label="Tags"
            />
          </div>
          <div className="flex items-center justify-end gap-xs">
            <Button variant="outline" size="md" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" leftIcon={<CheckIcon size={16} />} onClick={saveEdit}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-xxs p-m min-w-0">
          <span
            className="font-display text-s font-semibold line-clamp-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </span>
          <span className="font-body text-xs" style={{ color: 'var(--text-placeholder)' }}>
            {sizeLabel} &middot; {dateLabel}
          </span>

          {/* tags — upload (neutral) on its own row, then AI-extracted (sparkle) on up to 2 rows */}
          {(tags.length > 0 || (isReady && aiTags.length > 0)) && (
            <div className="flex flex-col gap-xxs pt-xs w-full min-w-0">
              {tags.length > 0 && (
                <ClampTags
                  items={tags}
                  maxRows={1}
                  renderItem={(t) => <EventTag key={`up-${t}`} label={t} className="!rounded-[6px]" />}
                />
              )}
              {isReady && aiTags.length > 0 && (
                <ClampTags
                  items={aiTags}
                  maxRows={2}
                  renderItem={(t) => <AiTag key={`ai-${t}`} label={t} className="!rounded-[6px]" />}
                />
              )}
            </div>
          )}

          {/* AI summary — generated from the video by the LLM, shown once ready */}
          {isReady && aiSummary && (
            <p
              className="font-body text-xs leading-[1.5] line-clamp-3 pt-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              {aiSummary}
            </p>
          )}

          {/* analysis in progress — shimmer placeholder where the AI summary will appear */}
          {isProcessing && (
            <div className="flex flex-col gap-xs pt-xs" aria-hidden>
              <span className="video-lib-skeleton w-full" />
              <span className="video-lib-skeleton w-[70%]" />
            </div>
          )}

          {/* failed error */}
          {isFailed && errorMessage && (
            <p className="font-body text-xs leading-[1.5] pt-xxs" style={{ color: 'var(--error)' }}>
              {errorMessage}
            </p>
          )}

          {/* ── Footer / status caption + actions ── */}
          <div className="flex items-center gap-xs pt-s mt-auto min-w-0">
            <span className="flex-1 min-w-0 inline-flex items-center gap-xxs font-body text-2xs truncate" style={{ color: 'var(--text-tertiary)' }}>
              {isReady && <AgentAvailability />}
              {isProcessing && (
                <>
                  <span className="video-lib-spinner shrink-0" aria-hidden />
                  Analyzing — agents will use this once ready
                </>
              )}
              {isUploading && 'Uploading…'}
              {isFailed && 'Re-analyze to use'}
            </span>

            {isFailed && (
              <Button variant="outline" size="md" onClick={onRetry}>
                Retry
              </Button>
            )}
            {isReady && (
              <Button variant="transparent" size="md" iconOnly onClick={startEdit} aria-label="Edit details">
                <EditIcon size={16} />
              </Button>
            )}
            {!isUploading && (
              <Button variant="transparent" size="md" iconOnly onClick={onDelete} aria-label="Delete video">
                <TrashIcon size={16} />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
