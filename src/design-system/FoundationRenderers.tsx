// src/design-system/FoundationRenderers.tsx
import { AnatomyTable } from './AnatomyTable'
import type { AnatomyEntry } from './types'
import { HomeIcon } from '../components/icons/HomeIcon'
import { BaristaIcon } from '../components/icons/BaristaIcon'
import { RadiologistIcon } from '../components/icons/RadiologistIcon'
import { OracleIcon } from '../components/icons/OracleIcon'
import { ForecasterIcon } from '../components/icons/ForecasterIcon'
import { CoachIcon } from '../components/icons/CoachIcon'
import { GuardianIcon } from '../components/icons/GuardianIcon'
import { UploadIcon } from '../components/icons/UploadIcon'
import { ConnectorIcon } from '../components/icons/ConnectorIcon'
import { ChevronIcon } from '../components/icons/ChevronIcon'
import { FilterIcon } from '../components/icons/FilterIcon'
import { CalendarIcon } from '../components/icons/CalendarIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { CloseIcon } from '../components/icons/CloseIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { SendIcon } from '../components/icons/SendIcon'
import { SettingsIcon } from '../components/icons/SettingsIcon'
import { ShareIcon } from '../components/icons/ShareIcon'
import { GridIcon } from '../components/icons/GridIcon'
import { ListIcon } from '../components/icons/ListIcon'
import { LogoutIcon } from '../components/icons/LogoutIcon'
import { TrashIcon } from '../components/icons/TrashIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { PlusIcon } from '../components/icons/PlusIcon'
import { BulbIcon } from '../components/icons/BulbIcon'
import { CollapseIcon } from '../components/icons/CollapseIcon'
import { ExpandIcon } from '../components/icons/ExpandIcon'
import { DirectionsArrowIcon } from '../components/icons/DirectionsArrowIcon'
import { DropdownArrowIcon } from '../components/icons/DropdownArrowIcon'
import { BlueStacksIcon } from '../components/icons/BlueStacksIcon'
import { FileImageIcon } from '../components/icons/FileImageIcon'
import { FileDocIcon } from '../components/icons/FileDocIcon'

// ─── Helpers ────────────────────────────────────────────────────────────────

function ColorSwatch({ name, hex, token, usage }: { name: string; hex: string; token: string; usage?: string }) {
  const isLight = hex === '#FFFFFF' || hex === '#F5F5F5' || hex === '#F1F1F1'
  return (
    <div className="flex flex-col gap-xs">
      <div
        className={`w-full h-[60px] rounded-xl border ${isLight ? 'border-border-subtle' : 'border-transparent'}`}
        style={{ backgroundColor: hex }}
      />
      <div className="flex flex-col gap-[2px]">
        <p className="font-display text-xs font-semibold text-text-primary">{name}</p>
        <p className="font-code text-2xs text-text-secondary">{hex}</p>
        <p className="font-body text-2xs text-text-tertiary">{token}</p>
        {usage && <p className="font-body text-2xs text-text-tertiary italic">{usage}</p>}
      </div>
    </div>
  )
}

function TypeSpec({ label, className, sample = 'The quick brown fox' }: { label: string; className: string; sample?: string }) {
  return (
    <div className="flex items-baseline gap-m">
      <span className="font-body text-2xs text-text-tertiary w-[160px] shrink-0">{label}</span>
      <span className={className}>{sample}</span>
    </div>
  )
}

// ─── Foundation renderers ───────────────────────────────────────────────────

