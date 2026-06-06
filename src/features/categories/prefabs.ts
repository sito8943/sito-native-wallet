import { TRANSACTION_TYPE } from "./TransactionCategory"
import { type CategoryPrefab } from "./types"

export const CATEGORY_PREFABS: CategoryPrefab[] = [
  // Income
  {
    key: "salary",
    name: "Salary",
    type: TRANSACTION_TYPE.INCOME,
    color: "#2e7d32",
    description: "Recurring income from work",
  },
  {
    key: "freelance",
    name: "Freelance",
    type: TRANSACTION_TYPE.INCOME,
    color: "#00897b",
    description: "Side gigs and contract work",
  },
  {
    key: "gifts",
    name: "Gifts",
    type: TRANSACTION_TYPE.INCOME,
    color: "#c2185b",
    description: "Money received as a gift",
  },
  {
    key: "investments",
    name: "Investments",
    type: TRANSACTION_TYPE.INCOME,
    color: "#1565c0",
    description: "Returns, interest and dividends",
  },
  {
    key: "refunds",
    name: "Refunds",
    type: TRANSACTION_TYPE.INCOME,
    color: "#558b2f",
    description: "Reimbursements and returns",
  },
  // Expense
  {
    key: "food",
    name: "Food",
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#ef6c00",
    description: "Groceries, restaurants and snacks",
  },
  {
    key: "transport",
    name: "Transport",
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#1e88e5",
    description: "Trips, tickets and commuting",
  },
  {
    key: "housing",
    name: "Housing",
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#6a1b9a",
    description: "Rent, mortgage and household costs",
  },
  {
    key: "utilities",
    name: "Utilities",
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#00838f",
    description: "Electricity, water, gas and internet",
  },
  {
    key: "entertainment",
    name: "Entertainment",
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#8e24aa",
    description: "Movies, games and going out",
  },
  {
    key: "health",
    name: "Health",
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#d81b60",
    description: "Medical, pharmacy and wellness",
  },
  {
    key: "subscriptions",
    name: "Subscriptions",
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#3949ab",
    description: "Recurring services and memberships",
  },
  {
    key: "shopping",
    name: "Shopping",
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#f4511e",
    description: "Clothes, gadgets and general shopping",
  },
  {
    key: "education",
    name: "Education",
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#5d4037",
    description: "Courses, books and tuition",
  },
  {
    key: "savings",
    name: "Savings",
    type: TRANSACTION_TYPE.EXPENSE,
    color: "#43a047",
    description: "Money set aside for goals",
  },
]
