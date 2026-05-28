import { type Currency } from "../Currency"

export type UseCurrenciesState = {
  data: Currency[] | null
  error: Error | null
  isLoading: boolean
}
