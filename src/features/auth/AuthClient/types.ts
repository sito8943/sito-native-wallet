import { type AuthDto, type RegisterDto, type SessionDto } from "../dtos"

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
}
