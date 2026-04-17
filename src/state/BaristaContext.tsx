/**
 * BaristaContext — in-memory state for the full Barista flow (Phase 1 + Tasks).
 * No persistence: reloading the app resets Barista to the pre-setup state.
 *
 * Scope:
 *  - setupStatus: not-set-up | in-setup | complete
 *  - persona: role context captured during setup
 *  - panelOpen / activeTab: is the Barista right rail visible + which tab
 *  - autoMode: OFF by default (Barista suggests, user approves)
 *  - generating: Oracle is processing a Barista-driven turn
 *  - turns: timeline of turns for the current Oracle session
 *  - suggestedQuestion: pending question queued by Barista when autoMode=OFF
 *  - tasks: scheduled recurring queries + their results
 *  - activeTaskId: currently open task detail view
 *  - taskDialog: creation-modal state (open/prefill)
 *
 * Paused semantics (per PRD):
 *  - Manual stop → `pauseGeneration('manual')`
 *  - Screen switch mid-generation → `pauseGeneration('screen-switch')`
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react'
import type { BaristaPersona } from '../components/organisms/BaristaSetupPage'
import type { BaristaTurn } from '../components/organisms/BaristaSidePanel'
import type { BaristaPanelState } from '../components/organisms/BaristaSidePanel'

type SetupStatus = 'not-set-up' | 'in-setup' | 'complete'
type PauseReason = 'manual' | 'screen-switch'

export type BaristaActiveTab = 'assist' | 'tasks'
export type BaristaTaskFrequency = 'no-repeat' | 'daily' | 'weekly' | 'every-weekday' | 'monthly'
export type BaristaTaskStatus = 'scheduled' | 'running' | 'success' | 'error' | 'paused'

export interface BaristaTaskResult {
  id: string
  timestamp: string
  answer: string
  sources?: string[]
  status: 'success' | 'error' | 'running'
}

export interface BaristaTask {
  id: string
  name: string
  prompt: string
  frequency: BaristaTaskFrequency
  scheduledAt: string
  timezone: string
  enabled: boolean
  status: BaristaTaskStatus
  lastRunAt?: string
  createdAt: string
  results: BaristaTaskResult[]
  /** If this task was branched from another task, link back. */
  branchedFromTaskId?: string
}

export interface BaristaTaskDialogState {
  open: boolean
  /** If set, the modal is in "schedule after run-once" mode (only Save & schedule CTA). */
  postRun?: boolean
  prefill?: Partial<Pick<BaristaTask, 'name' | 'prompt'>>
}

interface BaristaState {
  setupStatus: SetupStatus
  persona: BaristaPersona | null
  panelOpen: boolean
  activeTab: BaristaActiveTab
  autoMode: boolean
  generating: boolean
  turns: BaristaTurn[]
  suggestedQuestion: string | null
  pauseReason: PauseReason | null
  tasks: BaristaTask[]
  activeTaskId: string | null
  taskDialog: BaristaTaskDialogState
}

const initialState: BaristaState = {
  setupStatus: 'not-set-up',
  persona: null,
  panelOpen: false,
  activeTab: 'assist',
  autoMode: false,
  generating: false,
  turns: [],
  suggestedQuestion: null,
  pauseReason: null,
  tasks: [],
  activeTaskId: null,
  taskDialog: { open: false },
}

type Action =
  | { type: 'start-setup' }
  | { type: 'cancel-setup' }
  | { type: 'confirm-setup'; persona: BaristaPersona }
  | { type: 'open-panel' }
  | { type: 'close-panel' }
  | { type: 'toggle-panel' }
  | { type: 'set-tab'; tab: BaristaActiveTab }
  | { type: 'set-auto-mode'; value: boolean }
  | { type: 'set-suggested'; question: string | null }
  | { type: 'start-generating'; turn: BaristaTurn }
  | { type: 'complete-turn'; turnId: string; answer: string }
  | { type: 'pause'; reason: PauseReason }
  | { type: 'resume' }
  | { type: 'add-turn'; turn: BaristaTurn }
  | { type: 'reset-turns' }
  | { type: 'open-task-dialog'; prefill?: BaristaTaskDialogState['prefill']; postRun?: boolean }
  | { type: 'close-task-dialog' }
  | { type: 'create-task'; task: BaristaTask }
  | { type: 'update-task'; id: string; patch: Partial<BaristaTask> }
  | { type: 'delete-task'; id: string }
  | { type: 'open-task'; id: string }
  | { type: 'close-task' }
  | { type: 'append-task-result'; taskId: string; result: BaristaTaskResult }
  | { type: 'reset' }

