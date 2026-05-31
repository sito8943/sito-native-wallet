import { TRANSACTION_TYPE, type TransactionType } from "../TransactionCategory"

export const CATEGORIES_STORAGE_KEY = "categories"
export const CATEGORIES_ERROR_MESSAGE = "Failed to load categories"

export const TRANSACTION_TYPES: TransactionType[] =
  Object.values(TRANSACTION_TYPE)
