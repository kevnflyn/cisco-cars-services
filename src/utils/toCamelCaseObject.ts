import { toCamelCase } from './toCamelCase'

export const toCamelCaseObject = (object: Dictionary): Dictionary => (
  Object
    .keys(object)
    .reduce((camelCaseObject, key) => ({
      ...camelCaseObject,
      [toCamelCase(key)]: Object.getPrototypeOf(object[key]) === Object.prototype
        ? toCamelCaseObject(object[key])
        : object[key]
    }), {})
)
