import { type Currency } from "../Currency"
import { type AddCurrencyDto } from "../dtos"

export type UseCurrenciesState = {
  data: Currency[]
  error: Error | null
  isLoading: boolean
  addCurrency: (input: AddCurrencyDto) => void
  addCurrencies: (inputs: AddCurrencyDto[]) => void
  updateCurrency: (id: string, input: AddCurrencyDto) => void
  removeCurrency: (id: string) => void
}
