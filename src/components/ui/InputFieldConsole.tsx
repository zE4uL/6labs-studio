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

import { useEffect, useMemo, useState, useRef, type ReactNode, type KeyboardEvent } from 'react'
import Button from './Button'
import { DirectionsArrowIcon } from '../icons/DirectionsArrowIcon'
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon'
import { BlueStacksIcon } from '../icons/BlueStacksIcon'
import { SelectDropdown } from '../molecules/SelectDropdown'
import {
  ChatActionMenuFlyout,
  type ConnectorOption,
} from '../molecules/ChatActionMenuFlyout'
import {
  useOnboardedConnectors,
  useAvailableConnectors,
  requestConnectorOnboarding,
} from '../../lib/state/connectorsStore'
import { BigQueryIcon } from '../icons/connectors/BigQueryIcon'

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
  /** Onboarded connectors shown in the flyout's Connectors submenu */
  connectors?: ConnectorOption[]
  /** Called with the new set of enabled connector ids */
  onConnectorsChange?: (ids: string[]) => void
  /** Called when the user attaches a PDF from the flyout */
  onAttachFile?: (file: File) => void
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
  connectors = [],
  onConnectorsChange,
  onAttachFile,
  rows = 2,
  onFocus,
  onBlur,
  className,
}: InputFieldConsoleProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sourceRootRef = useRef<HTMLDivElement>(null)
  const isMini = type === 'mini'
  const hasValue = value.trim().length > 0

  const [internalPlatform, setInternalPlatform] = useState(platforms[0]?.value ?? '')
  const activePlatformValue = selectedPlatform ?? internalPlatform
  const activePlatform = platforms.find((p) => p.value === activePlatformValue) ?? platforms[0]

  const [sourceOpen, setSourceOpen] = useState(false)

  useEffect(() => {
    if (!sourceOpen) return
    const handleDocClick = (e: MouseEvent) => {
      if (!sourceRootRef.current) return
      if (!sourceRootRef.current.contains(e.target as Node)) setSourceOpen(false)
    }
    document.addEventListener('mousedown', handleDocClick)
    return () => document.removeEventListener('mousedown', handleDocClick)
  }, [sourceOpen])

  // Per-chat enabled-connector ids. We hold this locally so each chat composer
  // has its own toggle state, but the *list* of onboarded connectors comes from
  // the global store so they show up the moment onboarding finishes.
  const [enabledConnectorIds, setEnabledConnectorIds] = useState<string[]>([])
  const onboarded = useOnboardedConnectors()
  const available = useAvailableConnectors()
  const composedConnectors: ConnectorOption[] = useMemo(() => {
    const fromStore = onboarded.map((c) => ({
      id: c.id,
      label: c.label,
      secondary: c.secondary,
      icon: c.id === 'bigquery' ? <BigQueryIcon size={20} /> : undefined,
      enabled: enabledConnectorIds.includes(c.id),
    }))
    // Allow callers to inject extra connector options (e.g. for Storybook).
    const propIds = new Set(connectors.map((c) => c.id))
    return [
      ...fromStore.filter((c) => !propIds.has(c.id)),
      ...connectors,
    ]
  }, [onboarded, enabledConnectorIds, connectors])

  const handleConnectorsChange = (ids: string[]) => {
    setEnabledConnectorIds(ids)
    onConnectorsChange?.(ids)
  }

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
    setSourceOpen(false)
  }

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
        {/* Left cluster: "+" flyout (Attach PDF / Connectors) + always-visible Sources pill */}
        <div
          className="flex items-center gap-s"
          onClick={(e) => e.stopPropagation()}
        >
          <ChatActionMenuFlyout
            connectors={composedConnectors}
            onConnectorsChange={handleConnectorsChange}
            availableConnectors={available.map((c) => ({
              id: c.id,
              label: c.label,
              icon:
                c.id === 'bigquery' ? <BigQueryIcon size={20} /> : undefined,
            }))}
            onAddConnector={(id) => requestConnectorOnboarding(id)}
            onAttachFile={onAttachFile}
          />

          {/* Sources selector — always visible so the user knows what their query
              runs on. Click opens a SelectDropdown popover anchored to the pill. */}
          <div ref={sourceRootRef} className="relative inline-flex items-center">
            <Button
              variant="tertiary"
              size="md"
              pill
              leftIcon={activePlatform?.icon ?? <BlueStacksIcon size={20} />}
              rightIcon={<DropdownArrowIcon size={16} />}
              onClick={() => setSourceOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={sourceOpen}
            >
              {activePlatform?.label ?? 'Sources'}
            </Button>
            {sourceOpen && (
              <div className="absolute bottom-full left-0 mb-xs z-50 min-w-[200px]">
                <SelectDropdown
                  title="SOURCES"
                  groups={[
                    {
                      items: platforms.map((p) => ({
                        value: p.value,
                        label: p.label,
                        icon: p.icon,
                      })),
                    },
                  ]}
                  value={activePlatformValue}
                  onChange={handlePlatformSelect}
                />
              </div>
            )}
          </div>
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
