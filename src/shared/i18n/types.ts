import { type Dispatch, type ReactNode, type SetStateAction } from "react"

import { type LANGUAGE } from "./constants"
import { type translations } from "./translations"

export type Language = (typeof LANGUAGE)[keyof typeof LANGUAGE]

export type TranslationKey = keyof (typeof translations)["en"]

export type I18nContextValue = {
  isLoading: boolean
  language: Language
  setLanguage: Dispatch<SetStateAction<Language>>
  t: (key: TranslationKey) => string
}

export type LanguageProviderProps = {
  children: ReactNode
}
