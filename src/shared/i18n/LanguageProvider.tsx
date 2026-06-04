import { useMemo, type ReactElement } from "react"

import { useStoredState } from "#shared/data/storage"

import { LANGUAGE_STORAGE_KEY } from "./constants"
import { I18nContext } from "./I18nContext"
import {
  type I18nContextValue,
  type LanguageProviderProps,
  type TranslationKey,
  type TranslationParams,
} from "./types"
import { getDeviceLanguage, parseLanguage, translate } from "./utils"

export function LanguageProvider({
  children,
}: LanguageProviderProps): ReactElement {
  const {
    data: language,
    isLoading,
    setData: setLanguage,
  } = useStoredState({
    errorMessage: "Unable to persist language preference.",
    initialValue: getDeviceLanguage(),
    parseStoredValue: parseLanguage,
    storageKey: LANGUAGE_STORAGE_KEY,
  })

  const value = useMemo<I18nContextValue>(
    () => ({
      isLoading,
      language,
      setLanguage,
      t: (key: TranslationKey, params?: TranslationParams) =>
        translate(language, key, params),
    }),
    [isLoading, language, setLanguage],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
