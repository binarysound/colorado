import { ColoradoError } from './util'

interface IConstructorOpt {
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
}

export const defaultTuningSystem = new TuningSystem()
