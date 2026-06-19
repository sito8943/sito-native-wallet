import {
  textIncludes,
  type QueryParam,
  type QueryResult,
} from "#shared/data/query"
import { createId, StorageClient } from "#shared/data/storage"

// RemoteCurrency is a type-only import: erased at runtime, so it can't form an
// eval-time cycle through the Manager that constructs this client.
import { type Currency } from "../../Currency"
import { INITIAL_CURRENCIES } from "../../demoData"
import { type AddCurrencyDto, type FilterCurrencyDto } from "../../dtos"
import { type RemoteCurrency } from "../RemoteCurrencyClient"

import { CURRENCIES_ERROR_MESSAGE, CURRENCIES_STORAGE_KEY } from "./constants"
import { parseStoredCurrencies } from "./utils"

const matchesCurrencyFilter =
  (filters: FilterCurrencyDto) =>
  (currency: Currency): boolean =>
    textIncludes(currency.name, filters.name) &&
    textIncludes(currency.symbol, filters.symbol)

export default class LocalCurrencyClient extends StorageClient<Currency> {
  constructor() {
    super({
      storageKey: CURRENCIES_STORAGE_KEY,
      errorMessage: CURRENCIES_ERROR_MESSAGE,
      initialValue: INITIAL_CURRENCIES,
      parse: parseStoredCurrencies,
    })
  }

  public add = (input: AddCurrencyDto): void => {
    this.insert({ id: createId(), ...input })
  }

  public addMany = (inputs: AddCurrencyDto[]): void => {
    this.insertMany(inputs.map((input) => ({ id: createId(), ...input })))
  }

  public update = (id: number, input: AddCurrencyDto): void => {
    this.patch(id, input)
  }

  public list = (
    params: QueryParam<Currency> = {},
    filters?: FilterCurrencyDto,
  ): QueryResult<Currency> =>
    this.runQuery(
      params,
      filters === undefined ? undefined : matchesCurrencyFilter(filters),
    )

  // --- Backend sync bookkeeping ---------------------------------------------
  // These mutate via `mutate` (not patch/insert) on purpose: they record server
  // state, not user edits, so they must NOT bump `updatedAt` or otherwise look
  // like a local change to the push diff.

  // Pull (insert-only): add backend currencies we don't already track by
  // remoteId. Existing local rows are left untouched (local edits win until
  // pushed).
  public mergeRemote = (remote: RemoteCurrency[]): void => {
    this.mutate((items) => {
      const known = new Set(
        items
          .map((currency) => currency.remoteId)
          .filter((id): id is number => id !== undefined),
      )

      const additions = remote
        .filter((row) => !known.has(row.id))
        .map<Currency>((row) => ({
          id: createId(),
          remoteId: row.id,
          name: row.name,
          symbol: row.symbol,
          description: row.description ?? undefined,
        }))

      return additions.length === 0 ? items : [...items, ...additions]
    })
  }

  // Record the backend id assigned to a locally-created currency after its POST.
  public attachRemoteId = (localId: number, remoteId: number): void => {
    this.mutate((items) =>
      items.map((currency) =>
        currency.id === localId ? { ...currency, remoteId } : currency,
      ),
    )
  }
}
