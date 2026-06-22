import { type Currency } from "#features/currencies"
import { type LocalTransactionClient } from "#features/transactions/clients/LocalTransactionClient"
import {
  textIncludes,
  type QueryParam,
  type QueryResult,
} from "#shared/data/query"
import { createId, StorageClient } from "#shared/data/storage"
// Deep, type-only import: the live LocalTransactionClient is injected lazily by the
// Manager (a thunk), so this never imports the transactions barrel — that would
// close the accounts ↔ transactions cycle (transactions already needs accounts).

import { type Account, accountTypeFromCode } from "../../Account"
// Type-only: erased at runtime, so no eval-time cycle through the Manager.
import { INITIAL_ACCOUNTS } from "../../demoData"
import { type AddAccountDto, type FilterAccountDto } from "../../dtos"
import { type RemoteAccount } from "../RemoteAccountClient"

import { ACCOUNTS_ERROR_MESSAGE, ACCOUNTS_STORAGE_KEY } from "./constants"
import { parseStoredAccounts } from "./utils"

// Filter translation lives on the client (the seam an ApiClient overrides).
const matchesAccountFilter =
  (filters: FilterAccountDto) =>
  (account: Account): boolean =>
    textIncludes(account.name, filters.name) &&
    (filters.currencyId === undefined ||
      account.currency.id === filters.currencyId)

export default class LocalAccountClient extends StorageClient<Account> {
  readonly #getTransactions: () => LocalTransactionClient

  constructor(getTransactions: () => LocalTransactionClient) {
    super({
      storageKey: ACCOUNTS_STORAGE_KEY,
      errorMessage: ACCOUNTS_ERROR_MESSAGE,
      initialValue: INITIAL_ACCOUNTS,
      parse: parseStoredAccounts,
    })
    this.#getTransactions = getTransactions
  }

  // Local-first backend behavior: a new account starts at 0 and its opening
  // balance is recorded as an auto "Initial transaction" (which moves the
  // balance through the normal transaction flow — no double counting).
  public add = (input: AddAccountDto): void => {
    const id = createId()
    this.insert({ id, ...input, balance: 0 })
    this.#getTransactions().adjustBalance(
      id,
      input.balance,
      "Initial transaction",
    )
  }

  public update = (id: number, input: AddAccountDto): void => {
    this.patch(id, input)
  }

  public list = (
    params: QueryParam<Account> = {},
    filters?: FilterAccountDto,
  ): QueryResult<Account> =>
    this.runQuery(
      params,
      filters === undefined ? undefined : matchesAccountFilter(filters),
    )

  // Applies a signed delta to an account balance. No-op if the account is
  // gone. Rounds to cents to avoid float drift across many transactions.
  public adjustBalance = (id: number, delta: number): void => {
    const account = this.getAll().find((item) => item.id === id)

    if (account === undefined) {
      return
    }

    this.patch(id, {
      balance: Math.round((account.balance + delta) * 100) / 100,
    })
  }

  // --- Backend sync bookkeeping ---------------------------------------------
  // `mutate` (not insert/patch) on purpose: records server state, not user
  // edits, so it must not bump `updatedAt` or look like a local change.

  // Pull: refresh backend-owned timestamps on known accounts and insert unknown
  // ones. Each row's currency (a backend id) is resolved to a local currency by
  // remoteId — an account whose currency isn't synced yet is skipped (currencies
  // pull first, so this is rare) and picked up on a later pull.
  public mergeRemote = (
    remote: RemoteAccount[],
    resolveCurrency: (remoteCurrencyId: number) => Currency | undefined,
  ): void => {
    this.mutate((items) => {
      const remoteById = new Map(remote.map((row) => [row.id, row]))
      const known = new Set(
        items
          .map((account) => account.remoteId)
          .filter((id): id is number => id !== undefined),
      )
      const reconciled = items.map((account) => {
        if (account.remoteId === undefined) {
          return account
        }

        const row = remoteById.get(account.remoteId)
        return row?.updatedAt != null
          ? { ...account, updatedAt: row.updatedAt }
          : account
      })

      const additions: Account[] = []
      for (const row of remote) {
        if (known.has(row.id)) {
          continue
        }
        const currency =
          row.currency != null ? resolveCurrency(row.currency.id) : undefined
        if (currency === undefined) {
          continue
        }
        additions.push({
          id: createId(),
          remoteId: row.id,
          name: row.name,
          description: row.description ?? undefined,
          bankName: row.bankName ?? undefined,
          balance: row.balance ?? 0,
          type: accountTypeFromCode(row.type),
          currency,
          ...(row.updatedAt != null ? { updatedAt: row.updatedAt } : {}),
        })
      }

      return additions.length === 0
        ? reconciled
        : [...reconciled, ...additions]
    })
  }

  // Record the backend id assigned to a locally-created account after its POST.
  public attachRemoteId = (localId: number, remoteId: number): void => {
    this.mutate((items) =>
      items.map((account) =>
        account.id === localId ? { ...account, remoteId } : account,
      ),
    )
  }
}
