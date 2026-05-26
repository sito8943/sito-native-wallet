import {
  type Account,
  TransactionType,
  type Currency,
  type Transaction,
  type TransactionCategory,
} from "./types"

const euro: Currency = {
  id: "eur",
  name: "Euro",
  symbol: "€",
}

const dollar: Currency = {
  id: "usd",
  name: "US Dollar",
  symbol: "$",
}

export const INITIAL_CURRENCIES: Currency[] = [euro, dollar]

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

const salary: TransactionCategory = {
  id: "salary",
  name: "Salary",
  color: "#2e7d32",
  type: TransactionType.In,
}

const food: TransactionCategory = {
  id: "food",
  name: "Food",
  color: "#ef6c00",
  type: TransactionType.Out,
}

const transport: TransactionCategory = {
  id: "transport",
  name: "Transport",
  color: "#1565c0",
  type: TransactionType.Out,
}

const home: TransactionCategory = {
  id: "home",
  name: "Home",
  color: "#6a1b9a",
  type: TransactionType.Out,
}

export const INITIAL_CATEGORIES: TransactionCategory[] = [
  salary,
  food,
  transport,
  home,
]

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

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TransactionType.In]: "income",
  [TransactionType.Out]: "expense",
}
