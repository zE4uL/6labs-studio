/**
 * Toast — transient confirmation message (e.g. "Copied to clipboard").
 *
 * Usage: call `showToast('…')` from anywhere. A single host is lazily mounted
 * on first use (no provider wiring needed), so toasts work in the app and in
 * Storybook alike. Toasts stack bottom-centre and auto-dismiss.
 *
 * Code-first prototype — no Figma source yet.
 */

import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CheckIcon } from '../icons/CheckIcon'

const DEFAULT_DURATION_MS = 2200

interface ToastItem {
  id: number
  message: string
}

let items: ToastItem[] = []
let nextId = 1
let hostMounted = false
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

/** Show a transient confirmation toast. Returns the toast id. */
export function showToast(message: string, durationMs = DEFAULT_DURATION_MS): number {
  const id = nextId++
  items = [...items, { id, message }]
  ensureHost()
  emit()
  window.setTimeout(() => {
    items = items.filter((i) => i.id !== id)
    emit()
  }, durationMs)
  return id
}

// Lazily inject a single host node on first toast so callers don't need to
// mount anything. Safe to call repeatedly.
function ensureHost() {
  if (hostMounted || typeof document === 'undefined') return
  hostMounted = true
  const node = document.createElement('div')
  node.setAttribute('data-toast-host', '')
  document.body.appendChild(node)
  createRoot(node).render(<ToastViewport />)
}

/** Renders the active toast stack. Mounted automatically by `showToast`. */
export function ToastViewport() {
  const [, force] = useState(0)
  useEffect(() => {
    const l = () => force((v) => v + 1)
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  }, [])

  return (
    <div
      className="fixed left-1/2 bottom-[24px] -translate-x-1/2 z-[100] flex flex-col items-center gap-xs"
      style={{ pointerEvents: 'none' }}
      aria-live="polite"
      role="status"
    >
      {items.map((t) => (
        <Toast key={t.id} message={t.message} />
      ))}
    </div>
  )
}

/** Presentational toast pill. Exported for Storybook. */
export function Toast({ message }: { message: string }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setShown(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  return (
    <div
      className="flex items-center gap-s px-m py-s rounded-m"
      style={{
        backgroundColor: 'var(--text-primary)',
        color: 'var(--bg-elements)',
        boxShadow: 'var(--shadow-normal)',
        pointerEvents: 'auto',
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 160ms ease, transform 160ms ease',
      }}
    >
      <span
        aria-hidden
        className="shrink-0 inline-flex items-center justify-center"
        style={{ color: 'var(--success)' }}
      >
        <CheckIcon size={16} />
      </span>
      <span className="font-body text-s font-medium whitespace-nowrap">{message}</span>
    </div>
  )
}
