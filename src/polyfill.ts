/* tslint:disable:interface-name */

/* tslint:disable-next-line:max-line-length */
/* https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger */

declare global {
  interface NumberConstructor {
    isInteger(value: any): boolean
  }
}

export function isInteger(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value
}

Number.isInteger = Number.isInteger || isInteger
