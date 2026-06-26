import {
  type AuthDto,
  type ChangePasswordDto,
  type RegisterDto,
  type SessionDto,
} from "../dtos"

// Session ops the auth feature needs. Mirrors the web wallet's IAuthClient and
// the Java backend's /auth endpoints. Two implementations exist: a REST client
// (real backend) and a local mock (no network); `authClient` picks one based on
// whether the backend URL is configured.
export type AuthClient = {
  login: (input: AuthDto) => Promise<SessionDto>
  register: (input: RegisterDto) => Promise<SessionDto>
  logout: () => Promise<void>
  // Validate/refresh the current session from the stored access token.
  getSession: () => Promise<SessionDto>
  // Exchange the stored refresh token for a new session.
  refresh: () => Promise<SessionDto>
  // Request a password-reset email; the link completes on the web wallet.
  forgotPassword: (email: string) => Promise<void>
  // Change the signed-in user's password (re-auth with the current one).
  changePassword: (input: ChangePasswordDto) => Promise<void>
  // Resend the email-confirmation message to the given address.
  resendConfirmation: (email: string) => Promise<void>
}
