import { type EntitySync, type SyncContext } from "#features/sync"
import { type Manager } from "#shared/data"

import {
  createCurrency,
  deleteCurrencies,
  fetchCurrencies,
  updateCurrency,
  type CurrencyPayload,
} from "./currenciesClient"
import { type Currency } from "./Currency"

// Sync adapter for currencies. All currencies are user-owned (no system rows),
// so the whole list participates.
export const currenciesSync = (
  manager: Manager,
): EntitySync<Currency, CurrencyPayload> => {
  const client = manager.Currencies

  return {
    label: "currencies",
    pull: async () => {
      const rows = await fetchCurrencies()
      client.mergeRemote(rows)
    },
    list: () => client.getAll(),
    attachRemoteId: client.attachRemoteId,
    toPayload: (currency, { userId }: SyncContext) =>
      currency.name.trim() === "" || currency.symbol.trim() === ""
        ? null
        : {
            name: currency.name.trim(),
            description: currency.description,
            symbol: currency.symbol.trim(),
            userId,
          },
    fields: (currency) => ({
      name: currency.name,
      description: currency.description ?? "",
      symbol: currency.symbol,
    }),
    create: createCurrency,
    update: updateCurrency,
    remove: deleteCurrencies,
  }
}
