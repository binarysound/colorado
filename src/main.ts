export function isValidPitch(pitch: string): boolean {
  return /^[A-G](#|b)?[0-9]?$/.test(pitch)
}
