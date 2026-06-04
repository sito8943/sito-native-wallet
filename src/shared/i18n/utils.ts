import { LANGUAGE } from "./constants"
import { translations } from "./translations"
import { type Language, type TranslationKey } from "./types"

export const getDeviceLanguage = (): Language => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase()

  return locale.startsWith("es") ? LANGUAGE.ES : LANGUAGE.EN
}

export const parseLanguage = (value: unknown): Language =>
  value === LANGUAGE.ES ? LANGUAGE.ES : LANGUAGE.EN

export const translate = (language: Language, key: TranslationKey): string =>
  translations[language][key] ?? translations[LANGUAGE.EN][key]
