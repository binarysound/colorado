import { isInteger } from './polyfill'

describe('Polyfill', () => {
  describe('Number', () => {
    it('should have `isInteger`', () => {
      expect(isInteger(3)).toBe(true)
      expect(isInteger(2.3)).toBe(false)
      expect(isInteger(NaN)).toBe(false)
      expect(isInteger('0')).toBe(false)
      expect(isInteger('123')).toBe(false)
      expect(isInteger({foo: 'bar'})).toBe(false)
    })
  })
})
