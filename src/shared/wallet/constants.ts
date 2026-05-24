import {
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

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    description: "Monthly salary",
    amount: 2150,
    currency: euro,
    categories: [salary],
    date: "2026-05-24",
  },
  {
    id: "2",
    description: "Groceries",
    amount: 54.12,
    currency: euro,
    categories: [food, home],
    date: "2026-05-23",
  },
  {
    id: "3",
    description: "Metro card",
    amount: 8.4,
    currency: euro,
    categories: [transport],
    date: "2026-05-22",
  },
]

export const TRANSACTION_TYPE_COLORS: Record<TransactionType, string> = {
  [TransactionType.In]: "#2e7d32",
  [TransactionType.Out]: "#c62828",
}

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TransactionType.In]: "income",
  [TransactionType.Out]: "expense",
}
