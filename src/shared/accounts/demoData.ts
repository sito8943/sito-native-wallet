// Relative import to the demoData file (not the #shared/currencies barrel) on
// purpose: the barrel pulls in useCurrencies -> Manager -> AccountClient ->
// this file, an eval-time cycle that leaves INITIAL_CURRENCIES undefined.
import { INITIAL_CURRENCIES } from "../currencies/demoData"

import { ACCOUNT_TYPE, type Account } from "./Account"

const [euro, dollar] = INITIAL_CURRENCIES

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: "main",
    name: "Main account",
    balance: 2487.48,
    type: ACCOUNT_TYPE.DIGITAL,
    currency: euro,
  },
  {
    id: "travel",
    name: "Travel card",
    balance: 420.35,
    type: ACCOUNT_TYPE.DIGITAL,
    currency: euro,
  },
  {
    id: "savings",
    name: "Savings jar",
    balance: 1200,
    type: ACCOUNT_TYPE.CASH,
    currency: dollar,
  },
]
