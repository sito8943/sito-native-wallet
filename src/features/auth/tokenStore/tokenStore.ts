import * as SecureStore from "expo-secure-store"

import { type SessionDto } from "../dtos"

// Tokens live in the device keychain/keystore (expo-secure-store), never in
// AsyncStorage — only the non-sensitive account snapshot goes there. Mirrors
// the web wallet's split (tokens vs. public account snapshot).
const ACCESS_TOKEN_KEY = "sito-wallet.accessToken"
const REFRESH_TOKEN_KEY = "sito-wallet.refreshToken"
const EXPIRES_AT_KEY = "sito-wallet.accessTokenExpiresAt"

// Persist the tokens from a fresh session (login / register / refresh).
export const saveSessionTokens = async (session: SessionDto): Promise<void> => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, session.token)

  if (session.refreshToken != null) {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, session.refreshToken)
  }

  if (session.accessTokenExpiresAt != null) {
    await SecureStore.setItemAsync(EXPIRES_AT_KEY, session.accessTokenExpiresAt)
  }
}

export const getAccessToken = (): Promise<string | null> =>
  SecureStore.getItemAsync(ACCESS_TOKEN_KEY)

export const getRefreshToken = (): Promise<string | null> =>
  SecureStore.getItemAsync(REFRESH_TOKEN_KEY)

// Wipe every token (logout, or a 401 the refresh couldn't recover).
export const clearSessionTokens = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
  await SecureStore.deleteItemAsync(EXPIRES_AT_KEY)
}
