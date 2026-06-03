import {
  textIncludes,
  type QueryParam,
  type QueryResult,
} from "#shared/data"
import { createId, StorageClient } from "#shared/data/storage"

import { type Currency } from "../Currency"
import { INITIAL_CURRENCIES } from "../demoData"
import { type AddCurrencyDto, type FilterCurrencyDto } from "../dtos"

import { CURRENCIES_ERROR_MESSAGE, CURRENCIES_STORAGE_KEY } from "./constants"
import { parseStoredCurrencies } from "./utils"

const matchesCurrencyFilter =
  (filters: FilterCurrencyDto) =>
  (currency: Currency): boolean =>
    textIncludes(currency.name, filters.name) &&
    textIncludes(currency.symbol, filters.symbol)

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

  public list = (
    params: QueryParam<Currency> = {},
    filters?: FilterCurrencyDto,
  ): QueryResult<Currency> =>
    this.runQuery(
      params,
      filters === undefined ? undefined : matchesCurrencyFilter(filters),
    )
}
