import { type TranslationKey } from "#i18n/types"

import { type SessionAccountDto, type SessionDto } from "./dtos"
import { AuthApiError } from "./restClient"

// Loose email shape check for the auth forms — the backend is the real
// authority; this just catches obvious typos before submit.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Map a failed auth request to a user-facing message key. A network error (the
// backend is down/unreachable) is NOT an AuthApiError, so it falls through to
// the generic message — login fails instead of silently succeeding.
export const getAuthErrorKey = (error: unknown): TranslationKey => {
  if (error instanceof AuthApiError) {
    if (error.status === 401) {
      return "auth.error.invalidCredentials"
    }
    if (error.status === 409) {
      return "auth.error.emailTaken"
    }
  }

  return "auth.error.generic"
}

// Strip the tokens off a session before persisting it: only the public account
// fields belong in AsyncStorage.
export const toSessionSnapshot = (session: SessionDto): SessionAccountDto => ({
  id: session.id,
  username: session.username,
  email: session.email,
})

// Read the persisted snapshot back; anything unexpected resolves to "guest".
export const parseStoredAccount = (
  value: unknown,
): SessionAccountDto | null => {
  if (value === null || typeof value !== "object") {
    return null
  }

  return value
}

// Read the persisted "session expired" email back; anything but a non-empty
// string resolves to "no expired session".
export const parseStoredExpiredEmail = (value: unknown): string | null =>
  typeof value === "string" && value !== "" ? value : null
