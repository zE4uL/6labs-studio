import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import type { Plugin } from 'vite'

/**
 * Vite plugin that auto-extracts exported TypeScript union types from component
 * files and injects them as __propTypes into the corresponding .anatomy.ts module.
 */
export default function propTypesPlugin(): Plugin {
  return {
    name: 'vite-plugin-prop-types',
    enforce: 'pre',

    transform(code: string, id: string) {
      if (!id.endsWith('.anatomy.ts')) return null

      const baseName = id.replace(/\.anatomy\.ts$/, '')
      const tsxPath = `${baseName}.tsx`

      let tsxSource: string
      try {
        tsxSource = readFileSync(resolve(tsxPath), 'utf-8')
      } catch {
        return null
      }

      const propTypes: Record<string, string[]> = {}

      // Extract exported type unions — handles both single-line and multi-line:
      //   export type Foo = 'a' | 'b' | 'c'
      //   export type Foo =\n  | 'a'\n  | 'b'\n  | 'c'
      const typeMap = new Map<string, string[]>()
      const typeNameRegex = /(?:export\s+)?type\s+(\w+)\s*=\s*([\s\S]*?)(?=\n\n(?:export|type|interface|const|function)|\ninterface|\nconst\s|\nfunction\s|\nexport\s+(?:type|interface|const|function|default)|$)/g
      let match: RegExpExecArray | null
      while ((match = typeNameRegex.exec(tsxSource)) !== null) {
        const typeName = match[1]
        const body = match[2]
        const values = body.match(/'([^']+)'/g)?.map(v => v.slice(1, -1)) ?? []
        if (values.length > 0) {
          typeMap.set(typeName, values)
        }
      }

      // Find interface props and map prop names to type names
      const interfaceRegex = /interface\s+\w*Props[^{]*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/s
      const interfaceMatch = interfaceRegex.exec(tsxSource)
      if (interfaceMatch) {
        const body = interfaceMatch[1]

        // Match lines like: variant?: ButtonVariant
        const propRegex = /(\w+)\??\s*:\s*(\w+)/g
        let propMatch: RegExpExecArray | null
        while ((propMatch = propRegex.exec(body)) !== null) {
          const propName = propMatch[1]
          const typeName = propMatch[2]
          if (typeMap.has(typeName)) {
            propTypes[propName] = typeMap.get(typeName)!
          }
          // Skip boolean props — they cause side effects (isOpen, disabled, etc.)
          // and are only useful when explicitly declared in renderHints
        }

        // Also check for inline union types: variant?: 'a' | 'b'
        const inlineRegex = /(\w+)\??\s*:\s*((?:'[^']+'\s*\|\s*)*'[^']+')/g
        let inlineMatch: RegExpExecArray | null
        while ((inlineMatch = inlineRegex.exec(body)) !== null) {
          const propName = inlineMatch[1]
          const values = inlineMatch[2].match(/'([^']+)'/g)?.map(v => v.slice(1, -1)) ?? []
          if (values.length > 0) {
            propTypes[propName] = values
          }
        }
      }

      if (Object.keys(propTypes).length === 0) return null

      const injection = `\nexport const __propTypes = ${JSON.stringify(propTypes)};\nif (typeof meta !== 'undefined') (meta as any).__propTypes = __propTypes;\n`
      return {
        code: code + injection,
        map: null,
      }
    },
  }
}
