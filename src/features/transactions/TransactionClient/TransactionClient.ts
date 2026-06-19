// Deep, type-only imports on purpose: pulling the #features/accounts or
// #features/categories barrels here would re-create the Manager import cycle
// (barrel → hooks → Manager → this client). The client classes are injected as
// instances by the Manager, so we only need their types.
import { type LocalAccountClient } from "#features/accounts/clients/LocalAccountClient"
import { type CategoryClient } from "#features/categories/CategoryClient"
import {
  ADJUSTMENT_CATEGORY_ID,
  TRANSFER_CATEGORY_ID,
  TRANSACTION_TYPE,
} from "#features/categories/TransactionCategory"
import { getDeviceLanguage, translate } from "#i18n/utils"
import {
  applyQuery,
  type QueryParam,
  type QueryResult,
} from "#shared/data/query"
import { createId, StorageClient } from "#shared/data/storage"
import { todayStamp } from "#shared/data/time"

import { INITIAL_TRANSACTIONS } from "../demoData"
import {
  type AddTransferDto,
  type AddTransactionDto,
  type FilterTransactionDto,
} from "../dtos"
import {
  matchesTransactionFilter,
  resolveTransactions,
  type Transaction,
} from "../Transaction"
import { type RemoteTransaction } from "../transactionsClient"
// Deep path on purpose: the transactionsClient barrel re-exports the REST client
// (which imports #features/auth) — pulling that into this client (constructed by
// the Manager) risks an eval-time cycle. The date utils have no such dependency.
import { isoToStamp } from "../transactionsClient/utils"

import {
  TRANSACTIONS_ERROR_MESSAGE,
  TRANSACTIONS_STORAGE_KEY,
} from "./constants"
import {
  type CategoryBreakdown,
  type CategoryBreakdownEntry,
  type StoredTransaction,
} from "./types"
import { parseStoredTransactions } from "./utils"

// Local-first stand-in for the backend: persisting a transaction also keeps the
// owning account's balance in sync. Online, the server would own this; offline,
// the storage layer does. The UI just calls add/update/remove.
export default class TransactionClient extends StorageClient<StoredTransaction> {
  readonly #accounts: LocalAccountClient
  readonly #categories: CategoryClient

  constructor(accounts: LocalAccountClient, categories: CategoryClient) {
    super({
      storageKey: TRANSACTIONS_STORAGE_KEY,
      errorMessage: TRANSACTIONS_ERROR_MESSAGE,
      initialValue: INITIAL_TRANSACTIONS,
      parse: parseStoredTransactions,
    })
    this.#accounts = accounts
    this.#categories = categories
  }

  // Resolution lives here (the backend seam): join the stored id-only records
  // with the live accounts/categories, then filter + sort + paginate. The UI
  // just asks for the list; an ApiClient would return it already resolved.
  public list = (
    params: QueryParam<Transaction> = {},
    filters?: FilterTransactionDto,
  ): QueryResult<Transaction> => {
    const resolved = resolveTransactions(
      this.getAll(),
      this.#accounts.getAll(),
      this.#categories.getAll(),
    )

    return applyQuery(
      resolved,
      params,
      filters === undefined ? undefined : matchesTransactionFilter(filters),
    )
  }

