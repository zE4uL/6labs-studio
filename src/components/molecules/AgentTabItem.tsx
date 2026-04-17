/**
 * AgentTabItem — Tab switcher for selecting an AI agent.
 * 3 states matching Figma: Active (highlighted bg, onbrand text),
 * Default (transparent, secondary text), Hover (tint bg, primary text).
 *
 * @figmaComponent  Agent Tab Item
 * @figmaNode       227:27788
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=227-27788
 */

import type { ReactNode } from 'react'

type AgentTabState = 'active' | 'default' | 'hover'

interface AgentTabItemProps {
  label: string
  icon: ReactNode
  /** Explicit state — use for static rendering (e.g. DesignSystem showcase). */
  state?: AgentTabState
  /** Shorthand: sets state to 'active'. Ignored if `state` is provided. */
  active?: boolean
  onClick?: () => void
}

/**
 * State-dependent styles using CSS variables directly via inline style.
 * This guarantees correct rendering regardless of Tailwind class generation order.
 *
 * Figma tokens:
 *   Active:  bg = --bg-highlighted (#1770EF), text = --text-on-brand (white)
 *   Default: bg = transparent, text = --text-secondary (#4F566C)
 *   Hover:   bg = --bg-tint (rgba(23,112,239,0.14)), text = --text-primary (#030D2D)
 */
const stateStyles: Record<AgentTabState, React.CSSProperties> = {
  active: {
    backgroundColor: 'var(--bg-highlighted)',
    color: 'var(--text-on-brand)',
  },
  default: {
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
  },
  hover: {
    backgroundColor: 'var(--bg-tint)',
    color: 'var(--text-primary)',
  },
}

export function AgentTabItem({
  label,
  icon,
  state,
  active = false,
  onClick,
}: AgentTabItemProps) {
  const resolved: AgentTabState = state ?? (active ? 'active' : 'default')
  const isInteractive = !state && resolved !== 'active'

  return (
    <a
      role="tab"
      aria-selected={resolved === 'active'}
      onClick={onClick}
      style={stateStyles[resolved]}
      className={[
        /* Layout — Figma: px-s(12) py-xs(8) gap-xs(8) rounded-m(8) */
        'flex gap-xs items-center justify-center px-s py-xs rounded-m cursor-pointer',
        /* CSS :hover only for interactive default-state tabs */
        isInteractive
          ? 'hover:!bg-[var(--bg-tint)] hover:!text-[var(--text-primary)]'
          : '',
        'transition-colors duration-150',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Primary icon — 20×20 */}
      <span className="shrink-0 w-5 h-5 flex items-center justify-center">{icon}</span>

      {/* Label — DisplayFont SemiBold 14px/1.5, pr-xxs text wrap */}
      <span className="font-display text-s font-semibold leading-[1.5] whitespace-nowrap pr-xxs">
        {label}
      </span>
    </a>
  )
}
