import {
  useCallback,
  useMemo,
  type ReactElement,
  type SetStateAction,
} from "react"

import { useProfilePreferences } from "#features/settings/ProfilePreferences"

import { I18nContext } from "./I18nContext"
import {
  type I18nContextValue,
  type Language,
  type LanguageProviderProps,
  type TranslationKey,
  type TranslationParams,
} from "./types"
import { translate } from "./utils"

export function LanguageProvider({
  children,
}: LanguageProviderProps): ReactElement {
  const {
    data: profile,
    isLoading,
    setData: setProfile,
  } = useProfilePreferences()
  const { language } = profile

  const setLanguage = useCallback(
    (nextLanguage: SetStateAction<Language>) => {
      setProfile((current) => ({
        ...current,
        language:
          typeof nextLanguage === "function"
            ? nextLanguage(current.language)
            : nextLanguage,
      }))
    },
    [setProfile],
  )

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
