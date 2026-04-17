import type { ComponentMeta } from '../../design-system/types'
import { UploadTag } from './UploadTag'

export const meta: ComponentMeta = {
  id: 'upload-tag',
  label: 'UploadTag',
  category: 'atoms',
  description: 'Status badge: "UPLOADING" (brand tint) and "UPLOADED" (success tint). Display semibold 10px uppercase.',
  component: UploadTag,
  anatomy: [
    { property: 'BG (uploading)',  token: 'bg-brand/10',   variable: 'Brand Blue/Tint', value: 'rgba(23,112,239,0.10)' },
    { property: 'BG (uploaded)',   token: 'bg-success/10',  variable: 'Status/Success Tint', value: 'rgba(22,163,74,0.10)' },
    { property: 'Text (uploading)', token: 'text-brand',    variable: 'Brand Blue/500', value: '#1770EF' },
    { property: 'Text (uploaded)', token: 'text-success',   variable: 'Status/Success', value: '#16A34A' },
  ],
  renderHints: {
    groups: [
      { label: 'Status', prop: 'status' },
    ],
  },
}
