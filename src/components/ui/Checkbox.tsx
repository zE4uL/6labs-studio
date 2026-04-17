/**
 * Checkbox — Apparatus-spec checkbox and radio control with optional label.
 * Handles checkbox (square) and radio (round) shapes via the `radio` prop.
 * Supports checked, indeterminate, and disabled states; sm and md sizes.
 *
 * @figmaComponent  Checkbox With Label
 * @figmaPath       ↳ 💠 Radio/Checkbox / Checkbox / Checkbox With Label
 * @figmaNode       5640:24561
 * @figmaFile       Nt21OzTRlJKgvSLMoSxTyT
 * @figmaUrl        https://www.figma.com/design/Nt21OzTRlJKgvSLMoSxTyT/Apparatus?node-id=5640-24561
 *
 * @figmaComponent  Radio Button With Label
 * @figmaPath       ↳ 💠 Radio/Checkbox / Radio Button / Radio Button With Label
 * @figmaNode       20883:713
 * @figmaFile       Nt21OzTRlJKgvSLMoSxTyT
 * @figmaUrl        https://www.figma.com/design/Nt21OzTRlJKgvSLMoSxTyT/Apparatus?node-id=20883-713
 */
import {
  type InputHTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useId,
} from 'react'

// ─── Types matching Apparatus Checkbox / Radio component props ─────────────
// Sizes map to Apparatus "Medium" (16px) and "Small" (14px) variants
export type CheckboxSize = 'sm' | 'md'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Renders as a radio button (round shape, dot indicator) */
  radio?: boolean
  /** Indeterminate / partial-active state — checkbox only */
  indeterminate?: boolean
  /** sm=14px control · md=16px control (default) */
  size?: CheckboxSize
  /** Label text displayed beside the control */
  label?: ReactNode
}

export default function Checkbox({
  radio = false,
  indeterminate = false,
  size = 'md',
  label,
  checked,
  disabled,
  className = '',
  id: idProp,
  onChange,
  ...props
}: CheckboxProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const inputRef = useRef<HTMLInputElement>(null)

  // Set indeterminate imperatively — not a native HTML attribute
  useEffect(() => {
    if (inputRef.current && !radio) {
      inputRef.current.indeterminate = !!indeterminate
    }
  }, [indeterminate, radio])

  const rootClass = radio ? 'radio-root' : 'checkbox-root'
  const sizeClass = size === 'sm' ? (radio ? 'radio-sm' : 'checkbox-sm') : ''

  return (
    <label
      className={[rootClass, sizeClass, className].filter(Boolean).join(' ')}
      data-checked={String(!!checked)}
      data-indeterminate={String(!!indeterminate && !radio)}
      data-disabled={String(!!disabled)}
      htmlFor={id}
    >
      <input
        ref={inputRef}
        id={id}
        type={radio ? 'radio' : 'checkbox'}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />

      {radio ? (
        <span className="radio-control" aria-hidden="true">
          <span className="radio-dot" />
        </span>
      ) : (
        <span className="checkbox-control" aria-hidden="true">
          {/* Checkmark — shown when checked */}
          {checked && !indeterminate && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {/* Indeterminate dash */}
          {indeterminate && (
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none" aria-hidden="true">
              <path
                d="M1 1H9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
      )}

      {label != null && (
        <span className={radio ? 'radio-label' : 'checkbox-label'}>{label}</span>
      )}
    </label>
  )
}
