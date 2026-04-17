/**
 * AIResponseOracle — Full AI response block for Oracle chat.
 * Anatomy:
 *   Response Container (white bg, rounded-3xl, border-subtle)
 *     ├── Response section (p-l, border-bottom)
 *     │   ├── SourcesGrid (collapsible, opens side panel)
 *     │   ├── Description (rich text / markdown content)
 *     │   └── ActionFeedbackBar (copy, credits, like/dislike)
 *     └── Related Container (p-l)
 *         └── 3× SuggestionCard
 *
 * @figmaComponent  AI response - Oracle
 * @figmaNode       6470:1506026
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6470-1506026
 */

import { useState } from 'react'
import { SourcesGrid, type SourceItem } from '../molecules/SourcesGrid'
import { ActionFeedbackBar } from '../molecules/ActionFeedbackBar'
import { SuggestionCard } from '../molecules/SuggestionCard'
import { ThinkingOracle } from '../atoms/ThinkingOracle'

type FeedbackValue = 'like' | 'dislike' | null

export interface OracleResponseData {
  id: string
  sources: SourceItem[]
  /** HTML string for rich-text response content */
  contentHtml: string
  creditsUsed: number
  relatedPrompts: string[]
}

interface AIResponseOracleProps {
  response: OracleResponseData
  /** Whether the response is still loading (shows shimmer) */
  isLoading?: boolean
  onExpandSources: () => void
  onSuggestionClick: (text: string) => void
  onDislike: () => void
  className?: string
}

export function AIResponseOracle({
  response,
  isLoading,
  onExpandSources,
  onSuggestionClick,
  onDislike,
  className,
}: AIResponseOracleProps) {
  const [feedbackValue, setFeedbackValue] = useState<FeedbackValue>(null)

  const handleFeedbackChange = (value: FeedbackValue) => {
    setFeedbackValue(value)
    if (value === 'dislike') {
      onDislike()
    }
  }

  const handleCopy = () => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = response.contentHtml
    const text = tempDiv.textContent || tempDiv.innerText || ''
    navigator.clipboard.writeText(text)
  }

  if (isLoading) {
    return (
      <div className={['w-full', className].filter(Boolean).join(' ')}>
        <ThinkingOracle />
      </div>
    )
  }

  return (
    <div
      className={['flex flex-col gap-[10px] items-start pb-l w-full', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className="flex flex-col items-start overflow-hidden rounded-3xl w-full bg-bg-elements"
        style={{ border: '1px solid var(--border-subtle)' }}
      >
        {/* Response section — sources + description + actions */}
        <div
          className="flex flex-col gap-m items-start p-l w-full"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          {/* Sources grid */}
          {response.sources.length > 0 && (
            <SourcesGrid
              sources={response.sources}
              onExpandSources={onExpandSources}
            />
          )}

          {/* Response text content */}
          <div
            className="font-body text-s font-normal leading-[1.5] text-text-secondary w-full oracle-response-content"
            dangerouslySetInnerHTML={{ __html: response.contentHtml }}
          />

          {/* Action bar */}
          <ActionFeedbackBar
            creditsText={`${response.creditsUsed} Credits Used`}
            feedbackValue={feedbackValue}
            onFeedbackChange={handleFeedbackChange}
            onCopy={handleCopy}
          />
        </div>

        {/* Related prompts section */}
        {response.relatedPrompts.length > 0 && (
          <div className="flex flex-col items-start overflow-hidden p-l w-full">
            <div className="flex flex-col gap-s items-start w-full">
              <span className="font-display text-m font-semibold leading-[1.5] text-text-primary">
                Related
              </span>
              {response.relatedPrompts.map((prompt) => (
                <SuggestionCard
                  key={prompt}
                  text={prompt}
                  onClick={onSuggestionClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
