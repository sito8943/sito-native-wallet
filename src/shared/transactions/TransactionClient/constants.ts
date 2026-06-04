import { getDeviceLanguage, translate } from "../../i18n/utils"

export const TRANSACTIONS_STORAGE_KEY = "transactions"
export const TRANSACTIONS_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "transactions.error.load",
)
