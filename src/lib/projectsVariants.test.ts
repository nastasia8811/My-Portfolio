import { describe, it, expect } from 'vitest'
import { makeProjectsVariants } from './projectsVariants'

describe('makeProjectsVariants', () => {
  it('returns container and item variant objects', () => {
    const result = makeProjectsVariants(false)
    expect(result).toHaveProperty('container')
    expect(result).toHaveProperty('item')
  })

  describe('reduce = false (full motion)', () => {
    const v = makeProjectsVariants(false)

    it('container.show staggers children by 0.12 with 0.05 delay', () => {
      expect(v.container.show).toEqual({
        transition: { staggerChildren: 0.12, delayChildren: 0.05 }
      })
    })

    it('item.hidden is a function', () => {
      expect(typeof v.item.hidden).toBe('function')
    })

    it('item.hidden slides odd-index items from the left', () => {
      const hidden = v.item.hidden as (custom: { index: number }) => Record<string, unknown>
      expect(hidden({ index: 1 })).toEqual({ opacity: 0, x: -32, y: 0 })
    })

    it('item.hidden slides even-index items from below', () => {
      const hidden = v.item.hidden as (custom: { index: number }) => Record<string, unknown>
      expect(hidden({ index: 0 })).toEqual({ opacity: 0, x: 0, y: 40 })
    })

    it('item.show has duration 0.5 with custom ease', () => {
      const show = v.item.show as Record<string, unknown>
      const transition = show.transition as Record<string, unknown>
      expect(transition.duration).toBe(0.5)
      expect(transition.ease).toEqual([0.22, 1, 0.36, 1])
    })
  })

  describe('reduce = true (reduced motion)', () => {
    const v = makeProjectsVariants(true)

    it('container.show has zero stagger and delay', () => {
      expect(v.container.show).toEqual({
        transition: { staggerChildren: 0, delayChildren: 0 }
      })
    })

    it('item.hidden returns opacity-only regardless of index', () => {
      const hidden = v.item.hidden as (custom: { index: number }) => Record<string, unknown>
      expect(hidden({ index: 0 })).toEqual({ opacity: 0 })
      expect(hidden({ index: 1 })).toEqual({ opacity: 0 })
    })

    it('item.show resets x and y to 0', () => {
      const show = v.item.show as Record<string, unknown>
      expect(show.x).toBe(0)
      expect(show.y).toBe(0)
    })

    it('item.show has short 0.2 duration', () => {
      const show = v.item.show as Record<string, unknown>
      const transition = show.transition as Record<string, unknown>
      expect(transition.duration).toBe(0.2)
    })
  })
})
