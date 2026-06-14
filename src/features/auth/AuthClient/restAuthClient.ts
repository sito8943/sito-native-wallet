import { AUTH_ENDPOINT } from "../constants"
import { type AuthDto, type RegisterDto, type SessionDto } from "../dtos"
import { authRequest } from "../restClient"
import { getRefreshToken } from "../tokenStore"

import { type AuthClient } from "./types"

// Shape the Java backend's AuthDto returns. accessTokenExpiresAt may serialize
// as an ISO string; anything non-string is treated as "unknown expiry".
type AuthResponse = {
  id: number
  username: string
  email: string
  admin?: boolean
  emailConfirmed?: boolean
  token: string
  refreshToken?: string | null
  accessTokenExpiresAt?: unknown
}

const toSession = (response: AuthResponse): SessionDto => ({
  id: response.id,
  username: response.username,
  email: response.email,
  token: response.token,
  refreshToken: response.refreshToken ?? null,
  accessTokenExpiresAt:
    typeof response.accessTokenExpiresAt === "string"
      ? response.accessTokenExpiresAt
      : null,
  admin: response.admin,
  emailConfirmed: response.emailConfirmed,
})

// Real client against the Java wallet API (/auth/*).
export const restAuthClient: AuthClient = {
  login: async ({
    email,
    password,
    rememberMe,
  }: AuthDto): Promise<SessionDto> =>
    toSession(
      await authRequest<AuthResponse>(AUTH_ENDPOINT.SIGN_IN, {
        method: "POST",
        body: { email, password, rememberMe },
      }),
    ),

  // The backend's RegisterRequest takes only email + password (rPassword is a
  // client-side confirmation, not sent).
  register: async ({ email, password }: RegisterDto): Promise<SessionDto> =>
    toSession(
      await authRequest<AuthResponse>(AUTH_ENDPOINT.SIGN_UP, {
        method: "POST",
        body: { email, password },
      }),
    ),

  logout: async (): Promise<void> => {
    const refreshToken = await getRefreshToken()
    await authRequest(AUTH_ENDPOINT.SIGN_OUT, {
      method: "POST",
      auth: true,
      body: { refreshToken },
    })
  },

  getSession: async (): Promise<SessionDto> =>
    toSession(
      await authRequest<AuthResponse>(AUTH_ENDPOINT.SESSION, { auth: true }),
    ),

  refresh: async (): Promise<SessionDto> => {
    const refreshToken = await getRefreshToken()
    return toSession(
      await authRequest<AuthResponse>(AUTH_ENDPOINT.REFRESH, {
        method: "POST",
        body: { refreshToken },
      }),
    )
  },
}
