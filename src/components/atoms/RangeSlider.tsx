/**
 * RangeSlider — dual-handle range slider with min/max labels.
 * Displays a track with brand-colored fill between two draggable thumbs.
 *
 * @figmaComponent  Range Slider
 * @figmaNode       6425:222911
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6425-222911
 */
import { useRef, useCallback } from 'react'

interface RangeSliderProps {
  min: number
  max: number
  valueLow: number
  valueHigh: number
  /** Suffix for labels, e.g. "min" */
  unit?: string
  onChange?: (low: number, high: number) => void
  className?: string
}

export function RangeSlider({
  min,
  max,
  valueLow,
  valueHigh,
  unit = '',
  onChange,
  className = '',
}: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const toPercent = (v: number) => ((v - min) / (max - min)) * 100

  const handleDrag = useCallback(
    (thumb: 'low' | 'high') => (e: React.PointerEvent) => {
      e.preventDefault()
      const el = trackRef.current
      if (!el) return

      const onMove = (ev: PointerEvent) => {
        const rect = el.getBoundingClientRect()
        const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
        const raw = Math.round(min + pct * (max - min))

        if (thumb === 'low') {
          onChange?.(Math.min(raw, valueHigh), valueHigh)
        } else {
          onChange?.(valueLow, Math.max(raw, valueLow))
        }
      }

      const onUp = () => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onUp)
      }

      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUp)
    },
    [min, max, valueLow, valueHigh, onChange]
  )

  const lowPct = toPercent(valueLow)
  const highPct = toPercent(valueHigh)

  return (
    <div className={`range-slider ${className}`}>
      <div className="range-slider-labels">
        <span className="range-value">{valueLow}{unit}</span>
        <span className="range-sep">-</span>
        <span className="range-value">{valueHigh}{unit}</span>
      </div>
      <div className="range-slider-track" ref={trackRef}>
        <div className="range-slider-bar" />
        <div
          className="range-slider-fill"
          style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
        />
        <div
          className="range-slider-thumb"
          style={{ left: `${lowPct}%` }}
          onPointerDown={handleDrag('low')}
          role="slider"
          aria-label="Minimum value"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={valueLow}
          tabIndex={0}
        />
        <div
          className="range-slider-thumb"
          style={{ left: `${highPct}%` }}
          onPointerDown={handleDrag('high')}
          role="slider"
          aria-label="Maximum value"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={valueHigh}
          tabIndex={0}
        />
      </div>
    </div>
  )
}
