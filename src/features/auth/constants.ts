// Password recovery and email confirmation are handled by the web wallet (the
// app only does sign-in / sign-up natively). The "forgot password" link opens
// the web recovery page. Override the base URL via EXPO_PUBLIC_WALLET_WEB_URL.
export const WALLET_WEB_URL =
  process.env.EXPO_PUBLIC_WALLET_WEB_URL ?? "https://wallet.sito.app"

export const WEB_RECOVERY_URL = `${WALLET_WEB_URL}/auth/recovery`
