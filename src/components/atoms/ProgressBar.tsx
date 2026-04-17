/**
 * ProgressBar — Thin horizontal progress indicator for file uploads.
 * Animated fill from 0-100%. Uses brand blue for the active segment.
 *
 * @figmaComponent  Progress Segment
 * @figmaPath       Context / Game Intelligence - Uploading 1 / Section / Container / Uploaded files / Context/ File card / File Info / Progress Segment
 * @figmaNode       0:1464
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6419-74907
 */

interface ProgressBarProps {
  /** 0–100 percent complete */
  value: number
  className?: string
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      className={['w-full h-[8px] rounded-round overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      style={{ backgroundColor: 'var(--bg-subtle)' }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-round transition-[width] duration-300 ease-out"
        style={{
          width: `${clamped}%`,
          backgroundColor: 'var(--brand)',
        }}
      />
    </div>
  )
}
