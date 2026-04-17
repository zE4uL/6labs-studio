import { SuggestionCard } from './SuggestionCard'

export function SuggestionCardDemo() {
  return (
    <div className="grid grid-cols-2 grid-rows-[72px_72px] gap-s w-full max-w-[700px]">
      <SuggestionCard text="Show the top five most intense close-range fights." />
      <SuggestionCard text="Summarize the player's rotations: drop spot, key moves, final zone path." />
      <SuggestionCard text="List all loot and upgrade moments and gloo wall usage." />
      <SuggestionCard text="Where did the player lose the most HP, and what caused it?" />
    </div>
  )
}
