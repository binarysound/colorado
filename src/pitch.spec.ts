import Pitch from '@/pitch'

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
    expect(Pitch.isValidSPN('d3')).toBe(false)
    expect(Pitch.isValidSPN('X4')).toBe(false)
    expect(Pitch.isValidSPN('4')).toBe(false)
    expect(Pitch.isValidSPN('Gk4')).toBe(false)
    expect(Pitch.isValidSPN('F#003')).toBe(false)
  })
})

describe('Pitch.fromSPN', () => {
  it('should create correct `Pitch` object for correct pitch notations', () => {
    expect(Pitch.fromSPN('Cb5').height).toBe(2)
    expect(Pitch.fromSPN('C5').height).toBe(3)
    expect(Pitch.fromSPN('C#-3').height).toBe(-92)
    expect(Pitch.fromSPN('Db-3').height).toBe(-92)
    expect(Pitch.fromSPN('D5').height).toBe(5)
    expect(Pitch.fromSPN('D#10').height).toBe(66)
    expect(Pitch.fromSPN('Eb10').height).toBe(66)
    expect(Pitch.fromSPN('E5').height).toBe(7)
    expect(Pitch.fromSPN('E#6').height).toBe(20)
    expect(Pitch.fromSPN('Fb5').height).toBe(7)
    expect(Pitch.fromSPN('F6').height).toBe(20)
    expect(Pitch.fromSPN('F#4').height).toBe(-3)
    expect(Pitch.fromSPN('Gb4').height).toBe(-3)
    expect(Pitch.fromSPN('G5').height).toBe(10)
    expect(Pitch.fromSPN('G#0').height).toBe(-49)
    expect(Pitch.fromSPN('Ab0').height).toBe(-49)
    expect(Pitch.fromSPN('A4').height).toBe(0)
    expect(Pitch.fromSPN('A#1').height).toBe(-35)
    expect(Pitch.fromSPN('Bb1').height).toBe(-35)
    expect(Pitch.fromSPN('B4').height).toBe(2)
    expect(Pitch.fromSPN('B#4').height).toBe(3)
  })

  it('should throw an error for invalid pitch notations', () => {
    const errMsg = 'Valid SPN should be given'
    expect(() => {
      Pitch.fromSPN('C')
    }).toThrow(errMsg)
    expect(() => {
      Pitch.fromSPN('c')
    }).toThrow(errMsg)
    expect(() => {
      Pitch.fromSPN('C3.5')
    }).toThrow(errMsg)
    expect(() => {
      Pitch.fromSPN('F#003')
    }).toThrow(errMsg)
  })
})
