import { type AuthDto, type RegisterDto, type SessionDto } from "../dtos"

import { type AuthClient } from "./types"

// Pretends the network round-trip succeeded after a short delay so the views
// can be exercised end-to-end without a backend.
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const mockSession = (email: string): SessionDto => ({
  id: 1,
  username: email.split("@")[0] ?? email,
  email,
  token: "mock-access-token",
  refreshToken: "mock-refresh-token",
  accessTokenExpiresAt: null,
})

// STUB auth client. Views-only milestone: no real backend, no token storage.
// The real implementation will:
//   - POST auth/sign-in, auth/sign-up, auth/sign-out (web wallet endpoints)
//   - store the access/refresh tokens in expo-secure-store
//   - persist the public account snapshot to AsyncStorage
//   - on login, replace local data with the account's server data
//   - on register, upload the existing local data to the backend
export const authClient: AuthClient = {
  login: async (input: AuthDto): Promise<SessionDto> => {
    await delay(600)
    return mockSession(input.email)
  },
  register: async (input: RegisterDto): Promise<SessionDto> => {
    await delay(600)
    return mockSession(input.email)
  },
  logout: async (): Promise<void> => {
    await delay(300)
  },
}
