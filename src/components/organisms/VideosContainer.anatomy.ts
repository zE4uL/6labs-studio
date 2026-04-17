import type { ComponentMeta } from '../../design-system/types'

export const meta: ComponentMeta = {
  id: 'videos-container',
  label: 'VideosContainer',
  category: 'organisms',
  description: 'Grid container for VideoCard molecules with filtering and layout controls.',
  anatomy: [
    { property: 'Grid Gap',             token: 'gap-[12px]',             variable: 'space/s',                    value: '12px' },
    { property: 'BG',                   token: 'bg-bg-page',             variable: 'Background/Page BG (9cf5e54d…)', value: '#F1F1F1' },
    { property: 'Padding',              token: 'p-xl',                   variable: 'space/xl',                   value: '24px' },
  ],
}
