import { getDeviceLanguage, translate } from "../../i18n/utils"

export const PROFILE_PREFERENCES_STORAGE_KEY = "sito-wallet:profile"
export const PROFILE_PREFERENCES_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "profile.preferences.error",
)
