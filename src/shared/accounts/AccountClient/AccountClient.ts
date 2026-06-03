import { createId, StorageClient } from "#shared/data/storage"

import { type Account } from "../Account"
import { INITIAL_ACCOUNTS } from "../demoData"
import { type AddAccountDto } from "../dtos"

import { ACCOUNTS_ERROR_MESSAGE, ACCOUNTS_STORAGE_KEY } from "./constants"
import { parseStoredAccounts } from "./utils"

export default class AccountClient extends StorageClient<Account> {
  constructor() {
    super({
      storageKey: ACCOUNTS_STORAGE_KEY,
      errorMessage: ACCOUNTS_ERROR_MESSAGE,
      initialValue: INITIAL_ACCOUNTS,
      parse: parseStoredAccounts,
    })
  }

  public add = (input: AddAccountDto): void => {
    this.insert({ id: createId(), ...input })
  }

  public update = (id: string, input: AddAccountDto): void => {
    this.patch(id, input)
  }

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
