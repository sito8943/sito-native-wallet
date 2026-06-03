import { THEME_COLOR } from "../theme/constants"
import { type ThemeColors } from "../theme/types"

export const lightColors: ThemeColors = {
  [THEME_COLOR.BACKGROUND]: "#f5f8fc",
  [THEME_COLOR.SURFACE]: "#ffffff",
  [THEME_COLOR.BORDER]: "#d6e0eb",
  [THEME_COLOR.TEXT_STRONG]: "#041e42",
  [THEME_COLOR.TEXT_MUTED]: "#4f627d",
  [THEME_COLOR.TEXT_SUBTLE]: "#74839a",
  [THEME_COLOR.TEXT_INVERTED]: "#ffffff",
  [THEME_COLOR.POSITIVE]: "#2e7d32",
  [THEME_COLOR.NEGATIVE]: "#c62828",
  [THEME_COLOR.PRIMARY]: "#041e42",
  [THEME_COLOR.OVERLAY]: "rgba(4, 30, 66, 0.4)",
}

export const darkColors: ThemeColors = {
  [THEME_COLOR.BACKGROUND]: "#020b16",
  [THEME_COLOR.SURFACE]: "#061a33",
  [THEME_COLOR.BORDER]: "#163b63",
  [THEME_COLOR.TEXT_STRONG]: "#f5f8fc",
  [THEME_COLOR.TEXT_MUTED]: "#c1d0e0",
  [THEME_COLOR.TEXT_SUBTLE]: "#90a5bf",
  [THEME_COLOR.TEXT_INVERTED]: "#ffffff",
  [THEME_COLOR.POSITIVE]: "#4caf50",
  [THEME_COLOR.NEGATIVE]: "#ef5350",
  [THEME_COLOR.PRIMARY]: "#3b82f6",
  [THEME_COLOR.OVERLAY]: "rgba(0, 0, 0, 0.6)",
}
