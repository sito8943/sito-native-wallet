import { type Action } from "#shared/actions"

import { type Currency } from "../Currency"

export type CurrencyCardProps = {
  currency: Currency
  actions?: Array<Action<Currency>>
  onPress?: () => void
}
