import { useContext } from "react"

import { ThemeContext } from "./ThemeContext"
import {
  type ThemeColors,
  type ThemeContextValue,
  type ThemePreference,
} from "./types"

const useThemeContext = (): ThemeContextValue => useContext(ThemeContext)

type UseThemePreferenceResult = {
  isLoading: boolean
  preference: ThemePreference
  setPreference: ThemeContextValue["setPreference"]
  togglePreference: () => void
}

export const useThemePreference = (): UseThemePreferenceResult => {
  const { isLoading, preference, setPreference, togglePreference } =
    useThemeContext()

  return {
    isLoading,
    preference,
    setPreference,
    togglePreference,
  }
}

export const useThemeColors = (): ThemeColors => useThemeContext().colors

export const useThemeValue = (): ThemeContextValue => useThemeContext()
