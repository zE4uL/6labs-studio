import type { ComponentMeta } from '../../design-system/types'
import { PopupModalDemo } from './PopupModal.demo'

export const meta: ComponentMeta = {
  id: 'popup-modal',
  label: 'PopupModal',
  category: 'molecules',
  description: 'Overlay modal dialog with title, body, primary/secondary actions. Supports sm/lg sizes and danger variant.',
  demo: PopupModalDemo,
  anatomy: [
    { property: 'Overlay',              token: 'bg-black/50',            variable: 'Translucents Dark/Black-50 (59650bbd…)', value: 'rgba(0,0,0,0.5)' },
    { property: 'Panel BG',             token: 'bg-bg-elements',         variable: 'Neutral/White (3edd2c47…)',  value: '#FFFFFF' },
    { property: 'Panel Radius',         token: 'rounded-2xl',            variable: 'radius/2xl',                 value: '16px' },
    { property: 'Panel Shadow',         token: 'shadow-big',             variable: 'elevation/big',              value: '0 8px 24px rgba(0,0,0,0.12)' },
    { property: 'Title Font',           token: 'font-display text-l',    variable: 'DisplayFont, size/l',        value: 'Bricolage 20px' },
    { property: 'Body Text',            token: 'text-text-secondary',    variable: 'Base/Base - 600 (0a2933ab…)', value: '#4F566C' },
    { property: 'Padding',              token: 'p-xl',                   variable: 'space/xl',                   value: '24px' },
  ],
}
