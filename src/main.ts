import './polyfill'

export { default as Pitch } from './pitch'
export { default as PitchSystem } from './pitch-system'
export { default as TuningSystem } from './tuning-system'

export function isValidPitch(pitch: string): boolean {
  return /^[A-G](#|b)?[0-9]?$/.test(pitch)
}
