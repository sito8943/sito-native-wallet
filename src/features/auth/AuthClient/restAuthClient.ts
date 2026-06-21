import { AUTH_ENDPOINT } from "../constants"
import {
  type AuthDto,
  type ChangePasswordDto,
  type RegisterDto,
  type SessionDto,
} from "../dtos"
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
  // Mobile is a trusted personal device: always request a refresh token
  // (rememberMe: true) so the access token renews silently. Without it the
  // backend issues no refresh token and the session dies on access-token expiry
  // (60 min), forcing a re-login.
  login: async ({ email, password }: AuthDto): Promise<SessionDto> =>
    toSession(
      await authRequest<AuthResponse>(AUTH_ENDPOINT.SIGN_IN, {
        method: "POST",
        body: { email, password, rememberMe: true },
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

  // Returns 202 with an {accepted, message} body we don't need — the email is
  // sent server-side and its link completes on the web wallet (backend default
  // redirect), so no redirectTo is sent.
  forgotPassword: async (email: string): Promise<void> => {
    await authRequest(AUTH_ENDPOINT.PASSWORD_FORGOT, {
      method: "POST",
      body: { email },
    })
  },

  changePassword: async (input: ChangePasswordDto): Promise<void> => {
    await authRequest(AUTH_ENDPOINT.PASSWORD_CHANGE, {
      method: "POST",
      auth: true,
      body: input,
    })
  },

  resendConfirmation: async (email: string): Promise<void> => {
    await authRequest(AUTH_ENDPOINT.EMAIL_CONFIRM_RESEND, {
      method: "POST",
      body: { email },
    })
  },
}
