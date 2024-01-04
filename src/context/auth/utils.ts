export function omitNull(obj: Record<string, unknown>) {
  const o = { ...obj }
  Object.keys(o)
    .filter((k) => o[k] === null)
    .forEach((k) => delete o[k])
  return o
}

// https://stackoverflow.com/questions/51292406/jwt-check-if-token-expired
export function isTokenExpired(token: string) {
  if (!token) {
    console.warn('Passed an empty token to token expired check')
    return true
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
      })
      .join('')
  )

  const { exp } = JSON.parse(jsonPayload)
  const now = Date.now()

  const expired = now >= exp * 1000
  return expired
}
