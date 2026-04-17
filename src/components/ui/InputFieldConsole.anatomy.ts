import type { ComponentMeta } from '../../design-system/types'
import InputFieldConsole from './InputFieldConsole'

export const meta: ComponentMeta = {
  id: 'input-console',
  label: 'InputFieldConsole',
  category: 'molecules',
  description: 'Chat/console input with platform label, send button, and mini variant. Used on agent pages.',
  component: InputFieldConsole,
  anatomy: [
    { property: 'BG',                   token: '.input-console',           variable: 'Background/Elements (Neutral/White)', value: '#FFFFFF' },
    { property: 'Border (default)',     token: '.input-console',           variable: 'Border/Default (82f2b096…)',   value: '#CDCFD5' },
    { property: 'Border (hover/focus)', token: ':hover / :focus-within',   variable: 'Brand Blue/500 (8a8916d8…)',   value: '#1770EF' },
    { property: 'Radius',              token: '.input-console',           variable: 'radius/container',              value: '20px' },
    { property: 'Padding (default)',    token: '.input-console',           variable: 'space/m',                      value: '16px' },
    { property: 'Padding (mini)',       token: '.input-console-mini',      variable: 'space/m space/l',               value: '16px 20px' },
    { property: 'Gap',                  token: '.input-console',           variable: 'space/s',                      value: '12px' },
    { property: 'Text (input)',         token: '.input-console-textarea',  variable: 'BodyFont, size/m',             value: 'Inter 16px' },
    { property: 'Placeholder',          token: '::placeholder',            variable: 'Base/Base - 300 (dc95cee5…)',  value: '#9A9EAB' },
    { property: 'Send (inactive)',      token: '.input-console-send-inactive', variable: 'Base/Base - 300 (dc95cee5…)', value: '#9A9EAB 50%' },
    { property: 'Send (active)',        token: '.input-console-send-active',   variable: 'Brand Blue/500 (8a8916d8…)', value: '#1770EF 100%' },
  ],
  renderHints: {
    groups: [
      { label: 'Types', prop: 'type' },
    ],
    defaultProps: { value: '', onChange: () => {}, placeholder: 'Search for actions, objects and events in your game...' },
  },
}
