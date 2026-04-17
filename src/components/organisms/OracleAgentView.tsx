/**
 * OracleAgentView — Multi-state Oracle agent page.
 * States: idle (input + suggestions) → loading → result (chat + panels).
 *
 * Figma frames:
 *   - Oracle Page (idle): 6470:1522882
 *   - Oracle Result - Agent Page (result): 6470:1506015
 *   - Oracle Result - Loading (loading): 6470:1506095
 *   - Oracle Result - Agent Page - Sources Side Panel: 6470:1506197
 *
 * @figmaComponent  Oracle Page
 * @figmaPath       Other agents / Oracle Page
 * @figmaNode       6418:100887
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6418-100887
 *
 * Source: 6labs/studio → src/components/organisms/OracleAgentView.tsx
 * Synced: 2026-04-13
 */

import { useState, useCallback, useEffect, useRef } from 'react'
import { AgentPageHeader } from '../molecules/AgentPageHeader'
import { SuggestionCard } from '../molecules/SuggestionCard'
import { OracleIcon } from '../icons/OracleIcon'
import InputFieldConsole from '../ui/InputFieldConsole'
import { OracleChatView, type ChatMessage } from './OracleChatView'
import { SourcesSidePanel } from './SourcesSidePanel'
import { SessionSidePanel } from './SessionSidePanel'
import { ShareFeedbackDialog } from '../molecules/ShareFeedbackDialog'
import { FeedbackSubmittedDialog } from '../molecules/FeedbackSubmittedDialog'
import { OracleTopbar, type OracleTab } from '../molecules/OracleTopbar'
import { VideoCard } from '../molecules/VideoCard'
import type { OracleViewState } from '../../lib/types/oracle'
import type { SessionData } from '../../lib/types/radiologist'

const ORACLE_GRADIENT =
  'radial-gradient(circle at 60% 55%, #05C290 0%, #0E99BF 50%, #1770EF 100%)'

const SUGGESTIONS = [
  'Show the top five most intense close-range fights.',
  "Summarize the player's rotations: drop spot, key moves, final zone path.",
  'List all loot and upgrade moments and gloo wall usage.',
  'Where did the player lose the most HP, and what caused it?',
]

