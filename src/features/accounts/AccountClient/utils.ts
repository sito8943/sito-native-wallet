import { isCurrency } from "#features/currencies/Currency"

import { type Account, type AccountType } from "../Account"

import { ACCOUNT_TYPES } from "./constants"

const isAccount = (value: unknown): value is Account => {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    (candidate.description === undefined ||
      typeof candidate.description === "string") &&
    (candidate.bankName === undefined ||
      typeof candidate.bankName === "string") &&
    typeof candidate.balance === "number" &&
    ACCOUNT_TYPES.includes(candidate.type as AccountType) &&
    isCurrency(candidate.currency)
  )
}

export const parseStoredAccounts = (value: unknown): Account[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(isAccount)
}
