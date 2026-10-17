type WithoutUndefined<T> = { [K in keyof T]?: Exclude<T[K], undefined> }

export function omitUndefined<T extends object>(obj: T): WithoutUndefined<T> {
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (obj[key] !== undefined) result[key as string] = obj[key]
  }
  return result as WithoutUndefined<T>
}
