import { getDeviceLanguage, translate } from "#shared/i18n"

import { TRANSACTION_TYPE, type TransactionType } from "../TransactionCategory"

export const CATEGORIES_STORAGE_KEY = "categories"
export const CATEGORIES_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "categories.error.load",
)

export const TRANSACTION_TYPES: TransactionType[] =
  Object.values(TRANSACTION_TYPE)
