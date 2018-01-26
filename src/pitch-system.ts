import { ColoradoError } from './util'

import TuningSystem, { defaultTuningSystem } from './tuning-system'

interface IConstructorOpt {
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
}

export const defaultPitchSystem = new PitchSystem()
