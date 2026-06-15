import { useEffect, useRef } from "react"

import { USE_MOCK_AUTH, useSession } from "#features/auth"
import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import {
  createCurrency,
  deleteCurrencies,
  fetchCurrencies,
  updateCurrency,
  type CurrencyPayload,
} from "../currenciesClient"
import { type Currency } from "../Currency"

// Wait this long after the last local change before pushing, so editing a
// currency's fields doesn't fire a request per keystroke.
const PUSH_DEBOUNCE_MS = 800

// The synced fields of a currency, captured after each successful pull/push so
// the diff can tell what actually changed since the server last saw it.
type Baseline = {
  remoteId: number
  name: string
  description: string
  symbol: string
}

const buildBaseline = (items: Currency[]): Map<number, Baseline> => {
  const baseline = new Map<number, Baseline>()
  for (const currency of items) {
    if (currency.remoteId !== undefined) {
      baseline.set(currency.id, toBaseline(currency, currency.remoteId))
    }
  }
  return baseline
}

const toBaseline = (currency: Currency, remoteId: number): Baseline => ({
  remoteId,
  name: currency.name,
  description: currency.description ?? "",
  symbol: currency.symbol,
})

const fieldsChanged = (base: Baseline, currency: Currency): boolean =>
  base.name !== currency.name ||
  base.description !== (currency.description ?? "") ||
  base.symbol !== currency.symbol

const toPayload = (currency: Currency, userId: number): CurrencyPayload => ({
  name: currency.name.trim(),
  description: currency.description,
  symbol: currency.symbol.trim(),
  userId,
})

// Reconcile local currencies to the backend. Mutates `baseline` in place so the
// next run sees the new server state. Each op is isolated: one failure leaves
// that row's baseline untouched so the next change retries it, without blocking
// the others.
const flush = async (
  client: ReturnType<typeof useManager>["Currencies"],
  baseline: Map<number, Baseline>,
  userId: number,
): Promise<void> => {
  const current = client.getAll()
  const currentIds = new Set(current.map((currency) => currency.id))

  for (const currency of current) {
    // The backend requires both name and symbol; wait for real values.
    if (currency.name.trim() === "" || currency.symbol.trim() === "") {
      continue
    }

    const base = baseline.get(currency.id)

    if (currency.remoteId === undefined) {
      try {
        const remoteId = await createCurrency(toPayload(currency, userId))
        client.attachRemoteId(currency.id, remoteId)
        baseline.set(currency.id, toBaseline(currency, remoteId))
      } catch {
        // Leave it unsynced; the next change retries the create.
      }
    } else if (base === undefined || fieldsChanged(base, currency)) {
      try {
        await updateCurrency(currency.remoteId, toPayload(currency, userId))
        baseline.set(currency.id, toBaseline(currency, currency.remoteId))
      } catch {
        // Keep the stale baseline so the next change retries the update.
      }
    }
  }

  // Deletes: rows the server knew about (in baseline) that are gone locally.
  const removedRemoteIds: number[] = []
  for (const [localId, base] of baseline) {
    if (!currentIds.has(localId)) {
      removedRemoteIds.push(base.remoteId)
    }
  }

  if (removedRemoteIds.length > 0) {
    try {
      await deleteCurrencies(removedRemoteIds)
      for (const [localId] of baseline) {
        if (!currentIds.has(localId)) {
          baseline.delete(localId)
        }
      }
    } catch {
      // Keep them in the baseline so the next change retries the delete.
    }
  }
}

// Two-way currency sync against the real backend (no-op as a guest or with the
// mock client). Pulls the user's currencies once per sign-in (insert-only — it
// never clobbers or deletes local rows), then pushes local create/update/delete
// edits back with a debounce. AsyncStorage stays the source of truth; failures
// are swallowed so the local list survives offline and the next edit retries.
export default function useCurrenciesSync(): void {
  const { isAuthenticated, account } = useSession()
  const client = useManager().Currencies
  // Re-render this hook whenever the local store changes, so the push effect
  // re-evaluates the diff after every add/edit/remove.
  const snapshot = useClientStore(client)
  const userId = account?.id ?? null

  const baselineRef = useRef<Map<number, Baseline> | null>(null)
  const hydratedRef = useRef(false)

  // Pull once per authenticated session.
  useEffect(() => {
    if (USE_MOCK_AUTH || !isAuthenticated) {
      return
    }

    let active = true

    void (async () => {
      try {
        const remote = await fetchCurrencies()
        if (!active) {
          return
        }
        client.mergeRemote(remote)
        baselineRef.current = buildBaseline(client.getAll())
        hydratedRef.current = true
      } catch {
        // Offline or unauthorized: keep the local list untouched.
      }
    })()

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  // Push: debounce local edits back to the backend.
  useEffect(() => {
    if (USE_MOCK_AUTH || !isAuthenticated || !hydratedRef.current) {
      return
    }

    const baseline = baselineRef.current
    if (baseline === null || userId === null) {
      return
    }

    const handle = setTimeout(() => {
      void flush(client, baseline, userId)
    }, PUSH_DEBOUNCE_MS)

    return () => {
      clearTimeout(handle)
    }
    // `snapshot` is the change trigger; client/baseline are stable refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot, isAuthenticated, userId])
}
