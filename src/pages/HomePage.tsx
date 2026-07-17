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

import { useEffect, useState } from 'react'
import { Sidebar } from '../components/organisms/Sidebar'
import { HeroSection, type Agent } from '../components/organisms/HeroSection'
import { VideosContainer } from '../components/organisms/VideosContainer'
import { SuggestionCard } from '../components/molecules/SuggestionCard'
import { OracleAgentView } from '../components/organisms/OracleAgentView'
import { RadiologistAgentView } from '../components/organisms/RadiologistAgentView'
import { RadiologistResultsView } from '../components/organisms/RadiologistResultsView'
import { SessionDetailsPage } from '../components/organisms/SessionDetailsPage'
import { ContextUploadsView } from '../components/organisms/ContextUploadsView'
import { SpecializedAgentsView } from '../components/organisms/SpecializedAgentsView'
import { VideoLibraryView } from '../components/organisms/VideoLibraryView'
import { getLibraryTagOptions, filterLibraryByTags } from '../lib/librarySessions'
import { ContextConnectorsView, CONNECTORS } from '../components/organisms/ContextConnectorsView'
import { ConnectorDetailView } from '../components/organisms/ConnectorDetailView'
import {
  BigQueryOnboardingModal,
  type BigQueryOnboardingState,
} from '../components/organisms/BigQueryOnboardingModal'
import { BigQueryDetailView } from '../components/organisms/BigQueryDetailView'
import {
  SnowflakeOnboardingModal,
  type SnowflakeOnboardingState,
} from '../components/organisms/SnowflakeOnboardingModal'
import { SnowflakeDetailView } from '../components/organisms/SnowflakeDetailView'
import {
  disconnectBigQuery,
  getMockBigQueryConnection,
  markBigQueryConnected,
  markBigQuerySyncComplete,
  onConnectorOnboardingRequest,
  useBigQueryConnection,
  disconnectSnowflake,
  getMockSnowflakeConnection,
  markSnowflakeConnected,
  markSnowflakeSyncComplete,
  useSnowflakeConnection,
  type SnowflakeConnectionDetails,
} from '../lib/state/connectorsStore'
import { PageTopbar } from '../components/molecules/PageTopbar'
import { PopupModal } from '../components/molecules/PopupModal'
import type { SessionData } from '../lib/types/radiologist'
import type { HistoryItem } from '../components/organisms/Sidebar'
import { BaristaSidePanel } from '../components/organisms/BaristaSidePanel'
import { BaristaSetupPage } from '../components/organisms/BaristaSetupPage'
import { BaristaTaskCreateDialog } from '../components/organisms/BaristaTaskCreateDialog'
import { BaristaTaskDetailPage } from '../components/organisms/BaristaTaskDetailPage'
import { BaristaPage } from '../components/organisms/BaristaPage'
import { useBarista } from '../state/BaristaContext'

type ActiveNav = 'home' | 'barista' | 'library' | 'radiologist' | 'oracle' | 'forecaster' | 'coach' | 'guardian' | 'specialized' | 'uploads' | 'connectors'
type RadiologistView = 'home' | 'results' | 'details'

// ── URL-hash navigation (deep-link + reload support) ───────────────────────────
// The app is hash-routed (App.tsx owns `#/design-system`); everything else is a
// HomePage view. We mirror the primary view in the hash so links change the URL
// and a reload restores the same screen instead of dropping back to Home.
const HASH_NAVS: ActiveNav[] = [
  'home', 'library', 'radiologist', 'oracle', 'forecaster', 'specialized', 'uploads', 'connectors',
]

function parseNavHash(): { nav: ActiveNav; agentId: string | null } {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const [seg, sub] = raw.split('/')
  if (seg === 'specialized') return { nav: 'specialized', agentId: sub || null }
  if ((HASH_NAVS as string[]).includes(seg)) return { nav: seg as ActiveNav, agentId: null }
  return { nav: 'home', agentId: null }
}

