import { type ResolvedTheme, type ThemeColors } from "#design/theme"

import { ACCOUNT_BANK_NAME } from "../Account"

import { type AccountCardTheme } from "./types"

type ThemeVariants = Record<ResolvedTheme, AccountCardTheme>

// No-bank card has no brand palette, so it borrows the app theme tokens — which
// already resolve per light/dark — keeping it consistent with the rest of the
// UI (and honouring the "no colour literals for app chrome" rule). Bank cards
// below carry their own brand literals because brand colour is domain data.
const buildFallback = (colors: ThemeColors): AccountCardTheme => ({
  accent: colors.border,
  accentSoft: colors.surface,
  background: colors.surface,
  border: colors.border,
  highlight: colors.surface,
  mode: "flat",
  subtleText: colors.textSubtle,
  text: colors.textStrong,
})

const bankThemes: Record<string, ThemeVariants> = {
  [ACCOUNT_BANK_NAME.IMAGIN]: {
    light: {
      accent: "#8cf5de",
      accentSoft: "#2ce8d3",
      background: "#0b544d",
      border: "#2a7e77",
      highlight: "#12e7d8",
      mode: "gradient",
      subtleText: "rgba(255, 255, 255, 0.8)",
      text: "#ffffff",
    },
    dark: {
      accent: "#3fd9c4",
      accentSoft: "#13b8a6",
      background: "#04302b",
      border: "#0f5249",
      highlight: "#0a8378",
      mode: "gradient",
      subtleText: "rgba(255, 255, 255, 0.72)",
      text: "#eafffb",
    },
  },
  [ACCOUNT_BANK_NAME.CAIXA]: {
    light: {
      accent: "#7ad8ff",
      accentSoft: "#2f84ff",
      background: "#0a3d91",
      border: "#2157b0",
      highlight: "#1c6ff2",
      mode: "gradient",
      subtleText: "#dbeafe",
      text: "#ffffff",
    },
    dark: {
      accent: "#5aa0e6",
      accentSoft: "#1e5fd0",
      background: "#061f4a",
      border: "#123067",
      highlight: "#14418f",
      mode: "gradient",
      subtleText: "#bcd3f5",
      text: "#eef4ff",
    },
  },
  [ACCOUNT_BANK_NAME.REVOLUT]: {
    light: {
      accent: "#f53288",
      accentSoft: "#f53288",
      background: "#182764",
      border: "#2f4694",
      highlight: "#f53288",
      mode: "gradient",
      subtleText: "#b9c3d9",
      text: "#f8fafc",
    },
    dark: {
      accent: "#d62f78",
      accentSoft: "#d62f78",
      background: "#0a1330",
      border: "#1b2a5e",
      highlight: "#d62f78",
      mode: "gradient",
      subtleText: "#9aa6c4",
      text: "#eef1f8",
    },
  },
  [ACCOUNT_BANK_NAME.BANDEC]: {
    light: {
      accent: "#ff8a75",
      accentSoft: "#d93a3a",
      background: "#b91c1c",
      border: "#991b1b",
      highlight: "#cf2f2f",
      mode: "flat",
      subtleText: "rgba(255, 255, 255, 0.82)",
      text: "#ffffff",
    },
    dark: {
      accent: "#e06a58",
      accentSoft: "#a82d2d",
      background: "#7f1414",
      border: "#5c0f0f",
      highlight: "#921818",
      mode: "flat",
      subtleText: "rgba(255, 255, 255, 0.74)",
      text: "#fdecea",
    },
  },
  [ACCOUNT_BANK_NAME.BPA]: {
    light: {
      accent: "#557455",
      accentSoft: "#3f5a30",
      background: "#d7e8cf",
      border: "#b6cfae",
      highlight: "#5f8e45",
      mode: "flat",
      subtleText: "#222",
      text: "#1f3a24",
    },
    dark: {
      accent: "#7fa37f",
      accentSoft: "#2c452f",
      background: "#1f3a24",
      border: "#2f5237",
      highlight: "#284a30",
      mode: "flat",
      subtleText: "#a9c7ac",
      text: "#e6f2e0",
    },
  },
  [ACCOUNT_BANK_NAME.BANCO_METROPOLITANO]: {
    light: {
      accent: "#6e8a63",
      accentSoft: "#dfead6",
      background: "#d9e9d0",
      border: "#bdd0b4",
      highlight: "#5f8e45",
      mode: "flat",
      subtleText: "#222",
      text: "#222222",
    },
    dark: {
      accent: "#8aa67e",
      accentSoft: "#2a3f24",
      background: "#233a1f",
      border: "#33502c",
      highlight: "#2c4926",
      mode: "flat",
      subtleText: "#acc4a4",
      text: "#e8f3e0",
    },
  },
}

export const getAccountCardTheme = (
  bankName: string | undefined,
  resolvedTheme: ResolvedTheme,
  colors: ThemeColors,
): AccountCardTheme => {
  if (bankName === undefined) {
    return buildFallback(colors)
  }

  return bankThemes[bankName]?.[resolvedTheme] ?? buildFallback(colors)
}
