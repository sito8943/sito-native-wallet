import { createId, StorageClient } from "#shared/storage"

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
}
