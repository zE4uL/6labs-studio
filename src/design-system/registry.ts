import type { ComponentMeta, Category } from './types'

const anatomyModules = import.meta.glob<{ meta: ComponentMeta }>(
  '../components/**/*.anatomy.ts',
  { eager: true }
)

export const registry = new Map<string, ComponentMeta>()

for (const [, mod] of Object.entries(anatomyModules)) {
  registry.set(mod.meta.id, mod.meta)
}

const CATEGORY_ORDER: Category[] = ['foundations', 'atoms', 'molecules', 'organisms']

export function getEntriesByCategory(): { category: Category; label: string; description: string; entries: ComponentMeta[] }[] {
  const labels: Record<Category, string> = {
    foundations: 'Foundations',
    atoms: 'Atoms',
    molecules: 'Molecules',
    organisms: 'Organisms',
  }
  const descriptions: Record<Category, string> = {
    foundations: 'Design tokens — color, type, spacing, elevation',
    atoms: 'Smallest UI building blocks',
    molecules: 'Composed from multiple atoms',
    organisms: 'Complex, self-contained UI regions',
  }

  return CATEGORY_ORDER.map(cat => ({
    category: cat,
    label: labels[cat],
    description: descriptions[cat],
    entries: Array.from(registry.values())
      .filter(m => m.category === cat)
      .sort((a, b) => a.label.localeCompare(b.label)),
  }))
}
