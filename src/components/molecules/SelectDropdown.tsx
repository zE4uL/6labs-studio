/**
 * SelectDropdown — Floating dropdown panel for select/filter interactions.
 *
 * Renders the menu panel only. Open/close state and positioning (anchoring
 * to a trigger) are managed by the parent component.
 *
 * Supports the full variation set from the Figma component:
 *   - Title header (uppercase label, e.g., "SELECT LANGUAGE")
 *   - Grouped options with optional category headers
 *   - Single-group flat list (no title, no headers)
 *   - Wide multi-group layout (fill-width, multiple categories)
 *   - Item states: selected, default, hover (CSS), disabled
 *
 * @figmaComponent  Popup/ Droddown
 * @figmaPath       Studio / Popup/ Droddown - Variations / Popup/ Droddown
 * @figmaNode       5978:69442
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=5978-69442
 */

import type { ReactNode } from 'react'
import { CheckIcon } from '../icons/CheckIcon'

export interface SelectOption {
  value: string
  label: string
  /** Icon rendered before the label — pass an emoji string or React element */
  icon?: ReactNode
  disabled?: boolean
}

export interface SelectGroup {
  /** Optional category header label rendered above the group's items */
  header?: string
  items: SelectOption[]
}

interface SelectDropdownProps {
  /** Uppercase title row at the top of the panel (e.g., "SELECT LANGUAGE") */
  title?: string
  /** One or more option groups. A single group with no header = flat list. */
  groups: SelectGroup[]
  /** Currently selected value */
  value?: string | null
  /** Called when an option is clicked */
  onChange: (value: string) => void
  className?: string
}

export function SelectDropdown({
  title,
  groups,
  value,
  onChange,
  className,
}: SelectDropdownProps) {
  return (
    <div
      className={[
        'flex flex-col overflow-hidden',
        'bg-bg-elements rounded-xl',
        'shadow-[0px_2px_8px_rgba(0,0,0,0.06),_0px_8px_32px_rgba(0,0,0,0.13)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Title header */}
      {title && (
        <div className="flex items-center pt-s pb-xs px-s border-b border-border-subtle shrink-0">
          <span className="font-display text-2xs font-medium tracking-[1.5px] uppercase text-base-400 whitespace-nowrap">
            {title}
          </span>
        </div>
      )}

      {/* Option groups */}
      {groups.map((group, i) => (
        <div key={i} className={`flex flex-col gap-xxs${!title ? ' p-xxs' : ''}`}>
          {/* Category header */}
          {group.header && (
            <div className="flex items-center pl-xs pr-s py-xxs bg-[var(--bg-page-pale)] border-b border-border-subtle shrink-0">
              <span className="font-display text-xs font-semibold text-text-tertiary whitespace-nowrap leading-[1.5]">
                {group.header}
              </span>
            </div>
          )}

          {/* Items */}
          {group.items.map((item) => {
            const isSelected = item.value === value
            const isDisabled = item.disabled ?? false

            return (
              <button
                key={item.value}
                type="button"
                disabled={isDisabled}
                onClick={() => onChange(item.value)}
                className={[
                  `flex items-center justify-between w-full h-[36px] px-s overflow-hidden text-left${!title ? ' rounded-m' : ''}`,
                  isSelected
                    ? 'bg-[var(--bg-tint-light)]'
                    : isDisabled
                      ? 'bg-base-50 cursor-not-allowed'
                      : 'hover:bg-[var(--bg-tint)] cursor-pointer',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {/* Icon + label */}
                <span className="flex items-center gap-[6px] shrink-0 whitespace-nowrap">
                  {item.icon != null && (
                    <span className="text-[20px] leading-none shrink-0" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span
                    className={[
                      'text-s leading-[1.5]',
                      isSelected
                        ? 'font-display font-semibold text-text-brand'
                        : isDisabled
                          ? 'font-body font-normal text-base-400'
                          : 'font-body font-normal text-text-secondary',
                    ].join(' ')}
                  >
                    {item.label}
                  </span>
                </span>

                {/* Checkmark for selected item */}
                {isSelected && (
                  <CheckIcon size={16} className="shrink-0 text-text-brand" />
                )}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
