import { ColoradoError } from './util'

import Pitch from './pitch'
import TuningSystem, { defaultTuningSystem } from './tuning-system'

describe('TuningSystem', () => {
  describe('constructor', () => {
    it('should be able to be initialized by default argument', () => {
      const tuningSystem = new TuningSystem()

      expect(tuningSystem.isEqualTemperament).toBe(true)
      expect(tuningSystem.numberOfTones).toBe(12)
    })

    it('should be able to create non equal temperament system', () => {
      const ratiosToConcertPitch = [1.0, 1.3, 1.6, 1.8]
      const tuningSystem = new TuningSystem({
        isEqualTemperament: false,
        ratiosToConcertPitch,
      })

      expect(tuningSystem.isEqualTemperament).toBe(false)
      expect(tuningSystem.numberOfTones).toBe(ratiosToConcertPitch.length)
      expect(tuningSystem.ratiosToConcertPitch).toEqual(ratiosToConcertPitch)
    })

    it('should throw when number of tones is invalid.', () => {
      expect(() => {
        new TuningSystem({
          numberOfTones: 1.3,
        })
      }).toThrow(
        '`numberOfTones` must be an integer.',
      )

      expect(() => {
        new TuningSystem({
          numberOfTones: 0,
        })
      }).toThrow(
        '`numberOfTones` must be at least 1.',
      )
    })

    it('should throw when it does not meet ' +
    'conditions for equal temperament', () => {
      expect(() => {
        new TuningSystem({
          isEqualTemperament: true,
          ratiosToConcertPitch: [1.0, 1.3, 1.5, 2.0],
        })
      }).toThrow(
        '`isEqualTemperament` and `ratiosToConcertPitch` ' +
        'cannot be given at the same time.',
      )
    })

    it(
      'should throw when ratiosToConcertPitch are not given ' +
      'if it\'s not equal temperament',
      () => {
        expect(() => {
          new TuningSystem({
            isEqualTemperament: false,
          })
        }).toThrow(
          '`ratiosToConcertPitch` must be given ' +
          'if it\'s not equal temperament.',
        )
      },
    )

    it(
      'should throw when no ratio is given if it\'s not equal temperament',
      () => {
        expect(() => {
          new TuningSystem({
            isEqualTemperament: false,
            ratiosToConcertPitch: [],
          })
        }).toThrow(
          '`ratiosToConcertPitch` must have at least one value.',
        )
      },
    )

    it('should throw when ratiosToConcertPitch are not in valid range', () => {
      const errorMsg =
        'Every ratio in `ratiosToConcertPitch` must be in range of 1-2.'

      expect(() => {
        new TuningSystem({
          isEqualTemperament: false,
          ratiosToConcertPitch: [1.3, 0.8, 1.7],
        })
      }).toThrow(errorMsg)

      expect(() => {
        new TuningSystem({
          isEqualTemperament: false,
          ratiosToConcertPitch: [1.6, 2.0],
        })
      }).toThrow(errorMsg)
    })
  })

  describe('defaultTuningSystem', () => {
    it('should be 12-TET', () => {
      expect(defaultTuningSystem.isEqualTemperament).toBe(true)
      expect(defaultTuningSystem.numberOfTones).toBe(12)
    })
  })

  describe('getMidi', () => {
    it('should return corresponding MIDI note number of given pitch', () => {
      const pitch = new Pitch(0)

      expect(defaultTuningSystem.getMidi(pitch)).toBe(69)
    })

    it(
      'should not determine MIDI note number of non-12-tone tuning system',
      () => {
        const pitch = new Pitch(0)
        const tuningSystem = new TuningSystem({
          numberOfTones: 11,
        })

        expect(() => {
          tuningSystem.getMidi(pitch)
        }).toThrow(
          'MIDI note number cannot be determined ' +
          'if given pitch system is not consist of 12 tones.',
        )
      },
    )
  })
})
