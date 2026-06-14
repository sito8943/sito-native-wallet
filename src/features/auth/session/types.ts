import { type ReactNode } from "react"

import { type SessionAccountDto, type SessionDto } from "../dtos"

export type SessionContextValue = {
  // The signed-in account snapshot, or null when browsing as a guest.
  account: SessionAccountDto | null
  isAuthenticated: boolean
  // True while the persisted snapshot hydrates on launch.
  isLoading: boolean
  // Persist a fresh session (tokens → secure-store, snapshot → AsyncStorage).
  logUser: (session: SessionDto) => Promise<void>
  // Clear tokens + snapshot and return to guest mode.
  logout: () => Promise<void>
}

export type SessionProviderProps = {
  children: ReactNode
}