function reducer(state: BaristaState, action: Action): BaristaState {
  switch (action.type) {
    case 'start-setup':
      return { ...state, setupStatus: 'in-setup' }
    case 'cancel-setup':
      return {
        ...state,
        setupStatus: state.persona ? 'complete' : 'not-set-up',
      }
    case 'confirm-setup':
      return { ...state, setupStatus: 'complete', persona: action.persona }
    case 'open-panel':
      return { ...state, panelOpen: true }
    case 'close-panel':
      return { ...state, panelOpen: false }
    case 'toggle-panel':
      return { ...state, panelOpen: !state.panelOpen }
    case 'set-tab':
      return { ...state, activeTab: action.tab }
    case 'set-auto-mode':
      return { ...state, autoMode: action.value }
    case 'set-suggested':
      return { ...state, suggestedQuestion: action.question }
    case 'start-generating':
      return {
        ...state,
        generating: true,
        pauseReason: null,
        turns: [...state.turns, action.turn],
        suggestedQuestion: null,
      }
    case 'complete-turn': {
      // Only flip if the turn exists and was running (not paused by the user).
      const idx = state.turns.findIndex((t) => t.id === action.turnId)
      if (idx < 0) return state
      const target = state.turns[idx]
      if (target.status !== 'running') return state
      const turns = state.turns.map((t) =>
        t.id === action.turnId
          ? { ...t, status: 'success' as const, answer: action.answer }
          : t
      )
      return { ...state, turns, generating: false }
    }
    case 'pause': {
      const lastIdx = state.turns.length - 1
      if (lastIdx < 0) return { ...state, generating: false, pauseReason: action.reason }
      const turns = state.turns.map((t, i) =>
        i === lastIdx
          ? {
              ...t,
              status: 'paused' as const,
              pausedReason:
                action.reason === 'screen-switch'
                  ? 'Stopped because you switched screens'
                  : 'Paused by you.',
            }
          : t
      )
      return { ...state, generating: false, pauseReason: action.reason, turns }
    }
    case 'resume':
      return { ...state, generating: true, pauseReason: null }
    case 'add-turn':
      return { ...state, turns: [...state.turns, action.turn] }
    case 'reset-turns':
      return {
        ...state,
        turns: [],
        generating: false,
        pauseReason: null,
        suggestedQuestion: null,
      }
    case 'open-task-dialog':
      return {
        ...state,
        taskDialog: { open: true, postRun: action.postRun, prefill: action.prefill },
      }
    case 'close-task-dialog':
      return { ...state, taskDialog: { open: false } }
    case 'create-task':
      return { ...state, tasks: [action.task, ...state.tasks] }
    case 'update-task':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, ...action.patch } : t)),
      }
    case 'delete-task':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.id),
        activeTaskId: state.activeTaskId === action.id ? null : state.activeTaskId,
      }
    case 'open-task':
      return { ...state, activeTaskId: action.id }
    case 'close-task':
      return { ...state, activeTaskId: null }
    case 'append-task-result':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                results: [...t.results, action.result],
                lastRunAt: action.result.timestamp,
                status: action.result.status === 'success' ? 'success' : action.result.status,
              }
            : t
        ),
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export interface BaristaContextValue extends BaristaState {
  panelState: BaristaPanelState
  // Setup
  startSetup: () => void
  cancelSetup: () => void
  confirmSetup: (persona: BaristaPersona) => void
  // Panel
  openPanel: () => void
  closePanel: () => void
  togglePanel: () => void
  setActiveTab: (tab: BaristaActiveTab) => void
  // Assist
  setAutoMode: (value: boolean) => void
  setSuggestedQuestion: (q: string | null) => void
  sendSuggested: (q: string) => void
  onOracleCompleted: (question: string) => void
  pauseGeneration: (reason: PauseReason) => void
  resumeGeneration: () => void
  notifyScreenSwitch: () => void
  resetSession: () => void
  // Tasks
  openTaskDialog: (prefill?: BaristaTaskDialogState['prefill'], postRun?: boolean) => void
  closeTaskDialog: () => void
  createTask: (input: {
    name: string
    prompt: string
    frequency: BaristaTaskFrequency
    scheduledAt: string
    timezone: string
  }) => BaristaTask
  updateTask: (id: string, patch: Partial<BaristaTask>) => void
  deleteTask: (id: string) => void
  toggleTaskEnabled: (id: string) => void
  openTask: (id: string) => void
  closeTask: () => void
  appendTaskResult: (taskId: string, result: BaristaTaskResult) => void
  runTaskNow: (id: string) => void
}

