import { type StoredTransaction } from "./TransactionClient"

// Seed transactions reference accounts/categories by id. Ids mirror the demo
// data in #features/accounts and #features/categories. Kept as literals on purpose:
// importing those modules here would create an eval-time cycle through the
// Manager (accounts/demoData -> currencies -> useCurrencies -> manager).
const ACCOUNT = {
  MAIN: 1,
  TRAVEL: 2,
  SAVINGS: 3,
} as const

const CATEGORY = {
  SALARY: 2,
  FOOD: 3,
  TRANSPORT: 4,
  HOME: 5,
} as const

export const INITIAL_TRANSACTIONS: StoredTransaction[] = [
  {
    id: 1,
    description: "Monthly salary",
    amount: 2150,
    accountId: ACCOUNT.MAIN,
    categoryIds: [CATEGORY.SALARY],
    date: "2026/05/24",
  },
  {
    id: 2,
    description: "Groceries",
    amount: 54.12,
    accountId: ACCOUNT.MAIN,
    categoryIds: [CATEGORY.FOOD, CATEGORY.HOME],
    date: "2026/05/23",
  },
  {
    id: 3,
    description: "Metro card",
    amount: 8.4,
    accountId: ACCOUNT.TRAVEL,
    categoryIds: [CATEGORY.TRANSPORT],
    date: "2026/05/22",
  },
  {
    id: 4,
    description: "Savings transfer",
    amount: 200,
    accountId: ACCOUNT.SAVINGS,
    categoryIds: [CATEGORY.HOME],
    date: "2026/05/20",
  },

  // Extra examples

  {
    id: 5,
    description: "Coffee with friends",
    amount: 6.5,
    accountId: ACCOUNT.MAIN,
    categoryIds: [CATEGORY.FOOD],
    date: "2026/05/19",
  },
  {
    id: 6,
    description: "Electricity bill",
    amount: 73.2,
    accountId: ACCOUNT.MAIN,
    categoryIds: [CATEGORY.HOME],
    date: "2026/05/18",
  },
  {
    id: 7,
    description: "Bus ticket",
    amount: 2.55,
    accountId: ACCOUNT.TRAVEL,
    categoryIds: [CATEGORY.TRANSPORT],
    date: "2026/05/18",
  },
  {
    id: 8,
    description: "Freelance payment",
    amount: 480,
    accountId: ACCOUNT.MAIN,
    categoryIds: [CATEGORY.SALARY],
    date: "2026/05/17",
  },
  {
    id: 9,
    description: "Restaurant dinner",
    amount: 38.9,
    accountId: ACCOUNT.MAIN,
    categoryIds: [CATEGORY.FOOD],
    date: "2026/05/16",
  },
  {
    id: 10,
    description: "Internet subscription",
    amount: 29.99,
    accountId: ACCOUNT.MAIN,
    categoryIds: [CATEGORY.HOME],
    date: "2026/05/15",
  },
  {
    id: 11,
    description: "Taxi ride",
    amount: 14.8,
    accountId: ACCOUNT.TRAVEL,
    categoryIds: [CATEGORY.TRANSPORT],
    date: "2026/05/15",
  },
  {
    id: 12,
    description: "Furniture purchase",
    amount: 129.99,
    accountId: ACCOUNT.SAVINGS,
    categoryIds: [CATEGORY.HOME],
    date: "2026/05/14",
  },
  {
    id: 13,
    description: "Supermarket",
    amount: 92.45,
    accountId: ACCOUNT.MAIN,
    categoryIds: [CATEGORY.FOOD, CATEGORY.HOME],
    date: "2026/05/13",
  },
  {
    id: 14,
    description: "Train to Girona",
    amount: 18.2,
    accountId: ACCOUNT.TRAVEL,
    categoryIds: [CATEGORY.TRANSPORT],
    date: "2026/05/12",
  },
  {
    id: 15,
    description: "Bonus payment",
    amount: 350,
    accountId: ACCOUNT.MAIN,
    categoryIds: [CATEGORY.SALARY],
    date: "2026/05/10",
  },
]
