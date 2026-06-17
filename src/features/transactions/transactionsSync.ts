import { type EntitySync } from "#features/sync"
import { type Manager } from "#shared/data"

import { type StoredTransaction } from "./TransactionClient"
import {
  createTransaction,
  deleteTransactions,
  fetchTransactions,
  stampToIso,
  updateTransaction,
  type TransactionPayload,
} from "./transactionsClient"

// Sync adapter for transactions. Runs LAST (after currencies → categories →
// accounts): a transaction references an account AND its categories by their
// backend ids, so those must be synced first.
//
// Only NON-auto (user) transactions participate. The auto ones (the opening
// "Initial transaction", balance adjustments, transfers) reference seeded system
// categories that never sync, and their balance effect is folded into the
// account's CREATE balance instead (see AccountClient.userTransactionsEffect),
// so the backend lands on the right balance without double-counting.
//
// Unlike the other entities, the payload carries NO `userId` (the backend owns
// it via the account's user) and NO `type` (derived from the categories).
export const transactionsSync = (
  manager: Manager,
): EntitySync<StoredTransaction, TransactionPayload> => {
  const client = manager.Transactions

  const resolveCategoryRemoteId = (localId: number): number | undefined =>
    manager.Categories.getAll().find((category) => category.id === localId)
      ?.remoteId

  return {
    label: "transactions",
    pull: async () => {
      const rows = await fetchTransactions()
      client.mergeRemote(
        rows,
        (remoteAccountId) =>
          manager.Accounts.getAll().find(
            (account) => account.remoteId === remoteAccountId,
          )?.id,
        (remoteCategoryId) =>
          manager.Categories.getAll().find(
            (category) => category.remoteId === remoteCategoryId,
          )?.id,
      )
    },
    list: () => client.getAll().filter((item) => item.auto !== true),
    attachRemoteId: client.attachRemoteId,
    toPayload: (transaction) => {
      const accountId = manager.Accounts.getById(
        transaction.accountId,
      )?.remoteId
      // The account must be synced before its transactions can reference it.
      if (accountId === undefined) {
        return null
      }

      // Every category must be synced too; otherwise skip and retry next pass.
      const categoryIds: number[] = []
      for (const localId of transaction.categoryIds) {
        const remoteId = resolveCategoryRemoteId(localId)
        if (remoteId === undefined) {
          return null
        }
        categoryIds.push(remoteId)
      }

      return {
        description: transaction.description,
        accountId,
        amount: transaction.amount,
        date: stampToIso(transaction.date),
        categoryIds,
      }
    },
    fields: (transaction) => ({
      description: transaction.description,
      accountId: transaction.accountId,
      amount: transaction.amount,
      date: transaction.date,
      categoryIds: transaction.categoryIds.join(","),
    }),
    create: createTransaction,
    update: updateTransaction,
    remove: deleteTransactions,
  }
}
