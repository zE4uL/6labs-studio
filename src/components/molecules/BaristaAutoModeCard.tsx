/**
 * BaristaAutoModeCard — Auto mode toggle card shown at the top of the Barista panel body.
 * When OFF: "Barista suggests, you approve" — Barista queues a suggested question the user approves.
 * When ON:  "Barista drives the conversation" — Barista runs follow-ups autonomously.
 *
 * Uses a larger 36×22 switch to match Figma (the default Apparatus Toggle is 24×14).
 *
 * @figmaComponent  Barista/ Auto Mode Card
 * @figmaNode       6030:113851
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6030-113851
 */

export interface BaristaAutoModeCardProps {
  active: boolean
  onChange: (next: boolean) => void
  className?: string
}

export function BaristaAutoModeCard({ active, onChange, className = '' }: BaristaAutoModeCardProps) {
  return (
    <div
      className={`flex items-center gap-[8px] px-[16px] py-[12px] w-full ${className}`}
      style={{
        backgroundColor: '#F7F7F7',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex flex-col gap-[2px] flex-1 min-w-0">
        <p
          className="font-[Bricolage_Grotesque] font-semibold text-[14px] leading-[1.5]"
          style={{ color: 'var(--text-primary)' }}
        >
          Auto mode
        </p>
        <p
          className="font-[Inter] text-[12px] leading-[1.5]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {active ? 'Barista drives the conversation' : 'Barista suggests, you approve'}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label="Toggle Barista auto mode"
        onClick={() => onChange(!active)}
        className="relative shrink-0 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--border-focus)]"
        style={{
          width: 36,
          height: 22,
          backgroundColor: active ? 'var(--brand)' : 'var(--border-default)',
        }}
      >
        <span
          className="absolute top-[3px] block rounded-full transition-all duration-150"
          style={{
            width: 16,
            height: 16,
            left: active ? 17 : 3,
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.15)',
          }}
        />
      </button>
    </div>
  )
}
