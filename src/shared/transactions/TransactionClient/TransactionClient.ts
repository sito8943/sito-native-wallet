import { createId, StorageClient } from "#shared/storage"

import { INITIAL_TRANSACTIONS } from "../demoData"
import { type AddTransactionDto } from "../dtos"

import {
  TRANSACTIONS_ERROR_MESSAGE,
  TRANSACTIONS_STORAGE_KEY,
} from "./constants"
import { type StoredTransaction } from "./types"
import { parseStoredTransactions } from "./utils"

export default class TransactionClient extends StorageClient<StoredTransaction> {
  constructor() {
    super({
      storageKey: TRANSACTIONS_STORAGE_KEY,
      errorMessage: TRANSACTIONS_ERROR_MESSAGE,
      initialValue: INITIAL_TRANSACTIONS,
      parse: parseStoredTransactions,
    })
  }

  public add = (input: AddTransactionDto): void => {
    this.insert({ id: createId(), ...input })
  }

  public update = (id: string, input: AddTransactionDto): void => {
    this.patch(id, input)
  }
}
