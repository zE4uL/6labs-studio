import type { AnatomyEntry } from './types'

export function AnatomyTable({ entries }: { entries: AnatomyEntry[] }) {
  if (!entries.length) return null
  return (
    <div className="bg-bg-elements border border-border-subtle rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border-subtle bg-bg-page">
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Property</th>
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Tailwind Token</th>
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Figma Variable</th>
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Value</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={i} className="border-b border-border-subtle last:border-b-0 hover:bg-bg-page/50 transition-colors">
              <td className="font-body text-xs text-text-primary px-m py-xs">{e.property}</td>
              <td className="font-code text-2xs text-brand px-m py-xs">{e.token}</td>
              <td className="font-code text-2xs text-text-secondary px-m py-xs">{e.variable}</td>
              <td className="font-code text-2xs text-text-tertiary px-m py-xs">{e.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
