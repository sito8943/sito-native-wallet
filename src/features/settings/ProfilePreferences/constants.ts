import { getDeviceLanguage, translate } from "#shared/i18n"

export const PROFILE_PREFERENCES_STORAGE_KEY = "sito-wallet:profile"
export const PROFILE_PREFERENCES_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "profile.preferences.error",
)
