import { isValidPitch } from './main'

describe('isValidPitch', () => {
  it('should return true for correct pitch notations', () => {
    expect(isValidPitch('C')).toBe(true)
    expect(isValidPitch('D#')).toBe(true)
    expect(isValidPitch('Gb')).toBe(true)
    expect(isValidPitch('B3')).toBe(true)
    expect(isValidPitch('Ab4')).toBe(true)
  })

  it('should return false for invalid pitch notations', () => {
    expect(isValidPitch('H')).toBe(false)
    expect(isValidPitch('c')).toBe(false)
  })
})
