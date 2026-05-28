import {
  TransactionType,
  type TransactionCategory,
} from "./TransactionCategory"

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
