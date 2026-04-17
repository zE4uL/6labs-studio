/**
 * HomePage — 6labs Studio main landing page.
 * Layout: animated Sidebar (280px↔60px) + scrollable content area.
 * Renders agent-specific views (Oracle, Radiologist) or the default Hero + Videos.
 * Radiologist flow: home → results (with optional flyout) → details page.
 *
 * @figmaComponent  HomePage - Sidebar Expanded
 * @figmaNode       6352:91332
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6352-91332
 *
 * Source: studio/src/pages/HomePage.tsx
 * Synced: 2026-04-06
 */

import { useState } from 'react'
import { Sidebar } from '../components/organisms/Sidebar'
import { HeroSection, type Agent } from '../components/organisms/HeroSection'
import { VideosContainer } from '../components/organisms/VideosContainer'
import { SuggestionCard } from '../components/molecules/SuggestionCard'
import { OracleAgentView } from '../components/organisms/OracleAgentView'
import { RadiologistAgentView } from '../components/organisms/RadiologistAgentView'
import { RadiologistResultsView } from '../components/organisms/RadiologistResultsView'
import { SessionDetailsPage } from '../components/organisms/SessionDetailsPage'
import { ContextUploadsView } from '../components/organisms/ContextUploadsView'
import { ContextConnectorsView, CONNECTORS } from '../components/organisms/ContextConnectorsView'
import { ConnectorDetailView } from '../components/organisms/ConnectorDetailView'
import { PageTopbar } from '../components/molecules/PageTopbar'
import type { SessionData } from '../lib/types/radiologist'
import type { HistoryItem } from '../components/organisms/Sidebar'
import { BaristaSidePanel } from '../components/organisms/BaristaSidePanel'
import { BaristaSetupPage } from '../components/organisms/BaristaSetupPage'
import { BaristaTaskCreateDialog } from '../components/organisms/BaristaTaskCreateDialog'
import { BaristaTaskDetailPage } from '../components/organisms/BaristaTaskDetailPage'
import { useBarista } from '../state/BaristaContext'

type ActiveNav = 'home' | 'barista' | 'radiologist' | 'oracle' | 'forecaster' | 'coach' | 'guardian' | 'uploads' | 'connectors'
type RadiologistView = 'home' | 'results' | 'details'

const ORACLE_SUGGESTIONS = [
  'Show the top five most intense close-range fights.',
  "Summarize the player's rotations: drop spot, key moves, final zone path.",
  'List all loot and upgrade moments and gloo wall usage.',
  'Where did the player lose the most HP, and what caused it?',
]

