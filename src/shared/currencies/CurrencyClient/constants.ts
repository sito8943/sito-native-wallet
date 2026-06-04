import { getDeviceLanguage, translate } from "../../i18n/utils"

export const CURRENCIES_STORAGE_KEY = "currencies"
export const CURRENCIES_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "currencies.error.load",
)
