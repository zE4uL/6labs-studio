import type { ComponentMeta, PropTypeInfo } from './types'
import { PropTable } from './PropTable'
import { AnatomyTable } from './AnatomyTable'
import { ExampleRenderer } from './ExampleRenderer'
import { TableOfContents, type TocEntry } from './TableOfContents'

interface ComponentPageProps {
  meta: ComponentMeta
  propTypes: PropTypeInfo
}

const CATEGORY_LABELS: Record<string, string> = {
  foundations: 'Foundations',
  atoms: 'Atoms',
  molecules: 'Molecules',
  organisms: 'Organisms',
}

export function ComponentPage({ meta, propTypes }: ComponentPageProps) {
  const hasPropTable = Object.keys(propTypes).length > 0
  const hasAnatomy = meta.anatomy.length > 0

  // Show Examples when:
  // 1. Custom demo component exists, OR
  // 2. Component + renderHints groups with matching propTypes, OR
  // 3. Component + auto-extractable string union props
  const hasDemo = meta.demo != null
  const hasAutoExamples = meta.component != null && (
    (meta.renderHints?.groups?.length ?? 0) > 0 ||
    Object.entries(propTypes).some(([, vals]) => typeof vals[0] === 'string' && vals.length > 1)
  )
  const hasExamples = hasDemo || hasAutoExamples

  const tocEntries: TocEntry[] = []
  if (hasExamples) {
    tocEntries.push({ id: 'examples', label: 'Examples', level: 0 })
  }
  if (hasPropTable) {
    tocEntries.push({ id: 'component-api', label: 'Component API', level: 0 })
  }
  if (hasAnatomy) {
    tocEntries.push({ id: 'anatomy', label: 'Anatomy', level: 0 })
  }

  return (
    <div className="flex gap-xl">
      <div className="flex-1 min-w-0 flex flex-col gap-xxl">
        {/* Breadcrumb + Title */}
        <div className="flex flex-col gap-xs">
          <div className="flex items-center gap-xxs">
            <span className="font-display text-2xs text-text-placeholder uppercase tracking-[1px]">
              {CATEGORY_LABELS[meta.category]}
            </span>
            <span className="font-body text-2xs text-text-placeholder">/</span>
            <span className="font-display text-2xs text-text-secondary font-medium uppercase tracking-[1px]">
              {meta.label}
            </span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-text-primary leading-[1.2]">
            {meta.label}
          </h1>
          <p className="font-body text-s text-text-secondary max-w-[600px] leading-[1.6]">
            {meta.description}
          </p>
        </div>

        {/* Examples — shown first (above API/Anatomy) like Tailwind docs */}
        {hasExamples && (
          <section id="examples" className="flex flex-col gap-m">
            <h2 className="font-display text-l font-semibold text-text-primary">Examples</h2>
            <ExampleRenderer
              component={meta.component}
              demo={meta.demo}
              propTypes={propTypes}
              renderHints={meta.renderHints}
            />
          </section>
        )}

        {/* Component API */}
        {hasPropTable && (
          <section id="component-api" className="flex flex-col gap-m">
            <h2 className="font-display text-l font-semibold text-text-primary">Component API</h2>
            <PropTable propTypes={propTypes} />
          </section>
        )}

        {/* Anatomy */}
        {hasAnatomy && (
          <section id="anatomy" className="flex flex-col gap-m">
            <h2 className="font-display text-l font-semibold text-text-primary">Anatomy</h2>
            <AnatomyTable entries={meta.anatomy} />
          </section>
        )}
      </div>

      {/* Right TOC */}
      <aside className="hidden xl:block w-[200px] shrink-0">
        <div className="sticky top-[80px]">
          <TableOfContents entries={tocEntries} />
        </div>
      </aside>
    </div>
  )
}