function navToHash(nav: ActiveNav, agentId: string | null): string {
  if (nav === 'specialized') return agentId ? `#/specialized/${agentId}` : '#/specialized'
  if (nav === 'home') return '#/'
  return `#/${nav}`
}

const ORACLE_SUGGESTIONS = [
  'Show the top five most intense close-range fights.',
  "Summarize the player's rotations: drop spot, key moves, final zone path.",
  'List all loot and upgrade moments and gloo wall usage.',
  'Where did the player lose the most HP, and what caused it?',
]

// ─── BigQuery onboarding step driver ─────────────────────────────────────────
// Walks through the 4 stages with brief delays to give the UI a real-feeling
// pulse. In the prototype each stage just resolves on a timer — the real
// implementation would await network calls and surface their errors through
// `onError(stepIndex, message?)`.

const BQ_STEP_DELAYS_MS = [900, 700, 600, 1100] // connecting · testing · access · import

function runBigQueryOnboardingSteps({
  projectId,
  orgWideAccess: _orgWideAccess,
  onStep,
  onReviewComplete,
  onSuccess,
  onError,
}: {
  projectId: string
  orgWideAccess: boolean
  onStep: (stepIndex: number) => void
  onReviewComplete: (problemTableCount: number, totalTableCount: number) => void
  onSuccess: (summary: {
    projectId: string
    tableCount: number
    verdict: 'GREEN' | 'YELLOW' | 'RED'
    verdictReason: string
  }) => void
  onError: (stepIndex: number, errorMessage?: string) => void
}) {
  let stepIndex = 0
  const advance = () => {
    onStep(stepIndex)
    // Prototype-only "happy path" — fail at step 1 if the user typed a clearly
    // bogus project ID, so the error state is reachable without code edits.
    if (stepIndex === 1 && /not-?found|fake|test-error/i.test(projectId)) {
      onError(1)
      return
    }
    // Write-permission guard — 6labs requires a read-only key. If the key has
    // write/admin scope we reject the connection at the access-check step.
    if (stepIndex === 2 && /write|admin|editor|owner/i.test(projectId)) {
      onError(
        2,
        'This service account has write access to BigQuery. 6labs requires a read-only key (BigQuery Data Viewer). Re-export a read-only key and reconnect.',
      )
      return
    }
    if (stepIndex >= BQ_STEP_DELAYS_MS.length) {
      const mock = getMockBigQueryConnection()
      const problemTableCount = mock.tables.filter((t) => t.verdict !== 'GREEN').length
      // Surface the review summary inside the loader for a beat before the
      // success screen, so the user sees how many tables need attention.
      onReviewComplete(problemTableCount, mock.tables.length)
      window.setTimeout(() => {
        onSuccess({
          projectId,
          tableCount: mock.tables.length,
          verdict: mock.verdict,
          verdictReason: mock.verdictReason,
        })
      }, 1400)
      return
    }
    window.setTimeout(() => {
      stepIndex += 1
      advance()
    }, BQ_STEP_DELAYS_MS[stepIndex])
  }
  advance()
}

// ─── Snowflake onboarding step driver ────────────────────────────────────────
// Mirrors the BigQuery driver. Prototype-only error triggers keyed off the
// entered details so every failure state is reachable without code edits:
//  • account identifier contains "notfound"/"fake"     → account-not-found (step 1)
//  • username contains "write"/"admin"/"owner"/"editor" → write-access-rejected (step 2)
//  • username contains "nokey"/"badkey"                 → key-not-registered (step 0)
//  • username contains "denied"                         → permission-denied (step 2)

const SF_STEP_DELAYS_MS = [900, 700, 600, 1100] // auth · account · access · import

