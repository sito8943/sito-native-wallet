import { useCallback, useMemo, type ReactElement } from "react"

// Deep import (not the #shared/data/storage barrel) to avoid a require cycle:
// the barrel also pulls useClientStore → Manager → feature clients, and the
// auth feature is itself imported early (root layout), which can leave
// useStoredState undefined mid-init.
import { useStoredState } from "#shared/data/storage/useStoredState"
import { useI18n } from "#shared/i18n"

import { SESSION_ACCOUNT_STORAGE_KEY } from "../constants"
import { type SessionAccountDto, type SessionDto } from "../dtos"
import { clearSessionTokens, saveSessionTokens } from "../tokenStore"
import { parseStoredAccount, toSessionSnapshot } from "../utils"

import { SessionContext } from "./SessionContext"
import { type SessionProviderProps } from "./types"

// Owns "who is signed in". The account snapshot persists to AsyncStorage (so it
// survives reloads); tokens go to expo-secure-store via tokenStore. The app is
// fully usable while account is null (guest / local-first).
export function SessionProvider({
  children,
}: SessionProviderProps): ReactElement {
  const { t } = useI18n()
  const { data: account, isLoading, setData } = useStoredState<
    SessionAccountDto | null
  >({
    errorMessage: t("auth.session.persistError"),
    initialValue: null,
    parseStoredValue: parseStoredAccount,
    storageKey: SESSION_ACCOUNT_STORAGE_KEY,
  })

  const logUser = useCallback(
    async (session: SessionDto): Promise<void> => {
      await saveSessionTokens(session)
      setData(toSessionSnapshot(session))
    },
    [setData],
  )

  const logout = useCallback(async (): Promise<void> => {
    await clearSessionTokens()
    setData(null)
  }, [setData])

  const value = useMemo(
    () => ({
      account,
      isAuthenticated: account?.id != null || account?.email != null,
      isLoading,
      logUser,
      logout,
    }),
    [account, isLoading, logUser, logout],
  )

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}
