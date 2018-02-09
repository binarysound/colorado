import { ColoradoError, integer } from './util'

export default class Pitch {
  public static isValidSPN(spn: string): boolean {
    return /^[A-G](#|b)?-?([1-9][0-9]+|[0-9])$/.test(spn)
  }

  public static fromSPN(spn: string): Pitch {
    if (!Pitch.isValidSPN(spn)) {
      throw new ColoradoError('Valid SPN should be given')
    }
    const spnRegex = /^([A-G](#|b)?)(-?([1-9][0-9]+|[0-9]))$/
    const match = spnRegex.exec(spn)
    let height: number
    switch (match[1]) {
      // A4 is height 0
      case 'A': height = 0; break
      case 'A#':
      case 'Bb': height = 1; break
      case 'B': height = 2; break
      case 'B#': height = 3; break
      case 'Cb': height = -10; break
      case 'C': height = -9; break
      case 'C#':
      case 'Db': height = -8; break
      case 'D': height = -7; break
      case 'D#':
      case 'Eb': height = -6; break
      case 'E':
      case 'Fb': height = -5; break
      case 'E#':
      case 'F': height = -4; break
      case 'F#':
      case 'Gb': height = -3; break
      case 'G': height = -2; break
      case 'G#':
      case 'Ab': height = -1; break
    }
    // Parse octave notation
    height = height + 12 * (parseInt(match[3], 10) - 4)
    return new Pitch(height)
  }

  @integer
  public height: number

  constructor(height: number) {
    this.height = height
  }
}
