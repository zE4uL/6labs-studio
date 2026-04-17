// Auto-generated from Figma Event Icons - FF component set
// Game-specific — these icons change per game selection

import type { ComponentType } from 'react'

import { EventCombatIcon } from './EventCombatIcon'
import { EventMatchStartedIcon } from './EventMatchStartedIcon'
import { EventMatchEndedIcon } from './EventMatchEndedIcon'
import { EventErrorIcon } from './EventErrorIcon'
import { EventVehicalIcon } from './EventVehicalIcon'
import { EventAirDropIcon } from './EventAirDropIcon'
import { EventKillIcon } from './EventKillIcon'
import { EventDeathIcon } from './EventDeathIcon'
import { EventtapIcon } from './EventtapIcon'
import { EventPurchasedIcon } from './EventPurchasedIcon'
import { EventShopOpenIcon } from './EventShopOpenIcon'
import { EventShopPauseIcon } from './EventShopPauseIcon'
import { EventShopAddIcon } from './EventShopAddIcon'
import { EventShopRemoveIcon } from './EventShopRemoveIcon'
import { EventShopAbandonedIcon } from './EventShopAbandonedIcon'
import { EventCheckIcon } from './EventCheckIcon'
import { EventFrustrationIcon } from './EventFrustrationIcon'
import { EventQuitIcon } from './EventQuitIcon'
import { EventAchivementIcon } from './EventAchivementIcon'
import { EventGenericIcon } from './EventGenericIcon'
import { EventCustomizationIcon } from './EventCustomizationIcon'

export {
  EventCombatIcon, EventMatchStartedIcon, EventMatchEndedIcon, EventErrorIcon,
  EventVehicalIcon, EventAirDropIcon, EventKillIcon, EventDeathIcon,
  EventtapIcon, EventPurchasedIcon, EventShopOpenIcon, EventShopPauseIcon,
  EventShopAddIcon, EventShopRemoveIcon, EventShopAbandonedIcon, EventCheckIcon,
  EventFrustrationIcon, EventQuitIcon, EventAchivementIcon, EventGenericIcon,
  EventCustomizationIcon,
}

// Event icon lookup by type string
export const EVENT_ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  'combat': EventCombatIcon,
  'match-started': EventMatchStartedIcon,
  'match-ended': EventMatchEndedIcon,
  'error': EventErrorIcon,
  'vehical': EventVehicalIcon,
  'air-drop': EventAirDropIcon,
  'kill': EventKillIcon,
  'death': EventDeathIcon,
  'tap': EventtapIcon,
  'purchased': EventPurchasedIcon,
  'shop-open': EventShopOpenIcon,
  'shop-pause': EventShopPauseIcon,
  'shop-add': EventShopAddIcon,
  'shop-remove': EventShopRemoveIcon,
  'shop-abandoned': EventShopAbandonedIcon,
  'check': EventCheckIcon,
  'frustration': EventFrustrationIcon,
  'quit': EventQuitIcon,
  'achivement': EventAchivementIcon,
  'generic': EventGenericIcon,
  'customization': EventCustomizationIcon,
  // Aliases for type names used in mock data
  'match-start': EventMatchStartedIcon,
  'loading-error': EventErrorIcon,
  'loot': EventPurchasedIcon,
  'winner': EventAchivementIcon,
}

// Event dot colors by category
export const EVENT_DOT_COLORS: Record<string, string> = {
  "Tap": "#67C3BB",
  "Technical": "#F33621",
  "Warning": "#FFC32A",
  "Monetization": "#398B4D",
  "Frustaion": "#FF6200",
  "Progression": "#0397EB",
  "Combat": "#7B4CFF",
}
