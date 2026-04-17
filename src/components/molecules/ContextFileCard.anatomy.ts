import type { ComponentMeta } from '../../design-system/types'
import { ContextFileCard } from './ContextFileCard'

export const meta: ComponentMeta = {
  id: 'context-file-card',
  label: 'ContextFileCard',
  category: 'molecules',
  description: 'File row with icon, name, size, date, progress bar, upload tag, and delete button. Two states: uploading and uploaded.',
  component: ContextFileCard,
  anatomy: [],
  renderHints: {
    groups: [
      { label: 'Status', prop: 'status', fileName: 'game-ui.png', fileSize: '126.0 KB', fileDate: 'Mar 9, 2026', fileType: 'image', progress: 60 },
      { label: 'Saved', prop: 'fileType', fileName: 'balance-sheet.csv', fileSize: '2.4 MB', fileDate: 'Mar 9, 2026', status: 'uploaded', progress: 100, saved: true },
    ],
  },
}
