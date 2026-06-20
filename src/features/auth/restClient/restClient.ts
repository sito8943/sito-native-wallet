import { API_BASE_URL } from "../constants"
import { getAccessToken } from "../tokenStore"

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
}

// Abort a hung request so the UI never gets stuck "loading" forever (e.g. wrong
// host, firewall, server not actually reachable from the device).
const REQUEST_TIMEOUT_MS = 15000

// Dev-only request tracing so you can see what's happening in the Metro
// terminal instead of being blind. Stripped in production (__DEV__ === false).
const log = (...args: unknown[]): void => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log("[auth]", ...args)
  }
}

// Minimal JSON fetch against the wallet API. The real refresh-on-401 retry will
// layer on top of this; for now a 401 surfaces as an AuthApiError the session
// provider handles by logging out.
export async function authRequest<T>(
  path: string,
  {
    method = "GET",
    body,
    auth = false,
    expectText = false,
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

  log(`→ ${method} ${url}`)

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
    log(`✗ ${method} ${path} — ${reason}`)
    throw new Error(`Request to ${path} failed: ${reason}`)
  } finally {
    clearTimeout(timeout)
  }

  log(`← ${response.status} ${method} ${path}`)

  if (!response.ok) {
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
