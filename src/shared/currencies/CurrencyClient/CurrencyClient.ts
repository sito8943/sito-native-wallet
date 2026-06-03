import { createId, StorageClient } from "#shared/storage"

import { type Currency } from "../Currency"
import { INITIAL_CURRENCIES } from "../demoData"
import { type AddCurrencyDto } from "../dtos"

import { CURRENCIES_ERROR_MESSAGE, CURRENCIES_STORAGE_KEY } from "./constants"
import { parseStoredCurrencies } from "./utils"

export default class CurrencyClient extends StorageClient<Currency> {
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

  public update = (id: string, input: AddCurrencyDto): void => {
    this.patch(id, input)
  }
}
