/**
 * GameSelectorDropdown — Dropdown list for switching between games.
 * Opens below the game card in expanded mode.
 * Uses a portal to the right of the sidebar in collapsed mode (escapes overflow-hidden).
 *
 * @figmaComponent  Game Selector Dropdown
 * @figmaNode       172:32673
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=172-32673
 */

import { createPortal } from 'react-dom'
import { useEffect, useState, type RefObject } from 'react'
import { GameSelector } from './GameSelector'

interface Game {
  name: string
  genre: string
  imageUrl?: string
}

interface GameSelectorDropdownProps {
  games: Game[]
  collapsed?: boolean
  onSelect: (game: Game) => void
  onClose: () => void
  anchorRef?: RefObject<HTMLDivElement | null>
}

export function GameSelectorDropdown({
  games,
  collapsed = false,
  onSelect,
  anchorRef,
}: GameSelectorDropdownProps) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  useEffect(() => {
    if (!collapsed || !anchorRef?.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    setPos({
      top: rect.top,
      left: rect.right + 8,
    })
  }, [collapsed, anchorRef])

  const dropdown = (
    <div className="flex flex-col bg-bg-elements border border-border-subtle rounded-xl shadow-normal overflow-hidden">
      <div className="flex flex-col py-xxs">
        {games.map((game) => (
          <div key={game.name} className="px-xxs">
            <GameSelector
              name={game.name}
              genre={game.genre}
              imageUrl={game.imageUrl}
              variant="list"
              onClick={() => onSelect(game)}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (collapsed) {
    if (!pos) return null
    return createPortal(
      <div
        className="fixed z-50 animate-in"
        data-game-selector-dropdown
        style={{ top: pos.top, left: pos.left }}
      >
        {dropdown}
      </div>,
      document.body
    )
  }

  return (
    <div className="absolute z-50 animate-in left-s right-s top-full mt-xxs">
      {dropdown}
    </div>
  )
}
