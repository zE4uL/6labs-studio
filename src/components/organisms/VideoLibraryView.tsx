/**
 * VideoLibraryView — top-level Library page where game devs bulk-upload
 * gameplay videos that Radiologist & Oracle reference when answering queries.
 *
 * Because LLM analysis is slow, every video moves through a lifecycle
 * (uploading → processing → ready | failed) and only Ready videos are
 * referenceable by agents. The view simulates that pipeline with timers.
 *
 * States covered:
 *   - empty library (full dropzone)
 *   - bulk concurrent uploads with per-file progress
 *   - processing / analyzing (slow), ready, failed (+ retry)
 *   - rejected files (wrong type / too large / duplicate name)
 *   - search, status filter, tag filter, no-results subset
 *   - bulk select + delete, single delete (confirm modal), rename + describe
 *
 * Code-first prototype — no Figma source yet.
 */
import { useEffect, useState, type DragEvent } from 'react'
import { VideoLibraryCard, type VideoStatus } from '../molecules/VideoLibraryCard'
import { AgentPageHeader } from '../molecules/AgentPageHeader'
import { LibraryFilterDialog } from './LibraryFilterDialog'
import type { LibraryFilterValue, LibraryStatusFilter } from './LibraryFilterDialog'
import { LibraryVideoSidePanel } from './LibraryVideoSidePanel'
import { PopupModal } from '../molecules/PopupModal'
import { UploadVideosModal, formatSize } from './UploadVideosModal'
import { VideosEmptyState } from '../molecules/VideosEmptyState'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import { VideoLibraryIcon } from '../icons/VideoLibraryIcon'
import { UploadIcon } from '../icons/UploadIcon'
import { CloseIcon } from '../icons/CloseIcon'
import { TrashIcon } from '../icons/TrashIcon'
import { FilterIcon } from '../icons/FilterIcon'

export interface LibraryVideo {
  id: string
  title: string
  sizeBytes: number
  durationLabel?: string
  thumbnailSrc?: string
  status: VideoStatus
  progress: number
  tags: string[]
  /** AI-extracted tags (from the LLM) — present once analysis is ready */
  aiTags?: string[]
  /** AI-generated summary (from the LLM) — present once analysis is ready */
  aiSummary?: string
  description?: string
  error?: string
  addedAt: number
  /** when analysis is expected to finish (ms epoch) */
  analysisEndsAt?: number
  /** seeded demo flag: this video's analysis will fail */
  willFail?: boolean
}

const ANALYZE_FAIL_RATE = 0.18
const GRADIENTS = [
  'linear-gradient(135deg, #1770EF 0%, #7B4CFF 100%)',
  'linear-gradient(135deg, #7B4CFF 0%, #C20568 100%)',
  'linear-gradient(135deg, #0D5ED4 0%, #16A34A 100%)',
  'linear-gradient(135deg, #C20568 0%, #FFB700 100%)',
]

let seq = 0
const nextId = () => `vid-${Date.now()}-${seq++}`

