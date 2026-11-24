import { describe, expect, it } from 'vitest'
import { products, timeline, type L } from './products'
import { flows } from './flows'
import zh from '../i18n/zh'
import en from '../i18n/en'

// 递归收集对象中的所有 L（含 zh / en 键）
function collectL(value: unknown, path: string, out: [string, L][]) {
  if (!value || typeof value !== 'object') return
  const o = value as Record<string, unknown>
  if (typeof o.zh === 'string' && typeof o.en === 'string' && Object.keys(o).length === 2) {
    out.push([path, o as L])
    return
  }
  for (const [k, v] of Object.entries(o)) collectL(v, `${path}.${k}`, out)
}

// 展平为 key 集合
function keys(o: unknown, prefix = ''): string[] {
  if (typeof o === 'string') return [prefix]
  if (Array.isArray(o)) return o.flatMap((v, i) => keys(v, `${prefix}[${i}]`))
  return Object.entries(o as object).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k))
}

describe('products data', () => {
  it('has five products with unique ids', () => {
    expect(products.map((p) => p.id).sort()).toEqual(['deployer', 'flight', 'identity', 'recorder', 'travelai'])
  })

  it('every localized string has non-empty zh and en', () => {
    const all: [string, L][] = []
    collectL(products, 'products', all)
    collectL(flows, 'flows', all)
    expect(all.length).toBeGreaterThan(50)
    for (const [path, l] of all) {
      expect(l.zh.trim(), `${path}.zh`).not.toBe('')
      expect(l.en.trim(), `${path}.en`).not.toBe('')
    }
  })

  it('every product has links and at least three stats', () => {
    for (const p of products) {
      expect(p.links.length, p.id).toBeGreaterThan(0)
      expect(p.stats.length, p.id).toBe(3)
      if (p.version) expect(p.version, p.id).toMatch(/^v\d/)
    }
  })

  it('records the confirmed open-source status of every product', () => {
    const status = Object.fromEntries(products.map((p) => [p.id, p.openness]))
    expect(status).toEqual({
      identity: 'closed',
      travelai: 'closed',
      recorder: 'closed',
      deployer: 'open',
      flight: 'partial',
    })
  })

  it('timeline is sorted newest first', () => {
    const dates = timeline.map((p) => p.released)
    expect(dates).toEqual([...dates].sort().reverse())
  })
})

describe('i18n messages', () => {
  it('zh and en have identical key sets', () => {
    expect(keys(en).sort()).toEqual(keys(zh).sort())
  })
})
