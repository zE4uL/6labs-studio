/**
 * DescriptionBox — Apparatus multi-line text area atom.
 * 5 states: Default, Hover, Filled, Focused, Disabled.
 * No buttons — this is a pure input atom.
 *
 * @figmaComponent  Description box
 * @figmaPath       Apparatus / 💠 Inputs Box / Description box
 * @figmaNode       9706:26674
 * @figmaFile       Nt21OzTRlJKgvSLMoSxTyT
 * @figmaUrl        https://www.figma.com/design/Nt21OzTRlJKgvSLMoSxTyT/Apparatus?node-id=9706-26674
 * @componentKey    6511da7de189fd4b5e63f35093a0400b298d6ce3
 */

import { type TextareaHTMLAttributes, forwardRef, useState } from 'react'

type DescriptionBoxState = 'default' | 'hover' | 'filled' | 'focused' | 'disabled'

interface DescriptionBoxProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  className?: string
}

const stateClasses: Record<DescriptionBoxState, string> = {
  default:  'description-box-default',
  hover:    'description-box-hover',
  filled:   'description-box-filled',
  focused:  'description-box-focused',
  disabled: 'description-box-disabled',
}

export const DescriptionBox = forwardRef<HTMLTextAreaElement, DescriptionBoxProps>(
  function DescriptionBox({ className, disabled, value, ...props }, ref) {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)

    const hasValue = value != null && String(value).length > 0
    let state: DescriptionBoxState = 'default'
    if (disabled) state = 'disabled'
    else if (focused) state = 'focused'
    else if (hasValue) state = 'filled'
    else if (hovered) state = 'hover'

    return (
      <textarea
        ref={ref}
        className={[
          'w-full p-s rounded-[6px] font-body text-s leading-[1.5] resize-none description-box',
          stateClasses[state],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={disabled}
        value={value}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
        onMouseEnter={(e) => { setHovered(true); props.onMouseEnter?.(e) }}
        onMouseLeave={(e) => { setHovered(false); props.onMouseLeave?.(e) }}
        {...props}
      />
    )
  }
)
