import { type SessionAccountDto, type SessionDto } from "./dtos"

// Loose email shape check for the auth forms — the backend is the real
// authority; this just catches obvious typos before submit.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Strip the tokens off a session before persisting it: only the public account
// fields belong in AsyncStorage.
export const toSessionSnapshot = (
  session: SessionDto,
): SessionAccountDto => ({
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
