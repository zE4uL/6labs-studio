/**
 * SidebarNavItem — Navigation item in the main sidebar.
 * States: Default, Hover (brand tint gradient + blue text), Active (same + 4px indicator).
 * Collapsed: icon-only, no label or badge.
 *
 * @figmaComponent  Sidebar nav item
 * @figmaNode       1894:18007
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=1894-18007
 */

import type { ReactNode } from 'react'
import { SidebarLabel } from '../atoms/SidebarLabel'

interface SidebarNavItemProps {
  label: string
  icon: ReactNode
  active?: boolean
  badge?: string
  badgeVariant?: 'default' | 'outlined' | 'muted'
  disabled?: boolean
  collapsed?: boolean
  onClick?: () => void
}

export function SidebarNavItem({
  label,
  icon,
  active = false,
  badge,
  badgeVariant = 'default',
  disabled = false,
  collapsed = false,
  onClick,
}: SidebarNavItemProps) {
  const Tag = disabled ? 'div' : 'a'

  return (
    <div className={`relative flex items-center ${collapsed ? 'h-[44px]' : 'h-[45px]'} px-s py-xxs w-full group`}>
      {/* Active left indicator bar — 4px brand, rounded right side */}
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[36px] bg-brand rounded-tr-[12px] rounded-br-[11px]" />
      )}

      {/* Nav item container */}
      <Tag
        className={[
          'flex flex-1 gap-[10px] items-start p-xs rounded-m',
          disabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer',
          active
            ? 'nav-active-gradient'
            : disabled
              ? ''
              : 'nav-hover-gradient',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={!disabled ? onClick : undefined}
        aria-current={active ? 'page' : undefined}
        title={collapsed ? label : undefined}
      >
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-1 gap-xs items-center">
            {/* Icon — brand blue on active/hover, secondary default */}
            <span
              className={[
                'shrink-0 w-5 h-5 flex items-center justify-center',
                active
                  ? 'text-brand'
                  : disabled
                    ? 'text-text-secondary'
                    : 'text-text-secondary group-hover:text-brand',
              ].join(' ')}
            >
              {icon}
            </span>

            {/* Label + badge — hidden in collapsed mode */}
            {!collapsed && (
              <>
                <span
                  className={[
                    'flex-1 font-display text-s font-semibold leading-[1.5] text-left',
                    active
                      ? 'text-brand'
                      : disabled
                        ? 'text-text-secondary'
                        : 'text-text-secondary group-hover:text-brand',
                  ].join(' ')}
                >
                  {label}
                </span>

                {/* Optional badge */}
                {badge && (
                  <SidebarLabel label={badge} variant={badgeVariant} />
                )}
              </>
            )}
          </div>
        </div>
      </Tag>
    </div>
  )
}