const BaristaContext = createContext<BaristaContextValue | null>(null)

function derivePanelState(state: BaristaState): BaristaPanelState {
  if (state.setupStatus !== 'complete') return 'onboarding'
  if (state.generating) return 'running'
  if (state.pauseReason) return 'paused'
  if (!state.autoMode && state.suggestedQuestion) return 'approve'
  return 'profile-ready'
}

function nowStamp() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function detectTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return 'UTC'
  }
}

const FOLLOWUPS = [
  'Which cohorts are most sensitive to the queue-time threshold? Break down by tenure and region.',
  'What session-length patterns precede those mid-match quits on the top 3 problem maps?',
  'How does the unlock-prompt conversion compare between whales and mid-tier spenders this season?',
]

export function BaristaProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const turnCounter = useRef(0)
  const taskCounter = useRef(0)
  const resultCounter = useRef(0)
  const autoModeRef = useRef(state.autoMode)
  autoModeRef.current = state.autoMode
  const generatingRef = useRef(state.generating)
  generatingRef.current = state.generating

  const startSetup = useCallback(() => dispatch({ type: 'start-setup' }), [])
  const cancelSetup = useCallback(() => dispatch({ type: 'cancel-setup' }), [])
  const confirmSetup = useCallback(
    (persona: BaristaPersona) => dispatch({ type: 'confirm-setup', persona }),
    []
  )
  const openPanel = useCallback(() => dispatch({ type: 'open-panel' }), [])
  const closePanel = useCallback(() => dispatch({ type: 'close-panel' }), [])
  const togglePanel = useCallback(() => dispatch({ type: 'toggle-panel' }), [])
  const setActiveTab = useCallback(
    (tab: BaristaActiveTab) => dispatch({ type: 'set-tab', tab }),
    []
  )
  const setAutoMode = useCallback(
    (value: boolean) => dispatch({ type: 'set-auto-mode', value }),
    []
  )
  const setSuggestedQuestion = useCallback(
    (q: string | null) => dispatch({ type: 'set-suggested', question: q }),
    []
  )
  const sendSuggested = useCallback((q: string) => {
    // Simply start a new Barista turn. Completion is driven by Oracle —
    // HomePage observes the running turn, hands the question to Oracle as
    // externalQuery, and calls onOracleCompleted() when Oracle finishes.
    turnCounter.current += 1
    const turnId = `turn-${turnCounter.current}`
    dispatch({
      type: 'start-generating',
      turn: {
        id: turnId,
        turnNumber: turnCounter.current,
        status: 'running',
        question: q,
        timestamp: nowStamp(),
      },
    })
  }, [])

  /**
   * Called by HomePage when Oracle signals it finished answering a
   * Barista-driven external query. Marks the matching turn as success and
   * then, based on the current Auto mode:
   *  - Auto ON  → automatically queue the next follow-up question
   *  - Auto OFF → queue a new suggested question for the user to approve
   */
  const onOracleCompleted = useCallback((question: string) => {
    // Find the last running turn whose question matches.
    const match = [...state.turns].reverse().find(
      (t) => t.status === 'running' && t.question === question
    )
    if (!match) return
    dispatch({ type: 'complete-turn', turnId: match.id, answer: '' })

    // Compute a follow-up off the turn count for stable rotation.
    const follow = FOLLOWUPS[(turnCounter.current - 1) % FOLLOWUPS.length]
    if (autoModeRef.current) {
      // Short beat, then auto-send next.
      window.setTimeout(() => {
        if (generatingRef.current || state.pauseReason) return
        turnCounter.current += 1
        dispatch({
          type: 'start-generating',
          turn: {
            id: `turn-${turnCounter.current}`,
            turnNumber: turnCounter.current,
            status: 'running',
            question: follow,
            timestamp: nowStamp(),
          },
        })
      }, 800)
    } else {
      dispatch({ type: 'set-suggested', question: follow })
    }
  }, [state.turns, state.pauseReason])
  const pauseGeneration = useCallback(
    (reason: PauseReason) => dispatch({ type: 'pause', reason }),
    []
  )
  const resumeGeneration = useCallback(() => dispatch({ type: 'resume' }), [])
  const notifyScreenSwitch = useCallback(() => {
    if (state.generating) dispatch({ type: 'pause', reason: 'screen-switch' })
  }, [state.generating])
  const resetSession = useCallback(() => {
    turnCounter.current = 0
    dispatch({ type: 'reset-turns' })
  }, [])

  // ── Tasks ─────────────────────────────────────────────────────────
  const openTaskDialog = useCallback(
    (prefill?: BaristaTaskDialogState['prefill'], postRun?: boolean) =>
      dispatch({ type: 'open-task-dialog', prefill, postRun }),
    []
  )
  const closeTaskDialog = useCallback(() => dispatch({ type: 'close-task-dialog' }), [])

  const createTask = useCallback(
    (input: {
      name: string
      prompt: string
      frequency: BaristaTaskFrequency
      scheduledAt: string
      timezone: string
    }): BaristaTask => {
      taskCounter.current += 1
      const task: BaristaTask = {
        id: `task-${taskCounter.current}-${Date.now()}`,
        name: input.name,
        prompt: input.prompt,
        frequency: input.frequency,
        scheduledAt: input.scheduledAt,
        timezone: input.timezone || detectTimezone(),
        enabled: true,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        results: [],
      }
      dispatch({ type: 'create-task', task })
      return task
    },
    []
  )

  const updateTask = useCallback(
    (id: string, patch: Partial<BaristaTask>) => dispatch({ type: 'update-task', id, patch }),
    []
  )
  const deleteTask = useCallback(
    (id: string) => dispatch({ type: 'delete-task', id }),
    []
  )
  const toggleTaskEnabled = useCallback(
    (id: string) => {
      const task = state.tasks.find((t) => t.id === id)
      if (task) updateTask(id, { enabled: !task.enabled })
    },
    [state.tasks, updateTask]
  )
  const openTask = useCallback((id: string) => dispatch({ type: 'open-task', id }), [])
  const closeTask = useCallback(() => dispatch({ type: 'close-task' }), [])
  const appendTaskResult = useCallback(
    (taskId: string, result: BaristaTaskResult) =>
      dispatch({ type: 'append-task-result', taskId, result }),
    []
  )
  const runTaskNow = useCallback(
    (id: string) => {
      const task = state.tasks.find((t) => t.id === id)
      if (!task) return
      resultCounter.current += 1
      // Simulate: immediately push a "success" result with a mock answer.
      const result: BaristaTaskResult = {
        id: `result-${resultCounter.current}`,
        timestamp: new Date().toISOString(),
        status: 'success',
        answer: `Mock Oracle output for "${task.name}". In production this comes from Oracle's response.`,
      }
      dispatch({ type: 'append-task-result', taskId: id, result })
    },
    [state.tasks]
  )

  const value = useMemo<BaristaContextValue>(
    () => ({
      ...state,
      panelState: derivePanelState(state),
      startSetup,
      cancelSetup,
      confirmSetup,
      openPanel,
      closePanel,
      togglePanel,
      setActiveTab,
      setAutoMode,
      setSuggestedQuestion,
      sendSuggested,
      onOracleCompleted,
      pauseGeneration,
      resumeGeneration,
      notifyScreenSwitch,
      resetSession,
      openTaskDialog,
      closeTaskDialog,
      createTask,
      updateTask,
      deleteTask,
      toggleTaskEnabled,
      openTask,
      closeTask,
      appendTaskResult,
      runTaskNow,
    }),
    [
      state,
      startSetup,
      cancelSetup,
      confirmSetup,
      openPanel,
      closePanel,
      togglePanel,
      setActiveTab,
      setAutoMode,
      setSuggestedQuestion,
      sendSuggested,
      onOracleCompleted,
      pauseGeneration,
      resumeGeneration,
      notifyScreenSwitch,
      resetSession,
      openTaskDialog,
      closeTaskDialog,
      createTask,
      updateTask,
      deleteTask,
      toggleTaskEnabled,
      openTask,
      closeTask,
      appendTaskResult,
      runTaskNow,
    ]
  )

  return <BaristaContext.Provider value={value}>{children}</BaristaContext.Provider>
}

export function useBarista(): BaristaContextValue {
  const ctx = useContext(BaristaContext)
  if (!ctx) throw new Error('useBarista must be used within <BaristaProvider>')
  return ctx
}
