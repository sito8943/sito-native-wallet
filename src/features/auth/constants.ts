// Password recovery and email confirmation are handled by the web wallet (the
// app only does sign-in / sign-up natively). The "forgot password" link opens
// the web recovery page. Override the base URL via EXPO_PUBLIC_WALLET_WEB_URL.
export const WALLET_WEB_URL =
  process.env.EXPO_PUBLIC_WALLET_WEB_URL ?? "https://wallet.sito.app"

export const WEB_RECOVERY_URL = `${WALLET_WEB_URL}/auth/recovery`

// Public, token-free account snapshot lives in AsyncStorage so the app knows
// who is signed in across reloads. Tokens live in expo-secure-store (tokenStore).
export const SESSION_ACCOUNT_STORAGE_KEY = "sito-wallet.session.account"

// Backend base URL (Java wallet API). Defaults to the local dev server; set
// EXPO_PUBLIC_API_URL to point at another host (e.g. a LAN IP for a device, or
// 10.0.2.2 for the Android emulator).
export const API_BASE_URL = (
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080"
).replace(/\/$/, "")

// Auth hits the real backend by default — a closed/unreachable server makes
// login FAIL (as it should), not silently succeed. The mock client is opt-in
// for offline UI work via EXPO_PUBLIC_AUTH_MOCK=true.
export const USE_MOCK_AUTH = process.env.EXPO_PUBLIC_AUTH_MOCK === "true"

export const AUTH_ENDPOINT = {
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  SIGN_OUT: "/auth/sign-out",
  REFRESH: "/auth/refresh",
  SESSION: "/auth/session",
} as const
