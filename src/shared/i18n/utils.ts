import { LANGUAGE } from "./constants"
import { translations } from "./translations"
import {
  type Language,
  type TranslationKey,
  type TranslationParams,
} from "./types"

export const getDeviceLanguage = (): Language => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase()

  return locale.startsWith("es") ? LANGUAGE.ES : LANGUAGE.EN
}

export const parseLanguage = (value: unknown): Language =>
  value === LANGUAGE.ES ? LANGUAGE.ES : LANGUAGE.EN

export const translate = (
  language: Language,
  key: TranslationKey,
  params?: TranslationParams,
): string => {
  const template = translations[language][key] ?? translations[LANGUAGE.EN][key]

  if (params === undefined) {
    return template
  }

  return Object.entries(params).reduce<string>(
    (message, [paramKey, value]) =>
      message.replaceAll(`{${paramKey}}`, String(value)),
    template,
  )
}