const MOCK_VIDEO_SESSIONS = [
  { id: 'v1', title: 'Tutorial Run — P847', date: 'Apr 10, 2026', duration: '4:05', description: 'First-time tutorial attempt. Failed grenade section 3 times.', tags: ['Tutorial', 'Grenade'] },
  { id: 'v2', title: 'Tutorial Run — P1203', date: 'Apr 10, 2026', duration: '3:22', description: 'Completed tutorial but skipped ADS training entirely.', tags: ['Tutorial', 'ADS'] },
  { id: 'v3', title: 'Tutorial Run — P562', date: 'Apr 9, 2026', duration: '5:10', description: 'Abandoned at inventory management step after 40+ seconds.', tags: ['Tutorial', 'Inventory'] },
  { id: 'v4', title: 'Ranked Match — P847', date: 'Apr 9, 2026', duration: '12:34', description: 'Competitive ranked match with strategic gameplay.', tags: ['Ranked', 'Combat'] },
  { id: 'v5', title: 'Tutorial Run — P998', date: 'Apr 9, 2026', duration: '3:45', description: 'Vehicle crash on first attempt. Recovered and completed.', tags: ['Tutorial', 'Vehicle'] },
  { id: 'v6', title: 'Squad Match — P1203', date: 'Apr 8, 2026', duration: '8:15', description: 'Strong team coordination observed throughout.', tags: ['Squad', 'Combat'] },
  { id: 'v7', title: 'Tutorial Run — P441', date: 'Apr 8, 2026', duration: '6:20', description: 'Used wrong healing item twice. Completed on third try.', tags: ['Tutorial', 'Healing'] },
  { id: 'v8', title: 'Battle Royale — P562', date: 'Apr 8, 2026', duration: '15:02', description: 'Solo BR with aggressive early-game rotations.', tags: ['BR', 'Solo'] },
  { id: 'v9', title: 'Tutorial Run — P773', date: 'Apr 7, 2026', duration: '4:50', description: 'Abandoned tutorial at grenade section. Did not return.', tags: ['Tutorial', 'Abandoned'] },
  { id: 'v10', title: 'Ranked Match — P998', date: 'Apr 7, 2026', duration: '11:45', description: 'Player focused on objective-based play with moderate combat.', tags: ['Ranked', 'Objective'] },
  { id: 'v11', title: 'Squad Match — P441', date: 'Apr 7, 2026', duration: '9:30', description: 'Good loot management but poor rotation timing.', tags: ['Squad', 'Rotation'] },
  { id: 'v12', title: 'Tutorial Run — P1589', date: 'Apr 6, 2026', duration: '3:10', description: 'Fastest tutorial completion in dataset. Skipped optional steps.', tags: ['Tutorial', 'Fast'] },
  { id: 'v13', title: 'Battle Royale — P847', date: 'Apr 6, 2026', duration: '14:22', description: 'Third place finish. Strong mid-game performance.', tags: ['BR', 'Top 3'] },
  { id: 'v14', title: 'Ranked Match — P773', date: 'Apr 6, 2026', duration: '10:08', description: 'First real match after abandoned tutorial. Struggled with ADS.', tags: ['Ranked', 'ADS'] },
  { id: 'v15', title: 'Tutorial Run — P2001', date: 'Apr 5, 2026', duration: '7:40', description: 'Completed all optional sections. Slowest but most thorough.', tags: ['Tutorial', 'Complete'] },
  { id: 'v16', title: 'Squad Match — P562', date: 'Apr 5, 2026', duration: '13:15', description: 'Four-player squad. Player took support role throughout.', tags: ['Squad', 'Support'] },
  { id: 'v17', title: 'Battle Royale — P1203', date: 'Apr 5, 2026', duration: '11:00', description: 'Aggressive early drop. Eliminated in first 2 minutes.', tags: ['BR', 'Early Drop'] },
  { id: 'v18', title: 'Ranked Match — P441', date: 'Apr 4, 2026', duration: '9:55', description: 'Consistent zone positioning. Second place finish.', tags: ['Ranked', 'Zone'] },
]

interface OracleAgentViewProps {
  className?: string
  /** Called when a new query is submitted — adds to sidebar history */
  onQuerySubmit?: (id: string, query: string) => void
  /** Called when AI response completes — marks history item as complete */
  onQueryComplete?: (id: string) => void
  /** When set, loads this thread's conversation */
  activeThreadId?: string | null
  /**
   * Drive the Oracle query from outside the view (e.g. Barista sending a
   * suggested question). Whenever this value changes to a non-empty string
   * different from the last one we processed, Oracle will auto-submit it.
   */
  externalQuery?: string | null
  /** Fires once Oracle's response simulation finishes for an external query. */
  onExternalQueryComplete?: (query: string) => void
}

