import { getDeviceLanguage, translate } from "#i18n/utils"

export const PROFILE_INFO_STORAGE_KEY = "sito-wallet:profile-info"
export const PROFILE_INFO_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "profile.info.error",
)
