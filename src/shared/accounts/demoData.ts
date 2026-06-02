import { type Currency } from "#shared/currencies"

import { ACCOUNT_BANK_NAME, ACCOUNT_TYPE, type Account } from "./Account"

// Self-contained seed: the accounts modlet defines its own currency snapshots
// (ids matching the currencies store) rather than importing currencies' runtime
// data. Keeps the modlet a black box and avoids the Manager import cycle. The
// Currency type import is erased at build time, so it pulls in no runtime code.
const euro: Currency = {
  id: "eur",
  name: "Euro",
  symbol: "€",
  description: "European Union currency",
}

const dollar: Currency = {
  id: "usd",
  name: "US Dollar",
  symbol: "$",
  description: "United States currency",
}

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: "main",
    name: "Main account",
    bankName: ACCOUNT_BANK_NAME.CAIXA,
    balance: 2487.48,
    type: ACCOUNT_TYPE.DIGITAL,
    currency: euro,
  },
  {
    id: "travel",
    name: "Travel card",
    bankName: ACCOUNT_BANK_NAME.REVOLUT,
    balance: 420.35,
    type: ACCOUNT_TYPE.DIGITAL,
    currency: euro,
  },
  {
    id: "savings",
    name: "Savings jar",
    bankName: ACCOUNT_BANK_NAME.BPA,
    balance: 1200,
    type: ACCOUNT_TYPE.CASH,
    currency: dollar,
  },
]
