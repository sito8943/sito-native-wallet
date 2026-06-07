import { type Dispatch, type ReactNode, type SetStateAction } from "react"

import { type LANGUAGE } from "./constants"
import { type translations } from "./translations"

export type Language = (typeof LANGUAGE)[keyof typeof LANGUAGE]

export type TranslationKey = keyof (typeof translations)["en"]

export type TranslationParams = Record<string, number | string>

// Inline-localized string for data that lives in code (e.g. prefab templates)
// rather than the translation catalog. Resolved with the active `language`.
export type LocalizedText = Record<Language, string>

export type I18nContextValue = {
  isLoading: boolean
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
  t: (key: TranslationKey, params?: TranslationParams) => string
}

export type LanguageProviderProps = {
  children: ReactNode
}