  // Sum of the amounts matching the filters (e.g. a dashboard type-resume
  // total). The aggregation is the backend's job — the UI just asks for it.
  public total = (filters?: FilterTransactionDto): number =>
    this.list({ pageSize: 0 }, filters).items.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    )

  // Per-category breakdown of a filtered total (powers the type-resume card's
  // category dialog): each category's summed amount and contributing
  // transactions, sorted by amount desc. A transaction tagged with N categories
  // counts toward each, so category sums can exceed the overall total.
  public categoryBreakdown = (
    filters?: FilterTransactionDto,
  ): CategoryBreakdown => {
    const items = this.list({ pageSize: 0 }, filters).items
    const total = items.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    )

    const byCategory = new Map<number, CategoryBreakdownEntry>()
    for (const transaction of items) {
      for (const category of transaction.categories) {
        const entry = byCategory.get(category.id) ?? {
          category,
          total: 0,
          transactions: [],
        }
        entry.total += transaction.amount
        entry.transactions.push(transaction)
        byCategory.set(category.id, entry)
      }
    }

    const categories = [...byCategory.values()].sort(
      (left, right) => right.total - left.total,
    )
    return { total, categories }
  }

  // An account's balance as of each boundary date, reconstructed from its
  // current balance by undoing the signed effect of transactions dated after
  // that boundary. Boundaries are YYYY/MM/DD (compared lexicographically
  // against the stored date), ascending. Powers the dashboard balance-history
  // card — the aggregation is the backend's job, so it lives here.
  public balanceHistory = (
    accountId: number,
    boundaries: string[],
  ): Array<{ date: string; balance: number }> => {
    const account = this.#accounts.getById(accountId)
    if (account === undefined) {
      return []
    }

    const owned = this.getAll().filter((item) => item.accountId === accountId)

    return boundaries.map((boundary) => {
      const effectAfter = owned
        .filter((item) => item.date > boundary)
        .reduce((sum, item) => sum + this.#signedAmount(item), 0)
      return {
        date: boundary,
        balance: Math.round((account.balance - effectAfter) * 100) / 100,
      }
    })
  }

  public add = (input: AddTransactionDto): void => {
    const stored: StoredTransaction = { id: createId(), ...input }
    this.insert(stored)
    this.#applyToBalance(stored, 1)
  }

  public transfer = (input: AddTransferDto): void => {
    const source = this.#accounts.getById(input.fromAccountId)
    const target = this.#accounts.getById(input.toAccountId)

    if (
      source === undefined ||
      target === undefined ||
      source.id === target.id ||
      source.currency.id !== target.currency.id ||
      !Number.isFinite(input.amount) ||
      input.amount <= 0
    ) {
      return
    }

    this.#categories.ensureTransferCategories()

    const description = input.description?.trim()
    const outgoing: StoredTransaction = {
      id: createId(),
      description:
        description && description !== ""
          ? description
          : translate(getDeviceLanguage(), "transactions.transfer.out", {
              account: target.name,
            }),
      amount: input.amount,
      date: input.date,
      accountId: source.id,
      categoryIds: [TRANSFER_CATEGORY_ID.OUT],
      auto: true,
    }
    const incoming: StoredTransaction = {
      id: createId(),
      description:
        description && description !== ""
          ? description
          : translate(getDeviceLanguage(), "transactions.transfer.in", {
              account: source.name,
            }),
      amount: input.amount,
      date: input.date,
      accountId: target.id,
      categoryIds: [TRANSFER_CATEGORY_ID.IN],
      auto: true,
    }

    this.insertMany([outgoing, incoming])
    this.#applyToBalance(outgoing, 1)
    this.#applyToBalance(incoming, 1)
  }

  public update = (id: number, input: AddTransactionDto): void => {
    // Reverse the previous effect, then apply the new one — covers changes to
    // amount, type (category) and the target account in a single path.
    const previous = this.getAll().find((item) => item.id === id)

    if (previous !== undefined) {
      this.#applyToBalance(previous, -1)
    }

    this.patch(id, input)
    this.#applyToBalance({ id, ...input }, 1)
  }

  public remove = (id: number): void => {
    const previous = this.getAll().find((item) => item.id === id)

    this.delete(id)

    if (previous !== undefined) {
      this.#applyToBalance(previous, -1)
    }
  }

  // Backend-owned operation (mirrors the API's adjust-balance endpoint): record
  // the difference to the target as a system transaction, which moves the
  // account balance through the normal transaction flow.
  public adjustBalance = (
    accountId: number,
    newBalance: number,
    description?: string,
  ): void => {
    const account = this.#accounts
      .getAll()
      .find((item) => item.id === accountId)

    if (account === undefined) {
      return
    }

    const delta = Math.round((newBalance - account.balance) * 100) / 100

    if (delta === 0) {
      return
    }

    // The auto category must exist for the sign/type to resolve correctly.
    this.#categories.ensureAdjustmentCategories()

    this.add({
      description:
        description ??
        translate(getDeviceLanguage(), "transactions.balanceAdjustment"),
      amount: Math.abs(delta),
      date: todayStamp(),
      accountId,
      auto: true,
      categoryIds: [
        delta > 0
          ? ADJUSTMENT_CATEGORY_ID.INCOME
          : ADJUSTMENT_CATEGORY_ID.EXPENSE,
      ],
    })
  }

  // Income adds, expense subtracts; `direction` flips the sign to undo.
  #applyToBalance(stored: StoredTransaction, direction: 1 | -1): void {
    this.#accounts.adjustBalance(
      stored.accountId,
      direction * this.#signedAmount(stored),
    )
  }

  // The transaction's effect on its account's balance: +amount for income,
  // −amount for expense (type read from the primary category).
  #signedAmount(stored: StoredTransaction): number {
    const type =
      this.#categories
        .getAll()
        .find((category) => category.id === stored.categoryIds[0])?.type ??
      TRANSACTION_TYPE.EXPENSE

    return type === TRANSACTION_TYPE.INCOME ? stored.amount : -stored.amount
  }

  // --- Backend sync bookkeeping ---------------------------------------------
  // `mutate` (not insert/patch/delete) on purpose: records server state, not a
  // user edit, so it must NOT bump `updatedAt` or touch account balances — the
  // accounts pull already brought each balance down, so re-applying a pulled
  // transaction's effect would double-count it.

  // Net effect on an account's balance of its NON-auto (user) transactions —
  // exactly what the backend will re-apply once those transactions sync. The
  // accounts push subtracts this from the balance it sends on CREATE, so the
  // backend lands on the right balance without double-counting (auto rows like
  // the opening "Initial transaction" and adjustments stay local, their effect
  // baked into the sent balance).
  public userTransactionsEffect = (accountId: number): number =>
    this.getAll()
      .filter((item) => item.auto !== true && item.accountId === accountId)
      .reduce((sum, item) => sum + this.#signedAmount(item), 0)

  // Pull (insert-only): add backend transactions we don't already track by
  // remoteId. The account FK is resolved to a local account id (skip the row if
  // its account isn't synced yet); categories are mapped to whatever local ids
  // resolve (a backend auto category with no local match is simply dropped —
  // display only, the balance comes from the account).
  public mergeRemote = (
    remote: RemoteTransaction[],
    resolveAccount: (remoteAccountId: number) => number | undefined,
    resolveCategory: (remoteCategoryId: number) => number | undefined,
  ): void => {
    this.mutate((items) => {
      const known = new Set(
        items
          .map((item) => item.remoteId)
          .filter((id): id is number => id !== undefined),
      )

      const additions: StoredTransaction[] = []
      for (const row of remote) {
        if (known.has(row.id) || row.account == null) {
          continue
        }
        const accountId = resolveAccount(row.account.id)
        if (accountId === undefined) {
          continue
        }
        const remoteCategories =
          row.categories ?? (row.category != null ? [row.category] : [])
        const categoryIds = remoteCategories
          .map((category) => resolveCategory(category.id))
          .filter((id): id is number => id !== undefined)

        additions.push({
          id: createId(),
          remoteId: row.id,
          description: row.description ?? "",
          amount: row.amount,
          date: row.date != null ? isoToStamp(row.date) : todayStamp(),
          accountId,
          categoryIds,
          auto: row.auto,
        })
      }

      return additions.length === 0 ? items : [...items, ...additions]
    })
  }

  // Record the backend id assigned to a locally-created transaction after POST.
  public attachRemoteId = (localId: number, remoteId: number): void => {
    this.mutate((items) =>
      items.map((item) => (item.id === localId ? { ...item, remoteId } : item)),
    )
  }
}
