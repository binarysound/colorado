import { ColoradoError } from './util'

import Pitch from './pitch'

export interface IConstructorOpt {
  isEqualTemperament?: boolean,
  ratiosToConcertPitch?: number[],
  numberOfTones?: number,
}

export default class TuningSystem {
  public readonly isEqualTemperament: boolean
  public readonly ratiosToConcertPitch: number[] | null = null
  public readonly numberOfTones: number

  constructor({
    isEqualTemperament = true,
    ratiosToConcertPitch = null,
    numberOfTones = 12,
  }: IConstructorOpt = {}) {
    if (isEqualTemperament) {
      if (!Number.isInteger(numberOfTones)) {
        throw new ColoradoError('`numberOfTones` must be an integer.')
      } else if (numberOfTones < 1) {
        throw new ColoradoError(
          '`numberOfTones` must be at least 1.',
        )
      } else if (ratiosToConcertPitch) {
        throw new ColoradoError(
          '`isEqualTemperament` and `ratiosToConcertPitch` ' +
          'cannot be given at the same time.',
        )
      }

      this.numberOfTones = numberOfTones
    } else if (ratiosToConcertPitch) {
      ratiosToConcertPitch.sort()

      if (!ratiosToConcertPitch.length) {
        throw new ColoradoError(
          '`ratiosToConcertPitch` must have at least one value.',
        )
      } else if (
        !ratiosToConcertPitch.every((ratio) => 1 <= ratio && ratio < 2)
      ) {
        throw new ColoradoError(
          'Every ratio in `ratiosToConcertPitch` must be in range of 1-2.',
        )
      }

      this.ratiosToConcertPitch = ratiosToConcertPitch
      this.numberOfTones = ratiosToConcertPitch.length
    } else {
      throw new ColoradoError(
        '`ratiosToConcertPitch` must be given if it\'s not equal temperament.',
      )
    }

    this.isEqualTemperament = isEqualTemperament
  }

  public getMidi(pitch: Pitch): number {
    if (this.numberOfTones === 12) {
      /*
      Pitch::height is the distance between base tone and the pitch
      in unit interval in given pitch system, hence in 12-tone pitch system,
      height of A4 is 0. Since MIDI note number of A4 is 69,
      pitch.height + 69 makes the MIDI note number of given pitch.

      http://subsynth.sourceforge.net/midinote2freq.html
      */
      return pitch.height + 69
    } else {
      /*
        TODO: We have a long-term plan to support microtones,
        therefore we're going to provide some API that returns
        MIDI note containing microtonal information.
        In that case, this function should also work even if
        given TuningSystem doesn't consist of 12 tones.
      */
      throw new ColoradoError(
        'MIDI note number cannot be determined if given pitch system ' +
        'does not consist of 12 tones.',
      )
    }
  }
}

export const defaultTuningSystem = new TuningSystem()
