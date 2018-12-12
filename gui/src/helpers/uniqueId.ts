let lastId = 0

export function uniqueId(prefix?: string) {
  return `${prefix ? prefix + '-' : ''}${lastId++}`
}