/** Deterministic gradient per video so the grid has rhythm but stays stable across filters */
function gradientFor(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return GRADIENTS[h % GRADIENTS.length]
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

// Simulated LLM output — assigned when a video finishes analysis (→ ready).
const AI_SUMMARIES = [
  'Players move through the session smoothly with a couple of hesitation points; engagement holds through the mid-game before a late drop-off.',
  'Combat pacing stays steady with deaths clustered around the mid-section; most players recover and push the objective.',
  'Strong early retention with a spike in menu time, then a brief stall before the final stretch of the match.',
  'Clear progression with repeated attempts at one choke point; players who clear it tend to finish the session.',
]
const AI_TAG_POOL = [
  'high engagement', 'mid-game stall', 'combat heavy', 'objective focus',
  'menu hesitation', 'late drop-off', 'smooth run', 'retry loop',
]

function generateAiAnalysis(): { aiSummary: string; aiTags: string[] } {
  const aiSummary = AI_SUMMARIES[Math.floor(Math.random() * AI_SUMMARIES.length)]
  const aiTags = [...AI_TAG_POOL].sort(() => Math.random() - 0.5).slice(0, 3)
  return { aiSummary, aiTags }
}

// ── Seed: mixed states so the page is alive on first paint ──
function seedVideos(): LibraryVideo[] {
  const now = Date.now()
  return [
    {
      id: nextId(),
      title: 'Bermuda BR — onboarding flow walkthrough.mp4',
      sizeBytes: 184 * 1024 * 1024,
      durationLabel: '4:12',
      thumbnailSrc: undefined,
      status: 'ready',
      progress: 100,
      tags: ['tutorial', 'onboarding'],
      aiTags: ['tutorial skip', 'menu hesitation', 'fast completion'],
      aiSummary:
        'New players clear the tutorial quickly but hesitate on the first loadout menu. Most finish onboarding, with a noticeable skip at the loadout step worth a closer look.',
      addedAt: now - 1000 * 60 * 60 * 26,
    },
    {
      id: nextId(),
      title: 'Boss fight — Tier 3 difficulty spike.mov',
      sizeBytes: 412 * 1024 * 1024,
      durationLabel: '12:03',
      status: 'ready',
      progress: 100,
      tags: ['boss-fight', 'balance'],
      aiTags: ['difficulty spike', 'repeated death', 'rage quit'],
      aiSummary:
        'The Tier 3 boss spikes sharply in difficulty — players die repeatedly in the second phase, and several rage-quit before reaching the checkpoint.',
      addedAt: now - 1000 * 60 * 60 * 3,
    },
    {
      id: nextId(),
      title: 'Lobby matchmaking repro — long queue.webm',
      sizeBytes: 96 * 1024 * 1024,
      status: 'processing',
      progress: 100,
      tags: ['matchmaking'],
      aiTags: ['long queue', 'lobby idle', 'backfill'],
      aiSummary:
        'Matchmaking queues run long, leaving players idle in the lobby. Backfill kicks in late and a few players abandon before the match starts.',
      addedAt: now - 1000 * 60 * 8,
      analysisEndsAt: now + 9000,
      willFail: false,
    },
    {
      id: nextId(),
      title: 'Crash repro — checkout screen.mp4',
      sizeBytes: 58 * 1024 * 1024,
      status: 'failed',
      progress: 100,
      tags: ['crash-repro', 'payments'],
      error: 'Analysis failed — the video may be corrupted or longer than the 20-min limit.',
      addedAt: now - 1000 * 60 * 40,
    },
  ]
}


export interface VideoLibraryViewProps {
  className?: string
  /** Seed the library state directly — used by Storybook to show specific page states */
  initialVideos?: LibraryVideo[]
}

export function VideoLibraryView({ className, initialVideos }: VideoLibraryViewProps) {
  const [videos, setVideos] = useState<LibraryVideo[]>(() => initialVideos ?? seedVideos())
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [deleteIds, setDeleteIds] = useState<string[] | null>(null)
  const [statusFilter, setStatusFilter] = useState<LibraryStatusFilter>('all')
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [activeAiTags, setActiveAiTags] = useState<Set<string>>(new Set())
  const [filterOpen, setFilterOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [dropFiles, setDropFiles] = useState<File[] | undefined>(undefined)
  const [noteOpen, setNoteOpen] = useState(true)
  // Details side panel — track the id so the panel reflects live status changes
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [panelMounted, setPanelMounted] = useState(false)
  const [panelVisible, setPanelVisible] = useState(false)
  const selectedVideo = selectedId ? videos.find((v) => v.id === selectedId) ?? null : null
  const closePanel = () => setSelectedId(null)

  // Delayed mount for the slide-in animation (mirrors the Radiologist flyout).
  useEffect(() => {
    if (selectedId && selectedVideo) {
      setPanelMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setPanelVisible(true)))
    } else {
      setPanelVisible(false)
      const t = setTimeout(() => setPanelMounted(false), 300)
      return () => clearTimeout(t)
    }
  }, [selectedId, selectedVideo])

  // ── Lifecycle simulation: single ticking interval reads latest state ──
  useEffect(() => {
    const tick = window.setInterval(() => {
      const now = Date.now()
      setVideos((prev) => {
        let changed = false
        const next = prev.map((v) => {
          if (v.status === 'uploading') {
            changed = true
            const p = Math.min(100, v.progress + 16)
            if (p >= 100) {
              return {
                ...v,
                progress: 100,
                status: 'processing' as VideoStatus,
                analysisEndsAt: now + 3500 + Math.floor(Math.random() * 4000),
              }
            }
            return { ...v, progress: p }
          }
          if (v.status === 'processing' && v.analysisEndsAt && now >= v.analysisEndsAt) {
            changed = true
            if (v.willFail) {
              return {
                ...v,
                status: 'failed' as VideoStatus,
                error: 'Analysis failed — the video may be corrupted or longer than the 20-min limit.',
              }
            }
            // Attach simulated LLM output if the video doesn't already have it.
            return {
              ...v,
              status: 'ready' as VideoStatus,
              ...(v.aiSummary ? {} : generateAiAnalysis()),
            }
          }
          return v
        })
        return changed ? next : prev
      })
    }, 450)
    return () => window.clearInterval(tick)
  }, [])

  // ── Upload flow — staging + tags handled in UploadVideosModal ──
  const existingNames = new Set(videos.map((v) => v.title.toLowerCase()))

  const openUpload = (files?: File[]) => {
    setDropFiles(files)
    setUploadOpen(true)
    setDragOver(false)
  }

  /** Commit a tagged batch from the modal into the library */
  const commitUpload = (files: File[], tags: string[]) => {
    const stamp = Date.now()
    const entries: LibraryVideo[] = files.map((f, i) => ({
      id: nextId(),
      title: f.name,
      sizeBytes: f.size || Math.floor(40 * 1024 * 1024 + Math.random() * 300 * 1024 * 1024),
      status: 'uploading',
      progress: 0,
      tags,
      addedAt: stamp - i,
      willFail: Math.random() < ANALYZE_FAIL_RATE,
    }))
    if (entries.length) setVideos((prev) => [...entries, ...prev])
  }

  /** Demo: simulate a CLI batch import of N clips with the given tags */
  const simulateCliImport = (count: number, tags: string[]) => {
    const stamp = Date.now()
    const entries: LibraryVideo[] = Array.from({ length: count }, (_, i) => ({
      id: nextId(),
      title: `clip-${String(i + 1).padStart(4, '0')}.mp4`,
      sizeBytes: Math.floor(40 * 1024 * 1024 + Math.random() * 300 * 1024 * 1024),
      status: 'uploading',
      progress: Math.floor(Math.random() * 30),
      tags,
      addedAt: stamp - i,
      willFail: Math.random() < ANALYZE_FAIL_RATE,
    }))
    setVideos((prev) => [...entries, ...prev])
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files?.length) openUpload(Array.from(e.dataTransfer.files))
  }

  // ── Mutations ──
  const updateMeta = (id: string, next: { title: string; description: string; tags: string[] }) =>
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, title: next.title, description: next.description, tags: next.tags } : v))
    )
  const retry = (id: string) =>
    setVideos((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, status: 'processing', error: undefined, willFail: false, analysisEndsAt: Date.now() + 3000 }
          : v
      )
    )
  const confirmDelete = () => {
    if (!deleteIds) return
    const gone = new Set(deleteIds)
    setVideos((prev) => prev.filter((v) => !gone.has(v.id)))
    setSelectedIds((prev) => {
      const n = new Set(prev)
      gone.forEach((id) => n.delete(id))
      return n
    })
    setDeleteIds(null)
  }
  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })

  // ── Derived ──
  const allTags = Array.from(new Set(videos.flatMap((v) => v.tags))).sort()
  const allAiTags = Array.from(new Set(videos.flatMap((v) => v.aiTags ?? []))).sort()
  const q = query.trim().toLowerCase()
  const filtered = videos.filter((v) => {
    const matchesQuery =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.tags.some((t) => t.toLowerCase().includes(q)) ||
      (v.aiTags ?? []).some((t) => t.toLowerCase().includes(q))
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'processing' && (v.status === 'uploading' || v.status === 'processing')) ||
      (statusFilter === 'ready' && v.status === 'ready') ||
      (statusFilter === 'failed' && v.status === 'failed')
    const matchesTags = activeTags.size === 0 || v.tags.some((t) => activeTags.has(t))
    const matchesAiTags = activeAiTags.size === 0 || (v.aiTags ?? []).some((t) => activeAiTags.has(t))
    return matchesQuery && matchesStatus && matchesTags && matchesAiTags
  })
  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) + activeTags.size + activeAiTags.size

  const selectedList = videos.filter((v) => selectedIds.has(v.id))
  const selectedFailed = selectedList.filter((v) => v.status === 'failed')
  const allFilteredSelected = filtered.length > 0 && filtered.every((v) => selectedIds.has(v.id))
  const toggleSelectAll = () =>
    setSelectedIds((prev) => {
      if (allFilteredSelected) {
        const n = new Set(prev)
        filtered.forEach((v) => n.delete(v.id))
        return n
      }
      const n = new Set(prev)
      filtered.forEach((v) => n.add(v.id))
      return n
    })

  const isEmpty = videos.length === 0

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Main content column — scrolls; reflows as the details panel pushes in */}
      <div className="flex-1 min-w-0 overflow-y-auto flyout-scrollbar transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center px-l sm:px-[32px] lg:px-[48px] xl:px-[64px] pt-[40px] lg:pt-[64px] pb-[64px]">
          <div
            className={['flex flex-col gap-xl w-full max-w-[1120px] relative', className].filter(Boolean).join(' ')}
            onDragOver={(e) => {
              e.preventDefault()
              if (!isEmpty) setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
      {/* drag overlay (populated state) */}
      {dragOver && !isEmpty && (
        <div className="absolute inset-0 z-30 flex items-center justify-center rounded-3xl context-uploader-dragover pointer-events-none">
          <p className="font-display text-m font-semibold" style={{ color: 'var(--brand)' }}>
            Drop videos to upload
          </p>
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-xl w-full">
        <AgentPageHeader
          title="Library"
          description="Bulk-upload gameplay videos so your agents can reference them when answering your queries."
          iconGradient="linear-gradient(135deg, #6431E0 0%, #7B4CFF 55%, #8FA8F8 100%)"
          icon={<VideoLibraryIcon size={40} />}
        />
        {!isEmpty && (
          <Button variant="primary" size="lg" leftIcon={<UploadIcon size={20} />} onClick={() => openUpload()}>
            Upload videos
          </Button>
        )}
      </div>

      {isEmpty ? (
        /* ── Empty library ── */
        <div
          className={[
            'flex flex-col items-center gap-xl p-xxl mt-xl rounded-3xl cursor-pointer transition-colors duration-150',
            dragOver ? 'context-uploader-dragover' : 'context-uploader',
          ].join(' ')}
          role="button"
          tabIndex={0}
          onClick={() => openUpload()}
        >
          <div className="flex flex-col items-center gap-xxs">
            <p className="font-display text-m font-semibold" style={{ color: 'var(--text-primary)' }}>
              Drop videos here or click to upload
            </p>
            <p className="font-body text-s" style={{ color: 'var(--text-secondary)' }}>
              Bulk-upload gameplay clips — agents reference them once analysis completes
            </p>
          </div>
          <div className="flex items-center gap-xs flex-wrap justify-center">
            {['MP4', 'MOV', 'WEBM', 'AVI', 'MKV'].map((ext) => (
              <span
                key={ext}
                className="inline-flex items-center px-s py-xxs rounded-round font-body text-xs"
                style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                {ext}
              </span>
            ))}
          </div>
          <span className="font-display text-2xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--text-tertiary)' }}>
            MAX 500MB PER VIDEO
          </span>
        </div>
      ) : (
        <>
          {/* ── Agent gating note (dismissible) ── */}
          {noteOpen && (
            <div
              className="flex items-center gap-s px-m py-s rounded-xl"
              style={{ backgroundColor: 'var(--bg-tint-light)', border: '1px solid var(--bg-tint)' }}
            >
              <span className="shrink-0" style={{ color: 'var(--brand)' }} aria-hidden>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M8 7.2V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="8" cy="5" r="0.9" fill="currentColor" />
                </svg>
              </span>
              <span className="flex-1 min-w-0 font-body text-xs" style={{ color: 'var(--text-secondary)' }}>
                Only <span className="font-semibold" style={{ color: 'var(--brand)' }}>Ready</span> videos are referenced by
                your agents. Analysis can take a few minutes per video.
              </span>
              <Button
                variant="transparent"
                size="sm"
                iconOnly
                onClick={() => setNoteOpen(false)}
                aria-label="Dismiss note"
              >
                <CloseIcon size={16} />
              </Button>
            </div>
          )}

          {/* ── Library container — toolbar header + collection ── */}
          <div
            className="flex flex-col w-full rounded-3xl overflow-hidden"
            style={{ backgroundColor: 'var(--bg-elements)', border: '1px solid var(--border-subtle)' }}
          >
            {/* Header — search · filters */}
            <div className="flex items-center gap-m p-l w-full flex-wrap">
              {/* Search */}
              <div className="w-[300px] max-w-full">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search videos or tags…"
                  aria-label="Search videos"
                />
              </div>

              <div className="flex-1" />

              {/* Filters — opens a modal (same style as Radiologist) with the library's tag filters */}
              <Button
                variant="tertiary"
                size="md"
                leftIcon={<FilterIcon size={20} />}
                onClick={() => setFilterOpen(true)}
                className={filterOpen || activeFilterCount > 0 ? 'toggle-btn-active' : ''}
              >
                Filters{activeFilterCount > 0 ? ` · ${activeFilterCount}` : ''}
              </Button>
            </div>

            <LibraryFilterDialog
              isOpen={filterOpen}
              onClose={() => setFilterOpen(false)}
              allTags={allTags}
              allAiTags={allAiTags}
              value={{
                status: statusFilter,
                tags: Array.from(activeTags),
                aiTags: Array.from(activeAiTags),
              }}
              onApply={(next: LibraryFilterValue) => {
                setStatusFilter(next.status)
                setActiveTags(new Set(next.tags))
                setActiveAiTags(new Set(next.aiTags))
                setFilterOpen(false)
              }}
            />

            {/* Bulk action bar — quiet select-all, or active selection toolbar */}
            {selectedIds.size === 0 ? (
              <div className="flex items-center gap-m px-l pb-s min-h-[44px]">
                <Checkbox
                  checked={allFilteredSelected}
                  onChange={toggleSelectAll}
                  label={<span className="font-body text-xs" style={{ color: 'var(--text-secondary)' }}>Select all</span>}
                />
              </div>
            ) : (
              <div className="px-l pb-s">
                <div
                  className="flex items-center gap-s px-m py-xs rounded-xl flex-wrap min-h-[44px]"
                  style={{ backgroundColor: 'var(--bg-tint-light)', border: '1px solid var(--bg-tint)' }}
                >
                  <Checkbox
                    checked={allFilteredSelected}
                    indeterminate={!allFilteredSelected}
                    onChange={toggleSelectAll}
                    label={
                      <span className="font-display text-xs font-semibold" style={{ color: 'var(--brand)' }}>
                        {selectedIds.size} selected
                      </span>
                    }
                  />
                  <div className="flex-1" />
                  {selectedFailed.length > 0 && (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => selectedFailed.forEach((v) => retry(v.id))}
                    >
                      Retry {selectedFailed.length} failed
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="md"
                    leftIcon={<TrashIcon size={16} />}
                    onClick={() => setDeleteIds([...selectedIds])}
                  >
                    Delete {selectedIds.size}
                  </Button>
                  <span className="w-px h-[20px] shrink-0" style={{ backgroundColor: 'var(--bg-tint)' }} aria-hidden />
                  <Button
                    variant="transparent"
                    size="md"
                    iconOnly
                    onClick={() => setSelectedIds(new Set())}
                    aria-label="Clear selection"
                  >
                    <CloseIcon size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Collection — grid or list */}
            <div className="px-l pb-l w-full">
              {filtered.length === 0 ? (
                <VideosEmptyState message="No videos match your search or filters. Try clearing them to see your full library." />
              ) : (
                <div
                  className="grid gap-l w-full"
                  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
                >
                  {filtered.map((v) => (
                    <VideoLibraryCard
                      key={v.id}
                      layout="grid"
                      title={v.title}
                      sizeLabel={formatSize(v.sizeBytes)}
                      dateLabel={formatDate(v.addedAt)}
                      durationLabel={v.durationLabel}
                      thumbnailSrc={v.thumbnailSrc}
                      gradient={gradientFor(v.id)}
                      status={v.status}
                      progress={v.progress}
                      tags={v.tags}
                      aiTags={v.aiTags}
                      aiSummary={v.aiSummary}
                      description={v.description}
                      errorMessage={v.error}
                      selected={selectedIds.has(v.id)}
                      selectionVisible={selectedIds.size > 0}
                      onToggleSelect={() => toggleSelect(v.id)}
                      onDelete={() => setDeleteIds([v.id])}
                      onRetry={() => retry(v.id)}
                      onSaveMeta={(next) => updateMeta(v.id, next)}
                      onOpen={() => setSelectedId(v.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── Delete confirmation ── */}
      <PopupModal
        isOpen={deleteIds !== null}
        onClose={() => setDeleteIds(null)}
        title={deleteIds && deleteIds.length > 1 ? `Delete ${deleteIds.length} videos?` : 'Delete video?'}
        body="This removes the video and its analysis. Agents will no longer reference it. This can’t be undone."
        primaryLabel="Delete"
        primaryVariant="danger"
        secondaryLabel="Cancel"
        onConfirm={confirmDelete}
      />

      {/* ── Upload modal (files + tags · or CLI) ── */}
      <UploadVideosModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        initialFiles={dropFiles}
        existingNames={existingNames}
        onConfirm={commitUpload}
        onSimulateImport={simulateCliImport}
      />
          </div>
        </div>
      </div>

      {/* ── Details side panel — pushes the content in (mirrors Radiologist) ── */}
      {panelMounted && selectedVideo && (
        <div
          className={['session-panel shrink-0', panelVisible ? 'session-panel-active' : ''].join(' ')}
        >
          <LibraryVideoSidePanel video={selectedVideo} onClose={closePanel} />
        </div>
      )}
    </div>
  )
}
