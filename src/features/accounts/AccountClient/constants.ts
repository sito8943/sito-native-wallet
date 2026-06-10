import { getDeviceLanguage, translate } from "#shared-i18n/utils"

import { ACCOUNT_TYPE, type AccountType } from "../Account"

export const ACCOUNTS_STORAGE_KEY = "accounts"
export const ACCOUNTS_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "accounts.error.load",
)

export const ACCOUNT_TYPES: AccountType[] = Object.values(ACCOUNT_TYPE)
