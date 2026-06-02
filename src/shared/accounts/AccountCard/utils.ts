import { ACCOUNT_BANK_NAME } from "../Account"

import { type AccountCardTheme } from "./types"

const fallbackTheme: AccountCardTheme = {
  accent: "#d6e0eb",
  accentSoft: "#eef3f9",
  background: "#ffffff",
  border: "#d6e0eb",
  highlight: "#f7fafc",
  mode: "flat",
  subtleText: "#4f627d",
  text: "#041e42",
}

const bankThemes: Record<string, AccountCardTheme> = {
  [ACCOUNT_BANK_NAME.IMAGIN]: {
    accent: "#8cf5de",
    accentSoft: "#2ce8d3",
    background: "#0b544d",
    border: "#2a7e77",
    highlight: "#12e7d8",
    mode: "gradient",
    subtleText: "rgba(255, 255, 255, 0.8)",
    text: "#ffffff",
  },
  [ACCOUNT_BANK_NAME.CAIXA]: {
    accent: "#7ad8ff",
    accentSoft: "#2f84ff",
    background: "#0a3d91",
    border: "#2157b0",
    highlight: "#1c6ff2",
    mode: "gradient",
    subtleText: "#dbeafe",
    text: "#ffffff",
  },
  [ACCOUNT_BANK_NAME.REVOLUT]: {
    accent: "#f53288",
    accentSoft: "#f53288",
    background: "#182764",
    border: "#2f4694",
    highlight: "#f53288",
    mode: "gradient",
    subtleText: "#b9c3d9",
    text: "#f8fafc",
  },
  [ACCOUNT_BANK_NAME.BANDEC]: {
    accent: "#ff8a75",
    accentSoft: "#d93a3a",
    background: "#b91c1c",
    border: "#991b1b",
    highlight: "#cf2f2f",
    mode: "flat",
    subtleText: "rgba(255, 255, 255, 0.82)",
    text: "#ffffff",
  },
  [ACCOUNT_BANK_NAME.BPA]: {
    accent: "#557455",
    accentSoft: "#3f5a30",
    background: "#d7e8cf",
    border: "#b6cfae",
    highlight: "#5f8e45",
    mode: "flat",
    subtleText: "#222",
    text: "#1f3a24",
  },
  [ACCOUNT_BANK_NAME.BANCO_METROPOLITANO]: {
    accent: "#6e8a63",
    accentSoft: "#dfead6",
    background: "#d9e9d0",
    border: "#bdd0b4",
    highlight: "#5f8e45",
    mode: "flat",
    subtleText: "#222",
    text: "#222222",
  },
}

export const getAccountCardTheme = (bankName?: string): AccountCardTheme =>
  bankName === undefined
    ? fallbackTheme
    : (bankThemes[bankName] ?? fallbackTheme)
