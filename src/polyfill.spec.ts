import './polyfill'

describe('Polyfill', () => {
  describe('Number', () => {
    it('should have `isInteger`', () => {
      expect(Number.isInteger(3)).toBe(true)
      expect(Number.isInteger(2.3)).toBe(false)
      expect(Number.isInteger(NaN)).toBe(false)
      expect(Number.isInteger('0')).toBe(false)
      expect(Number.isInteger('123')).toBe(false)
      expect(Number.isInteger({foo: 'bar'})).toBe(false)
    })
  })
})
