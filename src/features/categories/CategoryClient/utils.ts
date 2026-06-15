import {
  type TransactionCategory,
  type TransactionType,
} from "../TransactionCategory"

import { TRANSACTION_TYPES } from "./constants"

const isCategory = (value: unknown): value is TransactionCategory => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === "number" &&
    (candidate.remoteId === undefined ||
      typeof candidate.remoteId === "number") &&
    typeof candidate.name === "string" &&
    (candidate.description === undefined ||
      typeof candidate.description === "string") &&
    typeof candidate.color === "string" &&
    (candidate.system === undefined || typeof candidate.system === "boolean") &&
    (candidate.auto === undefined || typeof candidate.auto === "boolean") &&
    TRANSACTION_TYPES.includes(candidate.type as TransactionType)
  )
}

export const parseStoredCategories = (
  value: unknown,
): TransactionCategory[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(isCategory)
}
