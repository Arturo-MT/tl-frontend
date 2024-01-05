export function omitNull(obj: Record<string, unknown>) {
  const o = { ...obj }
  Object.keys(o)
    .filter((k) => o[k] === null)
    .forEach((k) => delete o[k])
  return o
}
