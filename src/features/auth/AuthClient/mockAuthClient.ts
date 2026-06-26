import { type AuthDto, type RegisterDto, type SessionDto } from "../dtos"

import { type AuthClient } from "./types"

// Pretends the network round-trip succeeded after a short delay so the views
// can be exercised without a backend (used when EXPO_PUBLIC_API_URL is unset).
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
  admin: false,
  emailConfirmed: true,
})

export const mockAuthClient: AuthClient = {
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
  getSession: async (): Promise<SessionDto> => {
    await delay(200)
    return mockSession("demo@sito.app")
  },
  refresh: async (): Promise<SessionDto> => {
    await delay(200)
    return mockSession("demo@sito.app")
  },
  forgotPassword: async (): Promise<void> => {
    await delay(400)
  },
  changePassword: async (): Promise<void> => {
    await delay(400)
  },
  resendConfirmation: async (): Promise<void> => {
    await delay(400)
  },
}
