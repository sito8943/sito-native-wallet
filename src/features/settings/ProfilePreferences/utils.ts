import { getDeviceLanguage, parseLanguage } from "#shared/i18n"

import { type ProfilePreferences } from "./types"

export const getDefaultProfilePreferences = (): ProfilePreferences => ({
  language: getDeviceLanguage(),
})

export const parseProfilePreferences = (value: unknown): ProfilePreferences => {
  const fallback = getDefaultProfilePreferences()

  if (typeof value !== "object" || value === null) {
    return fallback
  }

  const candidate = value as { language?: unknown }

  return {
    language: parseLanguage(candidate.language),
  }
}
