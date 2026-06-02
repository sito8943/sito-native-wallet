import {
  TRANSACTION_TYPE,
  type TransactionCategory,
} from "./TransactionCategory"

const salary: TransactionCategory = {
  id: "salary",
  name: "Salary",
  description: "Recurring income from work",
  color: "#2e7d32",
  type: TRANSACTION_TYPE.INCOME,
}

const food: TransactionCategory = {
  id: "food",
  name: "Food",
  description: "Groceries, restaurants and snacks",
  color: "#ef6c00",
  type: TRANSACTION_TYPE.EXPENSE,
}

const transport: TransactionCategory = {
  id: "transport",
  name: "Transport",
  description: "Trips, tickets and commuting",
  color: "#1565c0",
  type: TRANSACTION_TYPE.EXPENSE,
}

const home: TransactionCategory = {
  id: "home",
  name: "Home",
  description: "Rent, utilities and household costs",
  color: "#6a1b9a",
  type: TRANSACTION_TYPE.EXPENSE,
}

export const INITIAL_CATEGORIES: TransactionCategory[] = [
  salary,
  food,
  transport,
  home,
]