function runSnowflakeOnboardingSteps({
  details,
  onStep,
  onReviewComplete,
  onSuccess,
  onError,
}: {
  details: SnowflakeConnectionDetails
  onStep: (stepIndex: number) => void
  onReviewComplete: (problemTableCount: number, totalTableCount: number) => void
  onSuccess: (summary: {
    database: string
    tableCount: number
    verdict: 'GREEN' | 'YELLOW' | 'RED'
    verdictReason: string
  }) => void
  onError: (stepIndex: number, errorMessage?: string) => void
}) {
  let stepIndex = 0
  const advance = () => {
    onStep(stepIndex)
    if (stepIndex === 0 && /nokey|badkey/i.test(details.username)) {
      onError(0)
      return
    }
    if (stepIndex === 1 && /not-?found|fake|test-error/i.test(details.accountIdentifier)) {
      onError(1)
      return
    }
    if (stepIndex === 2 && /write|admin|editor|owner/i.test(details.username)) {
      onError(
        2,
        'This user can write to Snowflake. 6labs requires a read-only role (SELECT only). Re-grant a read-only role and re-register the key.',
      )
      return
    }
    if (stepIndex === 2 && /denied|noaccess/i.test(details.username)) {
      onError(2)
      return
    }
    if (stepIndex >= SF_STEP_DELAYS_MS.length) {
      const mock = getMockSnowflakeConnection()
      const problemTableCount = mock.tables.filter((t) => t.verdict !== 'GREEN').length
      onReviewComplete(problemTableCount, mock.tables.length)
      window.setTimeout(() => {
        onSuccess({
          database: details.database,
          tableCount: mock.tables.length,
          verdict: mock.verdict,
          verdictReason: mock.verdictReason,
        })
      }, 1400)
      return
    }
    window.setTimeout(() => {
      stepIndex += 1
      advance()
    }, SF_STEP_DELAYS_MS[stepIndex])
  }
  advance()
}

