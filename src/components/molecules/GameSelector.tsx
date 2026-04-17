/**
 * GameSelector — Game context card used in the sidebar.
 * Variants:
 *   - default: border + arrow indicator (active game in sidebar)
 *   - list: dropdown item (plain, tint bg on hover = Figma Variant4)
 *
 * @figmaComponent  Thumb & Info Expanded
 * @figmaNode       172:32685
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=172-32685
 */

import { SidebarLabel } from '../atoms/SidebarLabel'
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon'

type GameSelectorVariant = 'default' | 'list'

interface GameSelectorProps {
  name: string
  genre: string
  imageUrl?: string
  variant?: GameSelectorVariant
  onClick?: () => void
  className?: string
}

export function GameSelector({
  name,
  genre,
  imageUrl,
  variant = 'default',
  onClick,
  className,
}: GameSelectorProps) {
  return (
    <div
      className={[
        'flex gap-xs items-start p-xs rounded-xl w-full',
        variant === 'default' ? 'bg-bg-elements' : '',
        variant === 'list' ? 'cursor-pointer game-list-hover transition-colors' : '',
        onClick ? 'cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={variant === 'default' ? { border: '1px solid var(--border-tint)' } : undefined}
      onClick={onClick}
    >
      {/* Game Icon — 40×40, rounded-[4px] */}
      <div className="relative shrink-0 w-[40px] h-[40px]">
        <div className="absolute inset-0 rounded-[4px] overflow-hidden">
          {imageUrl ? (
            <>
              <div className="absolute inset-0 bg-[#1f1637] rounded-[4px]" />
              <img
                src={imageUrl}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover rounded-[4px]"
              />
            </>
          ) : (
            <div className="absolute inset-0 rounded-[4px] bg-gradient-to-br from-brand to-purple flex items-center justify-center">
              <span className="font-display font-semibold text-xs text-white leading-none">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Game Info */}
      <div className="flex flex-1 flex-col gap-[2px] items-start min-w-0">
        <p className="font-display text-s font-semibold text-text-primary leading-[1.5] truncate w-full">
          {name}
        </p>
        <SidebarLabel label={genre} variant="default" />
      </div>

      {/* Arrow — filled solid triangle, only in default variant */}
      {variant === 'default' && (
        <div className="shrink-0 flex items-center self-center">
          <DropdownArrowIcon size={16} className="text-text-brand" />
        </div>
      )}
    </div>
  )
}
