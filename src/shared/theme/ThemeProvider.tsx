import { type ReactElement, type ReactNode } from "react"

import { useStoredState } from "#shared/storage"

import { THEME_PREFERENCE_STORAGE_KEY } from "./constants"
import { ThemeContext } from "./ThemeContext"
import { type ThemePreference } from "./types"
import { getThemeColors, parseThemePreference } from "./utils"

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({
  children,
}: ThemeProviderProps): ReactElement {
  const {
    data: preference,
    isLoading,
    setData: setPreference,
  } = useStoredState<ThemePreference>({
    errorMessage: "Unable to persist theme preference.",
    initialValue: "light",
    parseStoredValue: parseThemePreference,
    storageKey: THEME_PREFERENCE_STORAGE_KEY,
  })

  return (
    <ThemeContext.Provider
      value={{
        colors: getThemeColors(preference),
        isLoading,
        preference,
        setPreference,
        togglePreference: () => {
          setPreference((current) => (current === "light" ? "dark" : "light"))
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
