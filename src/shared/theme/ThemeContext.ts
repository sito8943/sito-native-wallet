import { createContext } from "react"

import { lightColors } from "./colors"
import { type ThemeContextValue, type ThemePreference } from "./types"

const defaultTogglePreference = (): void => undefined

const defaultSetPreference = (
  _value: ThemePreference | ((current: ThemePreference) => ThemePreference),
): void => undefined

export const ThemeContext = createContext<ThemeContextValue>({
  colors: lightColors,
  isLoading: false,
  preference: "light",
  setPreference: defaultSetPreference,
  togglePreference: defaultTogglePreference,
})
