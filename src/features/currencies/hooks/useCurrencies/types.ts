import { type QueryParam, type QueryResult } from "#shared/data"

import { type Currency } from "../../Currency"
import { type AddCurrencyDto, type FilterCurrencyDto } from "../../dtos"

export type UseCurrenciesOptions = {
  filters?: FilterCurrencyDto
  query?: QueryParam<Currency>
}

export type UseCurrenciesState = {
  // Filtered/sorted/paginated items (all items, unpaginated, when no options).
  data: Currency[]
  // Full query metadata (totals/pages) for pagination UIs.
  result: QueryResult<Currency>
  error: Error | null
  isLoading: boolean
  addCurrency: (input: AddCurrencyDto) => void
  addCurrencies: (inputs: AddCurrencyDto[]) => void
  updateCurrency: (id: number, input: AddCurrencyDto) => void
  removeCurrency: (id: number) => void
}
