import type { PropTypeInfo } from './types'

export function PropTable({ propTypes }: { propTypes: PropTypeInfo }) {
  const entries = Object.entries(propTypes)
  if (!entries.length) return null

  return (
    <div className="bg-bg-elements border border-border-subtle rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border-subtle bg-bg-page">
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Prop</th>
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Type</th>
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Values</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([prop, values]) => (
            <tr key={prop} className="border-b border-border-subtle last:border-b-0 hover:bg-bg-page/50 transition-colors">
              <td className="font-code text-xs text-brand px-m py-xs">{prop}</td>
              <td className="font-code text-2xs text-text-secondary px-m py-xs">
                {typeof values[0] === 'boolean' ? 'boolean' : 'string'}
              </td>
              <td className="font-code text-2xs text-text-tertiary px-m py-xs">
                {typeof values[0] === 'boolean'
                  ? 'true | false'
                  : (values as string[]).map(v => `'${v}'`).join(' | ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
