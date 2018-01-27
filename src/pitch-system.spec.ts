import PitchSystem, { defaultPitchSystem } from './pitch-system'
import TuningSystem, { defaultTuningSystem } from './tuning-system'

describe('PitchSystem', () => {
  describe('constructor', () => {
    it('should be able to be initialized by default argument', () => {
      const pitchSystem = new PitchSystem()

      expect(pitchSystem.tuningSystem).toBe(defaultTuningSystem)
      expect(pitchSystem.concertPitch).toBe(440)
    })

    it('should be able to create an non standard pitch system', () => {
      const tuningSystem = new TuningSystem({
        isEqualTemperament: true,
        numberOfTones: 24,
      })

      const pitchSystem = new PitchSystem({
        concertPitch: 432,
        tuningSystem,
      })

      expect(pitchSystem.concertPitch).toBe(432)
      expect(pitchSystem.tuningSystem.isEqualTemperament).toBe(true)
      expect(pitchSystem.tuningSystem.numberOfTones).toBe(24)
    })

    it('should take valid concert pitch only', () => {
      const errorMsg = '`concertPitch` must be bigger than 0.'

      expect(() => {
        new PitchSystem({
          concertPitch: 0,
        })
      }).toThrow(errorMsg)

      expect(() => {
        new PitchSystem({
          concertPitch: -2.3,
        })
      }).toThrow(errorMsg)
    })

    it('must take tuning system', () => {
      expect(() => {
        new PitchSystem({
          tuningSystem: null,
        })
      }).toThrow('`tuningSystem` must be given.')
    })
  })

  describe('defaultPitchSystem', () => {
    it('should be 12-ET and have 440Hz as pitch standard', () => {
      expect(defaultPitchSystem.tuningSystem).toBe(defaultTuningSystem)
      expect(defaultPitchSystem.concertPitch).toBe(440)
    })
  })
})
