/**
 * GameplayStatsCard — Row of 3 stat cards with colored borders/backgrounds.
 * Figma: flex row, gap-[12px]. Each card: colored border + tint bg, icon + value (20px) + label (10px).
 * Eliminations=success, Deaths=error, Placement=success(Winner).
 *
 * @figmaComponent  Gameplay Statistics
 * @figmaNode       366:21404
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=366-21404
 */

import { StatCard } from '../atoms/StatCard'
import { GameplayStatsIcon as GameplayStatsSectionIcon } from '../icons/section'
import type { GameplayStats } from '../../lib/types/radiologist'

/** 20px crosshair icon for Eliminations (matches Figma Event Icons - FF) */
function CrosshairIcon20() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10 2v3M10 15v3M2 10h3M15 10h3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

/** 20px skull icon for Deaths */
function SkullIcon20() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="9" r="6" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor" />
      <circle cx="12.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="M8 17v-4M10 17v-4M12 17v-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

/** 20px trophy icon for Placement */
function TrophyIcon20() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7 3h6v5a3 3 0 01-6 0V3z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 5H5a1.5 1.5 0 00-1.5 1.5v.5A2.5 2.5 0 006 9.5H7M13 5h2a1.5 1.5 0 011.5 1.5v.5A2.5 2.5 0 0114 9.5h-1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M8 14h4M10 10v4M7 17h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

interface GameplayStatsCardProps {
  stats: GameplayStats
  className?: string
}

export function GameplayStatsCard({ stats, className }: GameplayStatsCardProps) {
  return (
    <div
      className={['flex flex-col gap-s', className].filter(Boolean).join(' ')}
      style={{ paddingLeft: 'var(--space-m)', paddingRight: 'var(--space-xxl)', paddingTop: 'var(--space-l)' }}
    >
      {/* Section title — Figma: Gameplay Widget icon (yellow gamepad) + 16px Bricolage Semibold, base-700 */}
      <div className="flex items-center gap-xs">
        <GameplayStatsSectionIcon size={16} className="shrink-0" />
        <h3
          className="font-display font-semibold leading-[1.5] whitespace-nowrap"
          style={{ fontSize: '16px', color: '#353D57' }}
        >
          Gameplay Statistics
        </h3>
      </div>

      {/* Stats row — flex, gap-12, matching Figma */}
      <div className="flex gap-s">
        <StatCard
          label="Eliminations"
          value={stats.eliminations}
          variant="success"
          icon={<CrosshairIcon20 />}
        />
        <StatCard
          label="Deaths"
          value={stats.deaths}
          variant="error"
          icon={<SkullIcon20 />}
        />
        <StatCard
          label="Placement"
          value={stats.placement}
          variant="success"
          icon={<TrophyIcon20 />}
        />
      </div>
    </div>
  )
}
