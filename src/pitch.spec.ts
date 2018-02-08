import Pitch from './pitch'

describe('Pitch', () => {
  it('should be initialized with height', () => {
    const pitch = new Pitch(3)

    expect(pitch.height).toBe(3)
  })
})
