/**
 * SidebarProfile — User profile section in the sidebar footer.
 * Variants: Default (name + lang), Hover (tint bg + "Click to change").
 * Collapsed: stacked vertically (avatar + lang, no name).
 * Click opens language selector overlay.
 *
 * @figmaComponent  SidebarProfile
 * @figmaNode       4545:42646
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=4545-42646
 */

import { FlagIcon } from '../icons/FlagIcon'

interface SidebarProfileProps {
  name: string
  initials: string
  language?: string
  collapsed?: boolean
  className?: string
  onClick?: () => void
}

export function SidebarProfile({
  name,
  initials,
  language = 'EN',
  collapsed = false,
  className,
  onClick,
}: SidebarProfileProps) {
  /* ─── Collapsed: stacked avatar + language ─── */
  if (collapsed) {
    return (
      <button
        className="flex flex-col gap-xs items-center justify-center py-xs w-full cursor-pointer profile-hover transition-colors group/profile"
        onClick={onClick}
      >
        {/* Avatar — Gradient/Brand Gradient (hardcoded: no CSS var exists in DS yet) */}
        <div
          className="relative shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(-90deg, #7B4CFF 0%, #0EA4C5 100%)' }}
        >
          <span className="font-display font-semibold text-s leading-[1.5]" style={{ color: 'var(--text-on-brand)' }}>
            {initials}
          </span>
        </div>

        {/* Language row */}
        <div className="flex gap-xs items-center justify-center w-full">
          <div className="flex gap-xxs items-center">
            <FlagIcon code={language} size={14} />
            <span className="font-body text-xs font-normal text-text-tertiary">{language}</span>
          </div>
        </div>
      </button>
    )
  }

  /* ─── Expanded: horizontal layout ─── */
  return (
    <button
      className={[
        'flex gap-xs items-center px-xxs rounded-m cursor-pointer transition-colors',
        'profile-hover',
        'group/profile',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      {/* Avatar — Gradient/Brand Gradient (hardcoded: no CSS var exists in DS yet) */}
      <div
        className="relative shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(-90deg, #7B4CFF 0%, #0EA4C5 100%)' }}
      >
        <span className="font-display font-semibold text-s leading-[1.5]" style={{ color: 'var(--text-on-brand)' }}>
          {initials}
        </span>
      </div>

      {/* User info */}
      <div className="flex flex-1 flex-col items-start justify-center min-w-0">
        <p className="w-full font-body text-s font-normal text-text-secondary leading-[1.5] truncate text-left">
          {name}
        </p>
        <div className="flex gap-xs items-center">
          <div className="flex gap-xxs items-center">
            <FlagIcon code={language} size={14} />
            <span className="font-body text-xs font-normal text-text-tertiary">{language}</span>
          </div>
          {/* "Click to change" — visible on hover */}
          <span className="hidden group-hover/profile:inline-flex items-center gap-xxs">
            <span className="w-1 h-1 rounded-full bg-text-tertiary" />
            <span className="font-body text-xs font-normal text-text-tertiary whitespace-nowrap">
              Click to change
            </span>
          </span>
        </div>
      </div>
    </button>
  )
}
