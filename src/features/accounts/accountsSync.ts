import { type EntitySync, type SyncContext } from "#features/sync"
import { type Manager } from "#shared/data"

import { type Account, accountTypeToCode } from "./Account"
import {
  createAccount,
  deleteAccounts,
  fetchAccounts,
  updateAccount,
  type AccountPayload,
} from "./accountsClient"

// Sync adapter for accounts. Depends on currencies: an account references a
// currency by its backend id, so the orchestrator runs this AFTER currencies so
// the currency remoteIds exist. `balance` rides on CREATE only (the backend's
// update has no balance field — balance changes will come via transactions).
export const accountsSync = (
  manager: Manager,
): EntitySync<Account, AccountPayload> => {
  const client = manager.Accounts

  const resolveCurrency = (remoteCurrencyId: number) =>
    manager.Currencies.getAll().find(
      (currency) => currency.remoteId === remoteCurrencyId,
    )

  return {
    label: "accounts",
    pull: async () => {
      const rows = await fetchAccounts()
      client.mergeRemote(rows, resolveCurrency)
    },
    list: () => client.getAll(),
    attachRemoteId: client.attachRemoteId,
    toPayload: (account, { userId }: SyncContext) => {
      const currencyId = account.currency.remoteId
      // Name is required, and the currency must be synced (have a remoteId)
      // before we can reference it — otherwise skip and retry next pass.
      if (account.name.trim() === "" || currencyId === undefined) {
        return null
      }
      return {
        name: account.name.trim(),
        description: account.description,
        bankName: account.bankName,
        // Send the balance MINUS this account's user (non-auto) transactions:
        // those sync separately and the backend re-applies each, so subtracting
        // them here avoids double-counting. Auto rows (opening balance,
        // adjustments) don't sync, so their effect stays in the number.
        balance:
          account.balance -
          manager.Transactions.userTransactionsEffect(account.id),
        type: accountTypeToCode(account.type),
        currencyId,
        userId,
      }
    },
    // Balance is intentionally excluded: the backend update can't change it, so
    // a balance-only change must not trigger a pointless PATCH. `currencyId`
    // uses the local currency id to detect a currency swap.
    fields: (account) => ({
      name: account.name,
      description: account.description ?? "",
      bankName: account.bankName ?? "",
      type: account.type,
      currencyId: account.currency.id,
    }),
    create: createAccount,
    update: updateAccount,
    remove: deleteAccounts,
  }
}
