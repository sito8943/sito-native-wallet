import { THEME_PREFERENCE, type ThemePreference } from "#design/theme"

import { LANGUAGE } from "#shared-i18n/constants"
import { type Language } from "#shared-i18n/types"
import { getDeviceLanguage, translate } from "#shared-i18n/utils"

export const PROFILE_PREFERENCES_STORAGE_KEY = "sito-wallet:profile"
export const PROFILE_PREFERENCES_ERROR_MESSAGE = translate(
  getDeviceLanguage(),
  "profile.preferences.error",
)

export const APPEARANCE_OPTIONS: Array<{
  labelKey:
    | "profile.appearance.light"
    | "profile.appearance.dark"
    | "profile.appearance.system"
  value: ThemePreference
}> = [
  { labelKey: "profile.appearance.light", value: THEME_PREFERENCE.LIGHT },
  { labelKey: "profile.appearance.dark", value: THEME_PREFERENCE.DARK },
  { labelKey: "profile.appearance.system", value: THEME_PREFERENCE.SYSTEM },
]

export const LANGUAGE_OPTIONS: Array<{
  labelKey: "profile.language.english" | "profile.language.spanish"
  value: Language
}> = [
  { labelKey: "profile.language.english", value: LANGUAGE.EN },
  { labelKey: "profile.language.spanish", value: LANGUAGE.ES },
]