export function HomePage() {
  const barista = useBarista()
  const [activeNav, setActiveNav] = useState<ActiveNav>('home')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [language, setLanguage] = useState('EN')
  const [heroAgent, setHeroAgent] = useState<Agent>('radiologist')
  const [selectedConnectorId, setSelectedConnectorId] = useState<string | null>(null)

  // ── Oracle history state ──
  const [oracleHistory, setOracleHistory] = useState<HistoryItem[]>([])
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null)

  const handleOracleQuerySubmit = (id: string, query: string) => {
    const newItem: HistoryItem = { id, query, state: 'loading' }
    setOracleHistory((prev) => [newItem, ...prev])
  }

  const handleOracleQueryComplete = (id: string) => {
    setOracleHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, state: 'complete' } : item,
      ),
    )
    setActiveHistoryId(id)

    // Clear the check mark after 3 seconds — it's a transient indicator
    setTimeout(() => {
      setOracleHistory((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, state: 'default' } : item,
        ),
      )
    }, 3000)
  }

  // ── Radiologist flow state ──
  const [radiologistView, setRadiologistView] = useState<RadiologistView>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null)
  const [flyoutOpen, setFlyoutOpen] = useState(false)

  const enterRadiologistResults = (query: string) => {
    setActiveNav('radiologist')
    setRadiologistView('results')
    setSearchQuery(query)
    setFlyoutOpen(false)
    setSelectedSession(null)
  }

  const resetRadiologistState = () => {
    setRadiologistView('home')
    setSearchQuery('')
    setSelectedSession(null)
    setFlyoutOpen(false)
  }

  const renderContent = () => {
    switch (activeNav) {
      case 'oracle': {
        const runningTurn = [...barista.turns]
          .reverse()
          .find((t) => t.status === 'running')
        return (
          <OracleAgentView
            className="h-full"
            onQuerySubmit={handleOracleQuerySubmit}
            onQueryComplete={handleOracleQueryComplete}
            activeThreadId={activeHistoryId}
            externalQuery={runningTurn?.question ?? null}
            onExternalQueryComplete={(q) => barista.onOracleCompleted(q)}
          />
        )
      }

      case 'radiologist':
        // Nested radiologist flow
        switch (radiologistView) {
          case 'results':
            return (
              <RadiologistResultsView
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onQuerySubmit={() => {
                  // Re-submit with current query (refresh results)
                }}
                selectedSession={selectedSession}
                flyoutOpen={flyoutOpen}
                sidebarCollapsed={sidebarCollapsed}
                onCardClick={(session) => {
                  setSelectedSession(session)
                  setFlyoutOpen(true)
                }}
                onFlyoutClose={() => {
                  setFlyoutOpen(false)
                  setSelectedSession(null)
                }}
                onViewDetail={() => {
                  setRadiologistView('details')
                }}
              />
            )

          case 'details':
            return selectedSession ? (
              <SessionDetailsPage
                session={selectedSession}
                onBack={() => setRadiologistView('results')}
              />
            ) : null

          default:
            return (
              <div className="flex flex-col items-center px-l pt-[120px] pb-[64px] w-full">
                <RadiologistAgentView
                  className="w-full"
                  onSubmit={(query) => enterRadiologistResults(query)}
                />
              </div>
            )
        }

      case 'uploads':
        return (
          <div className="flex flex-col items-center px-[180px] pt-[120px] pb-[64px]">
            <ContextUploadsView />
          </div>
        )

      case 'connectors': {
        const selectedConnector = selectedConnectorId
          ? CONNECTORS.find((c) => c.id === selectedConnectorId)
          : null
        if (selectedConnector) {
          return (
            <div className="min-h-full" style={{ backgroundColor: 'var(--bg-page)' }}>
              <PageTopbar title="Connectors" onBack={() => setSelectedConnectorId(null)} />
              <div className="px-[32px] pt-[32px] pb-[64px]">
                <ConnectorDetailView connector={selectedConnector} />
              </div>
            </div>
          )
        }
        return (
          <div className="flex flex-col items-center px-[180px] pt-[120px] pb-[64px]">
            <ContextConnectorsView onSelectConnector={setSelectedConnectorId} />
          </div>
        )
      }

      default:
        return (
          <div className="flex flex-col items-center px-l pt-[160px] pb-xxl3">
            <HeroSection
              className="w-full max-w-[800px]"
              activeAgent={heroAgent}
              onAgentChange={setHeroAgent}
              onSubmit={(query, agent) => {
                if (agent === 'radiologist') {
                  enterRadiologistResults(query)
                } else if (agent === 'oracle') {
                  setActiveNav('oracle')
                }
              }}
            />
            <div className="w-full mt-xxl4">
              {heroAgent === 'oracle' ? (
                <div className="flex flex-col gap-s items-center max-w-[800px] mx-auto">
                  <p className="font-display text-xs font-semibold text-base-500 text-center w-full leading-[1.5]">
                    Try our suggested prompts
                  </p>
                  <div className="grid grid-cols-2 grid-rows-[72px_72px] gap-s w-full">
                    {ORACLE_SUGGESTIONS.map((text) => (
                      <SuggestionCard
                        key={text}
                        text={text}
                        onClick={() => setActiveNav('oracle')}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <VideosContainer />
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex w-full h-full overflow-hidden bg-bg-page">

      {/* ── Sidebar (animated width) ── */}
      <div className="sticky top-0 h-screen shrink-0">
        <Sidebar
          collapsed={sidebarCollapsed}
          activeNav={activeNav}
          onNavChange={(nav) => {
            if (nav !== activeNav || nav !== 'radiologist') {
              resetRadiologistState()
            }
            // Pause Barista generation if user switches screens mid-turn
            if (nav !== activeNav) barista.notifyScreenSwitch()
            if (nav === 'barista') {
              // Barista opens its right panel against the Oracle center
              setActiveNav('oracle')
              setActiveHistoryId(null)
              if (barista.setupStatus === 'not-set-up') {
                barista.startSetup()
              } else {
                barista.openPanel()
              }
              return
            }
            setActiveNav(nav)
            setActiveHistoryId(null)
            if (nav !== 'connectors') setSelectedConnectorId(null)
          }}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          language={language}
          onLanguageChange={setLanguage}
          historyItems={oracleHistory.length > 0 ? oracleHistory : undefined}
          activeHistoryId={activeHistoryId}
          onHistoryClick={(id) => {
            setActiveHistoryId(id)
            setActiveNav('oracle')
          }}
        />
      </div>

      {/* ── Main content area — gradient pinned, content scrolls ── */}
      <main className="relative flex-1 min-w-0 h-full overflow-hidden transition-all duration-300 ease-in-out homepage-content-bg">
        {barista.setupStatus === 'in-setup' && (
          <div className="absolute inset-0 z-20 overflow-hidden">
            <BaristaSetupPage
              onCancel={() => barista.cancelSetup()}
              onConfirm={(persona) => {
                // Persona commit happens inside BaristaSetupPage's
                // "Start Barista" CTA (two-step commit) — we receive it here
                // once the user confirms on the summary screen.
                barista.confirmSetup(persona)
                barista.openPanel()
              }}
              onGoToBarista={() => {
                // Called right after onConfirm from the Start Barista CTA —
                // the overlay will unmount because setupStatus is now 'complete'.
                barista.openPanel()
              }}
              initialPersona={barista.persona ?? undefined}
            />
          </div>
        )}
        {/* Gradient layer — pinned to main's box, never scrolls */}
        {(activeNav === 'home' || (activeNav === 'radiologist' && radiologistView === 'home')) && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                'radial-gradient(1443px 356px at 51% 100%, rgba(123,76,255,0.10) 0%, rgba(123,76,255,0) 100%)',
                'radial-gradient(325px 460px at 0% 0%, rgba(23,112,239,0.16) 0%, rgba(23,112,239,0) 100%)',
                'radial-gradient(290px 179px at 80% 0%, rgba(123,76,255,0.10) 0%, rgba(123,76,255,0) 100%)',
              ].join(', '),
            }}
          />
        )}

        {/* Scrollable content */}
        <div className={[
          'relative z-10 h-full',
          // Results and details views manage their own scrolling
          activeNav === 'radiologist' && radiologistView !== 'home'
            ? 'overflow-hidden'
            : 'overflow-y-auto',
        ].join(' ')}>
          {renderContent()}
        </div>
      </main>

      {/* ── Barista right rail — active only on Oracle after setup ── */}
      {barista.panelOpen && barista.setupStatus === 'complete' && activeNav === 'oracle' && (
        <div className="sticky top-0 h-screen shrink-0">
          <BaristaSidePanel
            state={barista.panelState}
            activeTab={barista.activeTab}
            onTabChange={barista.setActiveTab}
            tasks={barista.tasks}
            onCreateTask={(prefill) => barista.openTaskDialog(prefill)}
            onOpenTask={(id) => barista.openTask(id)}
            onRunTask={(id) => barista.runTaskNow(id)}
            onEditTask={(id) => {
              const task = barista.tasks.find((t) => t.id === id)
              if (task)
                barista.openTaskDialog({ name: task.name, prompt: task.prompt }, false)
            }}
            onToggleTask={(id) => barista.toggleTaskEnabled(id)}
            autoMode={barista.autoMode}
            onAutoModeChange={barista.setAutoMode}
            personaSummary={
              barista.persona
                ? `You are assisting a ${barista.persona.department || 'team'} ${barista.persona.roles.join(' / ') || 'team member'} focused on ${barista.persona.focusAreas.join(', ').toLowerCase() || 'game insights'}.`
                : undefined
            }
            suggestedQuestion={barista.suggestedQuestion ?? undefined}
            turns={barista.turns}
            onStartBarista={() =>
              barista.setSuggestedQuestion(
                'What are the top frustration markers in the last week of Bermuda Battle Royale sessions?'
              )
            }
            onSendSuggested={(q) => barista.sendSuggested(q)}
            onEditSuggested={(q) => barista.setSuggestedQuestion(q)}
            onTryAnother={() =>
              barista.setSuggestedQuestion(
                'Which monetization touchpoints correlate with mid-match quits this cohort?'
              )
            }
            onStop={() => barista.pauseGeneration('manual')}
            onReset={() => barista.resetSession()}
            onClose={() => barista.closePanel()}
            onEditPersona={() => barista.startSetup()}
          />
        </div>
      )}

      {/* Task detail view — full-width overlay when a task is opened */}
      {barista.activeTaskId &&
        (() => {
          const task = barista.tasks.find((t) => t.id === barista.activeTaskId)
          if (!task) return null
          return (
            <div className="absolute inset-0 z-30">
              <BaristaTaskDetailPage
                task={task}
                onBack={() => barista.closeTask()}
                onRunNow={() => barista.runTaskNow(task.id)}
                onBranchInNewChat={(t) => {
                  // Prefill Oracle with the task's prompt + close task view.
                  barista.closeTask()
                  setActiveNav('oracle')
                  setActiveHistoryId(null)
                  setSearchQuery(t.prompt)
                }}
              />
            </div>
          )
        })()}

      {/* Task creation modal */}
      <BaristaTaskCreateDialog
        open={barista.taskDialog.open}
        postRun={barista.taskDialog.postRun}
        prefill={barista.taskDialog.prefill}
        onCancel={() => barista.closeTaskDialog()}
        onSaveAndSchedule={(data) => {
          barista.createTask(data)
          barista.closeTaskDialog()
        }}
        onRunOnce={(data) => {
          // Run once then show the schedule banner (opens Oracle with prompt).
          barista.closeTaskDialog()
          setActiveNav('oracle')
          setSearchQuery(data.prompt)
          // Leave the post-run re-open to the user via the schedule banner.
        }}
      />

    </div>
  )
}
