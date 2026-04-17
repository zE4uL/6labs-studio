/**
 * Input — Apparatus-spec text input. Supports 4 sizes, 6 states,
 * optional label, helper/error message, and left/right icon slots.
 *
 * @figmaComponent  Input Field
 * @figmaPath       ↳ 💠 Inputs Box / Input / Input Field
 * @figmaNode       13298:689
 * @figmaFile       Nt21OzTRlJKgvSLMoSxTyT
 * @figmaUrl        https://www.figma.com/design/Nt21OzTRlJKgvSLMoSxTyT/Apparatus?node-id=13298-689
 *
 * @figmaComponent  Input Skeleton
 * @figmaPath       ↳ 💠 Inputs Box / Input / Input Skeleton
 * @figmaNode       13298:2195
 * @figmaFile       Nt21OzTRlJKgvSLMoSxTyT
 */
import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react'

// ─── Types matching Apparatus Input component props ────────────────────────
// Sizes map to Apparatus Input Skeleton: Small=24px · Medium=32px · Large=40px · X-Large=48px
export type InputSize = 'sm' | 'md' | 'lg' | 'xl'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Apparatus Size property — controls field height, padding, and font size */
  size?: InputSize
  /** Label text displayed above the field */
  label?: string
  /** Helper or error message displayed below the field */
  message?: string
  /** Activates error state (red border + red message) */
  error?: boolean
  /** Left icon slot (Apparatus Left slot) */
  leftIcon?: ReactNode
  /** Right icon slot (Apparatus Right slot) */
  rightIcon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    label,
    message,
    error = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    id,
    ...props
  },
  ref
) {
  const wrapperClasses = [
    'input-wrapper',
    error ? 'input-error' : '',
    disabled ? 'input-disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`input-field input-${size}${className ? ` ${className}` : ''}`}>
      {label && (
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={wrapperClasses}>
        {leftIcon != null && (
          <span className="input-icon-slot" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className="input-element"
          disabled={disabled}
          aria-invalid={error || undefined}
          {...props}
        />
        {rightIcon != null && (
          <span className="input-icon-slot" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>
      {message && (
        <span className={`input-message${error ? ' input-message-error' : ''}`} role={error ? 'alert' : undefined}>
          {message}
        </span>
      )}
    </div>
  )
})

export default Input
