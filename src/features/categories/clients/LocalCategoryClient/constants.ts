import { getDeviceLanguage, translate } from "#i18n/utils"

import { TRANSACTION_TYPE, type TransactionType } from "../../TransactionCategory"

export const CATEGORIES_STORAGE_KEY = "categories"
export const CATEGORIES_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "categories.error.load",
)

export const TRANSACTION_TYPES: TransactionType[] =
  Object.values(TRANSACTION_TYPE)
