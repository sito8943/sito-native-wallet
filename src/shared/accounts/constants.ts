import { INITIAL_CURRENCIES } from "#shared/currencies"

import { type Account } from "./types"

const [euro, dollar] = INITIAL_CURRENCIES

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: "main",
    name: "Main account",
    balance: 2487.48,
    currency: euro,
  },
  {
    id: "travel",
    name: "Travel card",
    balance: 420.35,
    currency: euro,
  },
  {
    id: "savings",
    name: "Savings jar",
    balance: 1200,
    currency: dollar,
  },
]
