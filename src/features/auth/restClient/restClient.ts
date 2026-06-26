import { API_BASE_URL, AUTH_ENDPOINT } from "../constants"
import { getAccessToken, getRefreshToken, saveTokens } from "../tokenStore"

// Thrown on any non-2xx response so callers can branch on `status` (e.g. 401 →
// drop the session, 409 → email already taken).
export class AuthApiError extends Error {
  public readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "AuthApiError"
    this.status = status
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  body?: unknown
  // Attach the stored access token as a Bearer header (for /session, /sign-out).
  auth?: boolean
  // Read the response as plain text instead of JSON (e.g. the photo-upload
  // endpoint returns the URL as a bare string, not a JSON document).
  expectText?: boolean
  // Internal: whether a 401 may trigger a silent token refresh + one retry.
  // Set false on the retry itself and on the refresh call (no infinite loop).
  allowRefresh?: boolean
}

// Abort a hung request so the UI never gets stuck "loading" forever (e.g. wrong
// host, firewall, server not actually reachable from the device).
const REQUEST_TIMEOUT_MS = 15000

// Dev-only request tracing so you can see what's happening in the Metro
// terminal instead of being blind. Stripped in production (__DEV__ === false).
// Accepts only a pre-sanitized message string (built from traceLabel, never raw
// paths/tokens) so no arbitrary value can reach the logs (CodeQL js/clear-text-logging).
const log = (message: string): void => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log("[auth]", message)
  }
}

// Endpoints whose path is sensitive — these are echoed as a fixed literal so
// neither the path nor any token riding in its query string ever reaches the
// logs as clear text (CodeQL js/clear-text-logging).
const SENSITIVE_PATHS: readonly string[] = [
  "/auth/password/forgot",
  "/auth/password/change",
]

// Build the descriptive label for the dev trace: the request pathname (query
// string dropped, since tokens can ride there), except sensitive endpoints,
// which collapse to a fixed "[redacted]" literal.
const traceLabel = (path: string): string => {
  const pathname = path.split("?")[0]
  if (SENSITIVE_PATHS.includes(pathname)) {
    return "[redacted]"
  }
  return pathname
}

// Token fields a /auth/refresh response carries (no account data).
type RefreshResponse = {
  token: string
  refreshToken?: string | null
  accessTokenExpiresAt?: unknown
}

// Exchange the stored refresh token for a fresh access token and persist it.
// Returns false (don't retry, drop the session) when there's no refresh token or
// the backend rejects it.
const performRefresh = async (): Promise<boolean> => {
  const refreshToken = await getRefreshToken()
  if (refreshToken === null) {
    return false
  }
  try {
    const data = await authRequest<RefreshResponse>(AUTH_ENDPOINT.REFRESH, {
      method: "POST",
      body: { refreshToken },
      // The refresh call must never itself try to refresh on a 401.
      allowRefresh: false,
    })
    await saveTokens({
      token: data.token,
      refreshToken: data.refreshToken ?? null,
      accessTokenExpiresAt:
        typeof data.accessTokenExpiresAt === "string"
          ? data.accessTokenExpiresAt
          : null,
    })
    return true
  } catch {
    return false
  }
}

// Single-flight: a burst of authenticated requests (e.g. the sync pull) can 401
// at once; we must refresh ONCE and have them all await it. A rotating refresh
// token is consumed on use, so parallel refreshes would invalidate each other
// and cause a false logout.
let refreshInFlight: Promise<boolean> | null = null
const refreshSession = (): Promise<boolean> => {
  refreshInFlight ??= performRefresh().finally(() => {
    refreshInFlight = null
  })
  return refreshInFlight
}

// Minimal JSON fetch against the wallet API. On a 401 for an authenticated call
// it silently refreshes the access token and retries once; only if that fails
// does the 401 surface as an AuthApiError (the session provider drops to guest).
export async function authRequest<T>(
  path: string,
  {
    method = "GET",
    body,
    auth = false,
    expectText = false,
    allowRefresh = true,
  }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  }

  // FormData (multipart, e.g. a photo upload) must NOT get an explicit
  // Content-Type — fetch sets it with the right multipart boundary. JSON bodies
  // are stringified and declared.
  const isMultipart =
    typeof FormData !== "undefined" && body instanceof FormData
  if (body !== undefined && !isMultipart) {
    headers["Content-Type"] = "application/json"
  }

  if (auth) {
    const token = await getAccessToken()
    if (token !== null) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  const url = `${API_BASE_URL}${path}`
  const controller = new AbortController()
  const timeout = setTimeout(() => {
    controller.abort()
  }, REQUEST_TIMEOUT_MS)

  const label = traceLabel(path)
  log(`→ ${method} ${label}`)

  let response: Response
  try {
    response = await fetch(url, {
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isMultipart
            ? body
            : JSON.stringify(body),
      signal: controller.signal,
    })
  } catch (error) {
    // Network failure or the timeout abort — surface it instead of hanging.
    const reason = controller.signal.aborted
      ? `timed out after ${REQUEST_TIMEOUT_MS}ms`
      : String(error)
    log(`✗ ${method} ${label} — ${reason}`)
    throw new Error(`Request to ${path} failed: ${reason}`)
  } finally {
    clearTimeout(timeout)
  }

  log(`← ${response.status} ${method} ${label}`)

  if (!response.ok) {
    // Access token expired/revoked → one silent refresh + retry. Only for
    // authenticated calls, and not when already retrying or refreshing.
    if (response.status === 401 && auth && allowRefresh) {
      const refreshed = await refreshSession()
      if (refreshed) {
        return authRequest<T>(path, {
          method,
          body,
          auth,
          expectText,
          allowRefresh: false,
        })
      }
    }

    throw new AuthApiError(
      response.status,
      `Request to ${path} failed with status ${response.status}`,
    )
  }

  // 204 No Content (sign-out) carries no body.
  if (response.status === 204) {
    return undefined as T
  }

  if (expectText) {
    return (await response.text()) as T
  }

  return (await response.json()) as T
}
