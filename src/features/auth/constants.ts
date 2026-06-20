import ExpoConstants from "expo-constants"

// Password recovery and email confirmation are handled by the web wallet (the
// app only does sign-in / sign-up natively). The "forgot password" link opens
// the web recovery page. Override the base URL via EXPO_PUBLIC_WALLET_WEB_URL.
export const WALLET_WEB_URL =
  process.env.EXPO_PUBLIC_WALLET_WEB_URL ?? "https://wallet.sito.app"

export const WEB_RECOVERY_URL = `${WALLET_WEB_URL}/auth/recovery`

// Public, token-free account snapshot lives in AsyncStorage so the app knows
// who is signed in across reloads. Tokens live in expo-secure-store (tokenStore).
export const SESSION_ACCOUNT_STORAGE_KEY = "sito-wallet.session.account"

// Port the Java wallet API listens on (used for dev host autodetection).
const DEV_API_PORT = 8080

// In dev, the Metro host URI is the very LAN IP the device used to reach this
// machine (e.g. "192.168.20.183:8081") — so we can derive the backend URL from
// it and never hand-edit an IP when the Wi-Fi changes. Returns just the host.
const metroHostIp = (): string | null => {
  const hostUri =
    ExpoConstants.expoConfig?.hostUri ??
    ExpoConstants.expoGoConfig?.debuggerHost ??
    null
  const host = hostUri?.split(":")[0]
  return host !== undefined && host !== "" ? host : null
}

// Resolve the backend base URL:
//   1. EXPO_PUBLIC_API_URL when set — explicit override (prod, or to force
//      10.0.2.2 on the Android emulator / localhost on the iOS simulator).
//   2. DEV with no override → autodetect from the Metro host IP : 8080.
//   3. Fallback → localhost:8080.
const resolveApiBaseUrl = (): string => {
  const explicit: string | undefined = process.env.EXPO_PUBLIC_API_URL
  if (explicit != null && explicit !== "") {
    return explicit.replace(/\/$/, "")
  }

  if (__DEV__) {
    const host = metroHostIp()
    if (host !== null) {
      return `http://${host}:${DEV_API_PORT}`
    }
  }

  return "http://localhost:8080"
}

export const API_BASE_URL = resolveApiBaseUrl()

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
  // Request a reset email (the token-link completion happens on the web wallet).
  PASSWORD_FORGOT: "/auth/password/forgot",
  // Change the signed-in user's password (Bearer; current + new).
  PASSWORD_CHANGE: "/auth/password/change",
  // Resend the email-confirmation message.
  EMAIL_CONFIRM_RESEND: "/auth/email/confirm/resend",
} as const
