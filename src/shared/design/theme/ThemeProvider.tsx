import { useMemo, type ReactElement, type ReactNode } from "react"
import { useColorScheme } from "react-native"

import { useStoredState } from "#shared/data/storage"

import { useI18n } from "../../i18n/useI18n"

import { THEME_PREFERENCE, THEME_PREFERENCE_STORAGE_KEY } from "./constants"
import { ThemeContext } from "./ThemeContext"
import { type ThemePreference } from "./types"
import {
  getThemeColors,
  nextPreference,
  parseThemePreference,
  resolveTheme,
} from "./utils"

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
  const systemScheme = useColorScheme()
  const { t } = useI18n()

  const {
    data: preference,
    isLoading,
    setData: setPreference,
  } = useStoredState<ThemePreference>({
    errorMessage: t("profile.appearance.error"),
    initialValue: THEME_PREFERENCE.SYSTEM,
    parseStoredValue: parseThemePreference,
    storageKey: THEME_PREFERENCE_STORAGE_KEY,
  })

  const resolvedTheme = resolveTheme(preference, systemScheme)

  const value = useMemo(
    () => ({
      colors: getThemeColors(resolvedTheme),
      isLoading,
      preference,
      resolvedTheme,
      setPreference,
      togglePreference: () => {
        setPreference(nextPreference)
      },
    }),
    [isLoading, preference, resolvedTheme, setPreference],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
