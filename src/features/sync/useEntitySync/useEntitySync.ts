import { useEffect, useMemo } from "react"

import { accountsSync } from "#features/accounts"
import { USE_MOCK_AUTH, useSession } from "#features/auth"
import { categoriesSync } from "#features/categories"
import { currenciesSync } from "#features/currencies"
import { profileSync, useProfileInfo } from "#features/settings/ProfileInfo"
import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"
import { useI18n } from "#shared/i18n"

import { bindSingletonSync, bindSync } from "../syncEngine"

import { PUSH_DEBOUNCE_MS } from "./constants"
import { syncSession } from "./syncSession"

// Central sync orchestrator. Pulls every entity once per sign-in and pushes
// local edits back, both in dependency order (a row's FK targets sync first).
// Mounted once in the tabs shell — NOT in the root/auth eager graph, which would
// force the Manager + all clients to evaluate before the RN runtime is ready.
// No-op as a guest or with the mock client; AsyncStorage stays the source of
// truth and failures are swallowed so the next change retries.
export default function useEntitySync(): void {
  const { isAuthenticated, account } = useSession()
  const manager = useManager()
  const { language, setLanguage } = useI18n()
  const userId = account?.id ?? null

  // Dependency order: a dependent entity (e.g. accounts → currencies) must come
  // AFTER what it references, so the referenced rows have remoteIds first. The
  // profile is independent of the entities, so its position is free.
  const syncs = useMemo(
    () => [
      bindSync(currenciesSync(manager)),
      bindSync(categoriesSync(manager)),
      // After currencies: an account references a currency's remoteId.
      bindSync(accountsSync(manager)),
      // Singleton record: name (profile store) + language (i18n context).
      // Rebuilt when language changes so the push diffs against the new value.
      bindSingletonSync(profileSync({ language, setLanguage })),
    ],
    [manager, language, setLanguage],
  )

  // Re-render on any store change so the push effect re-evaluates the diff.
  const currenciesSnapshot = useClientStore(manager.Currencies)
  const categoriesSnapshot = useClientStore(manager.Categories)
  const accountsSnapshot = useClientStore(manager.Accounts)
  // The profile name lives in its own store; language is already a `syncs` dep.
  const { data: profile } = useProfileInfo()

  // Pull once per signed-in user, in dependency order. No abort flag: the guard
  // already makes this run a single time, and the work writes to module state +
  // the (singleton) stores, so completing after an unmount is harmless.
  useEffect(() => {
    if (!isAuthenticated || userId === null) {
      syncSession.reset()
      return
    }

    if (USE_MOCK_AUTH || syncSession.hasPulledFor(userId)) {
      return
    }
    syncSession.markPulledFor(userId)

    void (async () => {
      for (const sync of syncs) {
        try {
          await sync.pull()
        } catch {
          // Offline or unauthorized: keep the local list untouched.
        }
      }
      for (const sync of syncs) {
        syncSession.setBaseline(sync.label, sync.buildBaseline())
      }
      syncSession.markHydrated()
    })()
  }, [isAuthenticated, userId, syncs])

  // Push: debounce local edits back to the backend, in dependency order.
  useEffect(() => {
    if (
      USE_MOCK_AUTH ||
      !isAuthenticated ||
      !syncSession.isHydrated() ||
      userId === null
    ) {
      return
    }

    const handle = setTimeout(() => {
      void syncSession.runFlush(async () => {
        for (const sync of syncs) {
          const baseline = syncSession.getBaseline(sync.label)
          if (baseline !== undefined) {
            await sync.flush(baseline, { userId })
          }
        }
      })
    }, PUSH_DEBOUNCE_MS)

    return () => {
      clearTimeout(handle)
    }
    // The snapshots are the change triggers; manager is stable. `syncs` rebuilds
    // on a language change and `profile.name` triggers the profile push.
  }, [
    currenciesSnapshot,
    categoriesSnapshot,
    accountsSnapshot,
    profile.name,
    isAuthenticated,
    userId,
    syncs,
  ])
}
