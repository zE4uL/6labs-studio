/**
 * Toggle — Apparatus-spec toggle switch.
 * Track 24×14px (pill), thumb 10×10px.
 * Off: outlined track + gray thumb. On: brand-filled track + white thumb.
 * Supports disabled state and optional label.
 *
 * @figmaComponent  Toggle
 * @figmaPath       ↳ 💠 Toggle / Toggle
 * @figmaNode       3134:8311
 * @figmaFile       Nt21OzTRlJKgvSLMoSxTyT
 * @figmaUrl        https://www.figma.com/design/Nt21OzTRlJKgvSLMoSxTyT/Apparatus?node-id=3134-8311
 */
import { type InputHTMLAttributes, type ReactNode, useId } from 'react'

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text displayed beside the toggle */
  label?: ReactNode
  /** Label position relative to the track */
  labelPosition?: 'left' | 'right'
}

export default function Toggle({
  label,
  labelPosition = 'right',
  checked,
  disabled,
  className = '',
  id: idProp,
  onChange,
  ...props
}: ToggleProps) {
  const autoId = useId()
  const id = idProp ?? autoId

  const labelEl = label != null && (
    <span className="toggle-label">{label}</span>
  )

  return (
    <label
      className={['toggle-root', className].filter(Boolean).join(' ')}
      data-checked={String(!!checked)}
      data-disabled={String(!!disabled)}
      htmlFor={id}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />

      {labelPosition === 'left' && labelEl}

      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-thumb" />
      </span>

      {labelPosition === 'right' && labelEl}
    </label>
  )
}
