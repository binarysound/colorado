import { integer } from './util'

export default class Pitch {
  @integer
  public height: number

  constructor(height: number) {
    this.height = height
  }
}
