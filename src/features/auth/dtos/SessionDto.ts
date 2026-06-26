// Session shape returned by the backend on sign-in / sign-up / refresh. Copied
// verbatim from the web wallet's `@sito/dashboard-app` contract so it stays
// wire-compatible when the real ApiClient is wired. `TExtra` lets the wallet
// add fields (e.g. `admin`) without forking the type.
export type SessionDto<TExtra extends object = object> = {
  id: number
  username: string
  email: string
  token: string
  refreshToken?: string | null
  accessTokenExpiresAt?: string | null
  // Wallet extras the Java backend returns on the AuthDto.
  admin?: boolean
  emailConfirmed?: boolean
} & TExtra

// Public, token-free slice persisted to AsyncStorage so the app can show "who
// am I" across reloads without holding the access token in plain storage.
export type SessionAccountDto<TExtra extends object = object> = Partial<
  SessionDto<TExtra>
>
