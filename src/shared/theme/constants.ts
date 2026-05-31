import { type ThemePreference } from "./types"

export const THEME_PREFERENCE_STORAGE_KEY = "sito-wallet:theme-preference"

export const THEME_PREFERENCE = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const

export const RESOLVED_THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const

export const THEME_COLOR = {
  BACKGROUND: "background",
  SURFACE: "surface",
  BORDER: "border",
  TEXT_STRONG: "textStrong",
  TEXT_MUTED: "textMuted",
  TEXT_SUBTLE: "textSubtle",
  TEXT_INVERTED: "textInverted",
  POSITIVE: "positive",
  NEGATIVE: "negative",
  PRIMARY: "primary",
} as const

export const PREFERENCE_CYCLE: Record<ThemePreference, ThemePreference> = {
  [THEME_PREFERENCE.LIGHT]: THEME_PREFERENCE.DARK,
  [THEME_PREFERENCE.DARK]: THEME_PREFERENCE.SYSTEM,
  [THEME_PREFERENCE.SYSTEM]: THEME_PREFERENCE.LIGHT,
}
