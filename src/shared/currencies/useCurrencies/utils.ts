import { type Currency } from "../Currency"

const isCurrency = (value: unknown): value is Currency => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.symbol === "string"
  )
}

export const parseStoredCurrencies = (value: unknown): Currency[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(isCurrency)
}