export function ColorsRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  return (
    <div className="flex flex-col gap-xl">
      <AnatomyTable entries={anatomy} />
      <div>
        <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-s">Brand Blue</p>
        <div className="grid grid-cols-6 gap-m">
          <ColorSwatch name="Brand/600" hex="#0D5ED4" token="--brand-pressed" usage="CTA pressed" />
          <ColorSwatch name="Brand/500" hex="#1770EF" token="--brand" usage="Primary CTA, active" />
          <ColorSwatch name="Brand/400" hex="#4D8FF5" token="--brand-hover" usage="Hover state" />
          <ColorSwatch name="Brand Tint" hex="rgba(23,112,239,0.14)" token="--bg-tint" usage="Active nav bg" />
          <ColorSwatch name="Tint Light" hex="rgba(23,112,239,0.07)" token="--bg-tint-light" usage="Hover tint" />
          <ColorSwatch name="Tint Dark" hex="rgba(23,112,239,0.40)" token="--bg-tint-dark" usage="Selected dark" />
        </div>
      </div>
      <div>
        <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-s">Base Scale</p>
        <div className="grid grid-cols-7 gap-m">
          <ColorSwatch name="Base/900" hex="#030D2D" token="text-base-900" usage="Headings" />
          <ColorSwatch name="Base/800" hex="#1C2542" token="text-base-800" />
          <ColorSwatch name="Base/700" hex="#353D57" token="text-base-700" />
          <ColorSwatch name="Base/600" hex="#4F566C" token="text-base-600" usage="Secondary" />
          <ColorSwatch name="Base/400" hex="#818696" token="text-base-400" usage="Tertiary" />
          <ColorSwatch name="Base/100" hex="#CDCFD5" token="text-base-100" usage="Borders" />
          <ColorSwatch name="Base/50" hex="#E6E7EA" token="text-base-50" usage="Tag bg" />
        </div>
      </div>
      <div>
        <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-s">Semantic Backgrounds</p>
        <div className="grid grid-cols-5 gap-m">
          <ColorSwatch name="Page BG" hex="#F1F1F1" token="bg-bg-page" usage="Page background" />
          <ColorSwatch name="Card/Elements" hex="#FFFFFF" token="bg-bg-elements" usage="Cards, sidebar" />
          <ColorSwatch name="Subtle" hex="#E6E7EA" token="bg-bg-subtle" usage="Hover bg, tags" />
          <ColorSwatch name="Highlighted" hex="#1770EF" token="bg-brand" usage="Active tab" />
          <ColorSwatch name="Surface Pale" hex="#F5F5F5" token="bg-page-pale" usage="Alt page bg" />
        </div>
      </div>
      <div>
        <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-s">Status</p>
        <div className="grid grid-cols-6 gap-m">
          <ColorSwatch name="Error" hex="#C9392A" token="--error" />
          <ColorSwatch name="Warning" hex="#FFB700" token="--warning" />
          <ColorSwatch name="Success" hex="#16A34A" token="--success" />
          <ColorSwatch name="Notice" hex="#67C3BB" token="--notice" />
          <ColorSwatch name="Purple" hex="#7B4CFF" token="--purple" usage="AI / premium" />
          <ColorSwatch name="Pink" hex="#C20568" token="--pink" usage="Hot accent" />
        </div>
      </div>
    </div>
  )
}

export function TypographyRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  return (
    <div className="flex flex-col gap-l">
      <AnatomyTable entries={anatomy} />
      <div className="flex flex-col gap-s bg-bg-elements rounded-2xl p-xl border border-border-subtle">
        <TypeSpec label="Title/4XL ExtraBold" className="font-display text-4xl font-extrabold text-text-primary leading-[1.2]" sample="Get to know your game" />
        <TypeSpec label="Title/2XL Medium" className="font-display text-2xl font-medium text-text-primary leading-[1.2]" sample="Session Analysis Dashboard" />
        <TypeSpec label="Title/L Medium" className="font-display text-l font-medium text-text-primary leading-[1.5]" sample="Core Agents" />
        <TypeSpec label="Title/M Semibold" className="font-display text-m font-semibold text-text-primary leading-[1.5]" sample="Session #2847" />
        <TypeSpec label="Title/S Semibold" className="font-display text-s font-semibold text-text-primary leading-[1.5]" sample="Free Fire — Action" />
        <TypeSpec label="Title/XS Semibold" className="font-display text-xs font-semibold text-text-tertiary leading-[1.5]" sample="CORE AGENTS" />
        <div className="h-[1px] bg-border-subtle my-xs" />
        <TypeSpec label="Body/L Regular" className="font-body text-m font-normal text-text-primary leading-[1.5]" sample="Search for actions, objects and events in your game..." />
        <TypeSpec label="Body/M Regular" className="font-body text-s font-normal text-text-secondary leading-[1.5]" sample="Competitive ranked match with strategic gameplay." />
        <TypeSpec label="Body/S Regular" className="font-body text-xs font-normal text-text-secondary leading-[1.5]" sample="10/11/25 · 4:05 duration" />
        <TypeSpec label="Body/XS Medium" className="font-body text-2xs font-medium text-text-primary tracking-[0.2px] leading-[16px]" sample="items looted · game crashed" />
        <div className="h-[1px] bg-border-subtle my-xs" />
        <TypeSpec label="Label/Medium (UPPERCASE)" className="font-display text-2xs font-medium uppercase tracking-[1.5px] text-text-secondary" sample="COMING SOON · PERSONAL AGENT" />
        <TypeSpec label="Button/Large" className="font-display text-s font-semibold text-brand" sample="Radiologist · Show more" />
      </div>
    </div>
  )
}

