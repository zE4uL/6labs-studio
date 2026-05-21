/**
 * ConnectorDetailView — Full detail page for a specific connector.
 * Anatomy: breadcrumb + header (icon, name, tags, connect button) + About + What You Get + How To Connect.
 * Opens when clicking a connector card from ContextConnectorsView.
 *
 * @figmaComponent  Coonector Detail Page
 * @figmaPath       Context / Coonector Detail Page / Body / Container / Main Content
 * @figmaNode       6419:75469
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6419-75469
 */

import type { ReactNode } from 'react'
import {
  ConnectionStatusPill,
  type ConnectionVerdict,
} from '../atoms/ConnectionStatusPill'

export interface ConnectorDetail {
  id: string
  icon: ReactNode
  name: string
  tags: { label: string; variant: 'neutral' | 'brand' }[]
  iconTint: string
  about: string
  benefits: string[]
  steps: string[]
}

interface ConnectorDetailViewProps {
  connector: ConnectorDetail
  /** Backend tri-state verdict. Collapses to a binary user-facing pill. */
  verdict?: ConnectionVerdict
  /** When provided, the Connect button is enabled and calls this on click. */
  onConnect?: () => void
  className?: string
}

function CheckIcon() {
  return (
    <div className="shrink-0 size-[20px] relative">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="var(--success)" fillOpacity="0.12" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.186 7.147a.583.583 0 0 1 .047.823l-4.842 5.49a.583.583 0 0 1-.833.053l-2.31-2.018a.583.583 0 0 1 .766-.88l1.868 1.631 4.452-5.048a.583.583 0 0 1 .823-.047l.03-.004Z"
          fill="var(--success)"
          transform="translate(2 2) scale(0.8)"
        />
      </svg>
    </div>
  )
}

export function ConnectorDetailView({
  connector,
  verdict,
  onConnect,
  className,
}: ConnectorDetailViewProps) {
  const connectEnabled = !!onConnect
  return (
    <div
      className={['flex flex-col w-full', className]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-m items-center">
          {/* Brand icon */}
          <div
            className="shrink-0 size-[72px] rounded-xl overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: connector.iconTint }}
          >
            {connector.icon}
          </div>

          {/* Name + tags */}
          <div className="flex flex-col gap-s items-start">
            <div className="flex items-center gap-s">
              <h1
                className="font-display text-xl font-semibold whitespace-nowrap leading-normal"
                style={{ color: 'var(--text-primary)' }}
              >
                {connector.name}
              </h1>
              {verdict !== undefined && <ConnectionStatusPill verdict={verdict} />}
            </div>
            <div className="flex gap-xs items-center">
              {connector.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="inline-flex items-center justify-center px-s py-xxs rounded-[20px] font-body text-s font-medium whitespace-nowrap"
                  style={
                    tag.variant === 'brand'
                      ? {
                          backgroundColor: 'var(--bg-tint-light)',
                          border: '1px solid var(--border-tint)',
                          color: 'var(--brand)',
                        }
                      : {
                          backgroundColor: 'var(--bg-subtle)',
                          border: '1px solid var(--border-default)',
                          color: 'var(--text-secondary)',
                        }
                  }
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Connect button */}
        <button
          disabled={!connectEnabled}
          onClick={onConnect}
          className="font-display text-s font-semibold px-xl py-s rounded-[8px] leading-[20px]"
          style={
            connectEnabled
              ? { backgroundColor: 'var(--brand)', color: 'var(--text-on-brand)' }
              : { backgroundColor: 'var(--border-default)', color: 'var(--text-tertiary)' }
          }
        >
          Connect {connector.name}
        </button>
      </div>

      {/* Content sections */}
      <div className="flex flex-col gap-[40px] mt-[60px] w-full">
        {/* About */}
        <section className="flex flex-col gap-xs leading-[1.5]">
          <h2
            className="font-display text-m font-semibold whitespace-nowrap"
            style={{ color: 'var(--text-primary)' }}
          >
            About
          </h2>
          <p className="font-body text-s text-base-700">
            {connector.about}
          </p>
        </section>

        {/* What You Get */}
        <section className="flex flex-col gap-s">
          <h2
            className="font-display text-m font-semibold leading-[1.5] whitespace-nowrap"
            style={{ color: 'var(--text-primary)' }}
          >
            What You Get
          </h2>
          {connector.benefits.map((benefit) => (
            <div key={benefit} className="flex gap-xs items-center w-full">
              <CheckIcon />
              <p className="flex-1 min-w-0 font-body text-s text-base-700 leading-[1.5]">
                {benefit}
              </p>
            </div>
          ))}
        </section>

        {/* How To Connect */}
        <section className="flex flex-col gap-s">
          <h2
            className="font-display text-m font-semibold leading-[1.5] whitespace-nowrap"
            style={{ color: 'var(--text-primary)' }}
          >
            How To Connect
          </h2>
          {connector.steps.map((step, i) => (
            <div
              key={step}
              className="flex gap-m items-center w-full p-l rounded-xl"
              style={{
                backgroundColor: 'var(--bg-elements)',
                border: '1px solid var(--border-default)',
              }}
            >
              {/* Number circle */}
              <div
                className="shrink-0 size-[32px] rounded-[16px] flex items-center justify-center"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                <span className="font-display text-[13px] font-semibold text-white text-center leading-normal">
                  {i + 1}
                </span>
              </div>
              <p className="flex-1 min-w-0 font-body text-s text-base-700 leading-[1.5]">
                {step}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
