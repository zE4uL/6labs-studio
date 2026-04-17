/**
 * OracleTopbar — Tab bar for the Oracle result view.
 * Two tabs: "Agent" (chat) and "Videos" (video results grid).
 * White bg, centered tabs, 56px tall, bottom border.
 *
 * @figmaComponent  Page Topbar (Oracle variant)
 * @figmaNode       6470:1506022
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6470-1506022
 */

import { OracleIcon } from '../icons/OracleIcon'

export type OracleTab = 'agent' | 'videos'

interface OracleTopbarProps {
  activeTab: OracleTab
  onTabChange: (tab: OracleTab) => void
  className?: string
}

export function OracleTopbar({ activeTab, onTabChange, className }: OracleTopbarProps) {
  return (
    <div
      className={[
        'w-full h-[56px] flex items-start justify-center shrink-0 bg-bg-elements',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ borderBottom: '1px solid var(--bg-subtle)' }}
    >
      <div className="flex items-center h-full">
        {/* Agent tab */}
        <button
          type="button"
          onClick={() => onTabChange('agent')}
          className="oracle-tab flex flex-col items-center justify-between h-full"
          data-active={String(activeTab === 'agent')}
        >
          <div className="h-[2px] w-full rounded-xs" />
          <div className="flex gap-[6px] items-center px-m">
            <OracleIcon size={20} className={activeTab === 'agent' ? 'text-brand' : 'text-text-secondary'} />
            <span
              className={[
                'font-display text-s font-semibold leading-[1.5] whitespace-nowrap',
                activeTab === 'agent' ? 'text-brand' : 'text-text-secondary',
              ].join(' ')}
            >
              Agent
            </span>
          </div>
          <div
            className="h-[2px] w-full rounded-xs"
            style={{
              backgroundColor: activeTab === 'agent' ? 'var(--brand-hover)' : 'transparent',
            }}
          />
        </button>

        {/* Videos tab */}
        <button
          type="button"
          onClick={() => onTabChange('videos')}
          className="oracle-tab flex flex-col items-center justify-between h-full"
          data-active={String(activeTab === 'videos')}
        >
          <div className="h-[2px] w-full rounded-xs" />
          <div className="flex gap-[6px] items-center px-m">
            {/* Video cam icon — from Figma export */}
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              className={activeTab === 'videos' ? 'text-brand' : 'text-text-secondary'}
            >
              <path
                d="M15.5 8.5L19.15 5.86C19.35 5.72 19.59 5.65 19.84 5.67C20.08 5.68 20.31 5.77 20.49 5.93C20.67 6.08 20.8 6.29 20.85 6.53C20.9 6.77 20.87 7.02 20.77 7.24L20.5 8V16L20.77 16.76C20.87 16.98 20.9 17.23 20.85 17.47C20.8 17.71 20.67 17.92 20.49 18.07C20.31 18.23 20.08 18.32 19.84 18.33C19.59 18.35 19.35 18.28 19.15 18.14L15.5 15.5V8.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="3"
                y="6"
                width="13"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span
              className={[
                'font-display text-s font-semibold leading-[1.5] whitespace-nowrap',
                activeTab === 'videos' ? 'text-brand' : 'text-text-secondary',
              ].join(' ')}
            >
              Videos
            </span>
          </div>
          <div
            className="h-[2px] w-full rounded-xs"
            style={{
              backgroundColor: activeTab === 'videos' ? 'var(--brand-hover)' : 'transparent',
            }}
          />
        </button>
      </div>
    </div>
  )
}
