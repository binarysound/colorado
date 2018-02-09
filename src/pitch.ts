import { integer } from './util'

export default class Pitch {
  public static isValidSPN(spn: string): boolean {
    return /^[A-G](#|b)?-?([1-9][0-9]+|[0-9])$/.test(spn)
  }

  @integer
  public height: number

  constructor(height: number) {
    this.height = height
  }
}
