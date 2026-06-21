import { type ReactNode } from "react"

import { type SessionAccountDto, type SessionDto } from "../dtos"

export type SessionContextValue = {
  // The signed-in account snapshot, or null when browsing as a guest.
  account: SessionAccountDto | null
  isAuthenticated: boolean
  // True while the persisted snapshot hydrates on launch.
  isLoading: boolean
  // Email of the account whose session expired on launch (token rejected, no
  // refresh token), or null. Drives the profile re-login warning and lets a
  // same-user re-login skip the data-loss confirmation. Local data is kept.
  expiredEmail: string | null
  // Persist a fresh session (tokens → secure-store, snapshot → AsyncStorage).
  logUser: (session: SessionDto) => Promise<void>
  // Clear tokens + snapshot and return to guest mode.
  logout: () => Promise<void>
}

export type SessionProviderProps = {
  children: ReactNode
}
