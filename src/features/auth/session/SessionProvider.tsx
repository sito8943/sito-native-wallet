import { useCallback, useEffect, useMemo, type ReactElement } from "react"

// Deep import (not the #shared/data/storage barrel) to avoid a require cycle:
// the barrel also pulls useClientStore → Manager → feature clients, and the
// auth feature is itself imported early (root layout), which can leave
// useStoredState undefined mid-init.
import { useStoredState } from "#shared/data/storage/useStoredState"
import { useI18n } from "#shared/i18n"

import { authClient } from "../AuthClient"
import {
  SESSION_ACCOUNT_STORAGE_KEY,
  SESSION_EXPIRED_EMAIL_STORAGE_KEY,
  USE_MOCK_AUTH,
} from "../constants"
import { type SessionAccountDto, type SessionDto } from "../dtos"
import { AuthApiError } from "../restClient"
import { clearSessionTokens, saveSessionTokens } from "../tokenStore"
import {
  parseStoredAccount,
  parseStoredExpiredEmail,
  toSessionSnapshot,
} from "../utils"

import { SessionContext } from "./SessionContext"
import { type SessionProviderProps } from "./types"

// Owns "who is signed in". The account snapshot persists to AsyncStorage (so it
// survives reloads); tokens go to expo-secure-store via tokenStore. The app is
// fully usable while account is null (guest / local-first).
export function SessionProvider({
  children,
}: SessionProviderProps): ReactElement {
  const { t } = useI18n()
  const {
    data: account,
    isLoading,
    setData,
  } = useStoredState<SessionAccountDto | null>({
    errorMessage: t("auth.session.persistError"),
    initialValue: null,
    parseStoredValue: parseStoredAccount,
    storageKey: SESSION_ACCOUNT_STORAGE_KEY,
  })

  // The email of the last account whose session expired on launch. Set when the
  // session validation below 401s; cleared on any successful login/logout.
  const { data: expiredEmail, setData: setExpiredEmail } = useStoredState<
    string | null
  >({
    errorMessage: t("auth.session.persistError"),
    initialValue: null,
    parseStoredValue: parseStoredExpiredEmail,
    storageKey: SESSION_EXPIRED_EMAIL_STORAGE_KEY,
  })

  const logUser = useCallback(
    async (session: SessionDto): Promise<void> => {
      await saveSessionTokens(session)
      // A fresh sign-in clears any prior "session expired" warning.
      setExpiredEmail(null)
      setData(toSessionSnapshot(session))
    },
    [setData, setExpiredEmail],
  )

  const logout = useCallback(async (): Promise<void> => {
    await clearSessionTokens()
    // An explicit logout is a clean exit, not an expiry — drop the warning.
    setExpiredEmail(null)
    // Drop the signed-in user's local data so the next user (or guest) doesn't
    // inherit it — and so the entity sync can't push it under a new account.
    // Imported lazily (dynamic import, not a top-level one): SessionProvider
    // loads in the root layout, so a static import would force the Manager and
    // every entity client (+ AsyncStorage) to evaluate before the RN runtime is
    // ready ("Cannot read property 'EventEmitter' of undefined"). Deferring to
    // call time keeps that graph lazy.
    const { manager } = await import("#shared/data")
    manager.clearLocalData()
    // Same lazy-import reason: the profile store + its sync would otherwise pull
    // AsyncStorage into the boot graph. Reset it so the next user doesn't
    // inherit (or re-push) the signed-out user's profile.
    const { resetProfileSync } =
      await import("#features/settings/components/ProfileInfo")
    resetProfileSync()
    // Re-seed the now-empty guest device with a default currency + account, the
    // same starter state a first launch gets — so logging out doesn't leave an
    // empty shell. Idempotent (no-ops if anything already exists); lazily
    // imported to keep the entity-client graph out of the boot path.
    const { seedDefaultAccount } = await import(
      "#features/accounts/seedDefaultAccount"
    )
    await seedDefaultAccount()
    setData(null)
  }, [setData, setExpiredEmail])

  // Once the snapshot has hydrated, validate it against the backend (the stored
  // access token may have been revoked/expired). A 401 means the session is
  // dead → drop it. Only runs with a real backend and an existing session.
  useEffect(() => {
    if (USE_MOCK_AUTH || isLoading || account === null) {
      return
    }

    let active = true

    void (async () => {
      try {
        const session = await authClient.getSession()
        if (active) {
          setData(toSessionSnapshot(session))
        }
      } catch (error) {
        if (active && error instanceof AuthApiError && error.status === 401) {
          await clearSessionTokens()
          // Remember who expired so the profile can prompt a re-login and a
          // same-user sign-in can skip the data-loss wipe. Local data is kept
          // (no manager.clearLocalData here) — only the dead tokens are dropped.
          setExpiredEmail(account?.email ?? null)
          setData(null)
        }
      }
    })()

    return () => {
      active = false
    }
    // Run once when hydration completes; we don't want to re-validate on every
    // account change (logUser already writes a fresh snapshot).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const value = useMemo(
    () => ({
      account,
      isAuthenticated: account?.id != null || account?.email != null,
      isLoading,
      expiredEmail,
      logUser,
      logout,
    }),
    [account, isLoading, expiredEmail, logUser, logout],
  )

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}
