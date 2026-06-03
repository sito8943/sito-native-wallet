import { textIncludes, type QueryParam, type QueryResult } from "#shared/data"
import { createId, StorageClient } from "#shared/data/storage"
// Deep, type-only import: the live TransactionClient is injected lazily by the
// Manager (a thunk), so this never imports the transactions barrel — that would
// close the accounts ↔ transactions cycle (transactions already needs accounts).
import { type TransactionClient } from "#shared/transactions/TransactionClient"

import { type Account } from "../Account"
import { INITIAL_ACCOUNTS } from "../demoData"
import { type AddAccountDto, type FilterAccountDto } from "../dtos"

import { ACCOUNTS_ERROR_MESSAGE, ACCOUNTS_STORAGE_KEY } from "./constants"
import { parseStoredAccounts } from "./utils"

// Filter translation lives on the client (the seam an ApiClient overrides).
const matchesAccountFilter =
  (filters: FilterAccountDto) =>
  (account: Account): boolean =>
    textIncludes(account.name, filters.name) &&
    (filters.currencyId === undefined ||
      account.currency.id === filters.currencyId)

export default class AccountClient extends StorageClient<Account> {
  readonly #getTransactions: () => TransactionClient

  constructor(getTransactions: () => TransactionClient) {
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

  public update = (id: string, input: AddAccountDto): void => {
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
  public adjustBalance = (id: string, delta: number): void => {
    const account = this.getAll().find((item) => item.id === id)

    if (account === undefined) {
      return
    }

    this.patch(id, {
      balance: Math.round((account.balance + delta) * 100) / 100,
    })
  }
}