export function HomePage() {
  const barista = useBarista()
  const [activeNav, setActiveNav] = useState<ActiveNav>(() => parseNavHash().nav)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [language, setLanguage] = useState('EN')
  const [heroAgent, setHeroAgent] = useState<Agent>('radiologist')
  // Console source (sources popup) — 'library' switches the Radiologist gallery
  // to the videos available in the Library
  const [consoleSource, setConsoleSource] = useState('bluestacks')
  // Library tag scoping — narrows which library videos the agent references (OR match)
  const [libraryScopeTags, setLibraryScopeTags] = useState<string[]>([])
  // Only author-added upload tags are offered for scoping (AI tags are display-only)
  const libraryTagOptions = getLibraryTagOptions().filter((o) => o.group === 'upload')
  const gallerySessions =
    consoleSource === 'library' ? filterLibraryByTags(libraryScopeTags) : undefined
  const [selectedConnectorId, setSelectedConnectorId] = useState<string | null>(null)
  // Specialized Agents hub: null = card grid, set = that agent's chat flow.
  const [specializedAgentId, setSpecializedAgentId] = useState<string | null>(() => parseNavHash().agentId)

  // Mirror the primary view into the URL hash so the address bar tracks
  // navigation and reloads restore the current screen.
  useEffect(() => {
    if (window.location.hash.startsWith('#/design-system')) return
    const target = navToHash(activeNav, specializedAgentId)
    const cur = window.location.hash
    const curIsHome = cur === '' || cur === '#' || cur === '#/'
    if (cur === target || (target === '#/' && curIsHome)) return
    window.location.hash = target
  }, [activeNav, specializedAgentId])

  // React to deep links, manual hash edits, and browser back/forward.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash.startsWith('#/design-system')) return
      const { nav, agentId } = parseNavHash()
      setActiveNav((prev) => (prev === nav ? prev : nav))
      setSpecializedAgentId((prev) => (prev === agentId ? prev : agentId))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  // Unsaved-changes guard for the connector detail view.
  const [connectorDirty, setConnectorDirty] = useState(false)
  const [pendingExit, setPendingExit] = useState<(() => void) | null>(null)
  const [connectorResetSignal, setConnectorResetSignal] = useState(0)
  const requestConnectorExit = (action: () => void) => {
    if (connectorDirty) {
      setPendingExit(() => action)
    } else {
      action()
    }
  }
  const [bigQueryModalState, setBigQueryModalState] =
    useState<BigQueryOnboardingState | null>(null)
  const [bigQueryProjectId, setBigQueryProjectId] = useState<string>('')
  const [bigQueryProgress, setBigQueryProgress] = useState<{
    step: number
    errorAtStep?: number
    errorMessage?: string
    problemTableCount?: number
    totalTableCount?: number
  }>({ step: 0 })
  const [bigQuerySummary, setBigQuerySummary] = useState<{
    projectId: string
    tableCount: number
    verdict: 'GREEN' | 'YELLOW' | 'RED'
    verdictReason: string
  } | null>(null)
  const bigQueryConnection = useBigQueryConnection()

  // Snowflake onboarding modal state (prototype — fake network)
  const [snowflakeModalState, setSnowflakeModalState] =
    useState<SnowflakeOnboardingState | null>(null)
  const [snowflakeInitialStep, setSnowflakeInitialStep] = useState<1 | 2>(1)
  const [snowflakeDetails, setSnowflakeDetails] = useState<Partial<SnowflakeConnectionDetails>>({})
  const [snowflakeProgress, setSnowflakeProgress] = useState<{
    step: number
    errorAtStep?: number
    errorMessage?: string
    problemTableCount?: number
    totalTableCount?: number
  }>({ step: 0 })
  const [snowflakeSummary, setSnowflakeSummary] = useState<{
    database: string
    tableCount: number
    verdict: 'GREEN' | 'YELLOW' | 'RED'
    verdictReason: string
  } | null>(null)
  const snowflakeConnection = useSnowflakeConnection()

  // Listen for "Add connector" picks from the chat flyout. BigQuery opens the
  // dedicated modal in place; everything else navigates to the Connectors page
  // (and its detail view) so the user can read about the integration.
  useEffect(() => {
    return onConnectorOnboardingRequest((connectorId) => {
      if (connectorId === 'bigquery') {
        setBigQueryProjectId('')
        setBigQueryModalState('idle')
        return
      }
      if (connectorId === 'snowflake') {
        setSnowflakeDetails({})
        setSnowflakeInitialStep(1)
        setSnowflakeModalState('idle')
        return
      }
      setActiveNav('connectors')
      setSelectedConnectorId(connectorId)
    })
  }, [])

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
      case 'barista':
        return <BaristaPage />

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
                  selectedSource={consoleSource}
                  onSourceChange={setConsoleSource}
                  libraryTags={libraryTagOptions}
                  selectedLibraryTags={libraryScopeTags}
                  onLibraryTagsChange={setLibraryScopeTags}
                  sessions={gallerySessions}
                />
              </div>
            )
        }

      case 'specialized':
        return (
          <SpecializedAgentsView
            selectedAgentId={specializedAgentId}
            onSelectAgent={setSpecializedAgentId}
            onBack={() => setSpecializedAgentId(null)}
          />
        )

      case 'uploads':
        return (
          <div className="flex flex-col items-center px-[180px] pt-[120px] pb-[64px]">
            <ContextUploadsView />
          </div>
        )

      case 'library':
        return <VideoLibraryView />


      case 'connectors': {
        const selectedConnector = selectedConnectorId
          ? CONNECTORS.find((c) => c.id === selectedConnectorId)
          : null
        const openBigQueryModal = () => {
          setBigQueryProjectId(
            bigQueryConnection.kind !== 'not-connected'
              ? bigQueryConnection.projectId
              : '',
          )
          setBigQueryModalState('idle')
        }
        const handleBigQueryRefresh = () => {
          if (bigQueryConnection.kind !== 'connected') return
          markBigQueryConnected({
            projectId: bigQueryConnection.projectId,
            syncing: true,
          })
          window.setTimeout(() => markBigQuerySyncComplete(), 1500)
        }
        const openSnowflakeModal = (step: 1 | 2) => {
          const existing =
            snowflakeConnection.kind !== 'not-connected'
              ? {
                  accountIdentifier: snowflakeConnection.accountIdentifier,
                  username: snowflakeConnection.username,
                  warehouse: snowflakeConnection.warehouse,
                  database: snowflakeConnection.database,
                }
              : {}
          setSnowflakeDetails(existing)
          setSnowflakeInitialStep(step)
          setSnowflakeModalState('idle')
        }
        const handleSnowflakeRefresh = () => {
          if (snowflakeConnection.kind !== 'connected') return
          markSnowflakeConnected({
            accountIdentifier: snowflakeConnection.accountIdentifier,
            username: snowflakeConnection.username,
            warehouse: snowflakeConnection.warehouse,
            database: snowflakeConnection.database,
            syncing: true,
          })
          window.setTimeout(() => markSnowflakeSyncComplete(), 1500)
        }
        if (selectedConnector) {
          return (
            <div className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--bg-page)' }}>
              <PageTopbar
                title="Connectors"
                onBack={() => requestConnectorExit(() => setSelectedConnectorId(null))}
              />
              <div className="px-[32px] pt-[32px] pb-[80px] flex-1 flex flex-col">
                {selectedConnector.id === 'bigquery' ? (
                  <BigQueryDetailView
                    connector={selectedConnector}
                    connection={bigQueryConnection}
                    onConnect={openBigQueryModal}
                    onReconnect={openBigQueryModal}
                    onReuploadCredentials={openBigQueryModal}
                    onRefresh={handleBigQueryRefresh}
                    onRetry={handleBigQueryRefresh}
                    onDisconnect={disconnectBigQuery}
                    onDirtyChange={setConnectorDirty}
                    resetSignal={connectorResetSignal}
                  />
                ) : selectedConnector.id === 'snowflake' ? (
                  <SnowflakeDetailView
                    connector={selectedConnector}
                    connection={snowflakeConnection}
                    onConnect={() => openSnowflakeModal(1)}
                    onReconnect={() => openSnowflakeModal(2)}
                    onReregisterKey={() => openSnowflakeModal(1)}
                    onRefresh={handleSnowflakeRefresh}
                    onRetry={handleSnowflakeRefresh}
                    onDisconnect={disconnectSnowflake}
                    onDirtyChange={setConnectorDirty}
                    resetSignal={connectorResetSignal}
                  />
                ) : (
                  <ConnectorDetailView connector={selectedConnector} />
                )}
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
              selectedSource={consoleSource}
              onSourceChange={setConsoleSource}
              libraryTags={libraryTagOptions}
              selectedLibraryTags={libraryScopeTags}
              onLibraryTagsChange={setLibraryScopeTags}
              onSubmit={(query, agent) => {
                if (agent === 'radiologist') {
                  enterRadiologistResults(query)
                } else if (agent === 'oracle') {
                  setActiveNav('oracle')
                }
              }}
              onOpenSpecialized={() => {
                setSpecializedAgentId(null)
                setActiveNav('specialized')
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
                <VideosContainer sessions={gallerySessions} />
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
              setActiveNav('barista')
              setActiveHistoryId(null)
              if (barista.setupStatus === 'not-set-up') {
                barista.startSetup()
              }
              return
            }
            const applyNav = () => {
              setActiveNav(nav)
              setActiveHistoryId(null)
              if (nav !== 'connectors') setSelectedConnectorId(null)
              // Clicking the hub nav always returns to the agent grid.
              setSpecializedAgentId(null)
            }
            if (nav !== 'connectors') {
              requestConnectorExit(applyNav)
            } else {
              applyNav()
            }
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
        {(activeNav === 'home' || activeNav === 'library' || (activeNav === 'radiologist' && radiologistView === 'home') || (activeNav === 'specialized' && specializedAgentId === null)) && (
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
          // Views that manage their own scrolling
          (activeNav === 'radiologist' && radiologistView !== 'home') ||
          activeNav === 'barista' ||
          (activeNav === 'specialized' && specializedAgentId !== null) ||
          activeNav === 'library'
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

      {/* BigQuery onboarding modal (prototype — fake network) */}
      <BigQueryOnboardingModal
        isOpen={bigQueryModalState !== null}
        state={bigQueryModalState ?? 'idle'}
        projectId={bigQueryProjectId}
        progress={bigQueryProgress}
        summary={bigQuerySummary ?? undefined}
        onClose={() => {
          setBigQueryModalState(null)
          setBigQueryProgress({ step: 0 })
          setBigQuerySummary(null)
        }}
        onConnect={({ projectId, orgWideAccess }) => {
          setBigQueryProjectId(projectId)
          setBigQuerySummary(null)
          setBigQueryProgress({ step: 0 })
          setBigQueryModalState('progress')
          runBigQueryOnboardingSteps({
            projectId,
            orgWideAccess,
            onStep: (step) => setBigQueryProgress({ step }),
            onReviewComplete: (problemTableCount, totalTableCount) =>
              setBigQueryProgress({
                step: 4,
                problemTableCount,
                totalTableCount,
              }),
            onSuccess: (summary) => {
              markBigQueryConnected({ projectId, syncing: true, orgWideAccess })
              markBigQuerySyncComplete()
              setBigQuerySummary(summary)
              setBigQueryModalState('success')
            },
            onError: (errorAtStep, errorMessage) => {
              setBigQueryProgress({ step: errorAtStep, errorAtStep, errorMessage })
              setBigQueryModalState('failed')
            },
          })
        }}
        onRetry={() => {
          setBigQueryProgress({ step: 0 })
          setBigQueryModalState('idle')
        }}
        onDone={() => {
          setBigQueryModalState(null)
          setBigQueryProgress({ step: 0 })
          setBigQuerySummary(null)
        }}
      />

      {/* Snowflake onboarding modal (prototype — fake network) */}
      <SnowflakeOnboardingModal
        isOpen={snowflakeModalState !== null}
        state={snowflakeModalState ?? 'idle'}
        initialStep={snowflakeInitialStep}
        details={snowflakeDetails}
        progress={snowflakeProgress}
        summary={snowflakeSummary ?? undefined}
        onClose={() => {
          setSnowflakeModalState(null)
          setSnowflakeProgress({ step: 0 })
          setSnowflakeSummary(null)
        }}
        onConnect={(payload) => {
          const { orgWideAccess, ...details } = payload
          setSnowflakeDetails(details)
          setSnowflakeSummary(null)
          setSnowflakeProgress({ step: 0 })
          setSnowflakeModalState('progress')
          runSnowflakeOnboardingSteps({
            details,
            onStep: (step) => setSnowflakeProgress({ step }),
            onReviewComplete: (problemTableCount, totalTableCount) =>
              setSnowflakeProgress({ step: 4, problemTableCount, totalTableCount }),
            onSuccess: (summary) => {
              markSnowflakeConnected({ ...details, syncing: true, orgWideAccess })
              markSnowflakeSyncComplete()
              setSnowflakeSummary(summary)
              setSnowflakeModalState('success')
            },
            onError: (errorAtStep, errorMessage) => {
              setSnowflakeProgress({ step: errorAtStep, errorAtStep, errorMessage })
              setSnowflakeModalState('failed')
            },
          })
        }}
        onRetry={() => {
          setSnowflakeProgress({ step: 0 })
          setSnowflakeInitialStep(2)
          setSnowflakeModalState('idle')
        }}
        onDone={() => {
          setSnowflakeModalState(null)
          setSnowflakeProgress({ step: 0 })
          setSnowflakeSummary(null)
        }}
      />

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

      {/* Unsaved-changes warning when leaving the connector detail view */}
      <PopupModal
        isOpen={pendingExit !== null}
        onClose={() => setPendingExit(null)}
        title="Discard unsaved changes?"
        body="Your unsaved table and column descriptions will be lost. This action can't be undone."
        primaryLabel="Discard changes"
        primaryVariant="danger"
        secondaryLabel="Keep editing"
        onConfirm={() => {
          const exit = pendingExit
          setPendingExit(null)
          setConnectorResetSignal((n) => n + 1)
          setConnectorDirty(false)
          exit?.()
        }}
      />

    </div>
  )
}
