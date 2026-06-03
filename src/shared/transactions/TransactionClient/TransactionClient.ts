// Deep, type-only imports on purpose: pulling the #shared/accounts or
// #shared/categories barrels here would re-create the Manager import cycle
// (barrel → hooks → Manager → this client). The client classes are injected as
// instances by the Manager, so we only need their types.
import { type AccountClient } from "#shared/accounts/AccountClient"
import { type CategoryClient } from "#shared/categories/CategoryClient"
import {
  ADJUSTMENT_CATEGORY_ID,
  TRANSACTION_TYPE,
} from "#shared/categories/TransactionCategory"
import { createId, StorageClient } from "#shared/data/storage"
import { todayStamp } from "#shared/data/time"

import { INITIAL_TRANSACTIONS } from "../demoData"
import { type AddTransactionDto } from "../dtos"

import {
  TRANSACTIONS_ERROR_MESSAGE,
  TRANSACTIONS_STORAGE_KEY,
} from "./constants"
import { type StoredTransaction } from "./types"
import { parseStoredTransactions } from "./utils"

// Local-first stand-in for the backend: persisting a transaction also keeps the
// owning account's balance in sync. Online, the server would own this; offline,
// the storage layer does. The UI just calls add/update/remove.
export default class TransactionClient extends StorageClient<StoredTransaction> {
  readonly #accounts: AccountClient
  readonly #categories: CategoryClient

  constructor(accounts: AccountClient, categories: CategoryClient) {
    super({
      storageKey: TRANSACTIONS_STORAGE_KEY,
      errorMessage: TRANSACTIONS_ERROR_MESSAGE,
      initialValue: INITIAL_TRANSACTIONS,
      parse: parseStoredTransactions,
    })
    this.#accounts = accounts
    this.#categories = categories
  }

  public add = (input: AddTransactionDto): void => {
    const stored: StoredTransaction = { id: createId(), ...input }
    this.insert(stored)
    this.#applyToBalance(stored, 1)
  }

  public update = (id: string, input: AddTransactionDto): void => {
    // Reverse the previous effect, then apply the new one — covers changes to
    // amount, type (category) and the target account in a single path.
    const previous = this.getAll().find((item) => item.id === id)

    if (previous !== undefined) {
      this.#applyToBalance(previous, -1)
    }

    this.patch(id, input)
    this.#applyToBalance({ id, ...input }, 1)
  }

  public remove = (id: string): void => {
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
    accountId: string,
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
      description: description ?? "Balance adjustment",
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
    const type =
      this.#categories
        .getAll()
        .find((category) => category.id === stored.categoryIds[0])?.type ??
      TRANSACTION_TYPE.EXPENSE
    const signed =
      type === TRANSACTION_TYPE.INCOME ? stored.amount : -stored.amount

    this.#accounts.adjustBalance(stored.accountId, direction * signed)
  }
}
