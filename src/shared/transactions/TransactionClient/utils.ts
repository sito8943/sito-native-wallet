import { type StoredTransaction } from "./types"

const isStoredTransaction = (value: unknown): value is StoredTransaction => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === "string" &&
    typeof candidate.amount === "number" &&
    typeof candidate.accountId === "string" &&
    Array.isArray(candidate.categoryIds)
  )
}

export const parseStoredTransactions = (
  value: unknown,
): StoredTransaction[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(isStoredTransaction)
}