export function SpacingRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  return (
    <div className="flex flex-col gap-l">
      <AnatomyTable entries={anatomy} />
      <div className="flex flex-wrap gap-m items-end">
        {[
          { name: 'xxxs', px: 2 }, { name: 'xxs', px: 4 }, { name: 'xs', px: 8 },
          { name: 's', px: 12 }, { name: 'm', px: 16 }, { name: 'l', px: 20 },
          { name: 'xl', px: 24 }, { name: 'xxl', px: 32 }, { name: 'xxxl', px: 40 },
          { name: 'xxl2', px: 48 }, { name: 'xxl3', px: 64 },
        ].map(({ name, px }) => (
          <div key={name} className="flex flex-col gap-xs items-center">
            <div className="bg-brand rounded-[2px]" style={{ width: px, height: px }} />
            <p className="font-code text-2xs text-text-tertiary">{name}</p>
            <p className="font-code text-2xs text-text-secondary">{px}px</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ShadowsRadiiRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  return (
    <div className="flex flex-col gap-l">
      <AnatomyTable entries={anatomy} />
      <div className="grid grid-cols-2 gap-xl">
        <div className="flex flex-col gap-s">
          <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-xs">Shadows</p>
          <div className="flex flex-col gap-m">
            {[
              { name: 'shadow-sm', cls: 'shadow-sm' }, { name: 'shadow-normal', cls: 'shadow-normal' },
              { name: 'shadow-big', cls: 'shadow-big' }, { name: 'shadow-button', cls: 'shadow-button' },
            ].map(({ name, cls }) => (
              <div key={name} className={`bg-bg-elements rounded-xl p-m ${cls}`}>
                <p className="font-code text-xs text-text-secondary">{name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-s">
          <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-xs">Border Radius</p>
          <div className="flex flex-wrap gap-m items-start">
            {[
              { name: 'xs (4px)', cls: 'rounded-xs' }, { name: 's (6px)', cls: 'rounded-s' },
              { name: 'm (8px)', cls: 'rounded-m' }, { name: 'xl (12px)', cls: 'rounded-xl' },
              { name: '2xl (16px)', cls: 'rounded-2xl' }, { name: '3xl (20px)', cls: 'rounded-3xl' },
              { name: 'round', cls: 'rounded-round' },
            ].map(({ name, cls }) => (
              <div key={name} className="flex flex-col gap-xs items-center">
                <div className={`w-12 h-12 bg-brand/20 border-2 border-brand ${cls}`} />
                <p className="font-code text-2xs text-text-tertiary text-center">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function IconsRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  const allIcons = [
    { name: 'Home', icon: <HomeIcon size={24} /> },
    { name: 'Barista', icon: <BaristaIcon size={24} /> },
    { name: 'Radiologist', icon: <RadiologistIcon size={24} /> },
    { name: 'Oracle', icon: <OracleIcon size={24} /> },
    { name: 'Forecaster', icon: <ForecasterIcon size={24} /> },
    { name: 'Coach', icon: <CoachIcon size={24} /> },
    { name: 'Guardian', icon: <GuardianIcon size={24} /> },
    { name: 'Upload', icon: <UploadIcon size={24} /> },
    { name: 'Connector', icon: <ConnectorIcon size={24} /> },
    { name: 'Chevron →', icon: <ChevronIcon direction="right" size={24} /> },
    { name: 'Chevron ↓', icon: <ChevronIcon direction="down" size={24} /> },
    { name: 'Filter', icon: <FilterIcon size={24} /> },
    { name: 'Calendar', icon: <CalendarIcon size={24} /> },
    { name: 'Clock', icon: <ClockIcon size={24} /> },
    { name: 'Close', icon: <CloseIcon size={24} /> },
    { name: 'Check', icon: <CheckIcon size={24} /> },
    { name: 'Send', icon: <SendIcon size={24} /> },
    { name: 'Settings', icon: <SettingsIcon size={24} /> },
    { name: 'Share', icon: <ShareIcon size={24} /> },
    { name: 'Grid', icon: <GridIcon size={24} /> },
    { name: 'List', icon: <ListIcon size={24} /> },
    { name: 'Logout', icon: <LogoutIcon size={24} /> },
    { name: 'Trash', icon: <TrashIcon size={24} /> },
    { name: 'Edit', icon: <EditIcon size={24} /> },
    { name: 'Plus', icon: <PlusIcon size={24} /> },
    { name: 'Bulb', icon: <BulbIcon size={24} /> },
    { name: 'Collapse', icon: <CollapseIcon size={24} /> },
    { name: 'Expand', icon: <ExpandIcon size={24} /> },
    { name: 'Directions', icon: <DirectionsArrowIcon size={24} /> },
    { name: 'Dropdown', icon: <DropdownArrowIcon size={24} /> },
    { name: 'BlueStacks', icon: <BlueStacksIcon size={24} /> },
    { name: 'FileImage', icon: <FileImageIcon size={24} /> },
    { name: 'FileDoc', icon: <FileDocIcon size={24} /> },
  ]

  return (
    <div className="flex flex-col gap-l">
      <AnatomyTable entries={anatomy} />
      <div className="flex flex-wrap gap-xl bg-bg-elements rounded-2xl p-xl border border-border-subtle">
        {allIcons.map(({ name, icon }) => (
          <div key={name} className="flex flex-col gap-xs items-center">
            <div className="w-10 h-10 flex items-center justify-center text-text-secondary">{icon}</div>
            <p className="font-body text-2xs text-text-tertiary">{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DarkModeRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  return (
    <div className="flex flex-col gap-l">
      <AnatomyTable entries={anatomy} />
      <div className="grid grid-cols-2 gap-xl">
        <div className="flex flex-col gap-m bg-base-950 rounded-2xl p-xl border border-base-800">
          <p className="font-display text-xs font-semibold text-white uppercase tracking-[1.5px]">Dark Mode Preview</p>
          <div className="flex flex-col gap-s">
            <div className="bg-base-925 rounded-xl p-m border border-base-800">
              <p className="font-display text-s font-semibold text-white">Card Background → #111827</p>
              <p className="font-body text-xs text-[#9A9EAB] mt-xxs">Secondary text → #9A9EAB</p>
            </div>
            <div className="bg-base-910 rounded-xl p-m">
              <p className="font-display text-s font-semibold text-white">Elevated → #1A2236</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-s bg-bg-elements rounded-2xl p-xl border border-border-subtle">
          <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-xs">Token → Light / Dark</p>
          {[
            { token: 'Background/Page BG', light: '#F1F1F1', dark: '#1A2236' },
            { token: 'Background/Card', light: '#FFFFFF', dark: '#111827' },
            { token: 'Text/Primary', light: '#030D2D', dark: '#FFFFFF' },
            { token: 'Text/Secondary', light: '#4F566C', dark: '#9A9EAB' },
            { token: 'Border/Default', light: '#CDCFD5', dark: 'rgba(255,255,255,0.12)' },
          ].map(({ token, light, dark }) => (
            <div key={token} className="flex items-center justify-between gap-m">
              <p className="font-body text-2xs text-text-secondary">{token}</p>
              <div className="flex gap-s items-center">
                <div className="flex items-center gap-xxs">
                  <div className="w-4 h-4 rounded-[3px] border border-border-subtle" style={{ backgroundColor: light }} />
                  <span className="font-code text-2xs text-text-tertiary">{light}</span>
                </div>
                <span className="text-text-placeholder text-2xs">/</span>
                <div className="flex items-center gap-xxs">
                  <div className="w-4 h-4 rounded-[3px] border border-base-700" style={{ backgroundColor: dark }} />
                  <span className="font-code text-2xs text-text-tertiary">{dark}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Map foundation IDs to their renderer
export const FOUNDATION_RENDERERS: Record<string, React.ComponentType<{ anatomy: AnatomyEntry[] }>> = {
  colors: ColorsRenderer,
  typography: TypographyRenderer,
  spacing: SpacingRenderer,
  'shadows-radii': ShadowsRadiiRenderer,
  icons: IconsRenderer,
  'dark-mode': DarkModeRenderer,
}
