import { darkColors, lightColors } from "./colors"
import { type ThemeColors, type ThemePreference } from "./types"

export const parseThemePreference = (value: unknown): ThemePreference =>
  value === "dark" ? "dark" : "light"

export const getThemeColors = (
  preference: ThemePreference,
): ThemeColors => {
  if (preference === "dark") {
    return darkColors
  }

  return lightColors
}