export function OracleAgentView({
  className,
  onQuerySubmit,
  onQueryComplete,
  activeThreadId,
  externalQuery,
  onExternalQueryComplete,
}: OracleAgentViewProps) {
  const [viewState, setViewState] = useState<OracleViewState>('idle')
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  /** All threads stored by ID */
  const [threads, setThreads] = useState<Record<string, ChatMessage[]>>({})
  /** ID of the current thread's history entry — null means next submit creates a new one */
  const [threadHistoryId, setThreadHistoryId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<OracleTab>('agent')

  // Save current thread to store when messages change
  useEffect(() => {
    if (threadHistoryId && messages.length > 0) {
      setThreads((prev) => ({ ...prev, [threadHistoryId]: messages }))
    }
  }, [messages, threadHistoryId])

  // Load thread when activeThreadId changes from parent —
  // skip if we're already on that thread (avoids overwriting in-flight responses)
  useEffect(() => {
    if (!activeThreadId || activeThreadId === threadHistoryId) return
    const stored = threads[activeThreadId]
    if (stored) {
      setMessages(stored)
      setThreadHistoryId(activeThreadId)
      setViewState('result')
      setActiveTab('agent')
    }
  }, [activeThreadId])
  const [sourcesPanelOpen, setSourcesPanelOpen] = useState(false)
  const [sessionPanelOpen, setSessionPanelOpen] = useState(false)
  const [activeSession, setActiveSession] = useState<SessionData | null>(null)
  const [sourceSessions] = useState<SessionData[]>([])
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
  const [feedbackSubmittedOpen, setFeedbackSubmittedOpen] = useState(false)

  const submitInternal = useCallback((text: string, externalSource?: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: text,
    }

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      type: 'ai',
      isLoading: true,
      response: {
        id: `resp-${Date.now()}`,
        sources: [],
        contentHtml: '',
        creditsUsed: 0,
        relatedPrompts: [],
      },
    }

    const isFirstMessage = threadHistoryId === null
    const historyId = isFirstMessage ? userMsg.id : threadHistoryId

    setMessages((prev) => [...prev, userMsg, aiMsg])
    setViewState('loading')
    setQuery('')

    // Only create a new history entry for the first message in a thread
    if (isFirstMessage) {
      setThreadHistoryId(historyId)
      onQuerySubmit?.(historyId, text)
    }

    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsg.id
            ? {
                ...m,
                isLoading: false,
                response: {
                  id: aiMsg.response!.id,
                  sources: [
                    { id: 's1', duration: '4:05', title: 'Tutorial Run — Player 847' },
                    { id: 's2', duration: '3:22', title: 'Tutorial Run — Player 1203' },
                    { id: 's3', duration: '5:10', title: 'Tutorial Run — Player 562' },
                  ],
                  contentHtml: `
                    <p>5 Major Friction Points Identified (Tutorial completion rate: 67%)</p>
                    <p><strong>Biggest Problem: Grenade Throwing</strong></p>
                    <ul>
                      <li>73% fail on first attempt, average 3.2 tries to complete</li>
                      <li>23% abandon tutorial here (largest drop-off point)</li>
                      <li>Issue: Trajectory line barely visible, unclear success zone, instruction appears for only 2 seconds</li>
                    </ul>
                    <p><strong>Inventory Management</strong></p>
                    <ul>
                      <li>51% take 40+ seconds to equip weapon (should be ~10 sec)</li>
                      <li>Issue: Players don't understand tap vs drag, weapon slots unclear</li>
                    </ul>
                    <p><strong>Aiming</strong></p>
                    <ul>
                      <li>47% fire from hip instead of using ADS</li>
                      <li>Issue: Button highlighted but players focused elsewhere, can progress without using it</li>
                    </ul>
                    <p><strong>Vehicle Controls</strong></p>
                    <ul>
                      <li>34% crash immediately, 29% drive wrong direction</li>
                      <li>Issue: Control scheme changes but no notification, button positions conflict with muscle memory</li>
                    </ul>
                    <p><strong>Healing Items</strong></p>
                    <ul>
                      <li>28% open wrong menu, 15% use wrong item</li>
                      <li>Issue: Multiple heal UIs confusing, animation interruption not explained</li>
                    </ul>
                    <p><strong>Bottom Line:</strong> Grenade section causes 23% abandonment. Fix this first — clearer visuals, longer instructions, better feedback.</p>
                  `,
                  creditsUsed: 20,
                  relatedPrompts: [
                    'How many players who completed tutorials still struggle with these mechanics in their first real match?',
                    'Show me players who abandoned tutorials but succeeded in real matches — how did they learn?',
                    'Find me top 3 videos where users failed to complete tutorials terribly',
                  ],
                },
              }
            : m,
        ),
      )
      setViewState('result')
      onQueryComplete?.(historyId)
      if (externalSource) onExternalQueryComplete?.(externalSource)
    }, 9000)
  }, [threadHistoryId, onQuerySubmit, onQueryComplete, onExternalQueryComplete])

  const handleSubmit = useCallback(() => {
    submitInternal(query)
  }, [query, submitInternal])

  // Watch for externally-driven queries (e.g. Barista). Only submit each
  // new value once.
  const submittedExternalRef = useRef<string | null>(null)
  useEffect(() => {
    if (externalQuery && externalQuery !== submittedExternalRef.current) {
      submittedExternalRef.current = externalQuery
      submitInternal(externalQuery, externalQuery)
    }
  }, [externalQuery, submitInternal])

  const handleSuggestionClick = useCallback((text: string) => {
    setQuery(text)
  }, [])

  const handleExpandSources = useCallback((_responseId: string) => {
    setSourcesPanelOpen(true)
    setSessionPanelOpen(false)
  }, [])

  const handleSourceClick = useCallback((session: SessionData) => {
    setActiveSession(session)
    setSourcesPanelOpen(false)
    setSessionPanelOpen(true)
  }, [])

  const handleDislike = useCallback((_responseId: string) => {
    setFeedbackDialogOpen(true)
  }, [])

  const handleFeedbackSubmit = useCallback((_data: { tags: string[]; message: string }) => {
    setFeedbackDialogOpen(false)
    setFeedbackSubmittedOpen(true)
  }, [])

  const handleClosePanels = useCallback(() => {
    setSourcesPanelOpen(false)
    setSessionPanelOpen(false)
    setActiveSession(null)
  }, [])

  // ─── Idle state: header + input + suggestions ───
  if (viewState === 'idle') {
    return (
      <div
        className={[
          'flex flex-col items-center px-[180px] pt-[120px] pb-[64px] w-full',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex flex-col gap-xxxl items-start oracle-chat-content">
        <AgentPageHeader
          title="Oracle"
          description="Ask complex questions about player behavior across sessions and cohorts"
          iconGradient={ORACLE_GRADIENT}
          icon={<OracleIcon size={40} />}
        />

        <InputFieldConsole
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          placeholder="Type in a prompt or select a suggested prompt. e.g., Summarize the video and provide timecode"
        />

        <div className="flex flex-col gap-s items-start w-full">
          <p className="font-display text-xs font-semibold text-base-500 text-center w-full leading-[1.5]">
            Try our suggested prompts
          </p>
          <div className="grid grid-cols-2 grid-rows-[72px_72px] gap-s w-full">
            {SUGGESTIONS.map((text) => (
              <SuggestionCard
                key={text}
                text={text}
                onClick={handleSuggestionClick}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    )
  }

  // ─── Loading / Result state: [topbar + content] | side panel ───
  // Side panel spans full height; topbar is inside the content column only.
  return (
    <div className={['flex h-full w-full', className].filter(Boolean).join(' ')}>
      {/* Left: topbar + tab content */}
      <div className="flex-1 min-w-0 flex flex-col h-full">
        {/* Page Topbar with Agent / Videos tabs */}
        <OracleTopbar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab content */}
        <div className="flex-1 min-h-0">
          {activeTab === 'agent' ? (
            <OracleChatView
              messages={messages}
              inputValue={query}
              onInputChange={setQuery}
              onSubmit={handleSubmit}
              onExpandSources={handleExpandSources}
              onSuggestionClick={handleSuggestionClick}
              onDislike={handleDislike}
              className="h-full"
            />
          ) : (
            /* Videos tab — grid of all video results */
            <div className="h-full overflow-y-auto flyout-scrollbar">
              <div className="px-l pt-l pb-xxl">
                <h2 className="font-display text-m font-semibold leading-[1.5] text-text-primary mb-m">
                  All Video Results
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-m">
                  {MOCK_VIDEO_SESSIONS.map((v) => (
                    <VideoCard
                      key={v.id}
                      sessionId={v.title}
                      date={v.date}
                      duration={v.duration}
                      description={v.description}
                      tags={v.tags}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: side panels — full height, beside topbar+content column */}
      {sourcesPanelOpen && (
        <SourcesSidePanel
          sources={sourceSessions}
          onClose={handleClosePanels}
          onSourceClick={handleSourceClick}
        />
      )}
      {sessionPanelOpen && activeSession && (
        <SessionSidePanel
          session={activeSession}
          onClose={handleClosePanels}
          onViewDetail={() => {}}
        />
      )}

      {/* Feedback dialogs (portals — outside layout flow) */}
      <ShareFeedbackDialog
        isOpen={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
      <FeedbackSubmittedDialog
        isOpen={feedbackSubmittedOpen}
        onClose={() => setFeedbackSubmittedOpen(false)}
      />
    </div>
  )
}
