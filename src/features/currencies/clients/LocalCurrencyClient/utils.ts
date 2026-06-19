import { type Currency, isCurrency } from "../../Currency"

export const parseStoredCurrencies = (value: unknown): Currency[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(isCurrency)
}
