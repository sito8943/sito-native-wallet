import { getDeviceLanguage, translate } from "../../../shared/i18n/utils"

export const TRANSACTIONS_STORAGE_KEY = "transactions"
export const TRANSACTIONS_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "transactions.error.load",
)
