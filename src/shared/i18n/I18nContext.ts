import { createContext } from "react"

import { LANGUAGE } from "./constants"
import { type I18nContextValue } from "./types"

export const I18nContext = createContext<I18nContextValue>({
  isLoading: false,
  language: LANGUAGE.EN,
  setLanguage: () => undefined,
  t: (key) => key,
})
