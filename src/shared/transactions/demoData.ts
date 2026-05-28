import { INITIAL_ACCOUNTS } from "#shared/accounts"
import { INITIAL_CATEGORIES } from "#shared/categories"

import { type Transaction } from "./Transaction"

const [salary, food, transport, home] = INITIAL_CATEGORIES

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    description: "Monthly salary",
    amount: 2150,
    account: INITIAL_ACCOUNTS[0],
    categories: [salary],
    date: "2026-05-24",
  },
  {
    id: "2",
    description: "Groceries",
    amount: 54.12,
    account: INITIAL_ACCOUNTS[0],
    categories: [food, home],
    date: "2026-05-23",
  },
  {
    id: "3",
    description: "Metro card",
    amount: 8.4,
    account: INITIAL_ACCOUNTS[1],
    categories: [transport],
    date: "2026-05-22",
  },
  {
    id: "4",
    description: "Savings transfer",
    amount: 200,
    account: INITIAL_ACCOUNTS[2],
    categories: [transport],
    date: "2026-05-20",
  },
]
