export class ColoradoError extends Error {}

export function integer(target: object, key: string) {
  const privateKey = `_${key}`

  const getter = function() {
    return this[privateKey]
  }

  const setter = function(newValue: number) {
    if (Number.isInteger(newValue)) {
      this[privateKey] = newValue
    } else {
      throw new ColoradoError(`\`${key}\` must be an integer.`)
    }
  }

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
  })
}
