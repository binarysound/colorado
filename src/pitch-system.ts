import { ColoradoError } from '@/util'

import Pitch from '@/pitch'
import TuningSystem, { defaultTuningSystem } from '@/tuning-system'

export interface IConstructorOpt {
  concertPitch?: number,
  tuningSystem?: TuningSystem,
}

export default class PitchSystem {
  public readonly concertPitch: number
  public readonly tuningSystem: TuningSystem

  constructor({
    concertPitch = 440,
    tuningSystem = defaultTuningSystem,
  }: IConstructorOpt = {}) {
    if (concertPitch <= 0) {
      throw new ColoradoError(
        '`concertPitch` must be bigger than 0.',
      )
    }

    if (!tuningSystem) {
      throw new ColoradoError(
        '`tuningSystem` must be given.',
      )
    }

    this.concertPitch = concertPitch
    this.tuningSystem = tuningSystem
  }

  public getFrequency(pitch: Pitch): number {
    const numberOfTones = this.tuningSystem.numberOfTones

    if (this.tuningSystem.isEqualTemperament) {
      return this.concertPitch *
        Math.pow(2, pitch.height / numberOfTones)
    } else {
      const ratiosToConcertPitch = this.tuningSystem.ratiosToConcertPitch
      const octaveDiff = Math.floor(pitch.height / numberOfTones)
      const mod = pitch.height % numberOfTones
      const unitIntervalsToGoUp = mod < 0 ?
        mod + numberOfTones : mod

      return this.concertPitch *
        Math.pow(2, octaveDiff) * ratiosToConcertPitch[unitIntervalsToGoUp]
    }
  }
}

export const defaultPitchSystem = new PitchSystem()
