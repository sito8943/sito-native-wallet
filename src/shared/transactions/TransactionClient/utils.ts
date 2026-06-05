import { type StoredTransaction } from "./types"

const isStoredTransaction = (value: unknown): value is StoredTransaction => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === "number" &&
    typeof candidate.amount === "number" &&
    typeof candidate.accountId === "number" &&
    Array.isArray(candidate.categoryIds) &&
    (candidate.auto === undefined || typeof candidate.auto === "boolean")
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
