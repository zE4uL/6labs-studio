/**
 * InputFieldConsole — Prompt input console for agent interactions.
 * Anatomy: text area → actions row (platform selector Button + send Button).
 * Types: Default (multiline) · Mini (single-line compact).
 * States: Default → Hover (brand border) → Active (brand border + send enabled).
 *
 * Sub-components from Apparatus:
 *   - Platform selector: Button variant="tertiary" size="md" pill
 *   - Platform dropdown: SelectDropdown (Popup/Droddown · 6348:80253)
 *   - Send CTA: Button variant="primary" size="lg" iconOnly iconRound
 *   - Platform icon: BlueStacksIcon (Social Icon set)
 *   - Dropdown indicator: DropdownArrowIcon (R Icon / Arrow)
 *   - Send icon: DirectionsArrowIcon rotated -90deg (Directions Arrow)
 *
 * @figmaComponent  Input Field Console Radiologist
 * @figmaNode       1889:17490
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=1889-17490
 *
 * Source: studio/src/components/ui/InputFieldConsole.tsx
 * Synced: 2026-04-05
 */

import { useState, useRef, useEffect, type ReactNode, type KeyboardEvent } from 'react'
import Button from './Button'
import { SelectDropdown, type SelectGroup } from '../molecules/SelectDropdown'
import { DirectionsArrowIcon } from '../icons/DirectionsArrowIcon'
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon'
import { BlueStacksIcon } from '../icons/BlueStacksIcon'

export type InputFieldConsoleType = 'default' | 'mini'

export interface PlatformOption {
  value: string
  label: string
  icon: ReactNode
}

export interface InputFieldConsoleProps {
  /** Multiline (default) or compact single-line (mini) */
  type?: InputFieldConsoleType
  /** Controlled input value */
  value: string
  /** Change handler */
  onChange: (value: string) => void
  /** Submit handler (fires on send click or Enter in mini) */
  onSubmit?: () => void
  /** Placeholder text */
  placeholder?: string
  /** Available platforms for the selector dropdown */
  platforms?: PlatformOption[]
  /** Currently selected platform value */
  selectedPlatform?: string
  /** Called when a platform is selected */
  onPlatformChange?: (value: string) => void
  /** Number of visible rows for default type */
  rows?: number
  /** Focus/blur events for suggestion dropdown control */
  onFocus?: () => void
  onBlur?: () => void
  className?: string
}

const DEFAULT_PLATFORMS: PlatformOption[] = [
  { value: 'bluestacks', label: 'BlueStacks', icon: <BlueStacksIcon size={20} /> },
  { value: 'youtube', label: 'Youtube', icon: <BlueStacksIcon size={20} /> },
  { value: 'sdk-pc', label: 'SDK - PC', icon: <BlueStacksIcon size={20} /> },
  { value: 'sdk-mobile', label: 'SDK - Mobile', icon: <BlueStacksIcon size={20} /> },
]

export default function InputFieldConsole({
  type = 'default',
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for actions, objects and events in your game...',
  platforms = DEFAULT_PLATFORMS,
  selectedPlatform,
  onPlatformChange,
  rows = 2,
  onFocus,
  onBlur,
  className,
}: InputFieldConsoleProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const platformRef = useRef<HTMLDivElement>(null)
  const isMini = type === 'mini'
  const hasValue = value.trim().length > 0

  const [internalPlatform, setInternalPlatform] = useState(platforms[0]?.value ?? '')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activePlatformValue = selectedPlatform ?? internalPlatform
  const activePlatform = platforms.find((p) => p.value === activePlatformValue) ?? platforms[0]

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return
    const handleClick = (e: MouseEvent) => {
      if (platformRef.current && !platformRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropdownOpen])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isMini && e.key === 'Enter' && !e.shiftKey && hasValue) {
      e.preventDefault()
      onSubmit?.()
    }
    if (!isMini && e.key === 'Enter' && e.ctrlKey && hasValue) {
      e.preventDefault()
      onSubmit?.()
    }
  }

  const handleWrapperClick = () => {
    if (isMini) {
      inputRef.current?.focus()
    } else {
      textareaRef.current?.focus()
    }
  }

  const handlePlatformSelect = (val: string) => {
    if (onPlatformChange) {
      onPlatformChange(val)
    } else {
      setInternalPlatform(val)
    }
    setDropdownOpen(false)
  }

  const dropdownGroups: SelectGroup[] = [
    {
      items: platforms.map((p) => ({
        value: p.value,
        label: p.label,
        icon: p.icon,
      })),
    },
  ]

  return (
    <div
      className={[
        'input-console',
        isMini ? 'input-console-mini' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleWrapperClick}
    >
      {/* Text input */}
      {isMini ? (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="input-console-textarea"
        />
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          className="input-console-textarea"
        />
      )}

      {/* Actions row */}
      <div className="input-console-actions">
        {/* Left: Platform selector — Button tertiary medium pill + dropdown */}
        <div ref={platformRef} className="relative flex gap-s items-center">
          <Button
            variant="tertiary"
            size="md"
            pill
            leftIcon={activePlatform?.icon}
            rightIcon={<DropdownArrowIcon size={16} />}
            onClick={(e) => {
              e.stopPropagation()
              setDropdownOpen((prev) => !prev)
            }}
          >
            {activePlatform?.label}
          </Button>

          {dropdownOpen && (
            <SelectDropdown
              groups={dropdownGroups}
              value={activePlatformValue}
              onChange={handlePlatformSelect}
              className="absolute top-full left-0 mt-xxs w-[211px] z-10"
            />
          )}
        </div>

        {/* Right: Send CTA — Button primary large icon-only round */}
        <Button
          variant="primary"
          size="lg"
          iconOnly
          iconRound
          className={hasValue ? '' : 'input-console-send-disabled'}
          disabled={!hasValue}
          onClick={(e) => {
            e.stopPropagation()
            onSubmit?.()
          }}
          aria-label="Send query"
        >
          <DirectionsArrowIcon size={20} className="-rotate-90" />
        </Button>
      </div>
    </div>
  )
}
