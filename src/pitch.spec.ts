import Pitch from './pitch'

describe('Pitch', () => {
  it('should be initialized with height', () => {
    const pitch = new Pitch(3)

    expect(pitch.height).toBe(3)
  })
})

describe('Pitch.isValidSPN', () => {
  it('should return true for correct pitch notations', () => {
    expect(Pitch.isValidSPN('C#-1')).toBe(true)
    expect(Pitch.isValidSPN('B3')).toBe(true)
    expect(Pitch.isValidSPN('Ab4')).toBe(true)
    expect(Pitch.isValidSPN('F#-13')).toBe(true)
  })

  it('should return false for invalid pitch notations', () => {
    expect(Pitch.isValidSPN('C')).toBe(false)
    expect(Pitch.isValidSPN('D#')).toBe(false)
    expect(Pitch.isValidSPN('Gb')).toBe(false)
    expect(Pitch.isValidSPN('H')).toBe(false)
    expect(Pitch.isValidSPN('c')).toBe(false)
    expect(Pitch.isValidSPN('X4')).toBe(false)
    expect(Pitch.isValidSPN('4')).toBe(false)
    expect(Pitch.isValidSPN('Gk4')).toBe(false)
    expect(Pitch.isValidSPN('F#003')).toBe(false)
  })
})
