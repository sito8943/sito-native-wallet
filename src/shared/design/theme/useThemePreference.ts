import { useContext } from "react"

import { ThemeContext } from "./ThemeContext"
import {
  type UseThemePreferenceResult,
  type ThemeColors,
  type ThemeContextValue,
} from "./types"

const useThemeContext = (): ThemeContextValue => useContext(ThemeContext)

export const useThemePreference = (): UseThemePreferenceResult => {
  const {
    isLoading,
    preference,
    resolvedTheme,
    setPreference,
    togglePreference,
  } = useThemeContext()

  return {
    isLoading,
    preference,
    resolvedTheme,
    setPreference,
    togglePreference,
  }
}

export const useThemeColors = (): ThemeColors => useThemeContext().colors
