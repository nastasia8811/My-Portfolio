import { describe, it, expect } from 'vitest'
import { makeAboutVariants } from './aboutVariants'

describe('makeAboutVariants', () => {
  it('returns an object with paragraphs, paragraphItem, cards, cardItem keys', () => {
    const result = makeAboutVariants(false)
    expect(result).toHaveProperty('paragraphs')
    expect(result).toHaveProperty('paragraphItem')
    expect(result).toHaveProperty('cards')
    expect(result).toHaveProperty('cardItem')
  })

  describe('reduce = false (full motion)', () => {
    const v = makeAboutVariants(false)

    it('paragraphs.show staggers children by 0.1', () => {
      expect(v.paragraphs.show).toEqual({
        transition: { staggerChildren: 0.1 }
      })
    })

    it('paragraphItem.hidden includes y offset', () => {
      expect(v.paragraphItem.hidden).toEqual({ opacity: 0, y: 32 })
    })

    it('paragraphItem.show has duration 0.5 with custom ease', () => {
      const show = v.paragraphItem.show as Record<string, unknown>
      const transition = show.transition as Record<string, unknown>
      expect(transition.duration).toBe(0.5)
      expect(transition.ease).toEqual([0.22, 1, 0.36, 1])
    })

    it('cards.show staggers children by 0.12 with 0.05 delay', () => {
      expect(v.cards.show).toEqual({
        transition: { staggerChildren: 0.12, delayChildren: 0.05 }
      })
    })

    it('cardItem.hidden includes y offset of 40', () => {
      expect(v.cardItem.hidden).toEqual({ opacity: 0, y: 40 })
    })
  })

  describe('reduce = true (reduced motion)', () => {
    const v = makeAboutVariants(true)

    it('paragraphs.show has zero stagger', () => {
      expect(v.paragraphs.show).toEqual({
        transition: { staggerChildren: 0 }
      })
    })

    it('paragraphItem.hidden is opacity-only', () => {
      expect(v.paragraphItem.hidden).toEqual({ opacity: 0 })
    })

    it('paragraphItem.show has short 0.2 duration', () => {
      const show = v.paragraphItem.show as Record<string, unknown>
      const transition = show.transition as Record<string, unknown>
      expect(transition.duration).toBe(0.2)
    })

    it('cards.show has zero stagger and zero delay', () => {
      expect(v.cards.show).toEqual({
        transition: { staggerChildren: 0, delayChildren: 0 }
      })
    })

    it('cardItem.hidden is opacity-only', () => {
      expect(v.cardItem.hidden).toEqual({ opacity: 0 })
    })
  })
})
