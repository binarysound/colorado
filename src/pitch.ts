import { ColoradoError, integer } from './util'

const spnRegex = /^([A-G](#|b)?)(-?([1-9][0-9]+|[0-9]))$/
const heightOfPitchClass = {
  'A': 0,
  'A#': 1,
  'Ab': -1,
  'B': 2,
  'B#': 3,
  'Bb': 1,
  'C': -9,
  'C#': -8,
  'Cb': -10,
  'D': -7,
  'D#': -6,
  'Db': -8,
  'E': -5,
  'E#': -4,
  'Eb': -6,
  'F': -4,
  'F#': -3,
  'Fb': -5,
  'G': -2,
  'G#': -1,
  'Gb': -3,
}

export default class Pitch {
  public static isValidSPN(spn: string): boolean {
    return spnRegex.test(spn)
  }

  /*
  Be careful that the `Pitch` object returned by this `fromSPN` is meaningful
  only if the current tuning system is 12 tone equal temperament (12-TET) or
  12 tone just intonation. Check the following link for more details about
  Scientific Pitch Notation (SPN).
  https://en.wikipedia.org/wiki/Scientific_pitch_notation
  */
  public static fromSPN(spn: string): Pitch {
    if (!Pitch.isValidSPN(spn)) {
      throw new ColoradoError('Valid SPN should be given')
    }
    const match = spnRegex.exec(spn)
    const pitchClass = match[1]
    const octave = match[3]

    const octaveOffset = parseInt(octave, 10) - 4
    const height = heightOfPitchClass[pitchClass] + 12 * octaveOffset
    return new Pitch(height)
  }

  @integer
  public height: number

  constructor(height: number) {
    this.height = height
  }
}
