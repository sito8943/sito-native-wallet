import { useMemo, type ReactElement } from "react"

import { useStoredState } from "#shared/data/storage"

import { I18nContext } from "./I18nContext"
import { LANGUAGE_STORAGE_KEY } from "./constants"
import { type LanguageProviderProps } from "./types"
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

  const value = useMemo(
    () => ({
      isLoading,
      language,
      setLanguage,
      t: (key: Parameters<typeof translate>[1]) => translate(language, key),
    }),
    [isLoading, language, setLanguage],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
