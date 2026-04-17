/**
 * UserPrompt — Chat message bubble from the user.
 * Displays as a right-aligned pill with base-50 background.
 *
 * @figmaComponent  User Prompt
 * @figmaNode       6470:1506025
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6470-1506025
 */

interface UserPromptProps {
  text: string
  className?: string
}

export function UserPrompt({ text, className }: UserPromptProps) {
  return (
    <div
      className={['flex items-center justify-end w-full', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="bg-bg-subtle rounded-2xl p-s">
        <p className="font-body text-s font-normal leading-[1.5] text-base-700">
          {text}
        </p>
      </div>
    </div>
  )
}
