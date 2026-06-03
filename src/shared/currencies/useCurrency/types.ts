import { type Currency } from "../Currency"
import { type AddCurrencyDto } from "../dtos"

export type UseCurrencyState = {
  data: Currency | null
  error: Error | null
  isLoading: boolean
  update: (input: AddCurrencyDto) => void
  remove: () => void
}
