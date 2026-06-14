import { type AuthDto, type RegisterDto, type SessionDto } from "../dtos"

// Session ops the auth feature needs. Mirrors the web wallet's IAuthClient.
// The current implementation is a local stub (no network); the real one will
// POST to the backend and persist tokens to expo-secure-store.
export type AuthClient = {
  login: (input: AuthDto) => Promise<SessionDto>
  register: (input: RegisterDto) => Promise<SessionDto>
  logout: () => Promise<void>
}
